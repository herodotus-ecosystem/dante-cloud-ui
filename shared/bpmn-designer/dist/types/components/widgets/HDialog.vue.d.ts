declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    cancelLabel: {
        type: StringConstructor;
        default: string;
    };
    confirmLabel: {
        type: StringConstructor;
        default: string;
    };
    confirmDisable: {
        type: BooleanConstructor;
        default: boolean;
    };
    width: {
        type: StringConstructor;
        default: string;
    };
}>, {
    isOpen: import('vue').WritableComputedRef<boolean, boolean>;
    onClose: () => void;
    onSave: () => void;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, ("update:modelValue" | "save")[], "update:modelValue" | "save", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    cancelLabel: {
        type: StringConstructor;
        default: string;
    };
    confirmLabel: {
        type: StringConstructor;
        default: string;
    };
    confirmDisable: {
        type: BooleanConstructor;
        default: boolean;
    };
    width: {
        type: StringConstructor;
        default: string;
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onSave?: ((...args: any[]) => any) | undefined;
}>, {
    width: string;
    title: string;
    modelValue: boolean;
    cancelLabel: string;
    confirmLabel: string;
    confirmDisable: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
