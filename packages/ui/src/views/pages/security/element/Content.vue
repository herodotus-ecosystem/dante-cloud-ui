<template>
  <h-center-form-layout :entity="editedItem" :title="title" :operation="operation" @save="onSave()">
    <h-text-field v-model="editedItem.title" name="title" label="标题" placeholder="请输入标题"></h-text-field>
    <h-text-field v-model="editedItem.path" name="path" label="请求路径" placeholder="请输入请求路径"></h-text-field>
    <h-element-tree v-model:selected="editedItem.parentId" :value="parentPath" label="上级节点"></h-element-tree>
    <h-icon-select v-model="editedItem.icon" label="图标"></h-icon-select>
    <h-text-field v-model="editedItem.name" name="name" label="组件名称 " placeholder="请输入组件名称"></h-text-field>
    <h-text-field
      v-model="editedItem.component"
      name="component"
      label="组件路径"
      placeholder="请输入组件路径"></h-text-field>
    <h-text-field
      v-model="editedItem.redirect"
      name="redirect"
      label="重定向地址 "
      placeholder="请输入重定向地址"></h-text-field>

    <div class="column q-gutter-y-sm">
      <h-switch v-model="editedItem.isHaveChild" label="该节点是否包含子节点"></h-switch>
      <h-switch v-model="editedItem.isNotKeepAlive" label="该节点不需要缓存"></h-switch>
      <h-switch v-model="editedItem.isDetailContent" label="该节点是三级路由节点"></h-switch>
      <h-switch v-model="editedItem.isHideAllChild" label="该节点下所有子节点隐藏"></h-switch>
      <h-switch v-model="editedItem.isIgnoreAuth" label="该节点无须验证权限"></h-switch>
    </div>
  </h-center-form-layout>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

import type { SysElement } from '/@/lib/declarations';
import { api } from '/@/lib/utils';

import { useTableItem } from '/@/hooks';
import { HCenterFormLayout, HElementTree } from '/@/components';

export default defineComponent({
  name: 'SysElementContent',

  components: {
    HCenterFormLayout,
    HElementTree
  },

  setup(props) {
    const { editedItem, operation, title, saveOrUpdate } = useTableItem<SysElement>(api.sysElement());

    const parentPath = ref('');

    const onSave = () => {
      saveOrUpdate();
    };

    onMounted(() => {
      if (editedItem.value.parentId) {
        api
          .sysElement()
          .fetchById(editedItem.value.parentId)
          .then(result => {
            const data = result.data as SysElement;
            if (data) {
              parentPath.value = data.path;
            }
          });
      }
    });

    return {
      editedItem,
      operation,
      title,
      onSave,
      parentPath
    };
  }
});
</script>
