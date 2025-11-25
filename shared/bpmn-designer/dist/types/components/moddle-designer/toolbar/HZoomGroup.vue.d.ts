declare const _default: import('vue').DefineComponent<{}, {
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
export default _default;
