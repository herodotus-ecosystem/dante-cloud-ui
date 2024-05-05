import { PropType } from 'vue';
import { BpmnDesignerResources } from '../../declarations';

declare const _default: import('vue').DefineComponent<{
    instance: {
        type: PropType<BpmnDesignerResources>;
        required: true;
    };
    height: {
        type: StringConstructor;
        default: string;
    };
}, {
    isOfficialPanel: import('vue').ComputedRef<boolean>;
    elementTitle: import('vue').Ref<string>;
    elementIcon: import('vue').Ref<string>;
    elementCaption: import('vue').Ref<string>;
    elementType: import('vue').Ref<string>;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "close"[], "close", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    instance: {
        type: PropType<BpmnDesignerResources>;
        required: true;
    };
    height: {
        type: StringConstructor;
        default: string;
    };
}>> & {
    onClose?: ((...args: any[]) => any) | undefined;
}, {
    height: string;
}, {}>;
export default _default;
