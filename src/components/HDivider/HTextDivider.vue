<template>
	<v-row justify="center" no-gutters class="mb-2">
		<v-col :cols="leftWidth" align-self="center"><v-divider></v-divider></v-col>
		<v-col :cols="centerWidth">
			<h-label :weight="weight" :text="label"></h-label>
		</v-col>
		<v-col :cols="rightWidth" align-self="center"><v-divider></v-divider></v-col>
	</v-row>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, onMounted } from 'vue';
import { HLabel } from '../HLabel';

export default defineComponent({
	name: 'HTextDivider',
	components: {
		HLabel,
	},
	props: {
		justify: {
			type: String as PropType<'start' | 'center' | 'end'>,
			default: 'center',
		},
		weight: {
			type: String as PropType<'black' | 'bold' | 'medium' | 'regular' | 'light' | 'thin'>,
			default: 'black',
		},
		label: String,
	},
	setup(props) {
		const leftWidth = ref<number>(0);
		const centerWidth = ref<number>(0);
		const rightWidth = ref<number>(0);

		const adjustWidth = (justify: string) => {
			switch (justify) {
				case 'start':
					leftWidth.value = 2;
					centerWidth.value = 4;
					rightWidth.value = 6;
					break;
				case 'end':
					leftWidth.value = 6;
					centerWidth.value = 4;
					rightWidth.value = 2;
					break;
				default:
					leftWidth.value = 4;
					centerWidth.value = 4;
					rightWidth.value = 4;
					break;
			}
		};

		onMounted(() => {
			adjustWidth(props.justify);
		});

		return {
			leftWidth,
			centerWidth,
			rightWidth,
		};
	},
});
</script>
