import { FormTypeEnum, BindingTypeEnum } from '../../../enums';

declare const _default: import('vue').DefineComponent<{}, {
    formsType: import('vue').Ref<string>;
    formsOptions: import('vue').Ref<{
        text: string;
        value: FormTypeEnum;
    }[]>;
    bindingType: import('vue').Ref<string>;
    bindingOptions: import('vue').Ref<{
        text: string;
        value: BindingTypeEnum;
    }[]>;
    formKey: import('vue').Ref<string>;
    formRef: import('vue').Ref<string>;
    formRefVersion: import('vue').Ref<string>;
    isCamundaForms: import('vue').ComputedRef<boolean>;
    isEmbeddedOrExternalTaskForms: import('vue').ComputedRef<boolean>;
    isFormRefVersion: import('vue').ComputedRef<boolean>;
    updateFormKey: (value: string) => void;
    updateFormRef: (value: string) => void;
    updateVersion: (value: string) => void;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{}>>, {}, {}>;
export default _default;
