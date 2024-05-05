import { PropType } from 'vue';
import { Schema } from '../../declarations';

declare const _default: import('vue').DefineComponent<{
    schema: {
        type: PropType<Schema>;
        required: true;
    };
}, {
    ATTRIBUTES: {
        HideBottomSpace: string;
        ItemAligned: string;
    };
    properties: import('vue').ComputedRef<Record<string, any>>;
    models: import('vue').ComputedRef<Record<string, import('@herodotus/form-apis').VModel>>;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    schema: {
        type: PropType<Schema>;
        required: true;
    };
}>>, {}, {}>;
export default _default;
