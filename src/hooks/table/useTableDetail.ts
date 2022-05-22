import type { VForm } from 'vuetify/lib/components';

import { onMounted, ref, Ref } from 'vue';
import { useRoute } from 'vue-router';
import { BaseService } from '/@/apis';
import { Operation } from '/@/lib/enums';
import { RouteUtils } from '/@/lib/utils';

export default function useTableDetail<T = any>(form: InstanceType<typeof VForm>, baseService: BaseService<T>) {
	const route = useRoute();

	const editedItem = ref({}) as Ref<T>;
	const operation = ref(Operation.CREATE) as Ref<Operation>;

	onMounted(() => {
		parseParam();
	});

	const parseParam = () => {
		if (route.params) {
			if (route.params.item) {
				let item = JSON.parse(route.params.item as string);
				editedItem.value = item;
			}
			if (route.params.operation) {
				operation.value = route.params.operation as Operation;
			}
		}
	};

	const saveOrUpdate = () => {
		const refs = form;
		if (refs) {
			refs.validate().then((result: any) => {
				baseService
					.saveOrUpdate(editedItem.value)
					.then(() => {
						RouteUtils.toPrev(route);
					})
					.catch(() => {});
			});
		}

		return {
			saveOrUpdate,
			editedItem,
		};
	};
}
