<template>
    <h-table-item-editor :api-object="apiObject">
        <template v-slot:primary="{ editedItem }">
            <ValidationProvider v-slot="{ errors }" name="授权范围代码" rules="required">
                <v-text-field outlined clearable label="授权范围代码 * " placeholder="请使用小写英文单词编写的授权范围代码，例如：all、read_user等" v-model="editedItem.scopeCode" :error-messages="errors" required></v-text-field>
            </ValidationProvider>
            <v-text-field outlined clearable label="授权范围名称" placeholder="请输入授权范围名称" v-model="editedItem.scopeName"></v-text-field>
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
        apiObject: "oauthScopes"
    })
}
</script>
