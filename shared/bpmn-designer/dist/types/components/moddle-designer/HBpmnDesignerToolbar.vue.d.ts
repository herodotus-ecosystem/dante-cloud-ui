declare const _default: import('vue').DefineComponent<{}, void, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
    HAlignGroup: import('vue').DefineComponent<{}, {
        onAlignLeft: () => void;
        onAlignRight: () => void;
        onAlignTop: () => void;
        onAlignBottom: () => void;
        onAlignHorizontalCenter: () => void;
        onAlignVerticalCenter: () => void;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
        HButton: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            tooltip: {
                type: StringConstructor;
                default: string;
            };
        }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            tooltip: {
                type: StringConstructor;
                default: string;
            };
        }>> & Readonly<{}>, {
            tooltip: string;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        HButtonGroup: import('vue').DefineComponent<{}, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        HSeparator: import('vue').DefineComponent<{}, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HCommandGroup: import('vue').DefineComponent<{}, {
        onUndo: () => void;
        onRedo: () => void;
        onRestart: () => void;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
        HButton: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            tooltip: {
                type: StringConstructor;
                default: string;
            };
        }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            tooltip: {
                type: StringConstructor;
                default: string;
            };
        }>> & Readonly<{}>, {
            tooltip: string;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        HButtonGroup: import('vue').DefineComponent<{}, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        HSeparator: import('vue').DefineComponent<{}, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HToolGroup: import('vue').DefineComponent<{}, {
        showMiniMap: import('vue').Ref<boolean, boolean>;
        showBpmnLint: import('vue').Ref<boolean, boolean>;
        toggleSimulation: () => void;
        toggleMinimap: () => void;
        toggleBpmnLint: () => void;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
        HButton: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            tooltip: {
                type: StringConstructor;
                default: string;
            };
        }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            tooltip: {
                type: StringConstructor;
                default: string;
            };
        }>> & Readonly<{}>, {
            tooltip: string;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        HButtonGroup: import('vue').DefineComponent<{}, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        HSeparator: import('vue').DefineComponent<{}, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HZoomGroup: import('vue').DefineComponent<{}, {
        onZoomReset: (newScale: number | "fit-viewport" | undefined) => void;
        onZoomMinus: (step?: number) => void;
        onZoomPlus: (step?: number) => void;
        percentage: import('vue').ComputedRef<string>;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
        HButton: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            tooltip: {
                type: StringConstructor;
                default: string;
            };
        }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            tooltip: {
                type: StringConstructor;
                default: string;
            };
        }>> & Readonly<{}>, {
            tooltip: string;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        HButtonGroup: import('vue').DefineComponent<{}, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        HSeparator: import('vue').DefineComponent<{}, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HDownloadDropdown: import('vue').DefineComponent<{}, {
        onDownloadXml: () => void;
        onDownloadSvg: () => void;
        onDownloadBpmn: () => void;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
        HButtonDropdown: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            label: {
                type: StringConstructor;
            };
            icon: {
                type: StringConstructor;
            };
        }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            label: {
                type: StringConstructor;
            };
            icon: {
                type: StringConstructor;
            };
        }>> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        HListItem: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            label: {
                type: StringConstructor;
            };
            icon: {
                type: StringConstructor;
            };
        }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            label: {
                type: StringConstructor;
            };
            icon: {
                type: StringConstructor;
            };
        }>> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HPreviewDropdown: import('vue').DefineComponent<{}, {
        isOpen: import('vue').Ref<boolean, boolean>;
        data: import('vue').Ref<string, string>;
        language: import('vue').Ref<"xml" | "json", "xml" | "json">;
        onPreviewXml: () => Promise<import('sweetalert2').SweetAlertResult<string> | undefined>;
        onPreviewJson: () => Promise<import('sweetalert2').SweetAlertResult<string> | undefined>;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
        HButtonDropdown: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            label: {
                type: StringConstructor;
            };
            icon: {
                type: StringConstructor;
            };
        }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            label: {
                type: StringConstructor;
            };
            icon: {
                type: StringConstructor;
            };
        }>> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        HListItem: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            label: {
                type: StringConstructor;
            };
            icon: {
                type: StringConstructor;
            };
        }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            label: {
                type: StringConstructor;
            };
            icon: {
                type: StringConstructor;
            };
        }>> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        HBpmnCodePreviewer: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            modelValue: {
                type: BooleanConstructor;
                required: true;
            };
            data: {
                type: StringConstructor;
                required: true;
            };
            title: {
                type: StringConstructor;
                default: string;
            };
            language: {
                type: import('vue').PropType<"xml" | "json">;
                default: string;
            };
            maxWidth: {
                type: StringConstructor;
                default: string;
            };
            maxHeight: {
                type: StringConstructor;
                default: string;
            };
        }>, {
            isOpen: import('vue').WritableComputedRef<boolean, boolean>;
            headerTitle: import('vue').ComputedRef<string>;
            onCopy: () => void;
        }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            modelValue: {
                type: BooleanConstructor;
                required: true;
            };
            data: {
                type: StringConstructor;
                required: true;
            };
            title: {
                type: StringConstructor;
                default: string;
            };
            language: {
                type: import('vue').PropType<"xml" | "json">;
                default: string;
            };
            maxWidth: {
                type: StringConstructor;
                default: string;
            };
            maxHeight: {
                type: StringConstructor;
                default: string;
            };
        }>> & Readonly<{
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        }>, {
            title: string;
            maxWidth: string;
            language: "xml" | "json";
            maxHeight: string;
        }, {}, {
            highlightjs: import('vue').DefineComponent<{
                code: {
                    type: StringConstructor;
                    required: true;
                };
                language: {
                    type: StringConstructor;
                    default: string;
                };
                autodetect: {
                    type: BooleanConstructor;
                    default: boolean;
                };
                ignoreIllegals: {
                    type: BooleanConstructor;
                    default: boolean;
                };
            }, {
                className: import('vue').ComputedRef<string>;
                highlightedCode: import('vue').ComputedRef<string>;
            }, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, Record<string, any>, string, import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps, Readonly<{
                code: string;
                language: string;
                autodetect: boolean;
                ignoreIllegals: boolean;
            }>, {
                language: string;
                autodetect: boolean;
                ignoreIllegals: boolean;
            }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HOpenFile: import('vue').DefineComponent<{}, {
        diagramFile: import('vue').Ref<File | null, File | null>;
        clear: () => void;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HUploadDialog: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
        tooltip: {
            type: StringConstructor;
            default: string;
        };
    }>, {
        openUploadDialog: import('vue').Ref<boolean, boolean>;
        enableDuplicateCheck: import('vue').Ref<boolean, boolean>;
        deployChangedOnly: import('vue').Ref<boolean, boolean>;
        deploymentName: import('vue').Ref<string, string>;
        loading: import('vue').Ref<boolean, boolean>;
        onSave: () => Promise<import('sweetalert2').SweetAlertResult<string> | undefined>;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
        tooltip: {
            type: StringConstructor;
            default: string;
        };
    }>> & Readonly<{}>, {
        tooltip: string;
    }, {}, {
        HButton: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            tooltip: {
                type: StringConstructor;
                default: string;
            };
        }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            tooltip: {
                type: StringConstructor;
                default: string;
            };
        }>> & Readonly<{}>, {
            tooltip: string;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        HButtonGroup: import('vue').DefineComponent<{}, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
