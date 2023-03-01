import { PropType } from 'vue';
declare const _sfc_main: import("vue").DefineComponent<{
    column: {
        type: BooleanConstructor;
        default: boolean;
    };
    self: {
        type: BooleanConstructor;
        default: boolean;
    };
    align: {
        type: PropType<"start" | "center" | "end" | "none">;
        default: string;
    };
    justify: {
        type: PropType<"center" | "end" | "none" | "around" | "between" | "evenly">;
        default: string;
    };
    gutter: {
        type: PropType<"xs" | "sm" | "md" | "lg" | "xl" | "none">;
        default: string;
    };
    gutterCol: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * horizontal gutter
     */
    horizontal: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * vertical gutter
     */
    vertical: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    getClasses: () => string;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    column: {
        type: BooleanConstructor;
        default: boolean;
    };
    self: {
        type: BooleanConstructor;
        default: boolean;
    };
    align: {
        type: PropType<"start" | "center" | "end" | "none">;
        default: string;
    };
    justify: {
        type: PropType<"center" | "end" | "none" | "around" | "between" | "evenly">;
        default: string;
    };
    gutter: {
        type: PropType<"xs" | "sm" | "md" | "lg" | "xl" | "none">;
        default: string;
    };
    gutterCol: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * horizontal gutter
     */
    horizontal: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * vertical gutter
     */
    vertical: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    justify: "center" | "end" | "none" | "around" | "between" | "evenly";
    align: "start" | "center" | "end" | "none";
    column: boolean;
    self: boolean;
    gutter: "xs" | "sm" | "md" | "lg" | "xl" | "none";
    gutterCol: boolean;
    horizontal: boolean;
    vertical: boolean;
}>;
export default _sfc_main;
