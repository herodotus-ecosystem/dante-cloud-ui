import { PropType } from 'vue';
import { FormDesignerResources, DynamicFormEntity } from '../declarations';

declare const _default: import('vue').DefineComponent<{
    instance: {
        type: PropType<FormDesignerResources>;
        required: true;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    container: {
        type: BooleanConstructor;
        default: boolean;
    };
    height: {
        type: StringConstructor;
        default: string;
    };
    item: {
        type: PropType<DynamicFormEntity>;
        default: () => {};
    };
}, {
    leftDrawerOpen: import('vue').Ref<boolean>;
    toggleLeftDrawer(): void;
    rightDrawerOpen: import('vue').Ref<boolean>;
    toggleRightDrawer(): void;
    openPreview: import('vue').Ref<boolean>;
    openUpload: import('vue').Ref<boolean>;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "close"[], "close", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    instance: {
        type: PropType<FormDesignerResources>;
        required: true;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    container: {
        type: BooleanConstructor;
        default: boolean;
    };
    height: {
        type: StringConstructor;
        default: string;
    };
    item: {
        type: PropType<DynamicFormEntity>;
        default: () => {};
    };
}>> & {
    onClose?: ((...args: any[]) => any) | undefined;
}, {
    title: string;
    item: DynamicFormEntity;
    container: boolean;
    height: string;
}, {}>;
export default _default;
