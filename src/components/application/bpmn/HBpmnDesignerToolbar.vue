<template>
	<q-toolbar class="bg-white q-px-none">
		<q-btn-group class="q-mx-xs">
			<q-btn color="primary" text-color="white" label="打开文件" icon="mdi-folder-open" />
			<q-separator vertical></q-separator>
			<q-btn-dropdown color="primary" text-color="white" label="下载文件" icon="mdi-download-box">
				<q-list>
					<q-item clickable v-close-popup>
						<q-item-section avatar>
							<q-avatar icon="folder" color="primary" text-color="white" />
						</q-item-section>
						<q-item-section>
							<q-item-label>Photos</q-item-label>
							<q-item-label caption>February 22, 2016</q-item-label>
						</q-item-section>
						<q-item-section side>
							<q-icon name="info" color="amber" />
						</q-item-section>
					</q-item>

					<q-item clickable v-close-popup>
						<q-item-section avatar>
							<q-avatar icon="assignment" color="secondary" text-color="white" />
						</q-item-section>
						<q-item-section>
							<q-item-label>Vacation</q-item-label>
							<q-item-label caption>February 22, 2016</q-item-label>
						</q-item-section>
						<q-item-section side>
							<q-icon name="info" color="amber" />
						</q-item-section>
					</q-item>
				</q-list>
			</q-btn-dropdown>
			<q-separator vertical></q-separator>
			<q-btn color="primary" text-color="white" label="Third" />
		</q-btn-group>
		<q-btn-group class="q-ml-xs">
			<q-btn color="" icon="timeline" />
			<q-btn color="accent" icon="visibility" />
			<q-btn color="accent" icon="update" />
		</q-btn-group>
		<q-btn-group class="q-ml-xs">
			<q-btn color="white" text-color="black" icon="mdi-undo-variant" @click="onUndo" />
			<q-btn color="white" text-color="black" icon="mdi-redo-variant" @click="onRedo" />
			<q-btn color="white" text-color="black" icon="mdi-refresh" />
		</q-btn-group>
	</q-toolbar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'HBpmnDesignerToolbar',

	emits: ['undo', 'redo'],

	setup(props, { emit }) {
		const onUndo = () => {
			emit('undo');
		};

		const onRedo = () => {
			emit('redo');
		};

		return {
			onUndo,
			onRedo,
		};
	},
});
</script>
