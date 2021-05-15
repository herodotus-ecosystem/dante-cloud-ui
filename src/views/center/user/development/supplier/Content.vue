<template>
    <h-table-item-editor :api-object="apiObject" column>
        <template v-slot:primary="{ editedItem }">
            <ValidationProvider v-slot="{ errors }" name="团队名称" rules="required">
                <v-text-field outlined clearable label="团队名称 * " placeholder="请输入团队名称" v-model="editedItem.supplierName" :error-messages="errors" required></v-text-field>
            </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" name="团队代码" rules="required">
                <v-text-field outlined clearable label="团队代码 * " placeholder="请输入团队代码" v-model="editedItem.supplierCode" :error-messages="errors" required></v-text-field>
            </ValidationProvider>
            <h-dictionary-select v-model="editedItem.supplierType" dictionary="supplierType" label="团队/厂商类型"></h-dictionary-select>
        </template>
    </h-table-item-editor>
</template>

<script>
import HTableItemEditor from '@/components/business/HTableItemEditor.vue';
import HDictionarySelect from '@/components/business/HDictionarySelect.vue';
export default {
    components: {
        HTableItemEditor,
        HDictionarySelect
    },

    data: () => ({
        apiObject: "supplier"
    })
}
</script>
