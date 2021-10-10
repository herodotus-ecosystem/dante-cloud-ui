<template>
    <div>
        <h-container>
            <h-table
                show-select
                external-pagination
                :table-headers="tableHeaders"
                :table-items="tableItems"
                :page-size="pageSize"
                :total-items="totalItems"
                :total-pages="totalPages"
                :table-title="tableTitle"
                :table-loading="tableLoading"
                :skeleton-loading="skeletonLoading"
                :column-slots="columnSlots"
                :item-key="getItemKey()"
                @pagination="pagination($event)"
            >
                <template v-slot:top>
                    <v-btn color="primary" dark class="mb-2 mr-2" @click="createItem()">添加用户</v-btn>
                </template>
                <template v-slot:[`item.status`]="{ item }">
                    <h-table-item-status :type="item.status"></h-table-item-status>
                </template>
                <template v-slot:[`item.reserved`]="{ item }">
                    <h-table-item-chip :status="item.reserved"></h-table-item-chip>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                    <h-action-button
                        authorize
                        edit
                        :remove="!item.reserved"
                        content="角色"
                        @authorize="authorizeItem(item)"
                        @edit="editItem(item)"
                        @remove="deleteItem(item)"
                    >
                        <template slot="left"
                            ><h-button
                                icon
                                color="teal"
                                icon-name="mdi-key-change"
                                tooltip="修改密码"
                                @click="setCurrentUser(item)"
                            ></h-button>
                        </template>
                    </h-action-button>
                </template>
            </h-table>
        </h-container>
        <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="600px">
                <validation-observer ref="observer">
                    <v-form>
                        <v-card>
                            <v-card-title>设置/修改密码</v-card-title>
                            <v-divider></v-divider>
                            <v-card-text>
                                <validation-provider
                                    vid="newPassword"
                                    v-slot="{ errors }"
                                    name="新密码"
                                    rules="required"
                                >
                                    <v-text-field
                                        v-model="newPassword"
                                        clearable
                                        label="新密码"
                                        :error-messages="errors"
                                        placeholder="请输入密码"
                                        type="password"
                                        required
                                        :disabled="disabled"
                                    ></v-text-field>
                                </validation-provider>
                                <validation-provider
                                    vid="confirmPassword"
                                    v-slot="{ errors }"
                                    name="确认密码"
                                    rules="confirmed:newPassword"
                                >
                                    <v-text-field
                                        v-model="confirmPassword"
                                        clearable
                                        label="确认密码"
                                        :error-messages="errors"
                                        placeholder="请再次确认密码"
                                        type="password"
                                        required
                                        :disabled="disabled"
                                    ></v-text-field>
                                </validation-provider>
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-card-actions>
                                <v-btn color="error" :disabled="disabled" @click="dialog = false"> 关闭 </v-btn>
                                <v-btn color="primary" :disabled="disabled" @click="changePassword()"> 保存 </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-form>
                </validation-observer>
            </v-dialog>
        </v-row>
    </div>
</template>

<script lang="ts">
import { Component, Watch } from 'vue-property-decorator';
import { Inject } from 'typescript-ioc';
import { ValidationObserver } from 'vee-validate';
import { HContainer, HActionButton, HTableItemChip, HTableItemStatus } from '@/components';
import { SysUser, SysUserService } from '@/modules';
import { BaseIndex, BaseService } from '@/lib/declarations';
import { _aes } from '@/lib/utils';

@Component({
    components: {
        HContainer,
        HActionButton,
        HTableItemChip,
        HTableItemStatus,
    },
})
export default class Index extends BaseIndex<SysUser> {
    private pageNumber = 1;
    // 以下为 Table相关内容
    private tableTitle = '平台用户信息';
    private columnSlots = ['actions', 'status', 'reserved'];
    private tableHeaders = [
        { text: '用户名', align: 'center', value: 'userName' },
        { text: '昵称', align: 'center', value: 'nickName' },
        { text: '备注', align: 'center', value: 'description' },
        { text: '保留数据', align: 'center', value: 'reserved' },
        { text: '状态', align: 'center', value: 'status' },
        { text: '操作', align: 'center', value: 'actions', sortable: false },
    ];

    @Inject
    private sysUserService!: SysUserService;

    private dialog = false;
    private disabled = false;
    private newPassword = '';
    private confirmPassword = '';
    private currentUser: SysUser;

    @Watch('pageNumber')
    protected onPageNumberChanged(newValue: number): void {
        this.findItemsByPage(newValue);
    }

    private pagination(e) {
        this.pageNumber = e as number;
    }

    protected mounted(): void {
        super.mounted();
    }

    public getBaseService(): BaseService<SysUser> {
        return this.sysUserService;
    }

    public getItemKey(): string {
        return 'userId';
    }

    public getDomainName(): string {
        return 'SysUser';
    }

    private setCurrentUser(item: SysUser): void {
        this.currentUser = item;
        this.newPassword = '';
        this.confirmPassword = '';
        this.disabled = false;
        this.dialog = true;
    }

    private async submit(): Promise<void> {
        this.disabled = true;
        const userId = await _aes.encrypt(this.currentUser.userId);
        const password = await _aes.encrypt(this.newPassword);
        this.sysUserService.changePassword({ userId, password }).then(() => {
            this.dialog = false;
            this.$notify.success('修改成功！');
        });
    }

    private changePassword(): void {
        (this.$refs.observer as InstanceType<typeof ValidationObserver>).validate().then((validateResulte) => {
            if (validateResulte) {
                this.submit();
            }
        });
    }
}
</script>
