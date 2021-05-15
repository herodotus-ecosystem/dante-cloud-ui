<template>
    <h-table-item-editor :api-object="apiObject" column spacer>
        <template v-slot:primary="{ editedItem }">
            <ValidationProvider v-slot="{ errors }" name="部门名称" rules="required">
                <v-text-field outlined clearable label="部门名称 * " placeholder="请输入部门名称" v-model="editedItem.departmentName" :error-messages="errors" required></v-text-field>
            </ValidationProvider>
            <v-text-field outlined clearable label="部门分区码" placeholder="请输入部门分区码名称" v-model="editedItem.partitionCode"></v-text-field>
            <v-text-field outlined clearable label="部门简称" placeholder="请输入部门简称" v-model="editedItem.shortName"></v-text-field>
            <h-institution-select v-model="editedItem.organizationId"></h-institution-select>
        </template>
        <template v-slot:other="{ editedItem }">
            <v-text-field outlined clearable :disabled="true" label="4A标准单位ID" placeholder="4A标准单位ID" v-model="editedItem.a4BizDeptId"></v-text-field>
            <v-text-field outlined clearable :disabled="true" label="标准单位ID" placeholder="标准单位ID" v-model="editedItem.bizDeptId"></v-text-field>
            <v-text-field outlined clearable :disabled="true" label="标准单位代码" placeholder="标准单位代码" v-model="editedItem.bizDeptCode"></v-text-field>
            <v-text-field outlined clearable :disabled="true" label="标准单位名称" placeholder="标准单位名称" v-model="editedItem.bizDeptName"></v-text-field>
            <v-text-field outlined clearable :disabled="true" label="标准单位类型" placeholder="标准单位类型" v-model="editedItem.bizDeptType"></v-text-field>
        </template>
    </h-table-item-editor>
</template>

<script>
import HTableItemEditor from '@/components/business/HTableItemEditor.vue';
import HInstitutionSelect from '@/components/business/HInstitutionSelect.vue';
export default {
    components: {
        HTableItemEditor,
        HInstitutionSelect
    },

    data: () => ({
        apiObject: "sysDepartment"
    })
}
</script>
