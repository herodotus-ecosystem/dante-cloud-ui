<template>
  <h-center-form-layout
    :entity="editedItem"
    :title="title"
    :overlay="overlay"
    :operation="operation"
    @save="onSave()"
  >
    <h-text-field
      v-model="editedItem.path"
      name="path"
      label="Vue Router 请求路径"
      placeholder="请输入 Vue Router 请求路径"
    ></h-text-field>
    <h-text-field
      v-model="editedItem.name"
      name="name"
      label="Vue Component 名称 "
      placeholder="Vue Component 名称"
    ></h-text-field>
    <h-text-field
      v-model="editedItem.title"
      name="title"
      label="显示标题"
      placeholder="请输入显示标题"
    ></h-text-field>
    <h-icon-select v-model="editedItem.icon" label="显示图标"></h-icon-select>
    <h-text-field
      v-model="editedItem.component"
      name="component"
      label="Vue Component 页面相对路径"
      placeholder="请输入Vue Component 页面相对路径"
    ></h-text-field>
    <h-text-field
      v-model="editedItem.redirect"
      name="redirect"
      label="Vue Router 重定向地址 "
      placeholder="如果包含子节点，即 children 中元素的 path"
    ></h-text-field>

    <h-tree-field
      v-model="editedItem.parentId"
      :items="treeItems"
      bottom-slots
      label="上级节点"
    ></h-tree-field>

    <div class="column q-gutter-y-sm">
      <h-switch v-model="editedItem.isNotKeepAlive" label="该应页面不需要KeepAlive缓存"></h-switch>
      <h-switch v-model="editedItem.isIgnoreAuth" label="该页面不需要权限验证"></h-switch>
      <h-switch
        v-if="!editedItem.isDetailContent"
        v-model="editedItem.isHaveChild"
        label="该页面下包含子页面"
      ></h-switch>
      <h-switch
        v-if="editedItem.isHaveChild"
        v-model="editedItem.isHideAllChild"
        label="在菜单中隐藏该节点下所有子节点"
      ></h-switch>
      <h-switch
        v-if="!editedItem.isHaveChild"
        v-model="editedItem.isDetailContent"
        label="该页面是三级路由页面"
      ></h-switch>
    </div>
  </h-center-form-layout>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';

import type { SysElementEntity, SysElementConditions } from '@/composables/declarations';

import { useTableItem, useTreeItems } from '@/composables/hooks';
import { API } from '@/configurations';

import { HCenterFormLayout } from '@/components';

export default defineComponent({
  name: 'SysElementContent',

  components: {
    HCenterFormLayout,
  },

  setup() {
    const { editedItem, operation, title, overlay, saveOrUpdate } = useTableItem<SysElementEntity>(
      API.core.sysElement(),
    );
    const { treeItems } = useTreeItems<SysElementConditions, SysElementEntity>(
      API.core.sysElement(),
    );

    const onSave = () => {
      saveOrUpdate();
    };

    watch(
      () => editedItem.value.redirect,
      (newValue) => {
        if (newValue) {
          editedItem.value.isHaveChild = true;
        } else {
          editedItem.value.isHaveChild = false;
        }
      },
      { deep: true },
    );

    return {
      editedItem,
      operation,
      title,
      onSave,
      treeItems,
      overlay,
    };
  },
});
</script>
