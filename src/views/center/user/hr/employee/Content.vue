<template>
    <h-table-item-editor ref="editor" :api-object="apiObject" column spacer>
        <template v-slot:primary="{ editedItem }">
            <ValidationProvider
                v-slot="{ errors }"
                name="人员姓名"
                rules="required"
            >
                <v-text-field
                    outlined
                    clearable
                    label="人员姓名 * "
                    placeholder="人员姓名"
                    v-model="editedItem.employeeName"
                    :error-messages="errors"
                    required
                ></v-text-field>
            </ValidationProvider>
            <v-text-field
                outlined
                clearable
                label="人员编号"
                placeholder="请输入人员编号"
                v-model="editedItem.employeeNo"
            ></v-text-field>
            <v-text-field
                outlined
                clearable
                label="性别"
                placeholder="性别"
                v-model="editedItem.gender"
            ></v-text-field>
            <v-text-field
                outlined
                clearable
                label="身份"
                placeholder="身份"
                v-model="editedItem.identity"
            ></v-text-field>
            <v-text-field
                outlined
                clearable
                label="电子邮件"
                placeholder="请输入电子邮件"
                v-model="editedItem.email"
            ></v-text-field>
            <v-text-field
                outlined
                clearable
                label="PKI电子邮件"
                placeholder="请输入PKI电子邮件"
                v-model="editedItem.pkiEmail"
            ></v-text-field>
            <v-text-field
                outlined
                clearable
                label="手机号码"
                placeholder="请输入手机号码"
                v-model="editedItem.mobilePhoneNumber"
            ></v-text-field>
            <v-text-field
                outlined
                clearable
                label="办公电话"
                placeholder="请输入办公电话"
                v-model="editedItem.officePhoneNumber"
            ></v-text-field>
        </template>
        <template v-slot:other="{ editedItem }">
            <v-text-field
                outlined
                clearable
                :disabled="true"
                label="4A标准人员ID"
                placeholder="4A标准人员ID"
                v-model="editedItem.a4BizEmpId"
            ></v-text-field>
            <h-institution-select
                v-model="institution"
                cascade
                @change="change(editedItem)"
            ></h-institution-select>
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
        apiObject: "sysEmployee",
        institution: {
            organizationId: '',
            departmentId: ''
        },
    }),

    mounted () {
        this.institution.organizationId = this.$refs.editor.editedItem.organization.organizationId;
        this.institution.departmentId = this.$refs.editor.editedItem.department.departmentId;
    },

    methods: {
        change (item) {
            item.organization.organizationId = this.institution.organizationId;
            item.department.departmentId = this.institution.departmentId;
        }
    }
}
</script>
