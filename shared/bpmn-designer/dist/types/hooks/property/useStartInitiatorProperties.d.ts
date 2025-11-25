import { Element } from '../../declarations';
export default function useStartInitiatorProperties(): {
    getInitiatorValue: (element: Element) => string;
    setInitiatorValue: (element: Element, value: string) => void;
};
