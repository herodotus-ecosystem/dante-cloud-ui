<template>
	<q-card>
		<h-authorize-header @save="onSave()" @clear="onClear()"></h-authorize-header>
		<q-item v-for="(item, i) in selectedItems" :key="i" class="q-my-sm" clickable v-ripple>
			<h-http-method-avatar v-if="httpMethod" :method="getHttpMethod(item)"></h-http-method-avatar>

			<q-item-section>
				<q-item-label>{{ getTitle(item) }}</q-item-label>
				<q-item-label caption lines="1">{{ getSubtitle(item) }}</q-item-label>
			</q-item-section>

			<q-item-section side>
				<q-icon name="mdi-delete" color="red" @click="onRemoveItem(item)" />
			</q-item-section>
		</q-item>
	</q-card>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, ref } from 'vue';
import type { BaseSysEntity, HttpMethod } from '/@/lib/declarations';

import { lodash } from '/@/lib/utils';

import { HHttpMethodAvatar } from '../../library';
import HAuthorizeHeader from './HAuthorizeHeader.vue';

export default defineComponent({
	name: 'HAuthorizeList',

	components: {
		HHttpMethodAvatar,
		HAuthorizeHeader,
	},

	props: {
		modelValue: { type: Array as PropType<Array<BaseSysEntity>>, default: () => [], required: true },
		prependTitle: { type: String, required: true },
		prependSubtitle: { type: String, required: true },
		appendTitle: { type: String },
		appendSubtitle: { type: String },
		itemKey: { type: String, required: true },
		httpMethod: { type: Boolean, default: false },
		httpMethodKey: { type: String },
	},

	emits: ['update:modelValue', 'save', 'clear'],

	setup(props, { emit }) {
		const selectedItems = computed({
			get: () => props.modelValue,
			set: (newValue) => {
				emit('update:modelValue', newValue);
			},
		});

		const clear = () => {
			selectedItems.value = [];
		};

		const getValueProperty = (item: BaseSysEntity, property: string) => {
			const attribute = property as keyof BaseSysEntity;
			return item[attribute];
		};

		const getTitle = (item: BaseSysEntity) => {
			let title = getValueProperty(item, props.prependTitle);
			if (props.appendTitle) {
				title += ' -- ' + getValueProperty(item, props.appendTitle);
			}

			return title;
		};

		const getSubtitle = (item: BaseSysEntity) => {
			let subtitle = getValueProperty(item, props.prependSubtitle);
			if (props.appendSubtitle) {
				subtitle += ' -- ' + getValueProperty(item, props.appendSubtitle);
			}

			return subtitle;
		};

		const getHttpMethod = (item: BaseSysEntity): HttpMethod => {
			if (props.httpMethodKey) {
				return getValueProperty(item, props.httpMethodKey) as HttpMethod;
			} else {
				return 'GET';
			}
		};

		const onRemoveItem = (item: BaseSysEntity) => {
			let index = lodash.findIndex(selectedItems.value, item);
			console.log(index);
			lodash.remove(selectedItems.value, index);

			selectedItems.value = selectedItems.value.filter((i) => {
				return getValueProperty(i, props.itemKey) != getValueProperty(item, props.itemKey);
			});
		};

		const onSave = () => {
			emit('save');
		};

		const onClear = () => {
			selectedItems.value = [];
		};

		return {
			selectedItems,
			getHttpMethod,
			onRemoveItem,
			clear,
			getTitle,
			getSubtitle,
			onSave,
			onClear,
			getValueProperty,
		};
	},
});
</script>
