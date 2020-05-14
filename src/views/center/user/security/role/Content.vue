<template>
    <h-table-item-editor :api-object="apiObject" column>
        <template v-slot:primary="{ editedItem }">
            <ValidationProvider v-slot="{ errors }" name="角色代码" rules="required">
                <v-text-field outlined clearable label="角色代码 * " placeholder="请输入ROLE_开头的角色代码" v-model="editedItem.roleCode" :error-messages="errors" required></v-text-field>
            </ValidationProvider>
            <v-text-field outlined clearable label="角色名称" placeholder="请输入角色名称" v-model="editedItem.roleName"></v-text-field>
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
        apiObject: "sysRole"
    })
}
</script>
