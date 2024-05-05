import { Element, ExtensionProperty } from '../../declarations';

export default function useExtensionProperties(): {
    getExtensionProperties: (element: Element) => Array<ExtensionProperty>;
    modifyExtensionProperty: (element: Element, items: Array<ExtensionProperty>) => void;
    deleteExtensionProperty: (element: Element, property: ExtensionProperty) => void;
};
