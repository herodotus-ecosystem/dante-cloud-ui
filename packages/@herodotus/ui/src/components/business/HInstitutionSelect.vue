<template>
    <div v-if="cascade">
        <v-container v-if="horizontal">
            <v-row align="center" :dense="dense">
                <v-col class="d-flex" cols="12" sm="6">
                    <h-organization-select
                        v-model="selectedValue.organizationId"
                        :dense="dense"
                        :class="selectClass"
                    ></h-organization-select>
                </v-col>
                <v-col class="d-flex" cols="12" sm="6">
                    <h-department-select
                        v-model="selectedValue.departmentId"
                        :organizationId="selectedValue.organizationId"
                        :dense="dense"
                        :class="selectClass"
                    ></h-department-select>
                </v-col>
            </v-row>
        </v-container>
        <div v-else>
            <h-organization-select
                v-model="selectedValue.organizationId"
                :dense="dense"
                :class="selectClass"
            ></h-organization-select>
            <h-department-select
                v-model="selectedValue.departmentId"
                :organizationId="selectedValue.organizationId"
                :dense="dense"
                :class="selectClass"
            ></h-department-select>
        </div>
    </div>
    <h-organization-select
        v-else
        v-model="selectedValue.organizationId"
        :dense="dense"
        :class="selectClass"
    ></h-organization-select>
</template>

<script lang="ts">
import { Component, ModelSync, Prop, Vue } from 'vue-property-decorator';
import HOrganizationSelect from './HOrganizationSelect.vue';
import HDepartmentSelect from './HDepartmentSelect.vue';

@Component({
    components: {
        HOrganizationSelect,
        HDepartmentSelect,
    },
})
export default class HInstitutionSelect extends Vue {
    @Prop({ type: Boolean, default: false }) readonly cascade?: boolean;
    @Prop({ type: Boolean, default: false }) readonly horizontal?: boolean;
    @Prop({ type: Boolean, default: false }) readonly dense?: boolean;
    @Prop(String) readonly selectClass!: string;

    @ModelSync('value', 'change', {
        type: [String, Object],
        default: () => {
            return {
                organizationId: '',
                departmentId: '',
            };
        },
    })
    readonly selectedValue!: Dictionary<string>;
}
</script>
