import type {
  AxiosHttpResult,
  ObjectWriteDomain,
  BucketSettingBusiness,
  DeleteBucketEncryptionRequest,
  DeleteBucketPolicyRequest,
  DeleteBucketTagsRequest,
  DeleteObjectLockConfigurationRequest,
  SetBucketEncryptionRequest,
  SetBucketPolicyRequest,
  SetBucketTagsRequest,
  SetObjectLockConfigurationRequest,
  ObjectStreamDownloadRequest,
  ObjectSettingBusiness,
  EnableObjectLegalHoldRequest,
  DisableObjectLegalHoldRequest,
  DeleteObjectTagsRequest,
  SetObjectTagsRequest,
  SetObjectRetentionRequest,
  ChunkUploadCreateRequest,
  ChunkUploadCompleteRequest,
  ChunkUploadCreateBusiness,
  SetBucketQuotaRequest,
  SetBucketVersioningRequest
} from '/@/declarations';

import { ContentTypeEnum } from '/@/enums';

import { HttpConfig, Service } from '../base';

class MinioBucketSettingService extends Service {
  private static instance: MinioBucketSettingService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): MinioBucketSettingService {
    if (this.instance == null) {
      this.instance = new MinioBucketSettingService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getOss() + '/oss/minio/bucket/setting';
  }

  public get(bucketName: string, region = ''): Promise<AxiosHttpResult<BucketSettingBusiness>> {
    return this.getConfig()
      .getHttp()
      .get<BucketSettingBusiness, string>(this.getBaseAddress(), { bucketName: bucketName, region: region });
  }
}

class MinioChunkUploadService extends Service {
  private static instance: MinioChunkUploadService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): MinioChunkUploadService {
    if (this.instance == null) {
      this.instance = new MinioChunkUploadService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getOss() + '/oss/minio/chunk';
  }

  public getChunkUploadCreateAddress(): string {
    return this.getBaseAddress() + '/create';
  }

  public getChunkUploadCompleteAddress(): string {
    return this.getBaseAddress() + '/complete';
  }

  public createChunkUpload(request: ChunkUploadCreateRequest): Promise<AxiosHttpResult<ChunkUploadCreateBusiness>> {
    return this.getConfig()
      .getHttp()
      .post<ChunkUploadCreateBusiness, ChunkUploadCreateRequest>(this.getChunkUploadCreateAddress(), request);
  }

  public completeChunkUpload(request: ChunkUploadCompleteRequest): Promise<AxiosHttpResult<ObjectWriteDomain>> {
    return this.getConfig()
      .getHttp()
      .post<ObjectWriteDomain, ChunkUploadCompleteRequest>(this.getChunkUploadCompleteAddress(), request);
  }
}

class MinioBucketEncryptionService extends Service {
  private static instance: MinioBucketEncryptionService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): MinioBucketEncryptionService {
    if (this.instance == null) {
      this.instance = new MinioBucketEncryptionService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getOss() + '/oss/minio/bucket/encryption';
  }

  public set(request: SetBucketEncryptionRequest): Promise<AxiosHttpResult<boolean>> {
    return this.getConfig().getHttp().put<boolean, SetBucketEncryptionRequest>(this.getBaseAddress(), request);
  }
  public delete(request: DeleteBucketEncryptionRequest): Promise<AxiosHttpResult<boolean>> {
    return this.getConfig().getHttp().delete<boolean, DeleteBucketEncryptionRequest>(this.getBaseAddress(), request);
  }
}

class MinioBucketPolicyService extends Service {
  private static instance: MinioBucketPolicyService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): MinioBucketPolicyService {
    if (this.instance == null) {
      this.instance = new MinioBucketPolicyService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getOss() + '/oss/minio/bucket/policy';
  }

  public set(request: SetBucketPolicyRequest): Promise<AxiosHttpResult<boolean>> {
    return this.getConfig().getHttp().put<boolean, SetBucketPolicyRequest>(this.getBaseAddress(), request);
  }
  public delete(request: DeleteBucketPolicyRequest): Promise<AxiosHttpResult<boolean>> {
    return this.getConfig().getHttp().delete<boolean, DeleteBucketPolicyRequest>(this.getBaseAddress(), request);
  }
}

class MinioBucketTagsService extends Service {
  private static instance: MinioBucketTagsService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): MinioBucketTagsService {
    if (this.instance == null) {
      this.instance = new MinioBucketTagsService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getOss() + '/oss/minio/bucket/tags';
  }

  public set(request: SetBucketTagsRequest): Promise<AxiosHttpResult<boolean>> {
    return this.getConfig().getHttp().put<boolean, SetBucketTagsRequest>(this.getBaseAddress(), request);
  }
  public delete(request: DeleteBucketTagsRequest): Promise<AxiosHttpResult<boolean>> {
    return this.getConfig().getHttp().delete<boolean, DeleteBucketTagsRequest>(this.getBaseAddress(), request);
  }
}

class MinioBucketQuotaService extends Service {
  private static instance: MinioBucketQuotaService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): MinioBucketQuotaService {
    if (this.instance == null) {
      this.instance = new MinioBucketQuotaService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getOss() + '/oss/minio/bucket/quota';
  }

  public set(request: SetBucketQuotaRequest): Promise<AxiosHttpResult<boolean>> {
    return this.getConfig().getHttp().put<boolean, SetBucketQuotaRequest>(this.getBaseAddress(), request);
  }
}

