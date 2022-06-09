<template>
	<q-card class="my-card">
		<q-card-section> sfsfsfsfsf </q-card-section>
	</q-card>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import type { SysUser } from '/@/lib/declarations';

import { useTableItem } from '/@/hooks';
import { useSecurityApi } from '/@/apis';

import { lodash } from '/@/lib/utils';

export default defineComponent({
	name: 'SysUserContent',

	setup(props) {
		const api = useSecurityApi();
		const { editedItem, operation, title, saveOrUpdate } = useTableItem<SysUser>(api.user);

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
			console.log(editedItem);
		});
	},
});
</script>
