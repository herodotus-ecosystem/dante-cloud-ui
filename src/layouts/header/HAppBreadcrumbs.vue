<template>
	<q-breadcrumbs class="q-ml-lg">
		<q-breadcrumbs-el label="首页" icon="home" />
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
import { useRoute } from 'vue-router';

export default defineComponent({
	name: 'HAppBreadcrumbs',

	setup(props) {
		const route = useRoute();

		onMounted(() => {
			console.log(route.matched);
		});
	},
});
</script>
