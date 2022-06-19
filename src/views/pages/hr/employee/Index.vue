<template>
	<div class="q-gutter-y-md">
		<q-list>
			<q-expansion-item label="查询条件：" default-opened>
				<q-card>
					<q-card-section>
						<h-row align="center" gutter="md" horizontal>
							<h-column :cols="2">
								<h-text-field v-model="conditions.employeeName" debounce="1000" label="姓名" dense class="q-pb-none"></h-text-field>
							</h-column>
							<h-column :cols="2">
								<h-text-field v-model="conditions.mobilePhoneNumber" debounce="1000" label="手机号码" dense class="q-pb-none"></h-text-field>
							</h-column>
							<h-column :cols="2">
								<h-text-field v-model="conditions.email" debounce="1000" label="电子邮件" dense class="q-pb-none"></h-text-field>
							</h-column>
							<h-column :cols="2">
								<h-dictionary-select v-model="conditions.identity" dictionary="identity" label="身份" dense class="q-pb-none"></h-dictionary-select
							></h-column>
							<h-column :cols="2">
								<h-dictionary-select v-model="conditions.gender" dictionary="gender" label="性别" dense class="q-pb-none"></h-dictionary-select
							></h-column>
							<h-column auto>
								<h-button color="red" icon="mdi-broom" tooltip="清空" @click.stop="onClear()"></h-button>
							</h-column>
						</h-row>
					</q-card-section>
				</q-card> </q-expansion-item
		></q-list>
		<h-table
			:rows="tableRows"
			:columns="columns"
			row-key="employeeId"
			selection="single"
			v-model:selected="selected"
			v-model:pagination="pagination"
			:loading="loading"
		>
			<template #top-right="props">
				<q-toolbar>
					<q-btn flat round dense :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'" @click="props.toggleFullscreen" class="q-ml-md" />
				</q-toolbar>
			</template>

			<template #top-left>
				<q-btn color="primary" label="新建人员" :to="toCreate" />
			</template>

			<template #pagination>
				<h-pagination v-model="pagination.page" :max="totalPages" />
			</template>

			<template #body-cell-gender="props">
				<q-td key="gender" :props="props">
					{{ parseGender(props.row) }}
				</q-td>
			</template>

			<template #body-cell-identity="props">
				<q-td key="identity" :props="props">
					{{ parseIdentity(props.row) }}
				</q-td>
			</template>

			<template #body-cell-reserved="props">
				<q-td key="reserved" :props="props">
					<h-reserved-column :status="props.row.reserved"></h-reserved-column>
				</q-td>
			</template>

			<template #body-cell-status="props">
				<q-td key="status" :props="props">
					<h-status-column :type="props.row.status"></h-status-column>
				</q-td>
			</template>

			<template #body-cell-actions="props">
				<q-td key="actions" :props="props">
					<h-button flat round color="purple" icon="mdi-clipboard-edit" tooltip="编辑" :to="toEdit(props.row)"></h-button>
					<h-button v-if="!props.row.reserved" flat round color="red" icon="mdi-delete" tooltip="删除" @click="remove(props.row.userId)"></h-button>
				</q-td>
			</template>
		</h-table>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from 'vue';

import type { QTableProps } from 'quasar';
import type { SysEmployee, SysEmployeeConditions } from '/@/lib/declarations';

import { ComponentNameEnum } from '/@/lib/enums';

import { useHrApi } from '/@/apis';
import { useTableItems } from '/@/hooks';
import { useConstantsStore } from '/@/stores';

import { HButton, HPagination, HStatusColumn, HReservedColumn, HRow, HColumn, HTextField, HDictionarySelect, HTable } from '/@/components';

export default defineComponent({
	name: ComponentNameEnum.SYS_EMPLOYEE,

	components: {
		HButton,
		HPagination,
		HStatusColumn,
		HReservedColumn,
		HRow,
		HColumn,
		HTextField,
		HTable,
		HDictionarySelect,
	},

	setup(props) {
		const api = useHrApi();
		const { tableRows, totalPages, pagination, loading, toEdit, toCreate, remove, conditions } = useTableItems<SysEmployee, SysEmployeeConditions>(
			api.employee,
			ComponentNameEnum.SYS_EMPLOYEE
		);

		const selected = ref([]);
		const gender = ref([]);
		const identity = ref([]);

		const columns: QTableProps['columns'] = [
			{ name: 'employeeName', field: 'employeeName', align: 'center', label: '人员姓名' },
			{ name: 'gender', field: 'gender', align: 'center', label: '性别' },
			{ name: 'identity', field: 'identity', align: 'center', label: '身份' },
			{ name: 'description', field: 'description', align: 'center', label: '备注' },
			{ name: 'reserved', field: 'reserved', align: 'center', label: '保留数据' },
			{ name: 'status', field: 'status', align: 'center', label: '状态' },
			{ name: 'actions', field: 'actions', align: 'center', label: '操作' },
		];

		const onClear = () => {
			conditions.value = {};
		};

		const getConstants = () => {
			const constants = useConstantsStore();
			gender.value = constants.getDictionary('gender');
			identity.value = constants.getDictionary('identity');
		};

		onBeforeMount(() => {
			getConstants();
		});

		const parseGender = (item: SysEmployee) => {
			if (typeof item.gender == 'number') {
				return gender.value[item.gender].text;
			} else {
				return item.gender;
			}
		};

		const parseIdentity = (item: SysEmployee) => {
			if (typeof item.identity == 'number') {
				return identity.value[item.identity].text;
			} else {
				return item.identity;
			}
		};

		return {
			selected,
			pagination,
			columns,
			tableRows,
			totalPages,
			loading,
			toCreate,
			toEdit,
			remove,
			conditions,
			onClear,
			parseGender,
			parseIdentity,
		};
	},
});
</script>
