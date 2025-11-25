<template>
  <q-card>
    <h-authorize-header @save="onSave()" @clear="onClear()"></h-authorize-header>
    <q-item v-for="(item, i) in selectedItems" :key="i" class="q-my-sm" clickable v-ripple>
      <h-http-method-avatar v-if="httpMethod" :method="getHttpMethod(item)"></h-http-method-avatar>

      <q-item-section>
        <q-item-label>{{ getTitle(item) }}</q-item-label>
        <q-item-label v-if="prependSubtitle" caption lines="1">{{
          getSubtitle(item)
        }}</q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-icon name="mdi-delete" color="red" @click="onRemoveItem(item)" />
      </q-item-section>
    </q-item>
  </q-card>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, computed } from 'vue';
import type { AbstractSysEntity, HttpMethod } from '@/lib/declarations';

import { lodash } from '@/lib/utils';

import HAuthorizeHeader from './HAuthorizeHeader.vue';
import HHttpMethodAvatar from './HHttpMethodAvatar.vue';

export default defineComponent({
  name: 'HAuthorizeList',

  components: {
    HHttpMethodAvatar,
    HAuthorizeHeader,
  },

  props: {
    modelValue: {
      type: Array as PropType<Array<AbstractSysEntity>>,
      default: () => [],
      required: true,
    },
    prependTitle: { type: String, required: true },
    prependSubtitle: { type: String },
    appendTitle: { type: String },
    appendSubtitle: { type: String },
    rowKey: { type: String, required: true },
    httpMethod: { type: Boolean, default: false },
    httpMethodKey: { type: String },
  },

  emits: ['update:modelValue', 'save', 'clear'],

  setup(props, { emit }) {
    const selectedItems = computed({
      get: () => props.modelValue,
      set: (newValue) => {
        emit('update:modelValue', newValue);
      },
    });

    const clear = () => {
      selectedItems.value = [];
    };

    const getValueProperty = (item: AbstractSysEntity, property: string) => {
      const attribute = property as keyof AbstractSysEntity;
      return item[attribute];
    };

    const getTitle = (item: AbstractSysEntity) => {
      let title = getValueProperty(item, props.prependTitle);
      if (props.appendTitle) {
        title += ' -- ' + getValueProperty(item, props.appendTitle);
      }

      return title;
    };

    const getSubtitle = (item: AbstractSysEntity) => {
      if (props.prependSubtitle) {
        let subtitle = getValueProperty(item, props.prependSubtitle);
        if (props.appendSubtitle) {
          subtitle += ' -- ' + getValueProperty(item, props.appendSubtitle);
        }

        return subtitle;
      } else {
        return '';
      }
    };

    const getHttpMethod = (item: AbstractSysEntity): HttpMethod => {
      if (props.httpMethodKey) {
        return getValueProperty(item, props.httpMethodKey) as HttpMethod;
      } else {
        return 'GET';
      }
    };

    const onRemoveItem = (item: AbstractSysEntity) => {
      let index = lodash.findIndex(selectedItems.value, item);
      lodash.remove(selectedItems.value, index);
      selectedItems.value = selectedItems.value.filter((i) => {
        return getValueProperty(i, props.rowKey) != getValueProperty(item, props.rowKey);
      });
    };

    const onSave = () => {
      emit('save');
    };

    const onClear = () => {
      selectedItems.value = [];
    };

    return {
      selectedItems,
      getHttpMethod,
      onRemoveItem,
      clear,
      getTitle,
      getSubtitle,
      onSave,
      onClear,
      getValueProperty,
    };
  },
});
</script>
