import { Ref } from 'vue';
declare const _sfc_main: import("vue").DefineComponent<{
    file: {
        type: StringConstructor;
        required: true;
    };
    zoom: {
        type: NumberConstructor;
        default: number;
    };
}, {
    bpmnModelFile: Ref<File | null>;
    onDownloadXml: () => void;
    onDownloadSvg: () => void;
    onDownloadBpmn: () => void;
    onAlignLeft: () => void;
    onAlignRight: () => void;
    onAlignTop: () => void;
    onAlignBottom: () => void;
    onAlignHorizontalCenter: () => void;
    onAlignVerticalCenter: () => void;
    onZoomMinus: () => void;
    onZoomPlus: () => void;
    onZoomReset: () => void;
    onUndo: () => void;
    onRedo: () => void;
    onRefresh: () => void;
    simulation: Ref<boolean>;
    onSimulation: () => void;
    showUploadDialog: Ref<boolean>;
    onSave: () => void;
    name: Ref<string>;
    deploymentName: Ref<string>;
    tenantId: Ref<string>;
    enableDuplicateCheck: Ref<boolean>;
    deployChangedOnly: Ref<boolean>;
    disableNameInput: Ref<boolean>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("undo" | "redo" | "zoomPlus" | "zoomMinus" | "zoomReset" | "alignLeft" | "alignRight" | "alignTop" | "alignBottom" | "alignHorizontalCenter" | "alignVerticalCenter" | "update:file" | "downloadXml" | "downloadSvg" | "downloadBpmn" | "refresh" | "simulation" | "save")[], "undo" | "redo" | "zoomPlus" | "zoomMinus" | "zoomReset" | "alignLeft" | "alignRight" | "alignTop" | "alignBottom" | "alignHorizontalCenter" | "alignVerticalCenter" | "update:file" | "downloadXml" | "downloadSvg" | "downloadBpmn" | "refresh" | "simulation" | "save", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    file: {
        type: StringConstructor;
        required: true;
    };
    zoom: {
        type: NumberConstructor;
        default: number;
    };
}>> & {
    onSave?: ((...args: any[]) => any) | undefined;
    onUndo?: ((...args: any[]) => any) | undefined;
    onRedo?: ((...args: any[]) => any) | undefined;
    onZoomPlus?: ((...args: any[]) => any) | undefined;
    onZoomMinus?: ((...args: any[]) => any) | undefined;
    onZoomReset?: ((...args: any[]) => any) | undefined;
    onAlignLeft?: ((...args: any[]) => any) | undefined;
    onAlignRight?: ((...args: any[]) => any) | undefined;
    onAlignTop?: ((...args: any[]) => any) | undefined;
    onAlignBottom?: ((...args: any[]) => any) | undefined;
    onAlignHorizontalCenter?: ((...args: any[]) => any) | undefined;
    onAlignVerticalCenter?: ((...args: any[]) => any) | undefined;
    "onUpdate:file"?: ((...args: any[]) => any) | undefined;
    onDownloadXml?: ((...args: any[]) => any) | undefined;
    onDownloadSvg?: ((...args: any[]) => any) | undefined;
    onDownloadBpmn?: ((...args: any[]) => any) | undefined;
    onRefresh?: ((...args: any[]) => any) | undefined;
    onSimulation?: ((...args: any[]) => any) | undefined;
}, {
    zoom: number;
}, {}>;
export default _sfc_main;
