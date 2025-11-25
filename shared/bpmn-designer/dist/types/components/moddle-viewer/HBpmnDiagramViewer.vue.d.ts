import { PropType } from 'vue';
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    modelValue: {
        type: BooleanConstructor;
        required: true;
    };
    diagram: {
        type: StringConstructor;
        required: true;
    };
    nodes: {
        type: PropType<Array<string>>;
        default: () => never[];
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    width: {
        type: StringConstructor;
        default: string;
    };
    height: {
        type: StringConstructor;
        default: string;
    };
    maxWidth: {
        type: StringConstructor;
        default: string;
    };
}>, {
    isOpen: import('vue').WritableComputedRef<boolean, boolean>;
    isShow: import('vue').Ref<boolean, boolean>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelValue: {
        type: BooleanConstructor;
        required: true;
    };
    diagram: {
        type: StringConstructor;
        required: true;
    };
    nodes: {
        type: PropType<Array<string>>;
        default: () => never[];
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    width: {
        type: StringConstructor;
        default: string;
    };
    height: {
        type: StringConstructor;
        default: string;
    };
    maxWidth: {
        type: StringConstructor;
        default: string;
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}>, {
    width: string;
    height: string;
    title: string;
    nodes: string[];
    maxWidth: string;
}, {}, {
    HBpmnViewer: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
        diagram: {
            type: StringConstructor;
            default: string;
        };
        nodes: {
            type: PropType<Array<string>>;
            default: () => never[];
        };
        height: {
            type: (StringConstructor | NumberConstructor)[];
            default: string;
        };
    }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
        diagram: {
            type: StringConstructor;
            default: string;
        };
        nodes: {
            type: PropType<Array<string>>;
            default: () => never[];
        };
        height: {
            type: (StringConstructor | NumberConstructor)[];
            default: string;
        };
    }>> & Readonly<{}>, {
        height: string | number;
        diagram: string;
        nodes: string[];
    }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
