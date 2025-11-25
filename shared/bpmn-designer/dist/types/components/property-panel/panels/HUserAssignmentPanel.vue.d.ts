declare const _default: import('vue').DefineComponent<{}, {
    assignee: import('vue').Ref<string, string>;
    candidateUsers: import('vue').Ref<string, string>;
    candidateGroups: import('vue').Ref<string, string>;
    dueDate: import('vue').Ref<string, string>;
    followUpDate: import('vue').Ref<string, string>;
    priority: import('vue').Ref<string, string>;
    updateAssignee: (value: string | number | null) => void;
    updateCandidateGroups: (value: string | number | null) => void;
    updateCandidateUsers: (value: string | number | null) => void;
    updateDueDate: (value: string | number | null) => void;
    updateFollowUpDate: (value: string | number | null) => void;
    updatePriority: (value: string | number | null) => void;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
    HCandidateGroupTextField: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
        label: {
            type: StringConstructor;
        };
        title: {
            type: StringConstructor;
            default: string;
        };
        modelValue: {
            type: import('vue').PropType<string>;
        };
    }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
        "update:modelValue": (value: string) => any;
    }, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
        label: {
            type: StringConstructor;
        };
        title: {
            type: StringConstructor;
            default: string;
        };
        modelValue: {
            type: import('vue').PropType<string>;
        };
    }>> & Readonly<{
        "onUpdate:modelValue"?: ((value: string) => any) | undefined;
    }>, {
        title: string;
    }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, HTMLDivElement>;
    HCandidateUserTextField: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
        selection: {
            type: import('vue').PropType<"single" | "multiple">;
            default: string;
        };
        label: {
            type: StringConstructor;
            default: string;
        };
        title: {
            type: StringConstructor;
            default: string;
        };
        modelValue: {
            type: import('vue').PropType<string>;
        };
    }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
        "update:modelValue": (value: string) => any;
    }, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
        selection: {
            type: import('vue').PropType<"single" | "multiple">;
            default: string;
        };
        label: {
            type: StringConstructor;
            default: string;
        };
        title: {
            type: StringConstructor;
            default: string;
        };
        modelValue: {
            type: import('vue').PropType<string>;
        };
    }>> & Readonly<{
        "onUpdate:modelValue"?: ((value: string) => any) | undefined;
    }>, {
        label: string;
        title: string;
        selection: "single" | "multiple";
    }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, HTMLDivElement>;
    HExpansionItem: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
        icon: {
            type: StringConstructor;
            default: string;
        };
        label: {
            type: StringConstructor;
            default: string;
        };
        badge: {
            type: BooleanConstructor;
            default: boolean;
        };
        badgeColor: {
            type: StringConstructor;
            default: string;
        };
        count: {
            type: NumberConstructor;
            default: number;
        };
        defaultOpend: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
        icon: {
            type: StringConstructor;
            default: string;
        };
        label: {
            type: StringConstructor;
            default: string;
        };
        badge: {
            type: BooleanConstructor;
            default: boolean;
        };
        badgeColor: {
            type: StringConstructor;
            default: string;
        };
        count: {
            type: NumberConstructor;
            default: number;
        };
        defaultOpend: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>> & Readonly<{}>, {
        label: string;
        icon: string;
        badge: boolean;
        badgeColor: string;
        count: number;
        defaultOpend: boolean;
    }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HTextField: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
        modelValue: {
            type: (StringConstructor | NumberConstructor)[];
        };
    }>, {
        text: import('vue').WritableComputedRef<string | number | undefined, string | number | undefined>;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
        modelValue: {
            type: (StringConstructor | NumberConstructor)[];
        };
    }>> & Readonly<{
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    }>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
