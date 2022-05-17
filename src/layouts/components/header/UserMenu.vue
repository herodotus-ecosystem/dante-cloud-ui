<template>
	<h-app-drop-down :title="title">
		<v-list>
			<v-list-subheader>功能菜单</v-list-subheader>
			<v-list-item key="profile" value="profile" active-color="primary" rounded="xl">
				<v-list-item-avatar start>
					<v-icon>mdi-account-box-multiple</v-icon>
				</v-list-item-avatar>
				<v-list-item-title>个人信息</v-list-item-title>
			</v-list-item>
			<v-list-item key="logout" value="logout" active-color="primary" rounded="xl" @click="signOut()">
				<v-list-item-avatar start>
					<v-icon>mdi-logout</v-icon>
				</v-list-item-avatar>
				<v-list-item-title>退出系统</v-list-item-title>
			</v-list-item>
		</v-list>
	</h-app-drop-down>
</template>

<script lang="ts">
// Utilities
import { defineComponent, reactive, toRefs } from 'vue';
import { ActionUtils } from '/@/lib/utils';
import { HAppDropDown } from '../library';

export default defineComponent({
	name: 'HAppBarUserMenu',

	components: {
		HAppDropDown,
	},

	setup() {
		const state = reactive({
			title: 'Administrator',
			items: [
				{ text: '个人信息', icon: 'mdi-account-box-multiple' },
				{ text: '退出系统', icon: 'mdi-logout' },
			],
		});

		const signOut = () => {
			ActionUtils.signOutWithDialog();
		};

		return {
			...toRefs(state),
			signOut,
		};
	},
});
</script>
