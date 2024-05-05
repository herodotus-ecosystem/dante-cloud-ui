import { Axios, HttpConfig } from './base';

import { BucketService, ObjectService, ObjectStreamService, MultipartUploadService } from './integration';

import {
  OssConstantService,
  MinioBucketSettingService,
  MinioBucketEncryptionService,
  MinioBucketPolicyService,
  MinioBucketTagsService,
  MinioBucketQuotaService,
  MinioBucketVersioningService,
  MinioObjectLockConfigurationService,
  MinioObjectSettingService,
  MinioObjectTagsService,
  MinioObjectRetentionService,
  MinioObjectLegalHoldService
} from './modules';

class OssApiResources {
  private static instance: OssApiResources;
  private config = {} as HttpConfig;

  private constructor(config: HttpConfig) {
    this.config = config;
  }

  public static getInstance(config: HttpConfig): OssApiResources {
    if (this.instance == null) {
      this.instance = new OssApiResources(config);
    }
    return this.instance;
  }

  public getConfig(): HttpConfig {
    return this.config;
  }

  public bucket(): BucketService {
    return BucketService.getInstance(this.config);
  }

  public object(): ObjectService {
    return ObjectService.getInstance(this.config);
  }

  public objectStream(): ObjectStreamService {
    return ObjectStreamService.getInstance(this.config);
  }

  public multipartUpload(): MultipartUploadService {
    return MultipartUploadService.getInstance(this.config);
  }

  public constant(): OssConstantService {
    return OssConstantService.getInstance(this.config);
  }

  public minioBucketSetting(): MinioBucketSettingService {
    return MinioBucketSettingService.getInstance(this.config);
  }

  public minioBucketEncryption(): MinioBucketEncryptionService {
    return MinioBucketEncryptionService.getInstance(this.config);
  }

  public minioBucketPolicy(): MinioBucketPolicyService {
    return MinioBucketPolicyService.getInstance(this.config);
  }

  public minioBucketTags(): MinioBucketTagsService {
    return MinioBucketTagsService.getInstance(this.config);
  }

  public minioBucketQuota(): MinioBucketQuotaService {
    return MinioBucketQuotaService.getInstance(this.config);
  }

  public minioBucketVersioning(): MinioBucketVersioningService {
    return MinioBucketVersioningService.getInstance(this.config);
  }

  public minioObjectLock(): MinioObjectLockConfigurationService {
    return MinioObjectLockConfigurationService.getInstance(this.config);
  }

  public minioObjectSetting(): MinioObjectSettingService {
    return MinioObjectSettingService.getInstance(this.config);
  }

  public minioObjectTags(): MinioObjectTagsService {
    return MinioObjectTagsService.getInstance(this.config);
  }

  public minioObjectRetention(): MinioObjectRetentionService {
    return MinioObjectRetentionService.getInstance(this.config);
  }

  public minioObjectLegalHold(): MinioObjectLegalHoldService {
    return MinioObjectLegalHoldService.getInstance(this.config);
  }
}

const createOssApi = (project: string, clientId: string, clientSecret: string, http: Axios): OssApiResources => {
  const config = new HttpConfig(project, clientId, clientSecret, http);
  return OssApiResources.getInstance(config);
};

export { createOssApi };
