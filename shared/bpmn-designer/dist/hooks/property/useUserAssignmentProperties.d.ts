import { Element } from '../../declarations';

export default function useUserAssignmentProperties(): {
    getAssigneeValue: (element: Element) => string;
    setAssigneeValue: (element: Element, value: string) => void;
    getCandidateGroupsValue: (element: Element) => string;
    setCandidateGroupsValue: (element: Element, value: string) => void;
    getCandidateUsersValue: (element: Element) => string;
    setCandidateUsersValue: (element: Element, value: string) => void;
    getDueDateValue: (element: Element) => string;
    setDueDateValue: (element: Element, value: string) => void;
    getFollowUpDateValue: (element: Element) => string;
    setFollowUpDateValue: (element: Element, value: string) => void;
    getPriorityValue: (element: Element) => string;
    setPriorityValue: (element: Element, value: string) => void;
};
