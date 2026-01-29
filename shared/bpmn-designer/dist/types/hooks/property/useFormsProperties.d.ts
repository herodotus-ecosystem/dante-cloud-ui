import { Element } from '../../declarations';
export default function useFormsProperties(): {
    getFormKeyValue: (element: Element) => string;
    setFormKeyValue: (element: Element, value: string) => void;
    getFormRefValue: (element: Element) => string;
    setFormRefValue: (element: Element, value: string | number) => void;
    getFormRefVersionValue: (element: Element) => string;
    setFormRefVersionValue: (element: Element, value: string | number) => void;
    getFormRefBindingValue: (element: Element) => string;
    setFormRefBindingValue: (element: Element, value: string) => void;
    setGeneratedTaskFormsValues: (element: Element) => void;
    resetGeneratedTaskFormsValues: (element: Element) => void;
    resetProperties: (element: Element) => void;
    hasExtensionElements: (element: Element) => boolean;
};
