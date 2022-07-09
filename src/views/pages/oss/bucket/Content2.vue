<template>
	<h-multipart-uploader></h-multipart-uploader>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onMounted, nextTick } from 'vue';
import type { MultipartUploadCreateResponse, SimpleUploader, SimpleUploaderFile, SimpleUploaderChunk } from '/@/lib/declarations';
import { useOssApi } from '/@/apis';

import { HMultipartUploader } from '/@/components';

export default defineComponent({
	name: 'OssBucket',

	components: {
		HMultipartUploader,
	},

	setup(props) {
		return {};
	},
});
</script>

<style lang="scss">
.uploader-example {
	width: 880px;
	padding: 15px;
	margin: 40px auto 0;
	font-size: 12px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}
.uploader-example .uploader-btn {
	margin-right: 4px;
}
.uploader-example .uploader-list {
	max-height: 440px;
	overflow: auto;
	overflow-x: hidden;
	overflow-y: auto;
}
</style>
