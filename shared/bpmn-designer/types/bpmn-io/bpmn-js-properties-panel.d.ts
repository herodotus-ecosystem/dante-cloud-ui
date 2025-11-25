declare module 'bpmn-js-properties-panel/lib/PropertiesActivator' {
  import EventBus from 'diagram-js/lib/core/EventBus';
  import { Base, ModdleElement } from 'diagram-js/lib/model';

  export default class PropertiesActivator {
    constructor(eventBus: EventBus, priority?: number);

    isEntryVisible(entry: any, element: ModdleElement): boolean;

    isPropertyEditable(entry: any, propertyName: string, element: ModdleElement): boolean;

    getTabs(element: Base | ModdleElement): Tab[];
  }

  export interface Tab {
    id: string;
    label: string;
    groups: Group[];
    enabled?: (element: Base | ModdleElement) => boolean;
  }

  export interface Group {
    id: string;
    label: string;
    entries: Entry[];
    enabled?: (element: Base | ModdleElement) => boolean;
  }

  export interface Entry {
    id: string;
    description: string;
    validate: (...args: any[]) => { id: string };
    html: string;

    get?(element: ModdleElement): any;

    set?(element: ModdleElement, values?: { [k: string]: any }): any;
  }
}

declare module 'bpmn-js-properties-panel/lib/factory/EntryFactory' {
  import { Entry } from 'bpmn-js-properties-panel/lib/PropertiesActivator';
  import { Base, ModdleElement } from 'diagram-js/lib/model';

  export default class EntryFactory {
    static textField(options: TextOptions): Entry;

    static validationAwareTextField(options: ValidationTextOptions): Entry;

    static checkbox(options: CheckBoxOptions): Entry;

    static textBox(options: TextBoxOptions): Entry;

    static selectBox(options: SelectBoxOptions): Entry;

    static comboBox(options: ComboBoxOptions): Entry;

    static table(options: TableOptions): Entry;

    static label(options: LabelOptions): Entry;

    static link(options: LinkOptions): Entry;
  }

  type Element = Base | ModdleElement;

  export interface Command {
    cmd: string;
    context: {
      element: Element;
      businessObject?: ModdleElement;
      currentObject?: ModdleElement;
      objectsToAdd?: any;
      objectsToRemove?: any;
      updatedObjectList?: any[];
      propertyName?: string;
      referencePropertyName?: string;
      properties?: { [k: string]: any };
    };
  }

  export interface Options {
    id: string;
    description?: string;
    label?: string;
    get?: (element: Element, node: any) => { formKey: any };
    set?: (element: Element, values: any, node: any /* opt */) => Command;
    validate?: (element: Element, values: { [k: string]: any }) => any;
    modelProperty?: string;
  }

  export interface ValidationTextOptions {
    getProperty: (element: Element) => string;
    setProperty: (element: Element, properties?: { [k: string]: any }) => Command;
  }

  export interface TextOptions extends Options {
    buttonAction?: {
      name: string;
      method: () => any;
    };
    buttonShow?: {
      name: string;
      method: () => any;
    };
    disabled?: (element: Element) => boolean;
    hidden?: (element: Element, node: any /* opt */) => { formKey: any };
  }

  export interface CheckBoxOptions extends Options {
    disabled?: (element: Element) => boolean;
    hidden?: (element: Element, node: any /* opt */) => { formKey: any };
  }

  export interface TextBoxOptions extends Options {
    show?: (element: Element, node: any) => boolean;
  }

  export interface SelectBoxOptions extends Options {
    selectOptions: {
      name: string;
      value: string;
    }[];
    emptyParameter?: boolean;
    disabled?: (element: Element) => boolean;
    hidden?: (element: Element, node: any /* opt */) => { formKey: any };
  }

  export interface ComboBoxOptions extends Options {
    selectOptions: {
      name: string;
      value: string;
    }[];
    emptyParameter?: boolean;
    customValue?: string;
    customName?: string;
    disabled?: (element: Element) => boolean;
  }

  export interface TableOptions extends Options {
    modelProperties: string[];
    labels: string[];
    addLabel: string;
    getElements: (element: Element, node: any) => ModdleElement[];
    addElement: (element: Element, node: any) => Command | Command[];
    updateElement: (element: Element, value: any | null, node: any, idx: number) => Command | Command[];
    removeElement: (element: Element, node: any, idx: number) => Command | Command[];
    show?: (element: Element, node: any) => boolean;
  }

  export interface LabelOptions extends Options {
    labelText?: string;
    divider?: boolean;
    showLabel?: (element: Element, node: any) => boolean;
  }

  export interface LinkOptions extends Options {
    handleClick: (element: Element, node: any, event: any) => boolean;
    showLink?: (element: Element, node: any) => boolean;
  }
}
