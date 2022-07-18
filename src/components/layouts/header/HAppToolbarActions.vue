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
		<q-btn round dense flat color="grey-8" icon="notifications">
			<q-badge color="red" text-color="white" floating> 2 </q-badge>
			<q-tooltip>Notifications</q-tooltip>
		</q-btn>
		<h-app-right-drawer-control></h-app-right-drawer-control>
		<q-btn-dropdown stretch flat class="q-mx-none" :label="userName">
			<q-list>
				<q-item-label header>功能菜单</q-item-label>
				<h-list-item icon="mdi-account-box" label="个人信息"></h-list-item>
				<q-separator inset spaced />
				<q-item-label header>系统操作</q-item-label>
				<h-list-item icon="mdi-logout" label="退出系统" @click="signOut()"></h-list-item>
			</q-list>
		</q-btn-dropdown>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import { ActionUtils, toast } from '/@/lib/utils';

import { HListItem } from '/@/components';
import { HAppRightDrawerControl } from '../drawer';
import { useAuthenticationStore } from '/@/stores';

export default defineComponent({
	name: 'HAppToolbarActions',

	components: {
		HListItem,
		HAppRightDrawerControl,
	},

	setup() {
		const authentication = useAuthenticationStore();
		const signOut = () => {
			ActionUtils.signOutWithDialog();
		};

		const userName = computed(() => {
			return authentication.userName ? authentication.userName : '系统用户';
		});

		return {
			signOut,
			userName,
		};
	},
});
</script>
