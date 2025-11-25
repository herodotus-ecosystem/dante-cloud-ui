import { HttpMethodEnum } from '../../enums';
/**
 * 数据字典定义
 */
export type Dictionary = {
    ordinal: number;
    name: string;
    value: string;
    label: string;
};
/**
 * 获取方法中参数的类型
 */
export type ParametersType<T> = T extends (args: infer R) => any ? R : any;
export interface Validation {
    validate: () => Promise<boolean>;
}
export type HttpMethod = keyof typeof HttpMethodEnum;
