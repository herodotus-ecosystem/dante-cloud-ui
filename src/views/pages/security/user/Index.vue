<template>
	<q-table
		title="Treats"
		:rows="rows"
		:columns="columns"
		row-key="name"
		selection="single"
		v-model:selected="selected"
		v-model:pagination="pagination"
	>
		<template v-slot:top-right>
			<q-btn color="primary" icon-right="archive" label="Export to csv" no-caps />
		</template>

		<template #pagination>
			<q-pagination v-model="pagination.page" :max="5" direction-links />
		</template>

		<template #body-cell-actions="props">
			<q-td key="actions" :props="props">
				<q-btn flat round color="primary" icon="card_giftcard" to="/security/user/content">
					<q-tooltip>编辑</q-tooltip>
				</q-btn>
			</q-td>
		</template>
	</q-table>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import type { QTableProps } from 'quasar';

export default defineComponent({
	name: 'SysUser',

	setup(props) {
		const selected = ref([]);
		const pagesNumber = ref(1);

		const pagination = ref({
			sortBy: 'desc',
			descending: false,
			page: 1,
			rowsPerPage: 10,
			// rowsNumber: xx if getting data from a server
		});

		const columns: QTableProps['columns'] = [
			{
				name: 'name',
				required: true,
				label: 'Dessert (100g serving)',
				align: 'left',
				field: (row: any) => row.name,
				format: (val: any) => `${val}`,
				sortable: true,
			},
			{ name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
			{ name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
			{ name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
			{ name: 'protein', label: 'Protein (g)', field: 'protein' },
			{ name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
			{ name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a: string, b: string) => parseInt(a, 10) - parseInt(b, 10) },
			{ name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a: string, b: string) => parseInt(a, 10) - parseInt(b, 10) },
			{ name: 'actions', label: '操作', field: 'actions', sortable: true, sort: (a: string, b: string) => parseInt(a, 10) - parseInt(b, 10) },
		];

		const rows = [
			{
				name: 'Frozen Yogurt',
				calories: 159,
				fat: 6.0,
				carbs: 24,
				protein: 4.0,
				sodium: 87,
				calcium: '14%',
				iron: '1%',
			},
			{
				name: 'Ice cream sandwich',
				calories: 237,
				fat: 9.0,
				carbs: 37,
				protein: 4.3,
				sodium: 129,
				calcium: '8%',
				iron: '1%',
			},
			{
				name: 'Eclair',
				calories: 262,
				fat: 16.0,
				carbs: 23,
				protein: 6.0,
				sodium: 337,
				calcium: '6%',
				iron: '7%',
			},
			{
				name: 'Cupcake',
				calories: 305,
				fat: 3.7,
				carbs: 67,
				protein: 4.3,
				sodium: 413,
				calcium: '3%',
				iron: '8%',
			},
			{
				name: 'Gingerbread',
				calories: 356,
				fat: 16.0,
				carbs: 49,
				protein: 3.9,
				sodium: 327,
				calcium: '7%',
				iron: '16%',
			},
			{
				name: 'Jelly bean',
				calories: 375,
				fat: 0.0,
				carbs: 94,
				protein: 0.0,
				sodium: 50,
				calcium: '0%',
				iron: '0%',
			},
			{
				name: 'Lollipop',
				calories: 392,
				fat: 0.2,
				carbs: 98,
				protein: 0,
				sodium: 38,
				calcium: '0%',
				iron: '2%',
			},
			{
				name: 'Honeycomb',
				calories: 408,
				fat: 3.2,
				carbs: 87,
				protein: 6.5,
				sodium: 562,
				calcium: '0%',
				iron: '45%',
			},
			{
				name: 'Donut',
				calories: 452,
				fat: 25.0,
				carbs: 51,
				protein: 4.9,
				sodium: 326,
				calcium: '2%',
				iron: '22%',
			},
			{
				name: 'KitKat',
				calories: 518,
				fat: 26.0,
				carbs: 65,
				protein: 7,
				sodium: 54,
				calcium: '12%',
				iron: '6%',
			},
		];

		return {
			selected,
			columns,
			rows,
			pagination,
		};
	},
});
</script>
