<template>
	<div :class="getClasses()">
		<slot></slot>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';

const constants = {
	base: 'col',
};

export default defineComponent({
	name: 'HColumn',

	props: {
		cols: { type: Number, validator: (value: number) => 0 < value && value <= 12 },
	},

	setup(props) {
		const classes: string[] = reactive([]);

		const create = (breakpoints = '', size = 0) => {
			if (breakpoints && size) {
				return constants.base + '-' + breakpoints + '-' + size;
			} else {
				if (breakpoints) {
					return constants.base + '-' + breakpoints;
				} else if (size) {
					return constants.base + '-' + size;
				} else {
					return constants.base;
				}
			}
		};

		const appendClass = (value: string) => {
			if (value) {
				classes.push(value as string);
			}
		};

		const getClasses = (): string => {
			if (classes.length > 1) {
				return classes.join(' ');
			} else if (classes.length === 1) {
				return classes[0];
			} else {
				return constants.base;
			}
		};

		const createBase = () => create('', props.cols);

		const initialize = () => {
			appendClass(createBase());
		};

		onMounted(() => {
			initialize();
			console.log(classes);
		});

		return { getClasses };
	},
});
</script>
