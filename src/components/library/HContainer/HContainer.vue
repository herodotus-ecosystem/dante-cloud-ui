<template>
	<h-row v-if="isTwoColumn()" :gutter="gutter" :horizontal-gutter="horizontalGutter" :vertical-gutter="verticalGutter">
		<h-column :cols="leftCols">
			<slot v-if="isToTheLeft"></slot>
			<slot v-else name="left"></slot>
		</h-column>
		<h-column :cols="rightCols">
			<slot v-if="isToTheRight"></slot>
			<slot v-else name="right"></slot>
		</h-column>
	</h-row>
	<h-row v-else :gutter="gutter" :horizontal-gutter="horizontalGutter" :vertical-gutter="verticalGutter">
		<h-column :cols="leftCols">
			<slot name="left"></slot>
		</h-column>
		<h-column :cols="centerCols">
			<slot></slot>
		</h-column>
		<h-column :cols="rightCols">
			<slot name="right"></slot>
		</h-column>
	</h-row>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, computed, onBeforeMount, toRefs } from 'vue';

import { HRow } from '../HRow';
import { HColumn } from '../HColumn';

export default defineComponent({
	name: 'HContainer',

	components: {
		HRow,
		HColumn,
	},

	props: {
		// 容器布局的列数，两列或者列
		column: { type: String as PropType<'two' | 'three'>, default: 'three' },
		offset: { type: Number, default: 0 },
		/**
		 * 两列布局模式：
		 * default：左右相等
		 * left-right：左边窄，右边宽
		 * right-left：右边窄，左边看
		 */
		modeForTwo: { type: String as PropType<'default' | 'left-right' | 'right-left'>, default: 'default' },
		// 三列布局模式下，哪一列宽度最小
		/**
		 * 三列布局模式：
		 * default：三列相等
		 * start：左边窄，中间默认，右边宽
		 * center：两边相同，中间宽
		 * end：左边宽，中间默认，右边窄
		 */
		modeForThree: { type: String as PropType<'default' | 'start' | 'center' | 'end'>, default: 'center' },
		gutter: { type: String as PropType<'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'>, default: 'none' },
		horizontalGutter: { type: Boolean, default: false },
		verticalGutter: { type: Boolean, default: false },
	},

	setup(props) {
		const defaultTwoCols = 6;
		const defaultThreeCols = 4;

		const state = reactive({
			leftCols: 4,
			centerCols: 4,
			rightCols: 4,
		});

		const isTwoColumn = () => {
			if (props.column === 'two') {
				return true;
			} else {
				return false;
			}
		};

		// 增量
		const increment = (defaultValue: number, margin = 0) => {
			return defaultValue + props.offset + margin;
		};

		// 减量
		const decrement = (defaultValue: number) => {
			return defaultValue - props.offset;
		};

		// 偏右，右侧比左侧宽
		const toTheRight = (defaultValue: number, margin = 0) => {
			state.leftCols = decrement(defaultValue);
			state.rightCols = increment(defaultValue, margin);
		};

		// 偏左，左侧比右侧宽
		const toTheLeft = (defaultValue: number, margin = 0) => {
			state.leftCols = increment(defaultValue, margin);
			state.rightCols = decrement(defaultValue);
		};

		const setValue = (value: number, margin = 0) => {
			state.leftCols = value;
			state.rightCols = value + margin;
		};

		const toTheRightForTwo = () => {
			toTheRight(defaultTwoCols);
		};

		const toTheLeftForTwo = () => {
			toTheLeft(defaultTwoCols);
		};

		const toTheRightForThree = (margin = 0) => {
			toTheRight(defaultThreeCols, margin);
		};

		const toTheLeftForThree = (margin = 0) => {
			toTheLeft(defaultThreeCols, margin);
		};

		const setDefaultValueForTow = () => {
			setValue(defaultTwoCols);
		};

		const setDefaultValueForCenter = (margin = 0) => {
			state.centerCols = defaultThreeCols + margin;
		};

		const setDefaultValueForThree = () => {
			setDefaultValueForCenter();
			setValue(defaultThreeCols);
		};

		const isEven = (value: number) => {
			return Math.abs(value % 2) === 0;
		};

		const getDifference = () => {
			return 12 - (defaultThreeCols + props.offset);
		};

		const getSurplus = () => {
			return getDifference() / 2;
		};

		const isToTheLeft = computed(() => {
			return state.leftCols > state.rightCols;
		});

		const isToTheRight = computed(() => {
			return state.leftCols < state.rightCols;
		});

		const adjustWidth = () => {
			if (isTwoColumn()) {
				switch (props.modeForTwo) {
					case 'left-right':
						toTheRightForTwo();
						break;
					case 'right-left':
						toTheLeftForTwo();
						break;
					default:
						setDefaultValueForTow();
						break;
				}
			} else {
				switch (props.modeForThree) {
					case 'center':
						setDefaultValueForCenter(props.offset);
						const surplus = getSurplus();
						if (isEven(getDifference())) {
							setValue(surplus);
						} else {
							setValue(surplus, 1);
						}
						break;
					case 'start':
						setDefaultValueForCenter();
						if (isEven(props.offset)) {
							toTheRightForThree();
						} else {
							toTheRightForThree(1);
						}
						break;
					case 'end':
						setDefaultValueForCenter();
						if (isEven(props.offset)) {
							toTheLeftForThree();
						} else {
							toTheLeftForThree(1);
						}
						break;
					default:
						setDefaultValueForThree();
						break;
				}
			}
		};

		onBeforeMount(() => {
			adjustWidth();
		});

		return {
			...toRefs(state),
			isTwoColumn,
			isToTheLeft,
			isToTheRight,
		};
	},
});
</script>
