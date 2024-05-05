import { SweetAlertResult } from '../../../declarations';

declare const _default: import('vue').DefineComponent<{
    tooltip: {
        type: StringConstructor;
        default: string;
    };
}, {
    openUploadDialog: import('vue').Ref<boolean>;
    enableDuplicateCheck: import('vue').Ref<boolean>;
    deployChangedOnly: import('vue').Ref<boolean>;
    deploymentName: import('vue').Ref<string>;
    loading: import('vue').Ref<boolean>;
    onSave: () => Promise<SweetAlertResult<string> | undefined>;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    tooltip: {
        type: StringConstructor;
        default: string;
    };
}>>, {
    tooltip: string;
}, {}>;
export default _default;
