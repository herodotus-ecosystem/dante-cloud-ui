import type { SchemaDefinitions } from '/@/declarations';

export const SCHEMA_DEFINITIONS: SchemaDefinitions = {
  TEXT_FIELD: {
    name: 'TEXT_FIELD',
    schema: {
      title: '单行文本',
      tag: 'q-input',
      attrs: {
        outlined: true,
        'bottom-slots': true,
        label: '单行文本',
        type: 'text'
      },
      models: {
        modelValue: { name: '', type: 'String' }
      }
    }
  },
  TEXT_AREA: {
    name: 'TEXT_AREA',
    schema: {
      title: '多行文本',
      tag: 'q-input',
      attrs: {
        outlined: true,
        'bottom-slots': true,
        label: '多行文本',
        type: 'textarea'
      },
      models: {
        modelValue: { name: '', type: 'String' }
      }
    }
  },
  PASSWORD: {
    name: 'PASSWORD',
    schema: {
      title: '密码输入',
      tag: 'q-input',
      attrs: {
        filled: true,
        label: '密码输入',
        type: 'password'
      },
      models: {
        modelValue: { name: '', type: 'String' }
      }
    }
  },
  DATE_PICKER: {
    name: 'DATE_PICKER',
    schema: {
      title: '日期选择',
      tag: 'q-input',
      attrs: {
        filled: true,
        label: '日期选择',
        'stack-label': true,
        type: 'date'
      },
      models: {
        modelValue: { name: '', type: 'String' }
      }
    }
  },
  TIME_PICKER: {
    name: 'TIME_PICKER',
    schema: {
      title: '时间选择',
      tag: 'q-input',
      attrs: {
        filled: true,
        label: '时间选择',
        'stack-label': true,
        type: 'time'
      },
      models: {
        modelValue: { name: '', type: 'String' }
      }
    }
  },
  SLIDER: {
    name: 'SLIDER',
    schema: {
      title: '滑块',
      tag: 'q-input',
      attrs: {
        rounded: true,
        filled: true,
        label: 'Rounded filled'
      },
      models: {
        modelValue: { name: '', type: 'String' }
      }
    }
  },
  RANGE_SLIDER: {
    name: 'RANGE_SLIDER',
    schema: {
      title: '范围滑块',
      tag: 'q-input',
      attrs: {
        rounded: true,
        filled: true,
        label: 'Rounded filled'
      },
      models: {
        modelValue: { name: '', type: 'String' }
      }
    }
  },

  CHECKBOX: {
    name: 'CHECKBOX',
    schema: {
      title: '复选框',
      tag: 'q-input',
      attrs: {
        rounded: true,
        filled: true,
        label: 'Rounded filled'
      },
      models: {
        modelValue: { name: '', type: 'String' }
      }
    }
  },
  SWITCHS: {
    name: 'SWITCHS',
    schema: {
      title: '开关',
      tag: 'q-input',
      attrs: {
        rounded: true,
        filled: true,
        label: 'Rounded filled'
      },
      models: {
        modelValue: { name: '', type: 'String' }
      }
    }
  },

  SELECT_SINGLE: {
    name: 'SELECT_SINGLE',
    schema: {
      title: '单项下拉',
      tag: 'q-input',
      attrs: {
        rounded: true,
        filled: true,
        label: 'Rounded filled'
      },
      models: {}
    }
  },
  COMBOBOX: {
    name: 'COMBOBOX',
    schema: {
      title: '组合框',
      tag: 'q-input',
      attrs: {
        rounded: true,
        filled: true,
        label: 'Rounded filled'
      },
      models: {}
    }
  },

  COLOR_PICKER: {
    name: 'COLOR_PICKER',
    schema: {
      title: '颜色选择',
      tag: 'q-input',
      attrs: {
        rounded: true,
        filled: true,
        label: 'Rounded filled'
      },
      models: {}
    }
  },
  RADIO: {
    name: 'RADIO',
    schema: {
      title: '单选框组',
      tag: 'q-input',
      attrs: {
        rounded: true,
        filled: true,
        label: 'Rounded filled'
      },
      models: {}
    }
  },

  FILE_INPUT: {
    name: 'FILE_INPUT',
    schema: {
      title: '上传',
      tag: 'q-input',
      attrs: {
        rounded: true,
        filled: true,
        label: 'Rounded filled'
      },
      models: {}
    }
  },
  IMAGES: {
    name: 'IMAGES',
    schema: {
      title: '图片',
      tag: 'q-input',
      attrs: {
        rounded: true,
        filled: true,
        label: 'Rounded filled'
      },
      models: {}
    }
  }
};
