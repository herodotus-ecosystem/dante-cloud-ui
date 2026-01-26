import type { Entity } from './base';

export type EntityTitle<E extends Entity> = Partial<Record<keyof E, string>>;
