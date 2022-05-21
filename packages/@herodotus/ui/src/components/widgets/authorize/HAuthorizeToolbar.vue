<template>
    <v-toolbar :color="color" dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <h-action-button save clear @save="onSave($event)" @clear="onClear($event)"></h-action-button>
    </v-toolbar>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import HActionButton from '../HActionButton.vue';

@Component({
    components: {
        HActionButton,
    },
})
export default class HAuthorizeToolbar extends Vue {
    @Prop({ type: String, default: 'teal' }) readonly color?: string;
    @Prop({ type: String, default: 'Settings' }) readonly title?: string;

    @Emit('save')
    private onSave(e: Event): Event {
        return e;
    }

    @Emit('clear')
    private onClear(e: Event): Event {
        return e;
    }
}
</script>
