import type { SweetAlertResult } from 'sweetalert2';
import type { Page, Sort, Entity, Conditions, QTableRequestProp } from '/@/lib/declarations';
import { computed, ref, Ref, watch, onMounted } from 'vue';

import { BaseService } from '/@/apis';
import { Swal, toast } from '/@/lib/utils';
import { OperationEnum } from '/@/lib/enums';

export default function useTableItems<T extends Entity, C extends Conditions>(
	baseService: BaseService<T>,
	name: string,
	isFindAll = false,
	sort = {} as Sort
) {
	const loading = ref(false);
	const tableRows = ref([]) as Ref<T[]>;
	const totalPages = ref(0);
	const conditions = ref({}) as Ref<C>;
	const pagination = ref({
		sortBy: 'updateTime',
		descending: false,
		page: 1,
		rowsPerPage: isFindAll ? 0 : 10,
		rowsNumber: 0,
	});

	const findItems = (props: QTableRequestProp) => {
		if (isFindAll) {
			findAllItems();
		} else {
			const { page, rowsPerPage, sortBy, descending } = props.pagination;
			pagination.value.page = page;
			pagination.value.rowsPerPage = rowsPerPage;
			pagination.value.sortBy = sortBy;
			pagination.value.descending = descending;
			findItemsByPage(pagination.value.page, pagination.value.rowsPerPage, conditions.value);
		}
	};

	const findAllItems = () => {
		loading.value = true;
		baseService
			.fetchAll()
			.then((result) => {
				const data = result.data as Array<T>;
				tableRows.value = data;
				loading.value = false;
				pagination.value.rowsNumber = data.length;
			})
			.catch(() => {
				loading.value = false;
			});
	};

	const findItemsByPage = (pageNumber = 1, pageSize = 10, others = {}) => {
		loading.value = true;
		baseService
			.fetchByPage(
				{
					pageNumber: pageNumber - 1,
					pageSize: pageSize,
					...sort,
				},
				others
			)
			.then((result) => {
				const data = result.data as Page<T>;
				tableRows.value = data.content;
				totalPages.value = data.totalPages;
				pagination.value.rowsNumber = parseInt(data.totalElements, 0);
				loading.value = false;
			})
			.catch(() => {
				loading.value = false;
			});
	};

	const deleteItemById = (id: string) => {
		Swal.fire({
			title: '确定删除?',
			text: '您将无法恢复此操作！',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: '是的, 删除!',
			cancelButtonText: '取消',
		}).then((confirm: SweetAlertResult) => {
			if (confirm.value) {
				baseService
					.delete(id)
					.then((response) => {
						const result = response as HttpResult<string>;
						if (result.message) {
							toast.success(result.message);
						} else {
							toast.success('删除成功');
						}
						findItemsByPage();
					})
					.catch(() => {
						toast.error('删除失败');
					});
			}
		});
	};

	const toEdit = computed(() => (item: T) => {
		return {
			name: name + 'Content',
			params: { item: JSON.stringify(item), operation: OperationEnum.EDIT },
		};
	});

	const toCreate = computed(() => {
		return {
			name: name + 'Content',
			params: { item: JSON.stringify({}), operation: OperationEnum.CREATE },
		};
	});

	const toAuthorize = computed(() => (item: T) => {
		return {
			name: name + 'Authorize',
			params: { item: JSON.stringify(item), operation: OperationEnum.AUTHORIZE },
		};
	});

	onMounted(() => {
		findItems({ pagination: pagination.value });
	});

	watch(
		() => pagination.value.page,
		(newValue: number) => {
			if (newValue && !isFindAll) {
				findItemsByPage(newValue, pagination.value.rowsPerPage, conditions.value);
			}
		}
	);

	// watch(
	// 	() => pagination.value.rowsPerPage,
	// 	(newValue: number) => {
	// 		if (newValue && !isFindAll) {
	// 			findItemsByPage(pagination.value.page, newValue, conditions.value);
	// 		}
	// 	}
	// );

	watch(
		conditions,
		(newValue) => {
			if (newValue && !isFindAll) {
				findItemsByPage(pagination.value.page, pagination.value.rowsPerPage, newValue);
			}
		},
		{ deep: true }
	);

	return {
		pagination,
		tableRows,
		loading,
		totalPages,
		findItems,
		toCreate,
		toEdit,
		toAuthorize,
		conditions,
		findItemsByPage,
		deleteItemById,
	};
}
