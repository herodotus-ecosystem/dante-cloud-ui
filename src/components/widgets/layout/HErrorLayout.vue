<template>
	<h-container class="window-width window-height" :offset="4" wider="center" align="center">
		<h-row class="justify-center">
			<h-column>
				<q-card flat>
					<q-card-section>
						<slot></slot>
					</q-card-section>
				</q-card> </h-column
		></h-row>
	</h-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { HColumn, HContainer, HRow } from '/@/components';

export default defineComponent({
	name: 'HErrorLayout',

	components: {
		HColumn,
		HContainer,
		HRow,
	},
});
</script>
