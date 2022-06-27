<template>
	<q-toolbar class="bg-primary text-white q-px-none">
		<q-file v-model="bpmnModelFile" label-color="white" square standout dense label="打开文件">
			<template v-slot:prepend>
				<q-icon name="mdi-folder-open" color="white" />
			</template>
		</q-file>
		<q-separator vertical color="white"></q-separator>
		<q-btn-dropdown stretch flat label="下载文件" icon="mdi-download-box">
			<q-list>
				<q-list>
					<h-list-item label="下载为XML文件" icon="mdi-xml" @click="onDownloadXml()"></h-list-item>
					<h-list-item label="下载为SVG文件" icon="mdi-svg" @click="onDownloadSvg()"></h-list-item>
					<h-list-item label="下载为BPMN文件" icon="mdi-codepen" @click="onDownloadBpmn()"></h-list-item>
				</q-list>
			</q-list>
		</q-btn-dropdown>
		<q-separator vertical color="white"></q-separator>
		<q-btn-dropdown stretch flat label="代码预览" icon="mdi-eye">
			<q-list>
				<q-list>
					<h-list-item label="预览XML" icon="mdi-xml"></h-list-item>
					<h-list-item label="预览JSON" icon="mdi-code-json"></h-list-item>
				</q-list>
			</q-list>
		</q-btn-dropdown>
		<q-separator vertical color="white"></q-separator>
		<q-btn stretch flat color="primary" text-color="white" label="Third" />
		<q-separator vertical color="white"></q-separator>
		<q-btn-group class="q-ml-xs">
			<q-btn color="" icon="timeline" />
			<q-btn color="accent" icon="visibility" />
			<q-btn color="accent" icon="update" />
			<q-btn color="" icon="timeline" />
			<q-btn color="accent" icon="visibility" />
			<q-btn color="accent" icon="update" />
		</q-btn-group>
		<q-btn-group class="q-ml-xs">
			<q-btn color="" icon="timeline" />
			<q-btn color="accent" icon="visibility" />
			<q-btn color="accent" icon="update" />
		</q-btn-group>
		<q-btn-group class="q-mx-xs">
			<q-btn color="white" text-color="grey-8" icon="mdi-undo-variant" @click="onUndo" />
			<q-separator vertical color="grey-6"></q-separator>
			<q-btn color="white" text-color="grey-8" icon="mdi-redo-variant" @click="onRedo" />
			<q-separator vertical color="grey-6"></q-separator>
			<q-btn color="white" text-color="grey-8" icon="mdi-refresh" />
		</q-btn-group>
	</q-toolbar>
</template>

<script lang="ts">
import { defineComponent, computed, ref, Ref, watch, PropType } from 'vue';

export default defineComponent({
	name: 'HBpmnDesignerToolbar',

	props: {
		file: { type: String, required: true },
	},

	emits: ['update:file', 'undo', 'redo', 'downloadXml', 'downloadSvg', 'downloadBpmn'],

	setup(props, { emit }) {
		const bpmnModelFile = ref(null) as Ref<File | null>;

		const selectedFile = computed({
			get: () => props.file,
			set: (newValue) => {
				emit('update:file', newValue);
			},
		});

		const readFileContent = async (file: File | null) => {
			if (file) {
				const content = await file.text();
				if (content) {
					selectedFile.value = content;
				}
			} else {
				selectedFile.value = '';
			}
		};

		watch(bpmnModelFile, (newValue: File | null) => {
			readFileContent(newValue);
		});

		const onUndo = () => {
			emit('undo');
		};

		const onRedo = () => {
			emit('redo');
		};

		const onDownloadXml = () => {
			emit('downloadXml');
		};

		const onDownloadSvg = () => {
			emit('downloadSvg');
		};

		const onDownloadBpmn = () => {
			emit('downloadBpmn');
		};

		return {
			bpmnModelFile,
			onUndo,
			onRedo,
			onDownloadXml,
			onDownloadSvg,
			onDownloadBpmn,
		};
	},
});
</script>
