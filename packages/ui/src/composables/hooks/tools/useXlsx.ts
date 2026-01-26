import * as XLSX from 'xlsx';

import type { Entity, EntityTitle } from '@/composables/declarations';

import { at } from 'lodash-es';

export default function useXlsx<E extends Entity>() {
  const createExportData = (entities: Array<E>, title: EntityTitle<E>) => {
    // 根据 Title 对象的属性创建一个索引数组
    const index = Object.keys(title) as Array<keyof E>;

    // 将 Title 对象中，属性对应的值转换为一个数组作为标题
    const header = Array.from(index, (key) => title[key]);

    // 把传入的数据数组，按照索引顺序，转换为结果数据
    const items = Array.from(entities, (entity) => at(entity, index));

    const result = [];
    result.push(header);
    result.push(...items);
    return result;
  };

  const postExport = (entities: Array<E>, title: EntityTitle<E>, name: string) => {
    // 根据 Title 对象的属性创建一个索引数组
    const data = createExportData(entities, title);

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    // // 此处隐藏英文字段表头
    // const wsrows = [{ hidden: true }];
    // ws['!rows'] = wsrows; // ws - worksheet
    XLSX.utils.book_append_sheet(wb, ws, name);
    /* generate file and send to client */
    XLSX.writeFile(wb, name + '.xlsx');
  };

  return {
    postExport,
  };
}
