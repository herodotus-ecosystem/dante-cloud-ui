declare const _default: import('vue').DefineComponent<{}, {
    isProcessElement: import('vue').ComputedRef<boolean>;
    elementId: import('vue').Ref<string, string>;
    elementName: import('vue').Ref<string, string>;
    versionTag: import('vue').Ref<string, string>;
    isExecutable: import('vue').Ref<boolean, boolean>;
    updateName: (value: string | number | null) => void;
    updateId: (value: string | number | null) => void;
    updateVersionTag: (value: string | number | null) => void;
    updateIsExecutable: (value: boolean) => void;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
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
}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
