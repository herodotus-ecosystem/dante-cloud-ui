<template>
	<v-card class="ma-5" flat>
		<v-card-title> 扫码登录 </v-card-title>
		<v-card-text>
			<v-fade-transition mode="out-in">
				<v-row class="mb-5" justify="center">
					<v-card height="320" width="320" variant="outlined">
						<v-img
							:src="`https://picsum.photos/500/300?image=${6 * 5 + 10}`"
							:lazy-src="`https://picsum.photos/10/6?image=${6 * 5 + 10}`"
							aspect-ratio="1"
							cover
							class="bg-grey-lighten-2"
						>
							<template v-slot:placeholder>
								<v-row class="fill-height ma-0" align="center" justify="center">
									<v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
								</v-row>
							</template>
						</v-img>
					</v-card>
				</v-row>
			</v-fade-transition>
			<v-btn block class="mb-5" color="primary" variant="outlined" rounded="pill" @click="application.switchToAccountPanel()">返回</v-btn>
		</v-card-text>
	</v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useApplicationStore } from '/@/stores';

export default defineComponent({
	name: 'HSignInScanPanel',

	setup() {
		const application = useApplicationStore();

		return {
			application,
		};
	},
});
</script>
