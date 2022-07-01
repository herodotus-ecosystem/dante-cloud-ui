declare interface Window {
	nextLoading: boolean;
}

declare type Recordable<T = unknown> = Record<string, T>;

declare type EmptyObject = {
	[K in string]: never;
};

declare type Dictionary<T> = { [key: string]: T };
