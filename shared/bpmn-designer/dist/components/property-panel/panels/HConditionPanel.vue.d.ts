declare const _default: import('vue').DefineComponent<{}, {
    conditionExpression: import('vue').Ref<string>;
    format: import('vue').Ref<string>;
    resource: import('vue').Ref<string>;
    script: import('vue').Ref<string>;
    conditionType: import('vue').Ref<string>;
    conditionOptions: import('vue').Ref<{
        text: string;
        value: string;
    }[]>;
    scriptType: import('vue').Ref<string>;
    scriptOptions: import('vue').Ref<{
        text: string;
        value: string;
    }[]>;
    isScript: import('vue').ComputedRef<boolean>;
    isExpression: import('vue').ComputedRef<boolean>;
    isExternalResource: import('vue').ComputedRef<boolean>;
    updateConditionExpression: (value: string) => void;
    updateFormat: (value: string) => void;
    updateResource: (value: string) => void;
    updateScript: (value: string) => void;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{}>>, {}, {}>;
export default _default;
