import { Tree } from '../lib/declarations';
import { QTree } from 'quasar';
interface Props {
    items: Tree[];
    label?: string;
    value?: string;
}
type __VLS_Props = Props;
type __VLS_PublicProps = {
    modelValue: string;
} & __VLS_Props;
declare const _default: import('vue').DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (value: string) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: string) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    treeRef: QTree | null;
}, any>;
export default _default;
