import { Element } from '../../declarations';
export default function useCandidateStarterProperties(): {
    getCandidateStarterGroupsValue: (element: Element) => string;
    setCandidateStarterGroupsValue: (element: Element, value: string) => void;
    getCandidateStarterUsersValue: (element: Element) => string;
    setCandidateStarterUsersValue: (element: Element, value: string) => void;
};
