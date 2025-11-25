import { Element } from '../../declarations';
export default function useGeneralProperties(): {
    isProcess: (element: Element) => boolean;
    getIdValue: (element: Element) => string;
    setIdValue: (element: Element, value: string) => void;
    getNameValue: (element: Element) => string;
    setNameValue: (element: Element, value: string) => void;
    getIsExecutableValue: (element: Element) => boolean;
    setIsExecutableValue: (element: Element, value: boolean) => void;
    getVersionTagValue: (element: Element) => string;
    setVersionTagValue: (element: Element, value: string) => void;
    isIdValid: (element: Element, id: string) => "" | "ID 不能为空." | "ID 必须是唯一的" | "ID 不能包含空格" | "ID 不能包含前缀" | "ID 必须符合 BPMN 规范";
    isVersionTagValid: (value: string) => boolean;
};
