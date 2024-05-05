<template>
  <h-row v-if="isTwoColumn()" v-bind="$attrs">
    <h-column :cols="leftCols">
      <slot v-if="isToTheLeft"></slot>
      <slot v-else name="left"></slot>
    </h-column>
    <h-column :cols="rightCols">
      <slot v-if="isToTheRight"></slot>
      <slot v-else name="right"></slot>
    </h-column>
  </h-row>
  <h-row v-else v-bind="$attrs">
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
import { defineComponent, PropType, reactive, computed, onMounted, toRefs } from 'vue';

import HRow from './HRow.vue';
import HColumn from './HColumn.vue';

export default defineComponent({
  name: 'HContainer',

  components: {
    HRow,
    HColumn
  },

  props: {
    // 容器布局的列数，两列或者三列
    mode: { type: String as PropType<'two' | 'three'>, default: 'three' },
    /**
     * 1. 如果是三列布局：
     * default：三列相等
     * start：左边宽，中间默认，右边窄
     * center：两边相同，中间宽
     * end：右边宽，中间默认，左边窄
     *
     * 2.如果是两列布局：
     * default：左右相等
     * start：左边宽，右边窄
     * end：右边宽，左边窄
     */
    wider: { type: String as PropType<'default' | 'start' | 'center' | 'end'>, default: 'default' },
    /**
     * 1. 如果是三列布局
     * 1.1 如果 wider 是 center，那么 offset 最大值为6，即 [0, 6]
     * 1.2 如果 wider 是 start 或 end，那么 offset 最大值为3，即[0, 3]
     * 2. 如果是两列布局
     * 那么 offset 最大值为5，即 [0, 3]
     */
    offset: { type: Number, default: 0 }
  },

  setup(props) {
    const defaultTwoCols = 6;
    const defaultThreeCols = 4;

    const state = reactive({
      leftCols: 4,
      centerCols: 4,
      rightCols: 4
    });

    const isTwoColumn = () => {
      if (props.mode === 'two') {
        return true;
      } else {
        return false;
      }
    };

    // 增量
    const increment = (defaultValue: number) => {
      return defaultValue + props.offset;
    };

    // 减量
    const decrement = (defaultValue: number) => {
      return defaultValue - props.offset;
    };

    /**
     * 左侧比右侧宽
     * @param defaultValue 三列或两列模式下，各个列宽度的默认值
     */
    const leftIsWider = (defaultValue: number) => {
      state.leftCols = increment(defaultValue);
      state.rightCols = decrement(defaultValue);
    };

    /**
     * 右侧比左侧宽
     * @param defaultValue 三列或两列模式下，各个列宽度的默认值
     */
    const rightIsWider = (defaultValue: number) => {
      state.leftCols = decrement(defaultValue);
      state.rightCols = increment(defaultValue);
    };

    /**
     * 在三列的情况下，如果offset为奇数，在计算左右平均值时，有余数。默认把这个余数加到右侧
     * @param value 值
     * @param margin 计算左右平均值的余数
     */
    const setValue = (value: number, margin = 0) => {
      state.leftCols = value;
      state.rightCols = value + margin;
    };

    const setDefaultValueForTow = () => {
      setValue(defaultTwoCols);
    };

    const setDefaultValueForCenter = () => {
      state.centerCols = defaultThreeCols;
    };

    const setDefaultValueForThree = () => {
      setDefaultValueForCenter();
      setValue(defaultThreeCols);
    };

    /**
     * 是否是偶数
     * @param value
     */
    const isEven = (value: number) => {
      return Math.abs(value % 2) === 0;
    };

    /**
     * 三列模式下，最大列宽
     */
    const maximum = () => {
      return defaultThreeCols + props.offset;
    };

    /**
     * 三列模式下，可计算的剩余量
     */
    const getDifference = () => {
      return 12 - maximum();
    };

    /**
     * 平均值余数
     */
    const getSurplus = () => {
      return Math.floor(getDifference() / 2);
    };

    const isToTheLeft = computed(() => {
      return state.leftCols > state.rightCols;
    });

    const isToTheRight = computed(() => {
      return state.leftCols < state.rightCols;
    });

    const adjustWidth = () => {
      if (isTwoColumn()) {
        switch (props.wider) {
          case 'start':
            leftIsWider(defaultTwoCols);
            break;
          case 'end':
            rightIsWider(defaultTwoCols);
            break;
          default:
            setDefaultValueForTow();
            break;
        }
      } else {
        switch (props.wider) {
          case 'center':
            state.centerCols = maximum();
            const surplus = getSurplus();
            if (isEven(getDifference())) {
              setValue(surplus);
            } else {
              setValue(surplus, 1);
            }
            break;
          case 'start':
            setDefaultValueForCenter();
            leftIsWider(defaultThreeCols);
            break;
          case 'end':
            setDefaultValueForCenter();
            rightIsWider(defaultThreeCols);
            break;
          default:
            setDefaultValueForThree();
            break;
        }
      }
    };

    onMounted(() => {
      adjustWidth();
    });

    return {
      ...toRefs(state),
      isTwoColumn,
      isToTheLeft,
      isToTheRight
    };
  }
});
</script>
