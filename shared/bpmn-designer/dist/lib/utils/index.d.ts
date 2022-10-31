export { lodash, toast, Swal } from '@herodotus/core';
export declare const log: (message?: any, ...optionalParams: any[]) => void;
export declare const error: (message?: any, ...optionalParams: any[]) => void;
export declare const exception: (description: string, error: any) => void;
/** ---------- BPMN 文件下载 ---------- */
/**
 * 文件下载
 */
export declare const download: (href: string, filename: string) => void;
/**
 * 根据所需类型进行转码并返回下载地址
 */
export declare const downloadEncode: (type: string, filename: string | undefined, data: string) => {
    filename: string;
    href: string;
    data: string;
};
