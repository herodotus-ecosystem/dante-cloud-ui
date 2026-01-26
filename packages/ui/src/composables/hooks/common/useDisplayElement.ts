import { computed } from 'vue';

import type { DisplayElement, DisplayElementGroup } from '@/lib/declarations';

export default function useDisplayElement(group: DisplayElementGroup) {
  const getAttribute = (displayElement: DisplayElement, attribute: string) => {
    const property = attribute as keyof DisplayElement;
    return displayElement[property];
  };

  const switcher = (type: string, attribute: string) => {
    const element: DisplayElement = group[type];
    if (element) {
      return getAttribute(element, attribute);
    } else {
      if (attribute === 'color') {
        return 'black';
      } else {
        return 'GET & POST';
      }
    }
  };

  const color = computed(() => (type: string) => {
    return switcher(type, 'color');
  });

  const icon = computed(() => (type: string) => {
    return switcher(type, 'icon');
  });

  const text = computed(() => (type: string) => {
    return switcher(type, 'text');
  });

  return {
    color,
    icon,
    text,
  };
}
