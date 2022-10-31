import { PropType } from 'vue';
import type { DeploymentCreate } from '@herodotus/apis';
import { DeploymentService } from '@herodotus/apis';
declare const _sfc_main: import("vue").DefineComponent<{
    diagram: {
        type: StringConstructor;
        default: string;
    };
    type: {
        type: PropType<"camunda" | "flowable" | "activiti">;
        default: string;
    };
    service: {
        type: PropType<DeploymentService>;
        required: true;
    };
    height: {
        type: StringConstructor;
        default: string;
    };
}, {
    openedDiagram: import("vue").Ref<string>;
    onReset: () => void;
    importDiagram: (diagram: string) => Promise<void>;
    downloadAsXml: (name?: string) => void;
    downloadAsBpmn: (name?: string) => void;
    downloadAsSvg: (name?: string) => void;
    undo: () => any;
    redo: () => any;
    zoom: import("vue").Ref<number>;
    zoomPlus: (step?: number) => void;
    zoomMinus: (step?: number) => void;
    zoomReset: () => void;
    alignLeft: () => void;
    alignRight: () => void;
    alignTop: () => void;
    alignBottom: () => void;
    alignHorizontalCenter: () => void;
    alignVerticalCenter: () => void;
    playSimulation: () => void;
    onSave: (data: DeploymentCreate) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    diagram: {
        type: StringConstructor;
        default: string;
    };
    type: {
        type: PropType<"camunda" | "flowable" | "activiti">;
        default: string;
    };
    service: {
        type: PropType<DeploymentService>;
        required: true;
    };
    height: {
        type: StringConstructor;
        default: string;
    };
}>>, {
    diagram: string;
    type: "camunda" | "flowable" | "activiti";
    height: string;
}>;
export default _sfc_main;
