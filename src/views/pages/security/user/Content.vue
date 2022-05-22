<template>
	<div>
		<h-sheet></h-sheet>
		<h-container>
			<v-text-field outlined clearable label="用户名 * " placeholder="请输入用户名"></v-text-field>
			<v-text-field outlined clearable label="昵称" placeholder="请输入用户昵称"></v-text-field>
			<v-text-field outlined clearable label="排序值" placeholder="请输入排序值" min="1" max="10000" step="1" type="number"></v-text-field>
			<h-dictionary-select dictionary="status" label="数据状态"></h-dictionary-select>
			<v-divider></v-divider>
			<v-switch label="是否是保留数据" color="primary"></v-switch>
			<v-btn color="error" class="mr-4">取消</v-btn>
			<v-btn color="primary" class="mr-4">保存</v-btn>
		</h-container>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

import { useRoute } from 'vue-router';

import { lodash } from '/@/lib/utils';
import { HSheet, HContainer } from '/@/components';

export default defineComponent({
	name: 'SysUserContent',

	components: {
		HSheet,
		HContainer,
	},

	setup() {
		const route = useRoute();

		const getParent = (path: string) => {
			const array = lodash.split(path, '/');
			const result = lodash.dropRight(array);
			return lodash.join(result, '/');
		};

		onMounted(() => {
			if (route.params && route.params.item) {
				const param = route.params.item as string;
				let item = JSON.parse(param);
				console.log(item);

				const destination = getParent(route.path);
				console.log(destination);
			}

			console.log(route.params);
		});

		return {};
	},
});
</script>
