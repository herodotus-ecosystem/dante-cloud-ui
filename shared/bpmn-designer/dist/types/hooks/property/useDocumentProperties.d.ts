import { Element } from '../../declarations';
export default function useDocumentProperties(): {
    getDocumentationValue: (element: Element) => string | undefined;
    setDocumentationValue: (element: Element, value: string) => void;
};
