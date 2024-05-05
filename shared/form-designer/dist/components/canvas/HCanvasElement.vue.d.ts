import { PropType } from 'vue';
import { Element } from '../../declarations';

declare const _default: import('vue').DefineComponent<{
    element: {
        type: PropType<Element>;
        required: true;
    };
    selectedId: {
        type: NumberConstructor;
        required: true;
    };
}, {
    isHover: import('vue').Ref<boolean>;
    schemas: import('vue').ComputedRef<import('../../declarations').Schema[]>;
    isSelected: import('vue').ComputedRef<boolean>;
    onDelete: () => void;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    element: {
        type: PropType<Element>;
        required: true;
    };
    selectedId: {
        type: NumberConstructor;
        required: true;
    };
}>>, {}, {}>;
export default _default;
