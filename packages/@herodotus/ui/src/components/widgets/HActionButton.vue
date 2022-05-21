<template>
    <div>
        <slot name="left"></slot>
        <h-button
            v-if="authorize"
            icon
            :color="options.authorize.color"
            :icon-name="options.authorize.icon"
            :class="options.authorize.class"
            :tooltip="options.authorize.tooltip + content"
            @click="authorizeAction($event)"
        ></h-button>
        <h-button
            v-if="edit"
            icon
            :color="options.edit.color"
            :icon-name="options.edit.icon"
            :class="options.edit.class"
            :tooltip="options.edit.tooltip"
            @click="editAction($event)"
        ></h-button>
        <h-button
            v-if="remove"
            icon
            :color="options.remove.color"
            :icon-name="options.remove.icon"
            :class="options.remove.class"
            :tooltip="options.remove.tooltip"
            @click="removeAction($event)"
        ></h-button>
        <h-button
            v-if="save"
            icon
            :color="options.save.color"
            :icon-name="options.save.icon"
            :class="options.save.class"
            :tooltip="options.save.tooltip"
            @click="saveAction($event)"
        ></h-button>
        <h-button
            v-if="clear"
            icon
            :color="options.clear.color"
            :icon-name="options.clear.icon"
            :class="options.clear.class"
            :tooltip="options.clear.tooltip"
            @click="clearAction($event)"
        ></h-button>
    </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import { ActionButtonOption } from '@/lib/declarations';

@Component({
    name: 'HActionButton',
})
export default class HActionButton extends Vue {
    @Prop({
        type: Object,
        default: () => {
            return {
                authorize: { color: 'purple', icon: 'mdi-clipboard-check-multiple', class: 'mr-2', tooltip: '配置' },
                edit: { color: 'warning', icon: 'mdi-pencil-box-multiple', class: 'mr-2', tooltip: '编辑' },
                remove: { color: 'error', icon: 'mdi-delete-sweep', class: 'mr-2', tooltip: '删除' },
                save: { color: 'white', icon: 'mdi-content-save-all', class: 'mr-2', tooltip: '提交' },
                clear: { color: 'white', icon: 'mdi-delete-empty', class: 'mr-2', tooltip: '清空' },
            };
        },
    })
    readonly options?: Record<string, ActionButtonOption>;
    @Prop({ type: Boolean, default: false }) readonly authorize?: boolean;
    @Prop({ type: Boolean, default: false }) readonly edit?: boolean;
    @Prop({ type: Boolean, default: false }) readonly remove?: boolean;
    @Prop({ type: Boolean, default: false }) readonly save?: boolean;
    @Prop({ type: Boolean, default: false }) readonly clear?: boolean;
    @Prop({ type: String, default: '' }) readonly content?: string;

    @Emit('authorize')
    authorizeAction(e: Event): Event {
        return e;
    }

    @Emit('edit')
    editAction(e: Event): Event {
        return e;
    }

    @Emit('remove')
    removeAction(e: Event): Event {
        return e;
    }

    @Emit('save')
    saveAction(e: Event): Event {
        return e;
    }

    @Emit('clear')
    clearAction(e: Event): Event {
        return e;
    }
}
</script>
