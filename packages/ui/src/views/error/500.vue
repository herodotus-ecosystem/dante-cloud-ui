<template>
	<h-error-layout>
		<icon-service-error height="80vh" width="100%" />
	</h-error-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { HErrorLayout } from '/@/components';
import IconServiceError from '~icons/custom/service-error';

export default defineComponent({
	name: 'ServiceError',

	components: {
		IconServiceError,
		HErrorLayout,
	},
});
</script>
