export declare type EmptyObject = {
    [K in string]: never;
};
export declare type Dictionary<T> = {
    [key: string]: T;
};
export declare type ConstantDictionary = {
    key: string;
    text: string;
    value: number;
};
