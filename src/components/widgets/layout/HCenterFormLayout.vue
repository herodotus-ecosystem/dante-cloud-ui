<template>
	<h-detail-container :title="title" :overlay="overlay">
		<validation-observer ref="formRef" :initial-values="entity">
			<h-container :offset="4">
				<slot></slot>
				<h-text-field v-model="entity.description" label="备注" placeholder="请输入备注"></h-text-field>
				<h-text-field v-model.number="entity.ranking" label="排序值" placeholder="请输入排序值" type="number" />
				<h-dictionary-select v-model="entity.status" dictionary="status" label="数据状态" class="q-mb-md"></h-dictionary-select>
				<q-separator></q-separator>
				<q-toggle v-model="entity.reserved" label="是否为保留数据"></q-toggle>
				<div>
					<q-btn color="red" @click="onFinish()">取消</q-btn>
					<q-btn color="primary" class="q-ml-sm" @click="onVerify()">保存</q-btn>
					<slot name="button"></slot>
				</div>
			</h-container>
		</validation-observer>
	</h-detail-container>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, computed } from 'vue';

import type { QForm } from 'quasar';

import { useEditFinish } from '/@/hooks';
import { BaseSysEntity, ValidateResult } from '/@/lib/declarations';
import { HContainer, HTextField } from '../../library';
import { HDictionarySelect } from '../select';
import HDetailContainer from './HDetailContainer.vue';

export default defineComponent({
	name: 'HCenterFormLayout',

	components: {
		HContainer,
		HDetailContainer,
		HDictionarySelect,
		HTextField,
	},

	props: {
		entity: { type: Object as PropType<BaseSysEntity>, required: true },
		overlay: { type: Boolean, default: false },
		title: { type: String, default: '' },
	},

	setup(props, { emit }) {
		const formRef = ref(null);

		const { onFinish } = useEditFinish();

		const onVerify = async () => {
			const refs = formRef.value as unknown as InstanceType<typeof QForm>;
			if (refs) {
				const result = (await refs.validate()) as unknown as ValidateResult;
				emit('verify', result.valid);
			}
		};

		return {
			formRef,
			onFinish,
			onVerify,
		};
	},
});
</script>
