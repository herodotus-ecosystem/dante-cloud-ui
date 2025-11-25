import { RouteRecordRaw } from 'vue-router';
export default function useQuasarMenu(): {
    hasPermission: (item: RouteRecordRaw) => boolean;
    getItemTitle: (item: RouteRecordRaw) => string;
    getItemIcon: (item: RouteRecordRaw) => string;
    getItemChildren: (item: RouteRecordRaw) => Array<RouteRecordRaw>;
    isDisplayAsItem: (item: RouteRecordRaw) => boolean;
};
