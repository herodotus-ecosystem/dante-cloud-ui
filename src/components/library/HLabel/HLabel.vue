<template>
	<div :class="display">{{ text }}</div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';

export default defineComponent({
	name: 'HLabel',

	props: {
		size: { type: String as PropType<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>, default: '' },
		manner: { type: String as PropType<'caption' | 'overline' | 'subtitle-1' | 'subtitle-2' | 'body-1' | 'body-2'>, default: '' },
		weight: { type: String as PropType<'thin' | 'light' | 'regular' | 'medium' | 'bold' | 'bolder'>, default: 'medium' },
		align: { type: String as PropType<'left' | 'right' | 'center' | 'justify'>, default: 'center' },
		text: String,
	},

	setup(props) {
		const getTextClass = (value: string) => {
			return 'text-' + value;
		};

		const getWeight = () => {
			return 'font-weight-' + props.weight;
		};

		const getTypography = () => {
			if (props.size) {
				return getTextClass(props.size);
			} else {
				if (props.manner) {
					return getTextClass(props.manner);
				} else {
					return '';
				}
			}
		};

		const getAlignment = () => {
			return getTextClass(props.align);
		};

		const display = computed(() => {
			const value = [getAlignment(), getWeight()];
			const typography = getTypography();
			if (typography) {
				value.push(typography);
			}

			return value.join(' ');
		});

		return {
			display,
		};
	},
});
</script>
