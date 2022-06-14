export interface DisplayElement {
	color: string;
	icon: string;
	text?: string;
}

export type DisplayElementGroup = Record<string, DisplayElement>;
