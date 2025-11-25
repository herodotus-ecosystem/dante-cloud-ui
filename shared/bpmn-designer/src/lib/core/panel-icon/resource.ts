import { ImageIndexes } from './indexes';

export const getAssetsFile = (url: string) => {
  return new URL(`../../../static/images/bpmn-icons-svg/${url}.svg`, import.meta.url).href;
};

export const getBpmnIcon = (index: string) => {
  const name = ImageIndexes[index];
  return name;
};
