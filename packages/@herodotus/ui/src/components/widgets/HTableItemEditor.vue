<template>
    <v-container>
        <v-form v-if="column">
            <h-container v-if="column" type="two">
                <slot name="primary"></slot>
                <template v-if="!clear">
                    <v-text-field
                        outlined
                        clearable
                        label="排序值"
                        placeholder="请输入排序值"
                        v-model="editedItem.ranking"
                        min="1"
                        max="10000"
                        step="1"
                        type="number"
                    ></v-text-field>
                    <h-dictionary-select
                        v-model="editedItem.status"
                        dictionary="status"
                        label="数据状态"
                    ></h-dictionary-select>
                    <v-divider></v-divider>
                    <v-switch v-model="editedItem.reserved" label="是否是保留数据" color="primary"></v-switch>
                </template>
                <v-btn color="error" class="mr-4" @click="onCancel()">取消</v-btn>
                <v-btn color="primary" class="mr-4" @click="onSubmit($event)">保存</v-btn>
                <slot name="button"></slot>
                <template v-slot:other>
                    <slot name="other"></slot>
                </template>
            </h-container>
        </v-form>
        <v-form v-else>
            <h-container>
                <slot name="primary"></slot>
                <template v-if="!clear">
                    <v-text-field
                        outlined
                        clearable
                        label="排序值"
                        placeholder="请输入排序值"
                        v-model="editedItem.ranking"
                        min="1"
                        max="10000"
                        step="1"
                        type="number"
                    ></v-text-field>
                    <h-dictionary-select
                        v-model="editedItem.status"
                        dictionary="status"
                        label="数据状态"
                    ></h-dictionary-select>
                    <v-divider></v-divider>
                    <v-switch v-model="editedItem.reserved" label="是否是保留数据" color="primary"></v-switch>
                </template>
                <v-btn color="error" class="mr-4" @click="onCancel()">取消</v-btn>
                <v-btn color="primary" class="mr-4" @click="onSubmit($event)">保存</v-btn>
                <slot name="button"></slot>
            </h-container>
        </v-form>
    </v-container>
</template>
<script lang="ts">
import { Component, Emit, Prop, VModel, Vue } from 'vue-property-decorator';
import HDictionarySelect from '../business/HDictionarySelect.vue';
import HContainer from './HContainer.vue';

@Component({
    components: {
        HContainer,
        HDictionarySelect,
    },
})
export default class HTableItemEditor extends Vue {
    @Prop({ type: Boolean, default: false }) readonly clear?: boolean;
    @Prop({ type: Boolean, default: false }) readonly column?: boolean;
    @VModel({ type: Object, default: () => {} }) editedItem!: any;

    @Emit('submit')
    private onSubmit(e: Event): Event {
        return e;
    }

    private onCancel(): void {
        this.$navigation.goBack(this.$route);
    }
}
</script>
