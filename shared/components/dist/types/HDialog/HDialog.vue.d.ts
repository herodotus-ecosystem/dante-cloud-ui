declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
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
    confirmLabel: {
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
    /**
     * 由组件外部，即父组件决定是否关闭对话框。
     * 正常情况下，点击 confirm 即关闭对话框。但这不适用于需要外部接入的情况，比如说表单校验，所以增加该参数，由外部逻辑控制对话框的关闭与否。
     */
    externalClose: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, {
    showDialog: import('vue').WritableComputedRef<boolean, boolean>;
    showLoading: import('vue').WritableComputedRef<boolean, boolean>;
    onClose: () => void;
    onCancel: () => void;
    onConfirm: () => void;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, ("update:modelValue" | "update:loading" | "confirm" | "cancel" | "close")[], "update:modelValue" | "update:loading" | "confirm" | "cancel" | "close", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
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
    confirmLabel: {
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
    /**
     * 由组件外部，即父组件决定是否关闭对话框。
     * 正常情况下，点击 confirm 即关闭对话框。但这不适用于需要外部接入的情况，比如说表单校验，所以增加该参数，由外部逻辑控制对话框的关闭与否。
     */
    externalClose: {
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
    confirmLabel: string;
    spinnerSize: string;
    hideConfirm: boolean;
    hideCancel: boolean;
    hideClose: boolean;
    externalClose: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
