import { Element } from '../../declarations';
export default function useConditionProperties(): {
    getConditionExpressionValue: (element: Element) => string;
    setConditionExpressionValue: (element: Element, value: string | number) => void;
    getFormatValue: (element: Element) => string;
    setFormatValue: (element: Element, value: string | number) => void;
    getResourceValue: (element: Element) => string;
    setResourceValue: (element: Element, value: string | number) => void;
    getScriptValue: (element: Element) => string;
    setScriptValue: (element: Element, value: string | number) => void;
    resetConditionExpression: (element: Element) => void;
};
