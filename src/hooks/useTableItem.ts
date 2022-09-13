import { onMounted, ref, Ref, computed } from 'vue';
import { useRoute } from 'vue-router';

import type { Entity } from '/@/lib/declarations';

import { BaseService } from '/@/apis';
import { OperationEnum } from '/@/lib/enums';
import { toast } from '/@/lib/utils';
import { useRouteStore } from '/@/stores';
import useEditFinish from './useEditFinish';

export default function useTableItem<T extends Entity>(baseService: BaseService<T>) {
	const route = useRoute();

	const editedItem = ref({}) as Ref<T>;
	const operation = ref(OperationEnum.CREATE) as Ref<OperationEnum>;
	const title = ref('');
	const overlay = ref(false);
	const store = useRouteStore();

	const { onFinish } = useEditFinish();

	onMounted(() => {
		parseParam();
	});

	const generateTitle = (content: string, operation: OperationEnum) => {
		if (operation) {
			switch (operation) {
				case OperationEnum.AUTHORIZE:
					return '配置' + content;
				case OperationEnum.EDIT:
					return '编辑' + content;
				default:
					return '新建' + content;
			}
		} else {
			return content;
		}
	};

	const parseParam = () => {
		console.log(route);

		const name = route.name as string;
		console.log(name);
		if (name) {
			const params = store.getRoutePushParam(name);
			if (params.item) {
				const item = JSON.parse(params.item as string);
				editedItem.value = item;
			}
			if (params.operation) {
				operation.value = params.operation as OperationEnum;
			}
		}
	};

	const isEdit = computed(() => {
		return operation.value === OperationEnum.EDIT;
	});

	const saveOrUpdate = () => {
		overlay.value = true;
		baseService
			.saveOrUpdate(editedItem.value)
			.then((response) => {
				const result = response as HttpResult<T>;
				overlay.value = false;
				onFinish();
				if (result.message) {
					toast.success(result.message);
				} else {
					toast.success('保存成功');
				}
			})
			.catch(() => {
				overlay.value = false;
				onFinish();
				toast.error('保存失败');
			});
	};

	const assign = (data: any) => {
		overlay.value = true;
		baseService
			.assign(data)
			.then((response) => {
				const result = response as HttpResult<T>;
				overlay.value = false;
				onFinish();
				if (result.message) {
					toast.success(result.message);
				} else {
					toast.success('保存成功');
				}
			})
			.catch(() => {
				overlay.value = false;
				onFinish();
				toast.error('保存失败');
			});
	};

	return {
		editedItem,
		operation,
		title,
		overlay,
		saveOrUpdate,
		assign,
		isEdit,
	};
}
