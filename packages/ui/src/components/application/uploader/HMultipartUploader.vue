<template>
	<q-file outlined v-model="model" stack-label>
		<template #label> </template>
		<template v-slot:append>
			<q-icon name="attach_file" />
		</template>
		<template v-slot:selected> </template>
	</q-file>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';

import type { QUploaderFactoryObject } from 'quasar';

export default defineComponent({
	name: 'HMultipartUploader',

	setup(props) {
		const model = ref('');
		let onUpload = (files: readonly File[]): Promise<QUploaderFactoryObject> => {
			console.log(files);
			return new Promise((resolve, reject) => {
				// Retrieve JWT token from your store.
				const token = 'myToken';
				resolve({
					url: 'http://localhost:4444/fileuploader/upload',
					method: 'POST',
					headers: [{ name: 'Authorization', value: `Bearer ${token}` }],
				});
			});
		};

		return {
			onUpload,
			model,
		};
	},
});
</script>
