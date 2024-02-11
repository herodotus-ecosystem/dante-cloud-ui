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
        type: PropType<"center" | "none" | "start" | "end">;
        default: string;
    };
    justify: {
        type: PropType<"center" | "around" | "between" | "evenly" | "none" | "end">;
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
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<globalThis.ExtractPropTypes<{
    column: {
        type: BooleanConstructor;
        default: boolean;
    };
    self: {
        type: BooleanConstructor;
        default: boolean;
    };
    align: {
        type: PropType<"center" | "none" | "start" | "end">;
        default: string;
    };
    justify: {
        type: PropType<"center" | "around" | "between" | "evenly" | "none" | "end">;
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
    align: "center" | "none" | "start" | "end";
    self: boolean;
    horizontal: boolean;
    vertical: boolean;
    column: boolean;
    justify: "center" | "around" | "between" | "evenly" | "none" | "end";
    gutter: "xs" | "sm" | "md" | "lg" | "xl" | "none";
    gutterCol: boolean;
}, {}>;
export default _default;
