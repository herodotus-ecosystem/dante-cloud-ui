import type { Model, Schema } from '/@/declarations';
import { h, resolveComponent, SetupContext } from 'vue';

const createModelEvent = (name: string): string => {
  return 'onUpdate:' + name;
};

const createModelEmit = (name: string): string => {
  return 'update:' + name;
};

const createBinding = (name: string, props: Record<string, unknown>, context: SetupContext) => {
  const eventName = createModelEvent(name);
  const emitName = createModelEmit(name);

  const vModel: Record<string, any> = {};
  vModel[name] = props[name];
  vModel[eventName] = (value: any) => {
    context.emit(emitName, value);
  };
  return { ...vModel };
};

const createModels = (models: Record<string, Model>, props: Record<string, unknown>, context: SetupContext) => {
  let result: Record<string, any> = {};
  Object.keys(models).forEach(key => {
    const model = createBinding(key, props, context);
    result = Object.assign(result, model);
  });
  return result;
};

export const renderSchema = (schemas: Array<Schema>, props: Record<string, unknown>, context: SetupContext): any => {
  return schemas.map(schema => {
    const children = schema.children ? schema.children : [];
    const models = schema.models ? schema.models : {};
    let vModels = {};
    if (models) {
      vModels = createModels(models, props, context);
    }
    if (schema.children) {
      return h(resolveComponent(schema.tag), { ...schema.attrs, ...vModels }, () =>
        renderSchema(children, props, context)
      );
    } else {
      return h(
        resolveComponent(schema.tag),
        { ...schema.attrs, ...vModels },
        schema.text ? () => schema.text : () => {}
      );
    }
  });
};
