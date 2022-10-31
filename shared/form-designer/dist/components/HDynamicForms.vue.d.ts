declare const _sfc_main: {
    name: string;
    components: {
        HWidgetPanel: import("vue").DefineComponent<{}, {
            widgetGroups: import("@herodotus/form-engine").WidgetDefinition[];
            cloneWidget: (widget: import("@herodotus/form-engine").Widget) => import("@herodotus/form-engine").DataObject;
            addWidget: (widget: import("@herodotus/form-engine").Widget) => void;
        }, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
    };
    props: {
        title: {
            type: StringConstructor;
            default: string;
        };
        container: {
            type: BooleanConstructor;
            default: boolean;
        };
        height: {
            type: StringConstructor;
            default: string;
        };
    };
    setup(): {
        leftDrawerOpen: import("vue").Ref<boolean>;
        toggleLeftDrawer(): void;
        rightDrawerOpen: import("vue").Ref<boolean>;
        toggleRightDrawer(): void;
    };
};
export default _sfc_main;
