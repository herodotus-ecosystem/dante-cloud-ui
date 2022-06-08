<template>
	<div class="q-gutter-sm row items-center no-wrap">
		<q-btn round dense flat color="grey-8" icon="apps" v-if="$q.screen.gt.sm">
			<q-tooltip>Apps</q-tooltip>
		</q-btn>
		<q-btn
			round
			dense
			flat
			color="grey-8"
			@click="$q.fullscreen.toggle()"
			:icon="$q.fullscreen.isActive ? 'mdi-fullscreen-exit' : 'mdi-fullscreen'"
			v-if="$q.screen.gt.sm"
		>
			<q-tooltip>{{ $q.fullscreen.isActive ? '退出全屏' : '全屏显示' }}</q-tooltip>
		</q-btn>
		<q-btn round dense flat color="grey-8" icon="message" v-if="$q.screen.gt.sm">
			<q-tooltip>Messages</q-tooltip>
		</q-btn>
		<q-btn round dense flat color="grey-8" icon="notifications">
			<q-badge color="red" text-color="white" floating> 2 </q-badge>
			<q-tooltip>Notifications</q-tooltip>
		</q-btn>
		<h-app-right-drawer-control></h-app-right-drawer-control>
		<q-btn-dropdown stretch flat class="q-mx-none" label="Administrator">
			<q-list>
				<q-item-label header>功能菜单</q-item-label>
				<q-item clickable v-close-popup tabindex="0">
					<q-item-section avatar>
						<q-btn round dense flat icon="mdi-account-box-multiple"></q-btn>
					</q-item-section>
					<q-item-section>
						<q-item-label>个人信息</q-item-label>
					</q-item-section>
				</q-item>
				<q-separator inset spaced />
				<q-item-label header>系统操作</q-item-label>
				<q-item clickable v-close-popup tabindex="1" @click="signOut()">
					<q-item-section avatar>
						<q-btn round dense flat icon="mdi-logout"></q-btn>
					</q-item-section>
					<q-item-section>
						<q-item-label>退出系统</q-item-label>
					</q-item-section>
				</q-item>
			</q-list>
		</q-btn-dropdown>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { ActionUtils } from '/@/lib/utils';

import { HAppRightDrawerControl } from '../drawer';

export default defineComponent({
	name: 'HAppToolbarActions',

	components: {
		HAppRightDrawerControl,
	},

	setup() {
		const signOut = () => {
			ActionUtils.signOutWithDialog();
		};

		return {
			signOut,
		};
	},
});
</script>
