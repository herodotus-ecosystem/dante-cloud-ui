<template>
    <h-table-item-editor :api-object="apiObject" column spacer>
        <template v-slot:primary="{ editedItem }">
            <ValidationProvider v-slot="{ errors }" name="单位名称" rules="required">
                <v-text-field outlined clearable label="单位名称 * " placeholder="请输入单位名称" v-model="editedItem.organizationName" :error-messages="errors" required></v-text-field>
            </ValidationProvider>
            <v-text-field outlined clearable label="单位分区码" placeholder="请输入单位分区码名称" v-model="editedItem.partitionCode"></v-text-field>
            <v-text-field outlined clearable label="单位简称" placeholder="请输入单位简称" v-model="editedItem.shortName"></v-text-field>
        </template>
        <template v-slot:other="{ editedItem }">
            <v-text-field outlined clearable :disabled="true" label="4A标准单位ID" placeholder="4A标准单位ID" v-model="editedItem.a4BizOrgId"></v-text-field>
            <v-text-field outlined clearable :disabled="true" label="标准单位ID" placeholder="标准单位ID" v-model="editedItem.bizOrgId"></v-text-field>
            <v-text-field outlined clearable :disabled="true" label="标准单位代码" placeholder="标准单位代码" v-model="editedItem.bizOrgCode"></v-text-field>
            <v-text-field outlined clearable :disabled="true" label="标准单位名称" placeholder="标准单位名称" v-model="editedItem.bizOrgName"></v-text-field>
            <v-text-field outlined clearable :disabled="true" label="标准单位类型" placeholder="标准单位类型" v-model="editedItem.bizOrgType"></v-text-field>
        </template>
    </h-table-item-editor>
</template>

<script>
import HTableItemEditor from '@/components/business/HTableItemEditor.vue';
export default {
    components: {
        HTableItemEditor
    },

    data: () => ({
        apiObject: "sysPosition"
    }),
}
</script>
