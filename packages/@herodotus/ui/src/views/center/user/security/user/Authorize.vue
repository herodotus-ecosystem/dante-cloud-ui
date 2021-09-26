<template>
    <h-content-panel :title="title">
        <h-container type="left-right">
            <v-card>
                <h-table
                    v-model="assignedItems"
                    :table-headers="tableHeaders"
                    :table-items="tableItems"
                    :table-title="tableTitle"
                    :page-size="pageSize"
                    :item-key="getCompareKey()"
                    show-select
                    @item-selected="selectItem($event)"
                    @toggle-select-all="selectAllItems($event)"
                >
                </h-table>
            </v-card>
            <template v-slot:other>
                <h-authorize-list
                    v-model="assignedItems"
                    :header="listHeader"
                    :itemKey="getCompareKey()"
                    prepend-title="roleCode"
                    append-title="roleName"
                    @save="save()"
                ></h-authorize-list>
            </template>
        </h-container>
    </h-content-panel>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { Inject } from 'typescript-ioc';
import { HContentPanel, HContainer, HAuthorizeList } from '@/components';
import { SysRole, SysUser, SysUserService, SysRoleService } from '@/modules';
import { BaseAuthorize, BaseService } from '@/lib/declarations';

@Component({
    components: {
        HContainer,
        HContentPanel,
        HAuthorizeList,
    },
})
export default class Authorize extends BaseAuthorize<SysUser, SysRole> {
    private title = '分配用户角色';
    private tableTitle = '角色列表';
    private listHeader = '已配置的角色';
    private tableHeaders = [
        { text: '角色名称', align: 'center', value: 'roleName' },
        { text: '角色代码', align: 'center', value: 'roleCode' },
        { text: '备注', align: 'center', value: 'description' },
    ];

    @Inject
    private sysUserService!: SysUserService;

    @Inject
    private sysRoleService!: SysRoleService;

    public getBaseService(): BaseService<SysUser> {
        return this.sysUserService;
    }

    public getResourceService(): BaseService<SysRole> {
        return this.sysRoleService;
    }

    public getCompareKey(): string {
        return 'roleId';
    }

    private created(): void {
        this.fetchParams('roles');
    }

    private mounted(): void {
        this.findResourcesByPage();
    }

    private save() {
        if (!this.$lib.lodash.isEmpty(this.assignedItems)) {
            this.overlay = true;
            let userId = this.currentEntity.userId;
            let roles = this.assignedItems.map((item) => item[this.getCompareKey()]);
            this.getBaseService()
                .assign({ userId: userId, roles: roles })
                .then(() => {
                    this.overlay = false;
                    this.$navigation.goBack(this.$route);
                })
                .catch(() => {
                    this.overlay = false;
                });
        } else {
            this.$notify.warning('您尚未配置任何权限，请完成配置后再进行提交！');
        }
    }
}
</script>
