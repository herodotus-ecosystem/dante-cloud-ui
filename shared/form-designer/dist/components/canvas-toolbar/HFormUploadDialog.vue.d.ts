import { Ref } from 'vue';

declare const _default: import('vue').DefineComponent<{
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    isOpen: import('vue').WritableComputedRef<boolean>;
    onSave: () => void;
    infoRef: Ref<import('vue').DefineComponent<{}, {
        id: string;
        name: string;
        activityName: string;
        nameRef: Ref<import('quasar').QInput | null>;
        activityNameRef: Ref<import('quasar').QInput | null>;
        validate: () => boolean;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{}>>, {}, {}> | null>;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, ("update:modelValue" | "update:open" | "save")[], "update:modelValue" | "update:open" | "save", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    "onUpdate:open"?: ((...args: any[]) => any) | undefined;
    onSave?: ((...args: any[]) => any) | undefined;
}, {
    modelValue: boolean;
}, {}>;
export default _default;
