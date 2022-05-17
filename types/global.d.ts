declare interface Window {
	nextLoading: boolean;
}

declare type Recordable<T = any> = Record<string, T>;

declare type EmptyObject = {
	[K in string]: never;
};
