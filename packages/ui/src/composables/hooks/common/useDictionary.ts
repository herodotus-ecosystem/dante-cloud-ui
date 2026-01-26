import type { Ref } from 'vue';
import { ref, nextTick, onBeforeMount, computed } from 'vue';
import type { Dictionary } from '@/composables/declarations';

import { isEmpty } from 'lodash-es';

import { useDictionaryStore } from '@/composables/stores';

export default function useDictionary(category: string, ...others: string[]) {
  const dictionaryStore = useDictionaryStore();

  const options = ref([]) as Ref<Array<Dictionary> | undefined>;

  onBeforeMount(async () => {
    options.value = getDictionary();
    if (isEmpty(options.value)) {
      if (isEmpty(others)) {
        await dictionaryStore.fetchByCategory(category);
      } else {
        await dictionaryStore.fetchCategory(category, ...others);
      }
    }
    nextTick(() => {
      if (isEmpty(options.value)) {
        options.value = getDictionary();
      }
    });
  });

  const getDictionary = (item: string = category) => {
    return dictionaryStore.getDictionary(item);
  };

  const getDictionaryItem = (key: string, value: string) => {
    return dictionaryStore.getDictionaryItem(key, value);
  };

  const getDictionaryItemDisplay = (key: string, value: string) => {
    return dictionaryStore.getDictionaryItemDisplay(key, value);
  };

  const isShow = computed(() => {
    return !isEmpty(options.value);
  });

  return {
    options,
    isShow,
    getDictionary,
    getDictionaryItem,
    getDictionaryItemDisplay,
  };
}
