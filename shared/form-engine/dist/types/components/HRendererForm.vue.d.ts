import { PropType } from 'vue';
import { Element } from '../declarations';
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    modelValue: {
        type: PropType<Record<string, any>>;
        default: () => {};
        required: true;
    };
    elements: {
        type: PropType<Array<Element>>;
        required: true;
    };
}>, {
    getDefaultModel: (item: Element) => import('@herodotus-cloud/form-apis').VModel | undefined;
    modelObject: import('vue').WritableComputedRef<Record<string, any>, Record<string, any>>;
    state: Record<string, any>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelValue: {
        type: PropType<Record<string, any>>;
        default: () => {};
        required: true;
    };
    elements: {
        type: PropType<Array<Element>>;
        required: true;
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}>, {
    modelValue: Record<string, any>;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
