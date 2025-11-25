import type { Element } from '@/declarations';

import { getBusinessObject } from '@/lib/utils';

import usePropertyElement from './usePropertyElements';

export default function useCandidateStarterProperties() {
  const { getModeling } = usePropertyElement();

  const getCandidateStarterGroupsValue = (element: Element): string => {
    const businessObject = getBusinessObject(element);
    return businessObject.candidateStarterGroups;
  };

  const setCandidateStarterGroupsValue = (element: Element, value: string): void => {
    getModeling().updateProperties(element, { candidateStarterGroups: value });
  };

  const getCandidateStarterUsersValue = (element: Element): string => {
    const businessObject = getBusinessObject(element);
    return businessObject.candidateStarterUsers;
  };

  const setCandidateStarterUsersValue = (element: Element, value: string): void => {
    getModeling().updateProperties(element, { candidateStarterUsers: value });
  };

  return {
    getCandidateStarterGroupsValue,
    setCandidateStarterGroupsValue,
    getCandidateStarterUsersValue,
    setCandidateStarterUsersValue,
  };
}
