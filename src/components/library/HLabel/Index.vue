<template>
	<div :class="display">{{ text }}</div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';

export default defineComponent({
	name: 'HLabel',

	props: {
		size: {
			type: String as PropType<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>,
			default: '',
		},
		style: {
			type: String as PropType<'button' | 'caption' | 'overline' | 'subtitle-1' | 'subtitle-2' | 'body-1' | 'body-2'>,
			default: '',
		},
		weight: {
			type: String as PropType<'black' | 'bold' | 'medium' | 'regular' | 'light' | 'thin'>,
			default: 'regular',
		},
		align: {
			type: String as PropType<'left' | 'right' | 'center' | 'justify' | 'start' | 'end'>,
			default: 'center',
		},
		breakpoint: {
			type: String as PropType<'sm' | 'md' | 'lg' | 'xl'>,
			default: '',
		},
		text: String,
	},

	setup(props) {
		const getTextClass = (value: string) => {
			return 'text-' + value;
		};

		const getSize = () => {
			if (props.size) {
				if (props.breakpoint) {
					return props.breakpoint + '-' + props.size;
				} else {
					return props.size;
				}
			}

			return '';
		};

		const getStyle = () => {
			return props.style ? props.style : '';
		};

		const getWeight = () => {
			return 'font-weight-' + props.weight;
		};

		const getTypography = () => {
			const size = getSize();
			const style = getStyle();
			if (size) {
				return getTextClass(size);
			} else {
				if (style) {
					return getTextClass(style);
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
