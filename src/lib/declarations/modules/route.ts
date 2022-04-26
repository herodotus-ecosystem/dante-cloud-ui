import { RouteLocationNormalizedLoaded, RouteRecordName } from 'vue-router';

export interface Tab extends Pick<RouteLocationNormalizedLoaded, 'name' | 'path' | 'meta'> {}
