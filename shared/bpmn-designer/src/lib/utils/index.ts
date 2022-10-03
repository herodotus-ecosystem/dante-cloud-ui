import { BpmnError } from '../declarations';

export { lodash, toast, Swal } from '@herodotus/utils';

export const log = (message?: any, ...optionalParams: any[]) => {
  console.log('[Herodotus] |- ' + message, ...optionalParams);
};

export const error = (message?: any, ...optionalParams: any[]) => {
  console.error('[Herodotus] |- ' + message, ...optionalParams);
};

export const exception = (description: string, error: any) => {
  const { warnings, message } = error as BpmnError;
  error(description, warnings, message);
};
/** ---------- BPMN 文件下载 ---------- */
/**
 * 文件下载
 */
export const download = (href: string, filename: string) => {
  if (href && filename) {
    const a = document.createElement('a');
    a.download = filename; //指定下载的文件名
    a.href = href; //  URL对象
    a.click(); // 模拟点击
    URL.revokeObjectURL(a.href); // 释放URL 对象
  }
};

/**
 * 根据所需类型进行转码并返回下载地址
 */
export const downloadEncode = (type: string, filename = 'diagram', data: string) => {
  const encodedData = encodeURIComponent(data);
  return {
    filename: `${filename}.${type}`,
    href: `data:application/${type === 'svg' ? 'text/xml' : 'bpmn20-xml'};charset=UTF-8,${encodedData}`,
    data: data
  };
};
