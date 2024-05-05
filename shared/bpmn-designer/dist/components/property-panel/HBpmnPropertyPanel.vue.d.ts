declare const _default: import('vue').DefineComponent<{
    title: {
        type: StringConstructor;
        required: true;
    };
    icon: {
        type: StringConstructor;
        required: true;
    };
    type: {
        type: StringConstructor;
        required: true;
    };
    label: {
        type: StringConstructor;
    };
}, {
    thumbStyle: {
        right: string;
        borderRadius: string;
        backgroundColor: string;
        width: string;
        opacity: string;
    };
    isShow: import('vue').Ref<boolean>;
    panelGroups: import('vue').Ref<{
        id: string;
        label: string;
        entries: {
            id: string;
            description: string;
            validate: (...args: any[]) => {
                id: string;
            };
            html: string;
            get?: ((element: ModdleElement) => any) | undefined;
            set?: ((element: ModdleElement, values?: {
                [k: string]: any;
            } | undefined) => any) | undefined;
        }[];
        enabled?: ((element: any) => boolean) | undefined;
    }[]>;
    parsePropertyPanelName: (id: string) => string;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    title: {
        type: StringConstructor;
        required: true;
    };
    icon: {
        type: StringConstructor;
        required: true;
    };
    type: {
        type: StringConstructor;
        required: true;
    };
    label: {
        type: StringConstructor;
    };
}>>, {}, {}>;
export default _default;
