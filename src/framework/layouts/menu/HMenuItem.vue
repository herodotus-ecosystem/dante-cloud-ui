<template>
	<v-list-item
		:href="item.path ? 'nofollow' : undefined"
		:rel="item.href ? 'nofollow' : undefined"
		:target="item.href ? '_blank' : undefined"
		:to="item.to"
		class="v-list-item--default"
		color="primary"
		:prepend-icon="meta.icon"
		:title="meta.title"
	/>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
	name: 'HMenuItem',

	props: {
		item: {
			type: Object,
			default: () => ({}),
		},
	},

	setup(props) {
		const meta = computed(() => {
			return props.item.meta;
		});

		return {
			meta,
		};
	},
});
</script>

<style lang="sass">
.v-list-item.v-list-item.v-list-item--default
  min-height: 32px

  > .v-list-item__icon
    margin-bottom: 6px
    margin-top: 6px
</style>
