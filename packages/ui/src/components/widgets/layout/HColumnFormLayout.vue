<template>
	<h-detail-container :title="title" :overlay="overlay">
		<h-container mode="two" gutter="md" gutter-col horizontal>
			<template #left>
				<slot name="left"></slot>
				<h-text-field v-model="entity.description" label="备注" placeholder="请输入备注"></h-text-field>
				<h-text-field v-model.number="entity.ranking" label="排序值" placeholder="请输入排序值" type="number" />
				<h-dictionary-select v-model="entity.status" dictionary="status" label="数据状态" class="q-mb-md"></h-dictionary-select>
				<q-separator></q-separator>
				<q-toggle v-model="entity.reserved" label="是否为保留数据"></q-toggle>
				<div>
					<q-btn color="red" @click="onFinish()">取消</q-btn>
					<q-btn color="primary" class="q-ml-sm" @click="onSave()">保存</q-btn>
					<slot name="button"></slot>
				</div>
			</template>

			<template #right>
				<slot name="right"></slot>
			</template>
		</h-container>
	</h-detail-container>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { useEditFinish } from '/@/hooks';
import { BaseSysEntity, ValidateResult } from '/@/lib/declarations';
import HDetailContainer from './HDetailContainer.vue';
import { HContainer, HTextField } from '../../library';
import { HDictionarySelect } from '../select';

export default defineComponent({
	name: 'HColumnFormLayout',

	components: {
		HDetailContainer,
		HDictionarySelect,
		HTextField,
		HContainer,
	},

	emits: ['save'],

	props: {
		entity: { type: Object as PropType<BaseSysEntity>, required: true },
		overlay: { type: Boolean, default: false },
		title: { type: String, default: '' },
	},

	setup(props, { emit }) {
		const { onFinish } = useEditFinish();

		const onSave = async () => {
			emit('save');
		};

		return {
			onFinish,
			onSave,
		};
	},
});
</script>
