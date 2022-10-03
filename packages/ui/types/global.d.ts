declare interface Window {
	uploader: any;
}

declare type Recordable<T = unknown> = Record<string, T>;

declare type EmptyObject = {
	[K in string]: never;
};

declare type Dictionary<T> = { [key: string]: T };
