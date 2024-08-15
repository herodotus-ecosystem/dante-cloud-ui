declare const _default: import('vue').DefineComponent<{
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
}, {
    showDialog: globalThis.WritableComputedRef<boolean>;
    showLoading: globalThis.WritableComputedRef<boolean>;
    onClose: () => void;
    onCancel: () => void;
    onConfirm: () => void;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, ("update:modelValue" | "update:loading" | "confirm" | "cancel" | "close")[], "update:modelValue" | "update:loading" | "confirm" | "cancel" | "close", import('vue').PublicProps, Readonly<globalThis.ExtractPropTypes<{
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
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    "onUpdate:loading"?: ((...args: any[]) => any) | undefined;
    onConfirm?: ((...args: any[]) => any) | undefined;
    onCancel?: ((...args: any[]) => any) | undefined;
    onClose?: ((...args: any[]) => any) | undefined;
}, {
    loading: boolean;
    title: string;
    height: string;
    spinnerSize: string;
    hideConfirm: boolean;
    hideCancel: boolean;
    hideClose: boolean;
}, {}>;
export default _default;
