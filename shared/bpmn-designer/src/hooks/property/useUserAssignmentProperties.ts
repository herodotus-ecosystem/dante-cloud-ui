import type { Element } from '@/declarations';

import { getBusinessObject } from '@/lib/utils';

import usePropertyElement from './usePropertyElements';

export default function useUserAssignmentProperties() {
  const { getModeling } = usePropertyElement();

  const getAssigneeValue = (element: Element): string => {
    const businessObject = getBusinessObject(element);
    return businessObject.assignee;
  };

  const setAssigneeValue = (element: Element, value: string): void => {
    getModeling().updateProperties(element, { assignee: value });
  };

  const getCandidateGroupsValue = (element: Element): string => {
    const businessObject = getBusinessObject(element);
    return businessObject.candidateGroups;
  };

  const setCandidateGroupsValue = (element: Element, value: string): void => {
    getModeling().updateProperties(element, { candidateGroups: value });
  };

  const getCandidateUsersValue = (element: Element): string => {
    const businessObject = getBusinessObject(element);
    return businessObject.candidateUsers;
  };

  const setCandidateUsersValue = (element: Element, value: string): void => {
    getModeling().updateProperties(element, { candidateUsers: value });
  };

  const getDueDateValue = (element: Element): string => {
    const businessObject = getBusinessObject(element);
    return businessObject.dueDate;
  };

  const setDueDateValue = (element: Element, value: string): void => {
    getModeling().updateProperties(element, { dueDate: value });
  };

  const getFollowUpDateValue = (element: Element): string => {
    const businessObject = getBusinessObject(element);
    return businessObject.followUpDate;
  };

  const setFollowUpDateValue = (element: Element, value: string): void => {
    getModeling().updateProperties(element, { followUpDate: value });
  };

  const getPriorityValue = (element: Element): string => {
    const businessObject = getBusinessObject(element);
    return businessObject.priority;
  };

  const setPriorityValue = (element: Element, value: string): void => {
    getModeling().updateProperties(element, { priority: value });
  };

  return {
    getAssigneeValue,
    setAssigneeValue,
    getCandidateGroupsValue,
    setCandidateGroupsValue,
    getCandidateUsersValue,
    setCandidateUsersValue,
    getDueDateValue,
    setDueDateValue,
    getFollowUpDateValue,
    setFollowUpDateValue,
    getPriorityValue,
    setPriorityValue,
  };
}
