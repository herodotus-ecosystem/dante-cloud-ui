import type { Widget, WidgetDefinition } from '@/declarations';

import { SCHEMA_DEFINITIONS } from './schema';

// 输入型组件 【左面板】
const INPUT_WIDGETS: Array<Widget> = [
  {
    // 组件自定义配置
    title: SCHEMA_DEFINITIONS.TEXT_FIELD!.schema.title,
    icon: 'mdi-form-textbox',
    name: 'TextField',
    document: 'https://quasar.dev/vue-components/input',
    schemaName: SCHEMA_DEFINITIONS.TEXT_FIELD!.name,
  },
  {
    title: SCHEMA_DEFINITIONS.TEXT_AREA!.schema.title,
    icon: 'mdi-form-textarea',
    name: 'TextArea',
    document: 'https://quasar.dev/vue-components/input',
    schemaName: SCHEMA_DEFINITIONS.TEXT_AREA!.name,
  },
  {
    title: SCHEMA_DEFINITIONS.PASSWORD!.schema.title,
    icon: 'mdi-form-textbox-password',
    name: 'Password',
    document: 'https://quasar.dev/vue-components/input',
    schemaName: SCHEMA_DEFINITIONS.PASSWORD!.name,
  },
];

// 选择型组件 【左面板】
const SELECT_WIDGETS: Array<Widget> = [
  {
    title: SCHEMA_DEFINITIONS.DATE_PICKER!.schema.title,
    icon: 'mdi-calendar',
    name: 'Date',
    document: 'https://quasar.dev/vue-components/input',
    schemaName: SCHEMA_DEFINITIONS.DATE_PICKER!.name,
  },
  {
    title: SCHEMA_DEFINITIONS.TIME_PICKER!.schema.title,
    icon: 'mdi-clock-outline',
    name: 'Time',
    document: 'https://quasar.dev/vue-components/input',
    schemaName: SCHEMA_DEFINITIONS.TIME_PICKER!.name,
  },
  {
    title: SCHEMA_DEFINITIONS.SLIDER!.schema.title,
    icon: 'mdi-tune-variant',
    name: 'Slider',
    document: 'https://vuetifyjs.com/zh-Hans/components/sliders/',
    schemaName: SCHEMA_DEFINITIONS.SLIDER!.name,
  },
  {
    title: SCHEMA_DEFINITIONS.RANGE_SLIDER!.schema.title,
    icon: 'mdi-valve-closed',
    name: 'Range_Slider',
    document: 'https://vuetifyjs.com/zh-Hans/components/sliders/',
    schemaName: SCHEMA_DEFINITIONS.RANGE_SLIDER!.name,
  },
  {
    title: SCHEMA_DEFINITIONS.CHECKBOX!.schema.title,
    icon: 'mdi-checkbox-marked',
    name: 'Checkbox',
    document: 'https://vuetifyjs.com/zh-Hans/components/checkboxes/',
    schemaName: SCHEMA_DEFINITIONS.CHECKBOX!.name,
  },
  {
    title: SCHEMA_DEFINITIONS.SWITCHS!.schema.title,
    icon: 'mdi-toggle-switch',
    name: 'Switch',
    document: 'https://vuetifyjs.com/zh-Hans/components/switches/',
    schemaName: SCHEMA_DEFINITIONS.SWITCHS!.name,
  },
  {
    title: SCHEMA_DEFINITIONS.SELECT_SINGLE!.schema.title,
    icon: 'mdi-form-dropdown',
    name: 'Select',
    document: 'https://vuetifyjs.com/zh-Hans/components/selects/',
    schemaName: SCHEMA_DEFINITIONS.SELECT_SINGLE!.name,
  },
  {
    title: SCHEMA_DEFINITIONS.COMBOBOX!.schema.title,
    icon: 'mdi-vector-difference-ab',
    name: 'Combobox',
    document: 'https://vuetifyjs.com/zh-Hans/components/combobox/',
    schemaName: SCHEMA_DEFINITIONS.COMBOBOX!.name,
  },
  // {
  //     configs: {
  //         title: SCHEMA_DEFINITIONS.SELECT_MULTIPLE.schema.title,
  //         icon: 'mdi-form-dropdown',
  //         name: 'Select',
  //         document: 'https://vuetifyjs.com/zh-Hans/components/selects/',
  //         schemaName: SCHEMA_DEFINITIONS.SELECT_MULTIPLE.name,
  //     },
  // },
  // {
  //     configs: {
  //         title: SCHEMA_DEFINITIONS.CASCADE_SELECT.schema.title,
  //         icon: 'mdi-file-tree-outline',
  //         name: 'Select',
  //         document: 'https://vuetifyjs.com/zh-Hans/components/selects/',
  //         schemaName: SCHEMA_DEFINITIONS.CASCADE_SELECT.name
  //     }
  // },
  {
    title: SCHEMA_DEFINITIONS.RADIO!.schema.title,
    icon: 'mdi-checkbox-marked-circle',
    name: 'Select',
    document: 'https://vuetifyjs.com/zh-Hans/components/selection-controls/',
    schemaName: SCHEMA_DEFINITIONS.RADIO!.name,
  },

  {
    title: SCHEMA_DEFINITIONS.COLOR_PICKER!.schema.title,
    icon: 'mdi-calendar',
    name: 'Select',
    document: 'https://vuetifyjs.com/zh-Hans/components/color-pickers/',
    schemaName: SCHEMA_DEFINITIONS.COLOR_PICKER!.name,
  },
  {
    title: SCHEMA_DEFINITIONS.FILE_INPUT!.schema.title,
    icon: 'mdi-calendar',
    name: 'Select',
    document: 'https://vuetifyjs.com/zh-Hans/components/file-inputs/',
    schemaName: SCHEMA_DEFINITIONS.FILE_INPUT!.name,
  },
  {
    title: SCHEMA_DEFINITIONS.IMAGES!.schema.title,
    icon: 'mdi-file-image',
    name: 'Image',
    document: 'https://vuetifyjs.com/zh-Hans/components/images/',
    schemaName: SCHEMA_DEFINITIONS.IMAGES!.name,
  },
];

export const WIDGET_DEFINITIONS: Array<WidgetDefinition> = [
  {
    title: '输入型组件',
    list: INPUT_WIDGETS,
  },
  {
    title: '选择型组件',
    list: SELECT_WIDGETS,
  },
];
