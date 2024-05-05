import { Element } from '../../declarations';

declare const _default: import('vue').DefineComponent<{}, {
    isEmptyCanvas: import('vue').ComputedRef<boolean>;
    canvasElements: {
        id: string;
        config: {
            formId: string;
            renderKey: number;
            name: string;
            panel: string;
        };
        schema: {
            title: string;
            tag: string;
            attrs: Record<string, any>;
            models: Record<string, import('@herodotus/form-apis').VModel>;
            children?: any[] | undefined;
            text?: string | undefined;
        };
    }[];
    onSelectedItem: (element: Element) => void;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{}>>, {}, {}>;
export default _default;
