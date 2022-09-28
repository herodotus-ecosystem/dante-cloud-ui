declare type ColorIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
/**
 * 根据颜色获取调色板颜色(从左至右颜色从浅到深，6为主色号)
 * @param color - 颜色
 * @param index - 调色板的对应的色号(6为主色号)
 * @description 算法实现从ant-design调色板算法中借鉴 https://github.com/ant-design/ant-design/blob/master/components/style/color/colorPalette.less
 */
export declare function getColorPalette(color: string, index: ColorIndex): string;
/**
 * 根据颜色获取调色板颜色所有颜色
 * @param color - 颜色
 */
export declare function getAllColorPalette(color: string): string[];
/**
 * 给颜色加透明度
 * @param color - 颜色
 * @param alpha - 透明度(0 - 1)
 */
export declare function addColorAlpha(color: string, alpha: number): string;
/**
 * 颜色混合
 * @param firstColor - 第一个颜色
 * @param secondColor - 第二个颜色
 * @param ratio - 第二个颜色占比
 */
export declare function mixColor(firstColor: string, secondColor: string, ratio: number): string;
/**
 * 是否是白颜色
 * @param color - 颜色
 */
export declare function isWhiteColor(color: string): boolean;
export {};
