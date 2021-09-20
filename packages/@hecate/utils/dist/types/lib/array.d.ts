declare class ArrayUtils {
    private static instance;
    private constructor();
    static getInstance(): ArrayUtils;
    find<T>(array: T[], element: T, comparator: any): T | undefined;
    remove<T>(array: T[], element: T, comparator: any): T[];
}
export declare const _array: ArrayUtils;
export {};
//# sourceMappingURL=array.d.ts.map