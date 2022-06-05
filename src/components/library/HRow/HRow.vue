<template>
	<div :class="getClasses()">
		<slot></slot>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, PropType } from 'vue';

const constants = {
	base: 'row',
	gutter: 'q-col-gutter',
	justify: 'justify',
};

export default defineComponent({
	name: 'HRow',

	props: {
		justify: { type: String as PropType<'start' | 'center' | 'end' | 'around' | 'between' | 'evenly'>, default: 'center' },
		gutter: { type: String as PropType<'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'>, default: 'none' },
		horizontalGutter: { type: Boolean, default: false },
		verticalGutter: { type: Boolean, default: false },
	},

	setup(props) {
		const classes: string[] = reactive([]);

		const createGutter = (size: string, direction = '') => {
			if (direction) {
				return constants.gutter + '-' + direction + '-' + size;
			} else {
				return constants.gutter + '-' + size;
			}
		};

		const createJustify = () => {
			return constants.justify + '-' + props.justify;
		};

		const createHorizontalGutter = (size: string) => {
			return createGutter(size, 'x');
		};

		const createVerticalGutter = (size: string) => {
			return createGutter(size, 'y');
		};

		const appendClass = (value: string): void => {
			if (value) {
				classes.push(value);
			}
		};

		const getClasses = (): string => {
			if (classes.length > 1) {
				return classes.join(' ') as string;
			} else if (classes.length === 1) {
				return classes[0];
			} else {
				return constants.base;
			}
		};

		const initialize = () => {
			appendClass(constants.base);
			appendClass(createJustify());

			if (props.gutter !== 'none') {
				if (!props.horizontalGutter && !props.verticalGutter) {
					appendClass(createGutter(props.gutter));
				} else {
					if (props.horizontalGutter) {
						appendClass(createHorizontalGutter(props.gutter));
					}

					if (props.verticalGutter) {
						appendClass(createVerticalGutter(props.gutter));
					}
				}
			}
		};

		onMounted(() => {
			initialize();
		});

		return { getClasses };
	},
});
</script>
