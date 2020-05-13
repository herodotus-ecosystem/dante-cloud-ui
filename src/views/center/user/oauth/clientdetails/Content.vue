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
                                <ValidationProvider v-slot="{ errors }" name="授权模式" rules="required">
                                    <v-select outlined clearable label="授权模式 * " small-chips multiple placeholder="请选择授权模式，可以多个" v-model="editedItem.authorized_grant_types" :items="upmsConstants.grantType" :error-messages="errors" required></v-select>
                                </ValidationProvider>
                                <v-text-field outlined clearable label="资源IDs(选填)" placeholder="请输入资源ID，多个以逗号分隔" v-model="editedItem.resource_ids"></v-text-field>
                                <v-text-field outlined clearable label="重定向地址" placeholder="请输入重定向地址，多个以逗号进行分隔" v-model="editedItem.redirect_uri"></v-text-field>
                                <v-text-field outlined clearable label="Token有效时间" placeholder="Token有效时间，单位秒" v-model="editedItem.access_token_validity" min="1800" step="1800" type="number"></v-text-field>
                                <v-text-field outlined clearable label="Token刷新时间" placeholder="Token刷新时间，单位秒" v-model="editedItem.refresh_token_validity" min="1800" step="1800" type="number"></v-text-field>
                                <v-divider class="mb-5"></v-divider>

                                <v-btn color="primary" class="mr-4" @click="save()">保存</v-btn>
                                <h-detail-cancel-button></h-detail-cancel-button>
                            </v-col>
                            <v-spacer class="flex-grow-0">
                                <v-divider vertical></v-divider>
                            </v-spacer>
                            <v-col class="pl-10 pr-10">
                                <v-text-field outlined clearable :disabled="true" label="APP_KEY" placeholder="应用APP_KEY" v-model="editedItem.client_id"></v-text-field>
                                <v-text-field outlined clearable :disabled="true" label="APP_SECRET" placeholder="应用APP_SECRET" v-model="editedItem.additional_information.appSecret"></v-text-field>
                                <v-text-field outlined clearable :disabled="true" label="应用名称" placeholder="该应用为" v-model="editedItem.additional_information.appName"></v-text-field>
                            </v-col>
                        </v-row>
                    </form>
                </ValidationObserver>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import HDetailCancelButton from '@/components/widgets/HDetailCancelButton.vue';
export default {
    components: {
        HDetailCancelButton
    },

    data: () => ({
        overlay: false,
        upmsConstants: {},
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
            });

        },

        save () {
            this.$refs.observer.validate().then(validateResulte => {
                if (validateResulte) {
                    this.overlay = true;
                    this.$api.upms.oauthClientDetails.saveOrUpdate(this.editedItem).then(result => {
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
