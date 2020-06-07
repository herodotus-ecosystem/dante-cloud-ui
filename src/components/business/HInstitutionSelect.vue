<template>
    <div v-if="cascade">
        <v-container v-if="horizontal">
            <v-row align="center" :dense="dense">
                <v-col class="d-flex" cols="12" sm="6">
                    <v-select outlined small-chips :dense="dense" clearable :hide-details="dense" :value="value.organizationId" :class="selectClass" label="所属单位" placeholder="请选择所属单位" :items="organizations" item-text="organizationName" item-value="organizationId" :errorMessages="errorMessages" @change="fetchDepartment($event)"></v-select>
                </v-col>
                <v-col class="d-flex" cols="12" sm="6">
                    <v-select outlined small-chips :dense="dense" clearable :hide-details="dense" :value="value.departmentId" :class="selectClass" label="所属单位" placeholder="请选择所属单位" :items="departments" item-text="departmentName" item-value="departmentId" :errorMessages="errorMessages" @change="change($event)"></v-select>
                </v-col>
            </v-row>
        </v-container>
        <div v-else>
            <v-select outlined small-chips :dense="dense" clearable :value="value.organizationId" :class="selectClass" label="所属单位" placeholder="请选择所属单位" :items="organizations" item-text="organizationName" item-value="organizationId" :errorMessages="errorMessages" @change="fetchDepartment($event)"></v-select>
            <v-select outlined small-chips :dense="dense" clearable :value="value.departmentId" :class="selectClass" label="所属部门" placeholder="请选择所属部门" :items="departments" item-text="departmentName" item-value="departmentId" :errorMessages="errorMessages" @change="change($event)"></v-select>
        </div>
    </div>
    <v-select v-else outlined small-chips :dense="dense" clearable :value="value.organizationId" :class="selectClass" label="所属单位" placeholder="请选择所属单位" :items="organizations" item-text="organizationName" item-value="organizationId" :errorMessages="errorMessages" @change="change($event)"></v-select>
</template>

<script>
export default {
    name: 'HInstitutionSelect',

    props: {
        /**
         * v-model绑定值
         */
        value: {
            type: [String, Object],
            default: function () {
                return { organizationId: '', departmentId: '' }
            }
        },
        /**
         * 错误信息
         */
        errorMessages: [String, Array],
        /**
         * 是否级联显示部门
         */
        cascade: {
            type: Boolean,
            default: false
        },

        horizontal: {
            type: Boolean,
            default: false
        },

        /**
         * 窄模式
         */
        dense: {
            type: Boolean,
            default: false
        },

        selectClass: String
    },

    model: {
        prop: 'value',
        event: 'change'
    },

    data: () => ({
        organizations: [],
        departments: [],
        selected: {
            organizationId: '',
            departmentId: ''
        }
    }),

    mounted () {
        this.initialize();
    },

    methods: {
        initialize () {
            this.selected.organizationId = this.value.organizationId;
            this.selected.departmentId = this.value.departmentId;
            this.$api.upms.sysOrganization.fetchAll().then((organizations) => {
                if (organizations && Array.isArray(organizations)) {
                    this.organizations = organizations;
                    if (this.value.organizationId) {
                        this.fetchDepartment(this.value.organizationId);
                    }
                }

            });
        },

        fetchDepartment (organizationId) {
            if (organizationId) {
                this.selected.organizationId = organizationId;
                this.$api.upms.sysDepartment.fetchAll(organizationId).then((result) => {
                    this.departments = result
                });
            }
        },

        change ($event) {
            if (this.cascade) {
                this.selected.departmentId = $event;
            } else {
                this.selected.organizationId = $event;
            }
            this.$emit("change", this.selected);
        }
    }
}
</script>
