<template>
    <h-content-panel :title="title" :overlay="overlay">
        <h-container type="left-right">
            <v-card>
                <h-table
                    v-model="assignedItems"
                    :table-headers="tableHeaders"
                    :table-items="tableItems"
                    :table-title="tableTitle"
                    :page-size="pageSize"
                    :group-by="groupBy"
                    :sort-by="sortBy"
                    :column-slots="columnSlots"
                    :item-key="getCompareKey()"
                    show-select
                    @item-selected="selectItem($event)"
                    @toggle-select-all="selectAllItems($event)"
                >
                    <template v-slot:[`item.requestMethod`]="{ item }">
                        <h-swagger-item
                            :method="item.requestMethod"
                            :url="item.url"
                            :description="item.authorityName"
                        ></h-swagger-item>
                    </template>
                </h-table>
            </v-card>

            <template v-slot:other>
                <h-authorize-list
                    v-model="assignedItems"
                    avatar
                    :header="listHeader"
                    :itemKey="getCompareKey()"
                    prepend-title="requestMethod"
                    prepend-subtitle="serviceId"
                    append-title="url"
                    append-subtitle="authorityName"
                    avatar-key="requestMethod"
                    @save="save()"
                ></h-authorize-list>
            </template>
        </h-container>
    </h-content-panel>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { Inject } from 'typescript-ioc';
import { HContentPanel, HContainer, HAuthorizeList, HSwaggerItem } from '@/components';
import { SysAuthority, OauthScopes, SysAuthorityService, OauthScopesService } from '@/modules';
import { BaseAuthorize, BaseService } from '@/lib/declarations';

@Component({
    components: {
        HContainer,
        HContentPanel,
        HAuthorizeList,
        HSwaggerItem,
    },
})
export default class Authorize extends BaseAuthorize<OauthScopes, SysAuthority> {
    private title = '分配应用范围';
    private tableTitle = '服务接口列表';
    private listHeader = '已配置的权限';
    private tableHeaders = [
        {
            text: '接口详情',
            align: 'start',
            value: 'requestMethod',
        },
        { text: '微服务ID', value: 'serviceId', align: 'center' },
    ];
    private columnSlots = ['requestMethod'];
    private groupBy = ['serviceId'];
    private sortBy = ['url'];
    protected pageSize = 100;

    @Inject
    private sysAuthorityService!: SysAuthorityService;

    @Inject
    private oauthScopesService!: OauthScopesService;

    public getBaseService(): BaseService<OauthScopes> {
        return this.oauthScopesService;
    }

    public getResourceService(): BaseService<SysAuthority> {
        return this.sysAuthorityService;
    }

    public getCompareKey(): string {
        return 'authorityId';
    }

    private created(): void {
        this.fetchParams('authorities');
    }

    private mounted(): void {
        this.findAuthorityApis();
    }

    private findAuthorityApis() {
        this.tableLoading = true;
        this.sysAuthorityService
            .fetchAuthorityApis()
            .then((result) => {
                this.tableLoading = false;
                this.tableItems = result.data;
            })
            .catch(() => {
                this.tableLoading = false;
            });
    }

    private save(): void {
        if (!this.$lib.lodash.isEmpty(this.assignedItems)) {
            this.overlay = true;
            let scopeId = this.currentEntity.scopeId;
            let authorities = this.assignedItems.map((item) => item[this.getCompareKey()]);
            this.getBaseService()
                .assign({ scopeId: scopeId, authorities: authorities })
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
