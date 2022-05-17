import { onMounted, watch, ref, Ref } from 'vue';
import { Page } from '/@/lib/declarations';
import { BaseService } from '/@/apis';

export default function useFetchByPage<T = any>(baseService: BaseService<T>) {
	const tableItems = ref<T[]>([]) as Ref<T[]>;
	const tableLoading = ref<boolean>(false);
	const skeletonLoading = ref<boolean>(false);
	const pageNumber = ref<number>(0);
	const pageSize = ref<number>(10);
	const totalItems = ref<number>(0);
	const totalPages = ref<number>(0);

	onMounted(() => {
		findItemsByPage();
	});

	const pagination = (num: number) => {
		pageNumber.value = num;
	};

	watch(pageNumber, (newValue) => {
		findItemsByPage(newValue);
	});

	const findItemsByPage = (num: number = 1, others = {}) => {
		tableLoading.value = true;
		pagination(num);
		baseService
			.fetchByPage(
				{
					pageNumber: num - 1,
					pageSize: pageSize.value,
				},
				others
			)
			.then((result) => {
				const data = result.data as Page<T>;
				tableLoading.value = false;
				skeletonLoading.value = false;
				tableItems.value = data.content;
				totalPages.value = data.totalPages;
				totalItems.value = parseInt(data.totalElements, 0);
			})
			.catch(() => {
				tableLoading.value = false;
			});
	};

	return {
		tableItems,
		tableLoading,
		skeletonLoading,
		pageNumber,
		pageSize,
		totalItems,
		totalPages,
		pagination,
	};
}
