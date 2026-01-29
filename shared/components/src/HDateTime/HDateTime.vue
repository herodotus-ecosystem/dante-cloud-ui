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

<script setup lang="ts">
import { ClosePopup, QBtn, QDate, QIcon, QInput, QPopupProxy, QTime } from 'quasar';

defineOptions({
  name: 'HDateTime',
  components: {
    QInput,
    QIcon,
    QPopupProxy,
    QTime,
    QBtn,
    QDate,
  },
  directives: {
    ClosePopup,
  },
});

const dateTimeValue = defineModel({
  type: String,
  default: '',
});
</script>
