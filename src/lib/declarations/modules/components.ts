import Uploader, { File, Chunk } from 'simple-uploader.js';
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

export type BpmnAlign = 'left' | 'right' | 'top' | 'bottom' | 'center' | 'middle';

export type SimpleUploader = InstanceType<typeof Uploader>;
export type SimpleUploaderFile = InstanceType<typeof File>;
export type SimpleUploaderChunk = InstanceType<typeof Chunk>;
