<template>
	<validation-observer as="v-form" ref="formRef">
		<h-overlay :overlay="overlay"></h-overlay>
		<v-toolbar flat rounded color="white">
			<h-button color="teal" icon icon-name="mdi-arrow-left-box" tooltip="返回" @click="onFinish()"></h-button>
			<v-toolbar-title v-if="content" :text="title"></v-toolbar-title>
		</v-toolbar>
		<v-divider class="mb-2"></v-divider>
		<h-layout :offset="4">
			<slot></slot>
			<slot v-if="$slots.left" name="left"></slot>
			<slot v-if="$slots.right" name="right"></slot>
			<h-text-field v-model="entity.description" label="备注" placeholder="请输入备注"></h-text-field>
			<h-text-field v-model="entity.ranking" label="排序值" placeholder="请输入排序值" min="1" max="10000" step="1" type="number"></h-text-field>
			<v-divider></v-divider>
			<h-switch v-model="entity.reserved" label="是否是保留数据"></h-switch>
			<v-btn color="error" class="mr-4" @click="onFinish()">取消</v-btn>
			<v-btn color="primary" class="mr-4" @click="onVerify()">保存</v-btn>
			<slot name="button"></slot>
		</h-layout>
	</validation-observer>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed } from 'vue';

import type { VForm } from 'vuetify/lib/components';

import { BaseSysEntity } from '/@/lib/declarations';
import { useEditFinish } from '/@/hooks';
import { Operation } from '/@/lib/enums';

import { HLayout, HTextField, HSwitch, HOverlay } from '../../library';

export default defineComponent({
	name: 'HTableItemEditor',

	components: {
		HLayout,
		HOverlay,
		HSwitch,
		HTextField,
	},

	emits: ['verify'],

	props: {
		entity: { type: Object as PropType<BaseSysEntity>, required: true },
		overlay: { type: Boolean, default: false },
		operation: { type: String, default: Operation.CREATE },
		content: { type: String, default: '' },
	},

	setup(props, { emit }) {
		const formRef = ref(null);

		const { onFinish } = useEditFinish();

		const onVerify = async () => {
			const refs = formRef.value as InstanceType<typeof VForm>;
			if (refs) {
				const result = await refs.validate();
				emit('verify', result.valid);
			}
		};

		const title = computed(() => {
			console.log(props.operation);
			if (props.operation) {
				if (props.operation === Operation.CREATE) {
					return '新建' + props.content;
				} else {
					return '编辑' + props.content;
				}
			} else {
				return props.content;
			}
		});

		return {
			formRef,
			onFinish,
			onVerify,
			title,
		};
	},
});
</script>
