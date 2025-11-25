import { Schema, Element, Widget } from '../../declarations';
declare class ElementUtilities {
    private static instance;
    private constructor();
    static getInstance(): ElementUtilities;
    private generateShortId;
    private getDefinition;
    private setIdentityValues;
    setElementValues(schema: Schema, widgetName: string, panelName: string): Element;
    create(widget: Widget): Element;
    clone(element: Element): Element;
}
export declare const ElementUtils: ElementUtilities;
export {};
