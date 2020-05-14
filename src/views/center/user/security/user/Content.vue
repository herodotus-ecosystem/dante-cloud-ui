<template>
    <h-table-item-editor :api-object="apiObject" column>
        <template v-slot:primary="{ editedItem }">
            <ValidationProvider v-slot="{ errors }" name="用户名" rules="required">
                <v-text-field outlined clearable label="用户名 * " placeholder="请输入用户名" v-model="editedItem.userName" :error-messages="errors" required></v-text-field>
            </ValidationProvider>
            <v-text-field outlined clearable label="昵称" placeholder="请输入用户昵称" v-model="editedItem.nickName"></v-text-field>
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
        apiObject: "sysUser"
    })
}
</script>
