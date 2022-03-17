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
    title = '分配应用范围';
    tableTitle = '服务接口列表';
    listHeader = '已配置的权限';
    tableHeaders = [
        {
            text: '接口详情',
            align: 'start',
            value: 'requestMethod',
        },
        { text: '微服务ID', value: 'serviceId', align: 'center' },
    ];
    columnSlots = ['requestMethod'];
    groupBy = ['serviceId'];
    sortBy = ['url'];
    pageSize = 100;

    @Inject
    sysAuthorityService!: SysAuthorityService;

    @Inject
    oauthScopesService!: OauthScopesService;

    getBaseService(): BaseService<OauthScopes> {
        return this.oauthScopesService;
    }

    getResourceService(): BaseService<SysAuthority> {
        return this.sysAuthorityService;
    }

    getCompareKey(): string {
        return 'authorityId';
    }

    created(): void {
        this.fetchParams('authorities');
    }
    mounted(): void {
        this.findAuthorityApis();
    }

    findAuthorityApis() {
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

    save(): void {
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
