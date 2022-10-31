export type { AxiosHttpResult, OAuth2Token } from '@herodotus/core';
export { Axios } from '@herodotus/core';

export type EmptyObject = {
  [K in string]: never;
};

export type Dictionary<T> = { [key: string]: T };

export interface Entity {}

export interface Conditions {}

export type ConstantDictionary = {
  key: string;
  text: string;
  value: number;
};
