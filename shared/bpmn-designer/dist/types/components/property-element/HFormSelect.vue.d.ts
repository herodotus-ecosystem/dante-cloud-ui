import { Ref } from 'vue';
import { QSelect } from 'quasar';
import { FormSelectItem } from '../../declarations';
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    modelValue: {
        type: StringConstructor;
    };
}>, {
    selectedValue: import('vue').WritableComputedRef<string | undefined, string | undefined>;
    options: Ref<FormSelectItem[], FormSelectItem[]>;
    filter: (value: string, update: (callbackFn: () => void, after?: (ref: QSelect) => void) => void, abort: () => void) => void;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelValue: {
        type: StringConstructor;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
