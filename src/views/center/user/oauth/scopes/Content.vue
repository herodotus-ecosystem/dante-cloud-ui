<template>
    <v-container grid-list-xl fluid>
        <v-row>
            <v-col class="pl-5 pr-5">
                <v-overlay :value="overlay">
                    <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
                </v-overlay>
                <ValidationObserver ref="observer">
                    <form>
                        <ValidationProvider v-slot="{ errors }" name="授权范围代码" rules="required">
                            <v-text-field outlined clearable label="授权范围代码 * " placeholder="请使用小写英文单词编写的授权范围代码，例如：all、read_user等" v-model="editedItem.scopeCode" :error-messages="errors" required></v-text-field>
                        </ValidationProvider>
                        <v-text-field outlined clearable label="授权范围名称" placeholder="请输入授权范围名称" v-model="editedItem.scopeName"></v-text-field>
                        <v-text-field outlined clearable label="说明" placeholder="请输入该授权范围的说明" v-model="editedItem.description"></v-text-field>
                        <v-select outlined v-model="editedItem.status" :items="upmsConstants.status" label="数据状态"></v-select>
                        <v-divider></v-divider>
                        <v-switch v-model="editedItem.reserved" label="是否是保留数据" color="primary"></v-switch>

                        <v-btn color="primary" class="mr-4" @click="save()">保存</v-btn>
                        <v-btn color="error" @click="cancel()">取消</v-btn>
                    </form>
                </ValidationObserver>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
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

        goBack () {
            this.$utils.navigation.goBack(this.$route);
        },

        cancel () {
            this.goBack();
        },

        save () {
            this.$refs.observer.validate().then(validateResulte => {
                if (validateResulte) {
                    this.overlay = true;
                    this.$api.upms.oauthScopes.saveOrUpdate(this.editedItem).then(result => {
                        this.overlay = false;
                        this.goBack();
                    }).catch(() => {
                        this.overlay = false;
                    });
                }
            });
        },
    }
}
</script>