class MinioBucketVersioningService extends Service {
  private static instance: MinioBucketVersioningService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): MinioBucketVersioningService {
    if (this.instance == null) {
      this.instance = new MinioBucketVersioningService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getOss() + '/oss/minio/bucket/versioning';
  }

  public set(request: SetBucketVersioningRequest): Promise<AxiosHttpResult<boolean>> {
    return this.getConfig().getHttp().put<boolean, SetBucketVersioningRequest>(this.getBaseAddress(), request);
  }
}

class MinioObjectLockConfigurationService extends Service {
  private static instance: MinioObjectLockConfigurationService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): MinioObjectLockConfigurationService {
    if (this.instance == null) {
      this.instance = new MinioObjectLockConfigurationService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getOss() + '/oss/minio/bucket/object-lock';
  }

  public set(request: SetObjectLockConfigurationRequest): Promise<AxiosHttpResult<boolean>> {
    return this.getConfig().getHttp().put<boolean, SetObjectLockConfigurationRequest>(this.getBaseAddress(), request);
  }
  public delete(request: DeleteObjectLockConfigurationRequest): Promise<AxiosHttpResult<boolean>> {
    return this.getConfig()
      .getHttp()
      .delete<boolean, DeleteObjectLockConfigurationRequest>(this.getBaseAddress(), request);
  }
}

class MinioObjectStreamService extends Service {
  private static instance: MinioObjectStreamService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): MinioObjectStreamService {
    if (this.instance == null) {
      this.instance = new MinioObjectStreamService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getOss() + '/oss/minio/object/stream';
  }

  public getDownloadAddress(): string {
    return this.getBaseAddress() + '/download';
  }

  public getUploadAddress(): string {
    return this.getBaseAddress() + '/upload';
  }

  public download(request: ObjectStreamDownloadRequest): Promise<AxiosHttpResult<Blob>> {
    return this.getConfig()
      .getHttp()
      .post<Blob, ObjectStreamDownloadRequest>(
        this.getDownloadAddress(),
        request,
        { contentType: ContentTypeEnum.JSON },
        { responseType: 'blob' }
      );
  }

  public upload(bucketName: string, file: File): Promise<AxiosHttpResult<ObjectWriteDomain>> {
    return this.getConfig()
      .getHttp()
      .post<ObjectWriteDomain, any>(this.getDownloadAddress(), { bucketName: bucketName, file: file });
  }
}

class MinioObjectSettingService extends Service {
  private static instance: MinioObjectSettingService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): MinioObjectSettingService {
    if (this.instance == null) {
      this.instance = new MinioObjectSettingService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getOss() + '/oss/minio/object/setting';
  }

  public get(bucketName: string, objectName: string): Promise<AxiosHttpResult<ObjectSettingBusiness>> {
    return this.getConfig()
      .getHttp()
      .get<ObjectSettingBusiness, string>(this.getBaseAddress(), { bucketName: bucketName, objectName: objectName });
  }
}

class MinioObjectTagsService extends Service {
  private static instance: MinioObjectTagsService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): MinioObjectTagsService {
    if (this.instance == null) {
      this.instance = new MinioObjectTagsService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getOss() + '/oss/minio/object/tags';
  }

  public set(request: SetObjectTagsRequest): Promise<AxiosHttpResult<boolean>> {
    return this.getConfig().getHttp().put<boolean, SetObjectTagsRequest>(this.getBaseAddress(), request);
  }
  public delete(request: DeleteObjectTagsRequest): Promise<AxiosHttpResult<boolean>> {
    return this.getConfig().getHttp().delete<boolean, DeleteObjectTagsRequest>(this.getBaseAddress(), request);
  }
}

class MinioObjectRetentionService extends Service {
  private static instance: MinioObjectRetentionService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): MinioObjectRetentionService {
    if (this.instance == null) {
      this.instance = new MinioObjectRetentionService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getOss() + '/oss/minio/object/retention';
  }

  public set(request: SetObjectRetentionRequest): Promise<AxiosHttpResult<boolean>> {
    return this.getConfig().getHttp().put<boolean, SetObjectRetentionRequest>(this.getBaseAddress(), request);
  }
}

class MinioObjectLegalHoldService extends Service {
  private static instance: MinioObjectLegalHoldService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): MinioObjectLegalHoldService {
    if (this.instance == null) {
      this.instance = new MinioObjectLegalHoldService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getOss() + '/oss/minio/object/legal-hold';
  }

  public getEnableAddress(): string {
    return this.getBaseAddress() + '/enable';
  }

  public getDisableAddress(): string {
    return this.getBaseAddress() + '/disable';
  }

  public enable(request: EnableObjectLegalHoldRequest): Promise<AxiosHttpResult<boolean>> {
    return this.getConfig().getHttp().put<boolean, EnableObjectLegalHoldRequest>(this.getEnableAddress(), request);
  }

  public disable(request: DisableObjectLegalHoldRequest): Promise<AxiosHttpResult<boolean>> {
    return this.getConfig().getHttp().put<boolean, DisableObjectLegalHoldRequest>(this.getDisableAddress(), request);
  }
}

export {
  MinioBucketSettingService,
  MinioBucketEncryptionService,
  MinioBucketPolicyService,
  MinioBucketTagsService,
  MinioBucketQuotaService,
  MinioBucketVersioningService,
  MinioChunkUploadService,
  MinioObjectLockConfigurationService,
  MinioObjectStreamService,
  MinioObjectSettingService,
  MinioObjectTagsService,
  MinioObjectRetentionService,
  MinioObjectLegalHoldService
};
