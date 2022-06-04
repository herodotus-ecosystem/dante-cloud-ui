<template>
	<q-breadcrumbs class="q-ml-lg">
		<q-breadcrumbs-el label="首页" icon="home" :to="homePath" />
		<q-breadcrumbs-el
			v-for="(item, i) in $route.matched"
			:key="i"
			:label="(item.meta.title as string)"
			:icon="(item.meta.icon as string)"
			:to="item.path"
		/>
	</q-breadcrumbs>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

import { PathEnum } from '/@/lib/enums';

export default defineComponent({
	name: 'HAppBreadcrumbs',

	setup(props) {
		const homePath = PathEnum.HOME;

		return {
			homePath,
		};
	},
});
</script>
