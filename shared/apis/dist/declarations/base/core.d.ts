export type { AxiosHttpResult, OAuth2Token } from '@herodotus/utils';
export { Axios } from '@herodotus/utils';
export declare type EmptyObject = {
    [K in string]: never;
};
export declare type Dictionary<T> = {
    [key: string]: T;
};
export interface Entity {
}
export interface Conditions {
}
export declare type ConstantDictionary = {
    key: string;
    text: string;
    value: number;
};
