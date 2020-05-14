<template>
    <v-container grid-list-xl fluid>
        <v-row>
            <v-col>
                <v-overlay :value="overlay">
                    <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
                </v-overlay>
                <ValidationObserver ref="observer">
                    <form v-if="column">
                        <v-row>
                            <v-col class="pl-10 pr-10">
                                <slot name="primary" :editedItem="editedItem"></slot>
                                <template v-if="!clear">
                                    <v-text-field outlined clearable label="排序值" placeholder="请输入排序值" v-model="editedItem.ranking" min="1" max="10000" step="1" type="number"></v-text-field>
                                    <h-status-select v-model="editedItem.status"></h-status-select>
                                    <v-divider></v-divider>
                                    <v-switch v-model="editedItem.reserved" label="是否是保留数据" color="primary"></v-switch>
                                </template>
                                <h-detail-cancel-btn class="mr-4">取消</h-detail-cancel-btn>
                                <v-btn color="primary" class="mr-4" @click="saveOrUpdate()">保存</v-btn>
                                <slot name="button" :editedItem="editedItem"></slot>
                            </v-col>
                            <v-spacer v-if="spacer" class="flex-grow-0">
                                <v-divider vertical></v-divider>
                            </v-spacer>
                            <v-col class="pl-10 pr-10">
                                <slot name="other" :editedItem="editedItem"></slot>
                            </v-col>
                        </v-row>
                    </form>
                    <form v-else>
                        <slot name="primary" :editedItem="editedItem"></slot>
                        <template v-if="!clear">
                            <v-text-field outlined clearable label="排序值" placeholder="请输入排序值" v-model="editedItem.ranking" min="1" max="10000" step="1" type="number"></v-text-field>
                            <h-status-select v-model="editedItem.status"></h-status-select>
                            <v-divider></v-divider>
                            <v-switch v-model="editedItem.reserved" label="是否是保留数据" color="primary"></v-switch>
                        </template>
                        <h-detail-cancel-btn class="mr-4">取消</h-detail-cancel-btn>
                        <v-btn color="primary" class="mr-4" @click="saveOrUpdate()">保存</v-btn>
                        <slot name="button" :editedItem="editedItem"></slot>
                    </form>
                </ValidationObserver>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import HStatusSelect from '@/components/business/HStatusSelect.vue';
import HDetailCancelBtn from '@/components/widgets/HDetailCancelBtn.vue';
export default {
    components: {
        HStatusSelect,
        HDetailCancelBtn
    },

    name: 'HTableItemEditor',

    props: {
        column: {
            type: Boolean,
            default: false
        },
        spacer: {
            type: Boolean,
            default: false
        },
        clear: {
            type: Boolean,
            default: false
        },
        apiObject: String,
    },

    data: () => ({
        overlay: false,
        editedItem: {},
    }),

    created () {
        this.editedItem = this.$route.params;
    },

    methods: {
        saveOrUpdate () {
            this.$refs.observer.validate().then(validateResulte => {
                if (validateResulte) {
                    if (this.apiObject) {
                        this.overlay = true;
                        this.$api.upms[this.apiObject].saveOrUpdate(this.editedItem).then(result => {
                            this.overlay = false;
                            this.$utils.navigation.goBack(this.$route);
                        }).catch(() => {
                            this.overlay = false;
                        });
                    } else {
                        console.error("Cannot find the 'api-object' property!");
                    }
                }
            });
        },
    }
}
</script>
