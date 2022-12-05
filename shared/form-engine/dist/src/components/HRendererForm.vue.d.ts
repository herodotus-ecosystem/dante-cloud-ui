import { PropType } from 'vue';
import type { DataObject } from '../declarations';
declare const _sfc_main: import("vue").DefineComponent<{
    modelValue: {
        type: PropType<Record<string, any>>;
        default: () => void;
        required: true;
    };
    dataObjects: {
        type: PropType<DataObject[]>;
        required: true;
    };
}, {
    getDefaultModel: (item: DataObject) => import('../declarations').Model;
    modelObject: import("vue").WritableComputedRef<Record<string, any>>;
    state: Record<string, any>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: PropType<Record<string, any>>;
        default: () => void;
        required: true;
    };
    dataObjects: {
        type: PropType<DataObject[]>;
        required: true;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    modelValue: Record<string, any>;
}>;
export default _sfc_main;
