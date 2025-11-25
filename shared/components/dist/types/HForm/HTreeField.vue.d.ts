import { PropType, Ref } from 'vue';
import { QTree, Tree } from '../lib/declarations';
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    modelValue: {
        type: StringConstructor;
        default: string;
        required: true;
    };
    items: {
        type: PropType<Array<Tree>>;
        required: true;
    };
    label: {
        type: StringConstructor;
    };
    value: {
        type: StringConstructor;
    };
}>, {
    selectedValue: import('vue').WritableComputedRef<string, string>;
    nodeName: Ref<string, string>;
    treeRef: Ref<QTree | null, QTree | null>;
    isPopup: Ref<boolean, boolean>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelValue: {
        type: StringConstructor;
        default: string;
        required: true;
    };
    items: {
        type: PropType<Array<Tree>>;
        required: true;
    };
    label: {
        type: StringConstructor;
    };
    value: {
        type: StringConstructor;
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}>, {
    modelValue: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
