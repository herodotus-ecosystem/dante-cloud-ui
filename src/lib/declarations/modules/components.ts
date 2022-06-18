import { BreakPointEnum } from '../../enums';

export type BreakPoint = keyof typeof BreakPointEnum;

export interface DisplayElement {
	color: string;
	icon: string;
	text?: string;
}

export type DisplayElementGroup = Record<string, DisplayElement>;

export interface SelectItem<T> {
	text: string;
	value: T;
}
