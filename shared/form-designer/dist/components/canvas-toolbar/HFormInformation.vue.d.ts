import { Ref } from 'vue';
import { QInput } from 'quasar';

declare const _default: import('vue').DefineComponent<{}, {
    id: string;
    name: string;
    activityName: string;
    nameRef: Ref<QInput | null>;
    activityNameRef: Ref<QInput | null>;
    validate: () => boolean;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{}>>, {}, {}>;
export default _default;
