import { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    column: {
        type: BooleanConstructor;
        default: boolean;
    };
    self: {
        type: BooleanConstructor;
        default: boolean;
    };
    align: {
        type: PropType<"none" | "start" | "center" | "end">;
        default: string;
    };
    justify: {
        type: PropType<"none" | "center" | "end" | "around" | "between" | "evenly">;
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
        type: PropType<"none" | "start" | "center" | "end">;
        default: string;
    };
    justify: {
        type: PropType<"none" | "center" | "end" | "around" | "between" | "evenly">;
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
    column: boolean;
    justify: "none" | "center" | "end" | "around" | "between" | "evenly";
    self: boolean;
    align: "none" | "start" | "center" | "end";
    gutter: "xs" | "sm" | "md" | "lg" | "xl" | "none";
    gutterCol: boolean;
    horizontal: boolean;
    vertical: boolean;
}, {}>;
export default _default;
