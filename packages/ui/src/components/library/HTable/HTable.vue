<template>
	<q-table
		:loading="loading"
		:separator="settings.display.table.separator"
		:dense="settings.display.table.dense"
		:rows-per-page-options="rowsPerPageOptions"
		v-bind="$attrs"
	>
		<template v-for="slotName in Object.keys($slots)" v-slot:[slotName]="props">
			<slot :name="slotName" v-bind="props" />
		</template>

		<template v-if="!$slots['top-right']" #top-right="props">
			<h-table-action :inFullscreen="props.inFullscreen" @toggle-fullscreen="props.toggleFullscreen"></h-table-action>
		</template>

		<template v-if="loading && !$slots.loading" #loading>
			<h-loading type="DOTS" size="100px"></h-loading>
		</template>

		<template v-if="!showAll && !$slots.pagination" #pagination>
			<h-pagination v-model="pageNumberVModel" :max="totalPages" />
		</template>

		<template v-if="reserved && !$slots['body-cell-reserved']" #body-cell-reserved="props">
			<q-td key="reserved" :props="props">
				<h-reserved-column :status="props.row.reserved"></h-reserved-column>
			</q-td>
		</template>

		<template v-if="status && !$slots['body-cell-status']" #body-cell-status="props">
			<q-td key="status" :props="props">
				<h-status-column :type="props.row.status"></h-status-column>
			</q-td>
		</template>
	</q-table>
</template>

<script lang="ts">
import { defineComponent, computed, ref, Ref } from 'vue';

import { useSettingsStore } from '/@/stores';

import { HLoading } from '../HLoading';
import { HPagination } from '../HPagination';
import HTableAction from './HTableAction.vue';

import { HStatusColumn, HReservedColumn } from '../../widgets';

export default defineComponent({
	name: 'HTable',

	components: {
		HLoading,
		HPagination,
		HReservedColumn,
		HStatusColumn,
		HTableAction,
	},

	emits: ['update:pageNumber'],

	props: {
		pageNumber: { type: Number, default: 0 },
		totalPages: { type: Number },
		loading: { type: Boolean, default: false },
		showAll: { type: Boolean, default: false },
		status: { type: Boolean, default: false },
		reserved: { type: Boolean, default: false },
	},

	setup(props, { emit }) {
		const settings = useSettingsStore();

		const pageNumberVModel = computed({
			get: () => props.pageNumber,
			set: (newValue) => {
				emit('update:pageNumber', newValue);
			},
		});

		const rowsPerPageOptions = computed(() => {
			return props.showAll ? [0] : [5, 10, 15, 20, 25, 50];
		});

		return {
			settings,
			pageNumberVModel,
			rowsPerPageOptions,
		};
	},
});
</script>
