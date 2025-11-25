import { SweetAlertResult } from '../../../declarations';
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    tooltip: {
        type: StringConstructor;
        default: string;
    };
}>, {
    openUploadDialog: import('vue').Ref<boolean, boolean>;
    enableDuplicateCheck: import('vue').Ref<boolean, boolean>;
    deployChangedOnly: import('vue').Ref<boolean, boolean>;
    deploymentName: import('vue').Ref<string, string>;
    loading: import('vue').Ref<boolean, boolean>;
    onSave: () => Promise<SweetAlertResult<string> | undefined>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    tooltip: {
        type: StringConstructor;
        default: string;
    };
}>> & Readonly<{}>, {
    tooltip: string;
}, {}, {
    HButton: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
        tooltip: {
            type: StringConstructor;
            default: string;
        };
    }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
        tooltip: {
            type: StringConstructor;
            default: string;
        };
    }>> & Readonly<{}>, {
        tooltip: string;
    }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HButtonGroup: import('vue').DefineComponent<{}, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
