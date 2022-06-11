<template>
	<div>
		<h-authorize-header @save="onSave()" @clear="onClear()"></h-authorize-header>
		<q-item v-for="(item, i) in selectedItems" :key="i" class="q-my-sm" clickable v-ripple>
			<h-authorize-avatar v-if="item.httpMethod" :type="item.httpMethod"></h-authorize-avatar>

			<q-item-section>
				<q-item-label>{{ getTitle(item) }}</q-item-label>
				<q-item-label caption lines="1">{{ getSubtitle(item) }}</q-item-label>
			</q-item-section>

			<q-item-section side>
				<q-icon name="mdi-delete" color="red" @click="onRemoveItem(item)" />
			</q-item-section>
		</q-item>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';
import type { AuthorizeListItem } from '/@/lib/declarations';

import { lodash } from '/@/lib/utils';

import HAuthorizeAvatar from './HAuthorizeAvatar.vue';
import HAuthorizeHeader from './HAuthorizeHeader.vue';

export default defineComponent({
	name: 'HAuthorizeList',

	components: {
		HAuthorizeAvatar,
		HAuthorizeHeader,
	},

	props: {
		modelValue: { type: Array as PropType<Array<AuthorizeListItem>>, default: () => [], required: true },
	},

	emits: ['update:modelValue', 'save', 'clear'],

	setup(props, { emit }) {
		const selectedItems = computed({
			get: () => props.modelValue,
			set: (newValue) => {
				emit('update:modelValue', newValue);
			},
		});

		const onRemoveItem = (item: AuthorizeListItem) => {
			let index = lodash.findIndex(selectedItems.value, item);
			lodash.remove(selectedItems.value, index);
		};

		const clear = () => {
			selectedItems.value = [];
		};

		const getTitle = (item: AuthorizeListItem) => {
			let title = item.prependTitle;
			if (item.appendTitle) {
				title += ' -- ' + item.appendTitle;
			}

			return title;
		};

		const getSubtitle = (item: AuthorizeListItem) => {
			let title = item.prependSubtitle;
			if (item.appendSubtitle) {
				title += ' -- ' + item.appendSubtitle;
			}

			return title;
		};

		const onSave = () => {
			emit('save');
		};

		const onClear = () => {
			selectedItems.value = [];
		};

		return {
			selectedItems,
			onRemoveItem,
			clear,
			getTitle,
			getSubtitle,
			onSave,
			onClear,
		};
	},
});
</script>
