export type EmptyObject = {
  [K in string]: never;
};

export type Dictionary<T> = { [key: string]: T };

export type ConstantDictionary = {
  key: string;
  text: string;
  value: number;
};
