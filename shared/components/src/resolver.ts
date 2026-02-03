import type { ComponentResolver } from 'unplugin-vue-components';

const components = [
  'HButton',
  'HCardTitle',
  'HCenterLabel',
  'HChartCard',
  'HColumn',
  'HContainer',
  'HDateTime',
  'HDivider',
  'HDialog',
  'HDuration',
  'HIconButton',
  'HIconSelect',
  'HFieldLabel',
  'HTreeField',
  'HLabel',
  'HListItem',
  'HLoading',
  'HPagination',
  'HParticles',
  'HRow',
  'HSelect',
  'HSignInBackground',
  'HSwitch',
  'HTextField',
  'HVisibilityButton',
];

function isValidComponent(name: string) {
  return components.includes(name);
}
/**
 * Herodotus UI 组件解析器
 */
export function HerodotusResolver(): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      // 只处理指定前缀的组件
      if (name.startsWith('H') && isValidComponent(name)) {
        const componentName = name;
        const from = '@herodotus-cloud/components';

        // 构建 side effects 配置
        const sideEffects: string[] = ['@herodotus-cloud/components/style.css'];

        return {
          name: componentName,
          from,
          sideEffects: sideEffects.length > 0 ? sideEffects : undefined,
        };
      }
    },
  };
}

export default HerodotusResolver;
