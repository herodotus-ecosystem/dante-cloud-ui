import { onMounted, ref, Ref } from 'vue';
import { useRoute } from 'vue-router';

import type { Entity } from '/@/lib/declarations';

import { BaseService } from '/@/apis';
import { Operation } from '/@/lib/enums';
import { toast } from '/@/lib/utils';
import useEditFinish from './useEditFinish';

export default function useTableItem<T extends Entity>(baseService: BaseService<T>) {
	const route = useRoute();

	const editedItem = ref({}) as Ref<T>;
	const operation = ref(Operation.CREATE) as Ref<Operation>;
	const title = ref('');

	const { onFinish } = useEditFinish();

	onMounted(() => {
		parseParam();
	});

	const parseParam = () => {
		console.log(route.params);
		if (route.params) {
			if (route.params.item) {
				const item = JSON.parse(route.params.item as string);
				editedItem.value = item;
			}
			if (route.params.operation) {
				operation.value = route.params.operation as Operation;
			}
		}

		if (route.meta && route.meta.title) {
			title.value = route.meta.title as string;
		}
	};

	const saveOrUpdate = () => {
		baseService
			.saveOrUpdate(editedItem.value)
			.then((response) => {
				const result = response as HttpResult<T>;
				onFinish();
				if (result.message) {
					toast.success(result.message);
				} else {
					toast.success('保存成功');
				}
			})
			.catch(() => {
				onFinish();
				toast.error('保存失败');
			});
	};

	return {
		editedItem,
		operation,
		title,
		saveOrUpdate,
	};
}
