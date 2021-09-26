import * as lodash from 'lodash';

class ArrayUtils {
    private static instance = new ArrayUtils();

    private constructor() {}

    public static getInstance(): ArrayUtils {
        return this.instance;
    }

    public find<T>(array: T[], element: T, comparator): T | undefined {
        return lodash.find(array, (item) => item[comparator] === element[comparator]);
    }

    public remove<T>(array: T[], element: T, comparator): T[] {
        return lodash.remove<T>(array, (item) => item[comparator] === element[comparator]);
    }
}

export const _array: ArrayUtils = ArrayUtils.getInstance();
