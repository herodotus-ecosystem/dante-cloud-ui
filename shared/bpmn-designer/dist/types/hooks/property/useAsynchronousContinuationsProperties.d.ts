import { Element } from '../../declarations';
export default function useAsynchronousContinuationsProperties(): {
    getBeforeValue: (element: Element) => boolean;
    setBeforeValue: (element: Element, value: boolean) => void;
    getAfterValue: (element: Element) => boolean;
    setAfterValue: (element: Element, value: boolean) => void;
    getExclusiveValue: (element: Element) => boolean;
    setExclusiveValue: (element: Element, value: boolean) => void;
};
