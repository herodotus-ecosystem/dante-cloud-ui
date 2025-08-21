declare const _default: import('vue').DefineComponent<globalThis.ExtractPropTypes<{
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
        required: true;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    height: {
        type: StringConstructor;
        default: string;
    };
    spinnerSize: {
        type: StringConstructor;
        default: string;
    };
    hideConfirm: {
        type: BooleanConstructor;
        default: boolean;
    };
    hideCancel: {
        type: BooleanConstructor;
        default: boolean;
    };
    hideClose: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, {
    showDialog: globalThis.WritableComputedRef<boolean, boolean>;
    showLoading: globalThis.WritableComputedRef<boolean, boolean>;
    onClose: () => void;
    onCancel: () => void;
    onConfirm: () => void;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, ("update:modelValue" | "update:loading" | "confirm" | "cancel" | "close")[], "update:modelValue" | "update:loading" | "confirm" | "cancel" | "close", import('vue').PublicProps, Readonly<globalThis.ExtractPropTypes<{
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
        required: true;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    height: {
        type: StringConstructor;
        default: string;
    };
    spinnerSize: {
        type: StringConstructor;
        default: string;
    };
    hideConfirm: {
        type: BooleanConstructor;
        default: boolean;
    };
    hideCancel: {
        type: BooleanConstructor;
        default: boolean;
    };
    hideClose: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    "onUpdate:loading"?: ((...args: any[]) => any) | undefined;
    onConfirm?: ((...args: any[]) => any) | undefined;
    onCancel?: ((...args: any[]) => any) | undefined;
    onClose?: ((...args: any[]) => any) | undefined;
}>, {
    loading: boolean;
    title: string;
    height: string;
    spinnerSize: string;
    hideConfirm: boolean;
    hideCancel: boolean;
    hideClose: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
