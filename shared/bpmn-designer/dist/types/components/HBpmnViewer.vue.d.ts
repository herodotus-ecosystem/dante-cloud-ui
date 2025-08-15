import { PropType } from 'vue';
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    diagram: {
        type: StringConstructor;
        default: string;
    };
    nodes: {
        type: PropType<Array<string>>;
        default: () => never[];
    };
    height: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    diagram: {
        type: StringConstructor;
        default: string;
    };
    nodes: {
        type: PropType<Array<string>>;
        default: () => never[];
    };
    height: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
}>> & Readonly<{}>, {
    diagram: string;
    height: string | number;
    nodes: string[];
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
