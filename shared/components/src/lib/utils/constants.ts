import type { SelectItem } from '../declarations';

export const DURATION_UNITS: Array<SelectItem<string>> = [
  { text: '天', value: 'days' },
  { text: '小时', value: 'hours' },
  { text: '分', value: 'minutes' },
  { text: '秒', value: 'seconds' },
];
