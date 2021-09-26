<template>
    <h-content-panel :title="title">
        <h-container type="left-right">
            <v-card>
                <h-table
                    v-model="assignedItems"
                    :table-headers="tableHeaders"
                    :table-items="tableItems"
                    :page-size="pageSize"
                    :item-key="getCompareKey()"
                    table-title="服务接口列表"
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
                    prepend-title="scopeCode"
                    prepend-subtitle="scopeId"
                    append-title="scopeName"
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
import { OauthApplications, OauthScopes, OauthApplicationsService, OauthScopesService } from '@/modules';
import { BaseAuthorize, BaseService } from '@/lib/declarations';

@Component({
    components: {
        HContainer,
        HContentPanel,
        HAuthorizeList,
    },
})
export default class Authorize extends BaseAuthorize<OauthApplications, OauthScopes> {
    private title = '分配应用范围';
    private listHeader = '已配置的权限';
    private tableHeaders = [
        { text: '范围代码', align: 'center', value: 'scopeCode' },
        { text: '范围名称', align: 'center', value: 'scopeName' },
        { text: '说明', align: 'center', value: 'description' },
    ];

    @Inject
    private oauthApplicationsService!: OauthApplicationsService;

    @Inject
    private oauthScopesService!: OauthScopesService;

    public getBaseService(): BaseService<OauthApplications> {
        return this.oauthApplicationsService;
    }

    public getResourceService(): BaseService<OauthScopes> {
        return this.oauthScopesService;
    }

    public getCompareKey(): string {
        return 'scopeId';
    }

    private created(): void {
        this.fetchParams('scopes');
    }

    private mounted(): void {
        this.findResourcesByPage();
    }

    private save(): void {
        if (!this.$lib.lodash.isEmpty(this.assignedItems)) {
            this.overlay = true;
            let appKey = this.currentEntity.appKey;
            let scopes = this.assignedItems.map((item) => item[this.getCompareKey()]);
            this.getBaseService()
                .assign({ appKey: appKey, scopes: scopes })
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
