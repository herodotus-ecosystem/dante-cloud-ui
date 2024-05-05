import { PropType } from 'vue';
import { Schema } from '../declarations';

declare const _default: import('vue').DefineComponent<{
    modelValue: {
        type: (ObjectConstructor | StringConstructor | NumberConstructor | ArrayConstructor)[];
    };
    schemas: {
        type: PropType<Schema[]>;
        default: () => never[];
    };
}, () => any, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, import('vue').EmitsOptions, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelValue: {
        type: (ObjectConstructor | StringConstructor | NumberConstructor | ArrayConstructor)[];
    };
    schemas: {
        type: PropType<Schema[]>;
        default: () => never[];
    };
}>>, {
    schemas: Schema[];
}, {}>;
export default _default;
