import { PropType } from 'vue';
declare const _sfc_main: import("vue").DefineComponent<{
    wider: {
        type: PropType<"start" | "center" | "end">;
        default: string;
    };
    weight: {
        type: PropType<"bold" | "thin" | "light" | "regular" | "medium" | "bolder">;
        default: string;
    };
    offset: {
        type: NumberConstructor;
        default: number;
    };
    label: StringConstructor;
}, {
    textWeight: import("vue").ComputedRef<string>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    wider: {
        type: PropType<"start" | "center" | "end">;
        default: string;
    };
    weight: {
        type: PropType<"bold" | "thin" | "light" | "regular" | "medium" | "bolder">;
        default: string;
    };
    offset: {
        type: NumberConstructor;
        default: number;
    };
    label: StringConstructor;
}>>, {
    wider: "start" | "center" | "end";
    offset: number;
    weight: "bold" | "thin" | "light" | "regular" | "medium" | "bolder";
}>;
export default _sfc_main;
