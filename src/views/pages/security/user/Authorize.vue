<template>
	<div>
		<h-detail-header></h-detail-header>
		<q-separator></q-separator>
		<h-container column="two" :offset="3" mode-for-two="right-left" gutter="lg" horizontal-gutter class="q-mx-md">
			<q-card dark bordered class="bg-grey-9 my-card">
				<q-card-section>
					<div class="text-h6">Our Changing Planet</div>
					<div class="text-subtitle2">by John Doe</div>
				</q-card-section>

				<q-separator dark inset />

				<q-card-section> sfsfsfsfd </q-card-section>
			</q-card>

			<template #right>
				<h-authorize-list></h-authorize-list>
			</template>
		</h-container>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { HDetailHeader, HContainer, HAuthorizeList } from '/@/components';

export default defineComponent({
	name: 'SysUserAuthorize',

	components: {
		HAuthorizeList,
		HContainer,
		HDetailHeader,
	},
});
</script>
