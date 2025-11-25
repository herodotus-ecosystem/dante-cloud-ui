import { Ref } from 'vue';
import { ExtensionProperty } from '../../declarations';
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, {
    isOpen: import('vue').WritableComputedRef<boolean, boolean>;
    property: Ref<ExtensionProperty, ExtensionProperty>;
    isDisabled: import('vue').ComputedRef<boolean>;
    onSave: () => void;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, ("update:modelValue" | "save" | "update:open")[], "update:modelValue" | "save" | "update:open", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onSave?: ((...args: any[]) => any) | undefined;
    "onUpdate:open"?: ((...args: any[]) => any) | undefined;
}>, {
    modelValue: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
