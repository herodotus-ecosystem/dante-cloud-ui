export const IN_BROWSER = typeof window !== 'undefined';
export const IS_PROD = import.meta.env.PROD;
export const IS_DEV = import.meta.env.DEV;
export const IS_SERVER = import.meta.env.SSR;