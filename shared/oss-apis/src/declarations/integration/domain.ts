import type { Entity, Conditions } from '../base';

export interface OwnerDomain extends Entity {
  /**
   * 所有者 ID
   */
  id: string;
  /**
   * 所有者显示名称
   */
  displayName: string;
}

export interface BucketDomain extends Entity {
  /**
   * 存储桶名称
   */
  name: string;
  /**
   * 存储桶所有者信息
   */
  owner?: OwnerDomain;
  /**
   * 存储桶创建时间
   */
  creationDate: Date;
}

export type BucketDomainProps = keyof BucketDomain;
export interface BucketDomainConditions extends Conditions {}
