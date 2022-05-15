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
			<v-list-item key="logout" value="logout" active-color="primary" rounded="xl" @click="logout()">
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
import type { SweetAlertResult } from 'sweetalert2';
import { Swal } from '/@/lib/utils';
import { useAuthenticationStore } from '/@/stores';
import { HAppDropDown } from '../library';
import { useRouter } from 'vue-router';
import { Path } from '/@/lib/enums';
import { RouteUtils } from '../../../routers/logic';

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

		const authentication = useAuthenticationStore();
		const router = useRouter();

		const logout = () => {
			Swal.fire({
				title: '要走了么?',
				text: '您确定要退出系统！',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: '是的',
				cancelButtonText: '取消',
			}).then((result: SweetAlertResult) => {
				if (result.value) {
					authentication.signOut().then(() => {
						authentication.$reset();
						RouteUtils.toSignIn();
					});
				}
			});
		};

		return {
			...toRefs(state),
			logout,
		};
	},
});
</script>
