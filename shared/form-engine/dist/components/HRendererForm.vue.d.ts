import { PropType } from 'vue';
import { Element } from '../declarations';

declare const _default: import('vue').DefineComponent<{
    modelValue: {
        type: PropType<Record<string, any>>;
        default: () => {};
        required: true;
    };
    elements: {
        type: PropType<Element[]>;
        required: true;
    };
}, {
    getDefaultModel: (item: Element) => import('../declarations').VModel;
    modelObject: import('vue').WritableComputedRef<Record<string, any>>;
    state: Record<string, any>;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelValue: {
        type: PropType<Record<string, any>>;
        default: () => {};
        required: true;
    };
    elements: {
        type: PropType<Element[]>;
        required: true;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    modelValue: Record<string, any>;
}, {}>;
export default _default;
