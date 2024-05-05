import { Ref } from 'vue';
import { GroupEntity } from '../../declarations';

declare const _default: import('vue').DefineComponent<{
    modelValue: {
        type: StringConstructor;
        default: string;
    };
    label: {
        type: StringConstructor;
    };
    title: {
        type: StringConstructor;
    };
}, {
    isOpen: Ref<boolean>;
    isDisabled: import('vue').ComputedRef<boolean>;
    selected: Ref<GroupEntity[]>;
    assignee: import('vue').WritableComputedRef<string>;
    onClose: () => void;
    onSave: () => void;
    onOpen: () => void;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelValue: {
        type: StringConstructor;
        default: string;
    };
    label: {
        type: StringConstructor;
    };
    title: {
        type: StringConstructor;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    modelValue: string;
}, {}>;
export default _default;
