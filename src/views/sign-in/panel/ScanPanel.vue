<template>
	<q-card>
		<q-card-section>
			<h-label size="h6" text="扫码登录" align="left"></h-label>
		</q-card-section>

		<q-card-section class="q-gutter-y-lg">
			<q-card>
				<q-card-section>
          <wx-login v-if="auth_uri"
            :auth_uri="auth_uri"
            :href="'data:text/css;base64,LmltcG93ZXJCb3ggLnFyY29kZxxx='"
            rel="external nofollow">
          </wx-login>
				</q-card-section>
			</q-card>

			<q-btn rounded unelevated outline class="full-width" label="返回" @click="application.switchToAccountPanel()" />
		</q-card-section>
	</q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { useApplicationStore } from '/@/stores';
import WxLogin from "/@/views/sign-in/panel/WxLogin.vue";
import {useSignApi} from "/@/apis/modules/sign";
import {variables} from "/@/lib/utils";

export default defineComponent({
	name: 'ScanPanel',
  components: {
    WxLogin
  },
	setup() {
		const application = useApplicationStore();
    const api=useSignApi();
    const service=api.wx;
    const auth_uri = ref('');

    onMounted(()=>{
      service.getRedirectUri().then((response)=>{
        const result = response as HttpResult<string>;
        auth_uri.value=result.data;
      });
    });
		return {
			application,
      auth_uri,
		};
	},
});
</script>
