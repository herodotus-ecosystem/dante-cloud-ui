declare const _sfc_main: import("vue").DefineComponent<{
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
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    "onUpdate:loading"?: ((...args: any[]) => any) | undefined;
    onSave?: ((...args: any[]) => any) | undefined;
}, {
    height: string;
    title: string;
    loading: boolean;
    spinnerSize: string;
}, {}>;
export default _sfc_main;
