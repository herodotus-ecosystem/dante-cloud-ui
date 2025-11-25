import { Ref } from 'vue';
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, {
    isOpen: import('vue').WritableComputedRef<boolean, boolean>;
    onSave: () => void;
    infoRef: Ref<import('vue').DefineComponent<{}, {
        id: string;
        name: string;
        activityName: string;
        nameRef: Ref<import('quasar').QInput | null, import('quasar').QInput | null>;
        activityNameRef: Ref<import('quasar').QInput | null, import('quasar').QInput | null>;
        validate: () => boolean;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any> | null, import('vue').DefineComponent<{}, {
        id: string;
        name: string;
        activityName: string;
        nameRef: Ref<import('quasar').QInput | null, import('quasar').QInput | null>;
        activityNameRef: Ref<import('quasar').QInput | null, import('quasar').QInput | null>;
        validate: () => boolean;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any> | null>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, ("update:modelValue" | "update:open" | "save")[], "update:modelValue" | "update:open" | "save", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
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
}, {}, {
    HFormInformation: import('vue').DefineComponent<{}, {
        id: string;
        name: string;
        activityName: string;
        nameRef: Ref<import('quasar').QInput | null, import('quasar').QInput | null>;
        activityNameRef: Ref<import('quasar').QInput | null, import('quasar').QInput | null>;
        validate: () => boolean;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
