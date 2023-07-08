export type EmptyObject = {
    [K in string]: never;
};
/**
 * 获取方法中参数的类型
 */
export type ParametersType<T> = T extends (args: infer R) => any ? R : any;
export type ConstantDictionary = {
    key: string;
    text: string;
    value: number;
};
