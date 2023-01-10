import { PropType } from 'vue';
declare const _sfc_main: import("vue").DefineComponent<{
    diagram: {
        type: StringConstructor;
        default: string;
    };
    type: {
        type: PropType<"camunda" | "flowable" | "activiti">;
        default: string;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    diagram: {
        type: StringConstructor;
        default: string;
    };
    type: {
        type: PropType<"camunda" | "flowable" | "activiti">;
        default: string;
    };
}>>, {
    diagram: string;
    type: "camunda" | "flowable" | "activiti";
}>;
export default _sfc_main;
