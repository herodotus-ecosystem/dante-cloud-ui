<template>
    <h-table-item-editor :api-object="apiObject" column spacer>
        <template v-slot:primary="{ editedItem }">
            <ValidationProvider v-slot="{ errors }" name="服务名称" rules="required">
                <v-text-field outlined clearable label="服务名称 * " placeholder="请输入服务名称" v-model="editedItem.appName" :error-messages="errors" required></v-text-field>
            </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" name="服务代码" rules="required">
                <v-text-field outlined clearable label="服务代码 * " placeholder="请输入服务代码" v-model="editedItem.appCode" :error-messages="errors" required></v-text-field>
            </ValidationProvider>
            <v-select outlined small-chips v-model="editedItem.supplier.supplierId" :items="suppliers" item-text="supplierName" item-value="supplierId" label="开发团队/厂商"></v-select>
        </template>
        <template v-slot:other="{ editedItem }">
            <v-text-field outlined clearable :disabled="true" label="服务ID" placeholder="服务ID" v-model="editedItem.serviceId"></v-text-field>
            <v-text-field outlined clearable :disabled="true" label="APP_SECRET" placeholder="服务APP_SECRET" v-model="editedItem.appSecret"></v-text-field>
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
        apiObject: "oauthMicroservices",
        suppliers: []
    }),

    mounted () {
        this.findAllSupplier();
    },

    methods: {
        findAllSupplier () {
            this.$api.upms.supplier
                .fetchAll()
                .then(result => {
                    this.suppliers = result;
                }).catch(() => {

                });
        },
    }
}
</script>
