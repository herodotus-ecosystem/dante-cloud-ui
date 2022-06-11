<template>
	<q-item-section avatar>
		<q-avatar :color="color" text-color="white" :icon="icon"> </q-avatar>
	</q-item-section>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import { AuthorizeAvatar, AuthorizeAvatarData } from '/@/lib/declarations';

export default defineComponent({
	name: 'HAuthorizeAvatar',

	props: {
		type: { type: String, required: true },
	},

	setup(props) {
		const display: AuthorizeAvatar = {
			PUT: { color: 'warning', icon: 'mdi-book-minus-multiple' },
			DELETE: { color: 'error', icon: 'mdi-book-remove-multiple' },
			POST: { color: 'success', icon: 'mdi-book-plus-multiple' },
			GET: { color: 'info', icon: 'mdi-book-multiple' },
		};

		const defaultDisplayData: AuthorizeAvatarData = { color: 'success', icon: 'mdi-book-multiple' };

		const switcher = (type: string, property: string): string => {
			const switcher: AuthorizeAvatarData = display[type];
			if (switcher) {
				return switcher[property];
			} else {
				return defaultDisplayData[property];
			}
		};

		const color = computed(() => {
			return switcher(props.type, 'color');
		});

		const icon = computed(() => {
			return switcher(props.type, 'icon');
		});

		return {
			color,
			icon,
		};
	},
});
</script>
