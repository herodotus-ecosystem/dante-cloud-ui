<template>
  <q-input
    v-model="dateTimeValue"
    outlined
    clearable
    :bottom-slots="hasError"
    :error="hasError"
    :error-message="errorMessage"
    v-bind="$attrs">
    <template v-slot:prepend>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date v-model="dateTimeValue" mask="YYYY-MM-DD HH:mm">
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="关闭" color="primary"></q-btn>
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>

    <template v-slot:append>
      <q-icon name="access_time" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-time v-model="dateTimeValue" mask="YYYY-MM-DD HH:mm" format24h>
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="关闭" color="primary"></q-btn>
            </div>
          </q-time>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
// 在 monorepo 模块中定义的组件，如果使用 quasar directives，打包之后会出现找不到引用的情况，所以这里手动导入临时解决
import { ClosePopup } from 'quasar';

export default defineComponent({
  name: 'HDateTime',

  props: {
    modelValue: { type: String },
    errorMessage: { type: String }
  },

  directives: {
    ClosePopup
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const dateTimeValue = computed({
      get: () => props.modelValue,
      set: newValue => {
        emit('update:modelValue', newValue);
      }
    });

    const hasError = computed(() => {
      return props.errorMessage ? true : false;
    });

    return {
      dateTimeValue,
      hasError
    };
  }
});
</script>
