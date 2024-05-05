import { Element } from '../../declarations';

export default function useConditionProperties(): {
    getConditionExpressionValue: (element: Element) => string;
    setConditionExpressionValue: (element: Element, value: string) => void;
    getFormatValue: (element: Element) => string;
    setFormatValue: (element: Element, value: string) => void;
    getResourceValue: (element: Element) => string;
    setResourceValue: (element: Element, value: string) => void;
    getScriptValue: (element: Element) => string;
    setScriptValue: (element: Element, value: string) => void;
    resetConditionExpression: (element: Element) => void;
};
