import { FormDesignerResources } from '../declarations';

export declare const useFormResourceStore: import('pinia').StoreDefinition<"FormDesignerResources", {
    resources: FormDesignerResources;
}, {
    dynamicForm: (state: {
        resources: {
            dynamicForm: () => import('@herodotus/form-apis').DynamicFormService;
        };
    } & import('pinia').PiniaCustomStateProperties<{
        resources: FormDesignerResources;
    }>) => import('@herodotus/form-apis').DynamicFormService;
}, {
    init(instance: FormDesignerResources): void;
}>;
