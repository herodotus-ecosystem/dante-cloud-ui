export type EmptyObject = {
  [K in string]: never;
};

export type Dictionary<T> = { [key: string]: T };

/**
 * 获取方法中参数的类型
 */
export type ParametersType<T> = T extends (args: infer R) => any ? R : any;

export type ConstantDictionary = {
  key: string;
  text: string;
  value: number;
};
