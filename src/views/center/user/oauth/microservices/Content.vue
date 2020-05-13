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
                                <ValidationProvider v-slot="{ errors }" name="服务名称" rules="required">
                                    <v-text-field outlined clearable label="服务名称 * " placeholder="请输入服务名称" v-model="editedItem.appName" :error-messages="errors" required></v-text-field>
                                </ValidationProvider>
                                <ValidationProvider v-slot="{ errors }" name="服务代码" rules="required">
                                    <v-text-field outlined clearable label="服务代码 * " placeholder="请输入服务代码" v-model="editedItem.appCode" :error-messages="errors" required></v-text-field>
                                </ValidationProvider>
                                <v-select outlined v-model="editedItem.supplier.supplierId" :items="suppliers" item-text="supplierName" item-value="supplierId" label="开发团队/厂商"></v-select>
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
                                <v-text-field outlined clearable :disabled="true" label="服务ID" placeholder="服务ID" v-model="editedItem.serviceId"></v-text-field>
                                <v-text-field outlined clearable :disabled="true" label="APP_SECRET" placeholder="服务APP_SECRET" v-model="editedItem.appSecret"></v-text-field>
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
        suppliers: [],
        editedItem: {},
    }),

    created () {
        this.editedItem = this.$route.params;
    },

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

        save () {
            this.$refs.observer.validate().then(validateResulte => {
                if (validateResulte) {
                    this.overlay = true;
                    this.$api.upms.oauthMicroservices.saveOrUpdate(this.editedItem).then(result => {
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
