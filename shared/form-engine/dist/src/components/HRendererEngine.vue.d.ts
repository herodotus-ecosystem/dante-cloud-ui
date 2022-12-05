import { PropType } from 'vue';
import type { Schema } from '../declarations';
declare const _sfc_main: import("vue").DefineComponent<{
    modelValue: {
        type: (StringConstructor | NumberConstructor | ArrayConstructor | ObjectConstructor)[];
    };
    schemas: {
        type: PropType<Schema[]>;
        default: () => never[];
    };
}, () => any, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: (StringConstructor | NumberConstructor | ArrayConstructor | ObjectConstructor)[];
    };
    schemas: {
        type: PropType<Schema[]>;
        default: () => never[];
    };
}>>, {
    schemas: Schema[];
}>;
export default _sfc_main;
