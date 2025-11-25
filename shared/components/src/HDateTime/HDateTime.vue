<template>
  <q-input v-model="dateTimeValue" outlined bottom-slots v-bind="$attrs">
    <template v-slot:prepend>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date v-model="dateTimeValue" mask="YYYY-MM-DD HH:mm:ss">
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
          <q-time v-model="dateTimeValue" mask="YYYY-MM-DD HH:mm:ss" format24h with-seconds>
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
import { ClosePopup } from 'quasar';

export default defineComponent({
  name: 'HDateTime',

  directives: {
    ClosePopup,
  },

  props: {
    modelValue: { type: String, default: '', required: true },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const dateTimeValue = computed({
      get: () => props.modelValue,
      set: newValue => {
        emit('update:modelValue', newValue);
      },
    });

    return {
      dateTimeValue,
    };
  },
});
</script>
