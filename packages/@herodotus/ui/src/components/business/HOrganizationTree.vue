<template>
    <v-card>
        <v-toolbar color="primary" dark flat dense>
            <v-toolbar-title>单位</v-toolbar-title>
        </v-toolbar>
        <v-sheet class="pa-2 primary">
            <h-dictionary-select
                v-model="category"
                dictionary="organizationCategory"
                label="组织类别"
                dark
                flat
                solo-inverted
                hide-details
                dense
            ></h-dictionary-select>
        </v-sheet>
        <v-card-text>
            <v-treeview :active.sync="active" :items="organizations" selection-type="independent" hoverable activatable>
            </v-treeview>
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Inject } from 'typescript-ioc';
import { SysOrganization, SysOrganizationService } from '@/modules';
import HDictionarySelect from './HDictionarySelect.vue';

@Component({
    components: {
        HDictionarySelect,
    },
})
export default class HOrganizationTree extends Vue {
    @Inject
    private sysOrganizationService!: SysOrganizationService;

    private organizations: SysOrganization[] = [];
    private active = [];
    private category = '';

    @Watch('active', { immediate: true })
    onActiveChanged(newValue: string): void {
        if (newValue && newValue.length > 0) {
            this.$emit('input', newValue[0]);
        }
    }

    @Watch('category')
    onCategoryChanged(newValue: string): void {
        this.loadData(newValue);
    }

    public mounted(): void {
        this.loadData(this.category);
    }

    private loadData(category): void {
        this.sysOrganizationService.fetchTree({ category: category }).then((result) => {
            if (!this.$lib.lodash.isEmpty(result.data)) {
                this.organizations = result.data;
            }
        });
    }
}
</script>
