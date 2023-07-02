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
    hideSave: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    showDialog: import("vue").WritableComputedRef<boolean>;
    showLoading: import("vue").WritableComputedRef<boolean>;
    onSave: () => Promise<void>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "update:loading" | "save")[], "update:modelValue" | "update:loading" | "save", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
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
    hideSave: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    "onUpdate:loading"?: ((...args: any[]) => any) | undefined;
    onSave?: ((...args: any[]) => any) | undefined;
}, {
    title: string;
    height: string;
    loading: boolean;
    spinnerSize: string;
    hideSave: boolean;
}, {}>;
export default _default;
