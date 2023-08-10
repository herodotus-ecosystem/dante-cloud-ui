import type { Entity, Conditions } from '../../base';
export interface OwnerEntity extends Entity {
    /**
     * 所有者 ID
     */
    id: string;
    /**
     * 所有者显示名称
     */
    displayName: string;
}
export interface BucketEntity extends Entity {
    /**
     * 存储桶名称
     */
    name: string;
    /**
     * 存储桶所有者信息
     */
    owner?: OwnerEntity;
    /**
     * 存储桶创建时间
     */
    creationDate: Date;
}
export type BucketEntityProps = keyof BucketEntity;
export interface BucketEntityConditions extends Conditions {
}
