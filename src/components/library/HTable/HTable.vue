<template>
	<v-card flat>
		<v-table>
			<slot></slot>
			<thead>
				<tr>
					<th v-for="(header, j) in tableHeaders" :key="j">
						{{ header.text }}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item, i) in tableItems" :key="i">
					<td v-for="(header, j) in tableHeaders" :key="j">
						{{ item[header.value] ? item[header.value] : '' }}
						<slot :name="header.value" :item="item"></slot>
					</td>
				</tr>
			</tbody>
		</v-table>
		<v-divider></v-divider>
		<v-pagination v-model="pageNumber" :length="totalPages" :total-visible="7" show-first-last-page></v-pagination>
	</v-card>
</template>

<script lang="ts">
import type { TableHeader } from '/@/lib/declarations';

import { defineComponent, PropType, computed } from 'vue';

export default defineComponent({
	name: 'HTable',

	props: {
		page: { type: Number, default: 1 },
		totalPages: { type: Number, default: 0, required: true },
		tableHeaders: { type: Array as PropType<Array<TableHeader>>, default: () => [], required: true },
		tableItems: { type: Array as PropType<Array<any>>, default: () => [], required: true },
	},

	emits: ['update:page'],

	setup(props, { emit }) {
		const pageNumber = computed<number>({
			get: () => props.page,
			set: (value) => emit('update:page', value),
		});

		return {
			pageNumber,
		};
	},
});
</script>
