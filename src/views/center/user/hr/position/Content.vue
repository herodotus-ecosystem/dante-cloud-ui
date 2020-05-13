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
                                <ValidationProvider v-slot="{ errors }" name="应用名称" rules="required">
                                    <v-text-field outlined clearable label="应用名称 * " placeholder="请输入应用名称" v-model="editedItem.appName" :error-messages="errors" required></v-text-field>
                                </ValidationProvider>
                                <v-text-field outlined clearable label="应用名称英文(可选)" placeholder="请输入英文应用名称" v-model="editedItem.appNameEn"></v-text-field>
                                <v-text-field outlined clearable label="应用图标(可选)" placeholder="请输入应用图标" v-model="editedItem.appIcon"></v-text-field>
                                <v-text-field outlined clearable label="应用地址" placeholder="请输入应用地址" v-model="editedItem.website"></v-text-field>
                                <v-select outlined v-model="editedItem.applicationType" :items="upmsConstants.applicationType" label="应用类型"></v-select>
                                <v-select outlined v-model="editedItem.technologyType" :items="upmsConstants.technologyType" label="技术类型"></v-select>
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
                                <v-text-field outlined clearable :disabled="true" label="APP_KEY" placeholder="应用APP_KEY" v-model="editedItem.appKey"></v-text-field>
                                <v-text-field outlined clearable :disabled="true" label="APP_SECRET" placeholder="应用APP_SECRET" v-model="editedItem.appSecret"></v-text-field>
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
        upmsConstants: {},
        statusDisplay: [],
        editedItem: {},
    }),

    created () {
        this.editedItem = this.$route.params;
    },

    mounted () {
        this.initialize();
    },

    methods: {
        initialize () {
            this.$storage.getItem('constants').then((constants) => {
                this.upmsConstants = JSON.parse(constants);
                this.statusDisplay = this.$utils.constants.statusDisplay;
            });

        },

        save () {
            this.$refs.observer.validate().then(validateResulte => {
                if (validateResulte) {
                    this.overlay = true;
                    this.$api.upms.sysPosition.saveOrUpdate(this.editedItem).then(result => {
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
