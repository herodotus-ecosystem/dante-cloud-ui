<template>
    <h-table-item-editor :api-object="apiObject" column>
        <template v-slot:primary="{ editedItem }">
            <ValidationProvider v-slot="{ errors }" name="权限名称" rules="required">
                <v-text-field outlined clearable label="权限名称 * " placeholder="请输权限名称" v-model="editedItem.authorityName" :error-messages="errors" required></v-text-field>
            </ValidationProvider>
            <v-text-field outlined clearable label="权限代码" placeholder="请输入权限代码" v-model="editedItem.authorityCode"></v-text-field>
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
        apiObject: "sysAuthority"
    })
}
</script>
