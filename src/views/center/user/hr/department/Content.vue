<template>
    <v-container grid-list-xl fluid>
        <v-row>
            <v-col>
                <v-overlay :value="overlay">
                    <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
                </v-overlay>
                <ValidationObserver ref="observer">
                    <form>
                        <v-row>
                            <v-col class="pl-10 pr-10">
                                <ValidationProvider v-slot="{ errors }" name="单位名称" rules="required">
                                    <v-text-field outlined clearable label="单位名称 * " placeholder="请输入单位名称" v-model="editedItem.organizationName" :error-messages="errors" required></v-text-field>
                                </ValidationProvider>
                                <v-text-field outlined clearable label="单位分区码" placeholder="请输入单位分区码名称" v-model="editedItem.partitionCode"></v-text-field>
                                <v-text-field outlined clearable label="单位简称" placeholder="请输入单位简称" v-model="editedItem.shortName"></v-text-field>
                                <v-text-field outlined clearable label="排序值" placeholder="请输入排序值" v-model="editedItem.ranking" min="1" max="10000" step="1" type="number"></v-text-field>
                                <h-select-status v-model="editedItem.status"></h-select-status>
                                <v-divider></v-divider>
                                <v-switch v-model="editedItem.reserved" label="是否是保留数据" color="primary"></v-switch>

                                <v-btn color="primary" class="mr-4" @click="save()">保存</v-btn>
                                <h-detail-cancel-button></h-detail-cancel-button>
                            </v-col>
                            <v-spacer class="flex-grow-0">
                                <v-divider vertical></v-divider>
                            </v-spacer>
                            <v-col class="pl-10 pr-10">
                                <v-text-field outlined clearable :disabled="true" label="4A标准单位ID" placeholder="4A标准单位ID" v-model="editedItem.a4BizOrgId"></v-text-field>
                                <v-text-field outlined clearable :disabled="true" label="标准单位ID" placeholder="标准单位ID" v-model="editedItem.bizOrgId"></v-text-field>
                                <v-text-field outlined clearable :disabled="true" label="标准单位代码" placeholder="标准单位代码" v-model="editedItem.bizOrgCode"></v-text-field>
                                <v-text-field outlined clearable :disabled="true" label="标准单位名称" placeholder="标准单位名称" v-model="editedItem.bizOrgName"></v-text-field>
                                <v-text-field outlined clearable :disabled="true" label="标准单位类型" placeholder="标准单位类型" v-model="editedItem.bizOrgType"></v-text-field>
                            </v-col>
                        </v-row>
                    </form>
                </ValidationObserver>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import HSelectStatus from '@/components/business/HSelectStatus.vue';
import HDetailCancelButton from '@/components/widgets/HDetailCancelButton.vue';
export default {
    components: {
        HSelectStatus,
        HDetailCancelButton
    },

    data: () => ({
        overlay: false,
        editedItem: {},
    }),

    created () {
        this.editedItem = this.$route.params;
    },

    methods: {
        save () {
            this.$refs.observer.validate().then(validateResulte => {
                if (validateResulte) {
                    this.overlay = true;
                    this.$api.upms.sysDepartment.saveOrUpdate(this.editedItem).then(result => {
                        this.overlay = false;
                        this.$utils.navigation.goBack(this.$route);
                    }).catch(() => {
                        this.overlay = false;
                    });
                }
            });
        },
    }
}
</script>
