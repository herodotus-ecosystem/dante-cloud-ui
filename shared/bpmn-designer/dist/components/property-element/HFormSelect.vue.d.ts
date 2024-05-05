import { Ref } from 'vue';
import { QSelect } from 'quasar';
import { FormSelectItem } from '../../declarations';

declare const _default: import('vue').DefineComponent<{
    modelValue: {
        type: StringConstructor;
    };
}, {
    selectedValue: import('vue').WritableComputedRef<string | undefined>;
    options: Ref<FormSelectItem[]>;
    filter: (value: string, update: (callbackFn: () => void, after?: (ref: QSelect) => void) => void, abort: () => void) => void;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelValue: {
        type: StringConstructor;
    };
}>>, {}, {}>;
export default _default;
