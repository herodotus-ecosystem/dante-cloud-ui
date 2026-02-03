interface Props {
    mode?: 'two' | 'three';
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
    wider?: 'default' | 'start' | 'center' | 'end';
    /**
     * 1. 如果是三列布局
     * 1.1 如果 wider 是 center，那么 offset 最大值为6，即 [0, 6]
     * 1.2 如果 wider 是 start 或 end，那么 offset 最大值为3，即[0, 3]
     * 2. 如果是两列布局
     * 那么 offset 最大值为5，即 [0, 3]
     */
    offset?: number;
}
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        default?(_: {}): any;
        default?(_: {}): any;
        default?(_: {}): any;
        left?(_: {}): any;
        left?(_: {}): any;
        right?(_: {}): any;
        right?(_: {}): any;
    };
    refs: {};
    rootEl: any;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{}>, {
    offset: number;
    mode: "two" | "three";
    wider: "default" | "start" | "center" | "end";
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
