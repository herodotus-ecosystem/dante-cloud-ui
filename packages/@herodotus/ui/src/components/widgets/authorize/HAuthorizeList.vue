<template>
    <v-card>
        <h-authorize-toolbar @save="onSaveItems($event)" @clear="clearItems()"></h-authorize-toolbar>

        <v-list subheader two-line shaped>
            <v-subheader>{{ header }}</v-subheader>

            <v-list-item-group color="primary">
                <v-list-item v-for="item in orderedSelectedItems" :key="item[itemKey]">
                    <h-authorize-avatar v-if="avatar" :type="item[avatarKey]"></h-authorize-avatar>
                    <v-list-item-content>
                        <v-list-item-title>{{ listItemTitle(item) }}</v-list-item-title>
                        <v-list-item-subtitle>{{ listItemSubtitle(item) }}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                        <v-btn icon>
                            <v-icon color="red" @click="removeItem(item)">mdi-delete</v-icon>
                        </v-btn>
                    </v-list-item-action>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-card>
</template>

<script lang="ts">
import { Component, Emit, Prop, VModel, Vue } from 'vue-property-decorator';
import HActionButton from '../HActionButton.vue';
import HAuthorizeAvatar from './HAuthorizeAvatar.vue';
import HAuthorizeToolbar from './HAuthorizeToolbar.vue';

@Component({
    components: {
        HActionButton,
        HAuthorizeAvatar,
        HAuthorizeToolbar,
    },
})
export default class HAuthorizeList extends Vue {
    @VModel({ type: Array, default: () => [] }) selectedItems!: [];
    @Prop({ type: String, default: 'id' }) readonly itemKey!: string;
    @Prop({ type: String, default: '' }) readonly header?: string;
    @Prop({ type: String, default: '' }) readonly appendTitle?: string;
    @Prop({ type: String, default: '' }) readonly appendSubtitle?: string;
    @Prop({ type: String, required: true, default: '' }) readonly prependTitle!: string;
    @Prop({ type: String, default: '' }) readonly prependSubtitle?: string;
    @Prop({ type: Boolean, default: false }) readonly avatar?: boolean;
    @Prop({ type: String, default: '' }) readonly avatarKey!: string;

    private listItemTitle(item = {}): string {
        let title = '';
        if (this.prependTitle) {
            title = item[this.prependTitle];
            if (this.appendTitle) {
                title += ' -- ' + item[this.appendTitle];
            }
        }

        return title;
    }

    private listItemSubtitle(item = {}): string {
        let subtitle = '';
        if (this.prependSubtitle) {
            subtitle = item[this.prependSubtitle];
            if (this.appendSubtitle) {
                subtitle += ' -- ' + item[this.appendSubtitle];
            }
        }

        return subtitle;
    }

    @Emit('save')
    public onSaveItems(e: Event): Event {
        return e;
    }

    get orderedSelectedItems(): any[] {
        if (!this.$lib.lodash.isEmpty(this.selectedItems)) {
            return this.$lib.lodash.orderBy(this.selectedItems, ['url']);
        } else {
            return this.selectedItems;
        }
    }

    private removeItem(item): void {
        let index = this.$lib.lodash.findIndex(this.selectedItems, item);
        console.log(index);
        this.$delete(this.selectedItems, index);
    }

    private clearItems(): void {
        this.selectedItems = [];
    }
}
</script>
