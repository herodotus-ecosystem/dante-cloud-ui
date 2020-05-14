<template>
    <h-table-item-editor :api-object="apiObject" column spacer>
        <template v-slot:primary="{ editedItem }">
            <ValidationProvider v-slot="{ errors }" name="人员姓名" rules="required">
                <v-text-field outlined clearable label="人员姓名 * " placeholder="人员姓名" v-model="editedItem.employeeName" :error-messages="errors" required></v-text-field>
            </ValidationProvider>
            <v-text-field outlined clearable label="人员编号" placeholder="请输入人员编号" v-model="editedItem.employeeNo"></v-text-field>
            <v-text-field outlined clearable label="性别" placeholder="性别" v-model="editedItem.gender"></v-text-field>
            <v-text-field outlined clearable label="身份" placeholder="身份" v-model="editedItem.identity"></v-text-field>
            <v-text-field outlined clearable label="电子邮件" placeholder="请输入电子邮件" v-model="editedItem.email"></v-text-field>
            <v-text-field outlined clearable label="PKI电子邮件" placeholder="请输入PKI电子邮件" v-model="editedItem.pkiEmail"></v-text-field>
            <v-text-field outlined clearable label="手机号码" placeholder="请输入手机号码" v-model="editedItem.mobilePhoneNumber"></v-text-field>
            <v-text-field outlined clearable label="办公电话" placeholder="请输入办公电话" v-model="editedItem.officePhoneNumber"></v-text-field>
        </template>
        <template v-slot:other="{ editedItem }">
            <v-text-field outlined clearable :disabled="true" label="4A标准人员ID" placeholder="4A标准人员ID" v-model="editedItem.a4BizEmpId"></v-text-field>
            <v-text-field outlined clearable label="所属单位" placeholder="所属单位" v-model="editedItem.bizOrgId"></v-text-field>
            <v-text-field outlined clearable label="所属部门" placeholder="所属部门" v-model="editedItem.bizOrgCode"></v-text-field>
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
        apiObject: "sysEmployee"
    }),
}
</script>
