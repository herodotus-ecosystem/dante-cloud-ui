declare const _default: import("vue").DefineComponent<{
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
}, {
    showDialog: import("vue").WritableComputedRef<boolean>;
    showLoading: import("vue").WritableComputedRef<boolean>;
    onClose: () => void;
    onCancel: () => void;
    onConfirm: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "update:loading" | "confirm" | "cancel")[], "update:modelValue" | "update:loading" | "confirm" | "cancel", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
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
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    "onUpdate:loading"?: ((...args: any[]) => any) | undefined;
    onConfirm?: ((...args: any[]) => any) | undefined;
    onCancel?: ((...args: any[]) => any) | undefined;
}, {
    title: string;
    height: string;
    loading: boolean;
    spinnerSize: string;
    hideConfirm: boolean;
    hideCancel: boolean;
}, {}>;
export default _default;
