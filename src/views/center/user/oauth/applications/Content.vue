<template>
    <h-table-item-editor :api-object="apiObject" column spacer>
        <template v-slot:primary="{ editedItem }">
            <ValidationProvider v-slot="{ errors }" name="应用名称" rules="required">
                <v-text-field outlined clearable label="应用名称 * " placeholder="请输入应用名称" v-model="editedItem.appName" :error-messages="errors" required></v-text-field>
            </ValidationProvider>
            <v-text-field outlined clearable label="应用名称英文(可选)" placeholder="请输入英文应用名称" v-model="editedItem.appNameEn"></v-text-field>
            <v-text-field outlined clearable label="应用图标(可选)" placeholder="请输入应用图标" v-model="editedItem.appIcon"></v-text-field>
            <v-text-field outlined clearable label="应用地址" placeholder="请输入应用地址" v-model="editedItem.website"></v-text-field>
            <h-dictionary-select v-model="editedItem.applicationType" dictionary="applicationType" label="应用类型"></h-dictionary-select>
            <h-dictionary-select v-model="editedItem.technologyType" dictionary="technologyType" label="技术类型"></h-dictionary-select>
        </template>
        <template v-slot:other="{ editedItem }">
            <v-text-field outlined clearable :disabled="true" label="APP_KEY" placeholder="应用APP_KEY" v-model="editedItem.appKey"></v-text-field>
            <v-text-field outlined clearable :disabled="true" label="APP_SECRET" placeholder="应用APP_SECRET" v-model="editedItem.appSecret"></v-text-field>
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
        apiObject: "oauthApplications"
    })
}
</script>
