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
                                <ValidationProvider v-slot="{ errors }" name="团队名称" rules="required">
                                    <v-text-field outlined clearable label="团队名称 * " placeholder="请输入团队名称" v-model="editedItem.supplierName" :error-messages="errors" required></v-text-field>
                                </ValidationProvider>
                                <ValidationProvider v-slot="{ errors }" name="团队代码" rules="required">
                                    <v-text-field outlined clearable label="团队代码 * " placeholder="请输入团队代码" v-model="editedItem.supplierCode" :error-messages="errors" required></v-text-field>
                                </ValidationProvider>
                                <v-text-field outlined clearable label="备注" placeholder="可以输入额外说明" v-model="editedItem.description"></v-text-field>
                                <v-select outlined v-model="editedItem.status" :items="upmsConstants.status" label="数据状态"></v-select>
                                <v-divider></v-divider>
                                <v-switch v-model="editedItem.reserved" label="是否是保留数据" color="primary"></v-switch>

                                <v-btn color="primary" class="mr-4" @click="save()">保存</v-btn>
                                <v-btn color="error" @click="cancel()">取消</v-btn>
                            </v-col>
                            <v-col class="pl-10 pr-10">
                            </v-col>
                        </v-row>
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
                    this.$api.upms.supplier.saveOrUpdate(this.editedItem).then(result => {
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
