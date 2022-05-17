import { onMounted, watch, ref, Ref } from 'vue';
import { Page } from '/@/lib/declarations';
import { BaseService } from '/@/apis';

export default function useFetchByPage<T = any>(baseService: BaseService<T>) {
	const tableItems = ref<T[]>([]) as Ref<T[]>;
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
		findItemsByPage(num);
	};

	const findItemsByPage = (num: number = 1, others = {}) => {
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

				skeletonLoading.value = false;
				tableItems.value = data.content;
				totalPages.value = data.totalPages;
				totalItems.value = parseInt(data.totalElements, 0);
			})
			.catch(() => {});
	};

	return {
		tableItems,
		skeletonLoading,
		pageNumber,
		pageSize,
		totalItems,
		totalPages,
		pagination,
	};
}
