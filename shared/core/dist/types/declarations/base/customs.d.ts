import { HttpMethodEnum } from '../../enums';
export type EmptyObject = {
    [K in string]: never;
};
/**
 * 获取方法中参数的类型
 */
export type ParametersType<T> = T extends (args: infer R) => any ? R : any;
/**
 * 数据字典定义
 */
export type Dictionary = {
    ordinal: number;
    name: string;
    value: string;
    label: string;
};
export type HttpMethod = keyof typeof HttpMethodEnum;
