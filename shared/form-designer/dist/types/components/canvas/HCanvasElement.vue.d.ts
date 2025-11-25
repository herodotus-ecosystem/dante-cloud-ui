import { PropType } from 'vue';
import { Element } from '../../declarations';
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    element: {
        type: PropType<Element>;
        required: true;
    };
    selectedId: {
        type: NumberConstructor;
        required: true;
    };
}>, {
    isHover: import('vue').Ref<boolean, boolean>;
    schemas: import('vue').ComputedRef<import('@herodotus-cloud/form-apis').Schema[]>;
    isSelected: import('vue').ComputedRef<boolean>;
    onDelete: () => void;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    element: {
        type: PropType<Element>;
        required: true;
    };
    selectedId: {
        type: NumberConstructor;
        required: true;
    };
}>> & Readonly<{}>, {}, {}, {
    HRendererEngine: import('vue').DefineComponent<{
        [x: string]: any;
    }, () => any, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{
        [x: string]: any;
    }> & Readonly<{}>, {
        schemas: import('@herodotus-cloud/form-apis').Schema[];
    }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
