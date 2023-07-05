import type {
  AxiosHttpResult,
  BucketDomain,
  ListBucketsRequest,
  BucketExistsRequest,
  MakeBucketRequest,
  RemoveBucketRequest,
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
  ObjectDomain,
  ListObjectsRequest,
  RemoveObjectRequest,
  RemoveObjectsRequest,
  DeleteErrorDomain,
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

class BucketService extends Service {
  private static instance: BucketService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): BucketService {
    if (this.instance == null) {
      this.instance = new BucketService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getOss() + '/oss/minio/bucket';
  }

  private getListAddress(): string {
    return this.getBaseAddress() + '/list';
  }

  private getExistsAddress(): string {
    return this.getBaseAddress() + '/exists';
  }

  public list(request: ListBucketsRequest = {}): Promise<AxiosHttpResult<Array<BucketDomain>>> {
    return this.getConfig().getHttp().get<Array<BucketDomain>, ListBucketsRequest>(this.getListAddress(), request);
  }
  public exists(request: BucketExistsRequest): Promise<AxiosHttpResult<boolean>> {
    return this.getConfig().getHttp().get<boolean, BucketExistsRequest>(this.getExistsAddress(), request);
  }

  public make(request: MakeBucketRequest): Promise<AxiosHttpResult<boolean>> {
    return this.getConfig().getHttp().post<boolean, MakeBucketRequest>(this.getBaseAddress(), request);
  }

  public remove(request: RemoveBucketRequest): Promise<AxiosHttpResult<boolean>> {
    return this.getConfig().getHttp().delete<boolean, RemoveBucketRequest>(this.getBaseAddress(), request);
  }
}

class BucketSettingService extends Service {
  private static instance: BucketSettingService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): BucketSettingService {
    if (this.instance == null) {
      this.instance = new BucketSettingService(config);
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

class ChunkUploadService extends Service {
  private static instance: ChunkUploadService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): ChunkUploadService {
    if (this.instance == null) {
      this.instance = new ChunkUploadService(config);
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

class BucketEncryptionService extends Service {
  private static instance: BucketEncryptionService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): BucketEncryptionService {
    if (this.instance == null) {
      this.instance = new BucketEncryptionService(config);
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

class BucketPolicyService extends Service {
  private static instance: BucketPolicyService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): BucketPolicyService {
    if (this.instance == null) {
      this.instance = new BucketPolicyService(config);
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

class BucketTagsService extends Service {
  private static instance: BucketTagsService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): BucketTagsService {
    if (this.instance == null) {
      this.instance = new BucketTagsService(config);
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

class BucketQuotaService extends Service {
  private static instance: BucketQuotaService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): BucketQuotaService {
    if (this.instance == null) {
      this.instance = new BucketQuotaService(config);
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

class BucketVersioningService extends Service {
  private static instance: BucketVersioningService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): BucketVersioningService {
    if (this.instance == null) {
      this.instance = new BucketVersioningService(config);
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

class ObjectLockConfigurationService extends Service {
  private static instance: ObjectLockConfigurationService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): ObjectLockConfigurationService {
    if (this.instance == null) {
      this.instance = new ObjectLockConfigurationService(config);
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

class ObjectService extends Service {
  private static instance: ObjectService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): ObjectService {
    if (this.instance == null) {
      this.instance = new ObjectService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getOss() + '/oss/minio/object';
  }

  private getListAddress(): string {
    return this.getBaseAddress() + '/list';
  }

  private getMultiDeleteAddress(): string {
    return this.getBaseAddress() + '/multi';
  }

  public list(request: ListObjectsRequest): Promise<AxiosHttpResult<ObjectDomain[]>> {
    return this.getConfig().getHttp().get<ObjectDomain[], ListBucketsRequest>(this.getListAddress(), request);
  }

  public delete(request: RemoveObjectRequest): Promise<AxiosHttpResult<boolean>> {
    return this.getConfig().getHttp().delete<boolean, RemoveObjectRequest>(this.getBaseAddress(), request);
  }

  public batchDelete(request: RemoveObjectsRequest): Promise<AxiosHttpResult<Array<DeleteErrorDomain>>> {
    return this.getConfig()
      .getHttp()
      .delete<Array<DeleteErrorDomain>, RemoveObjectsRequest>(this.getMultiDeleteAddress(), request);
  }
}

class ObjectStreamService extends Service {
  private static instance: ObjectStreamService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): ObjectStreamService {
    if (this.instance == null) {
      this.instance = new ObjectStreamService(config);
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

class ObjectSettingService extends Service {
  private static instance: ObjectSettingService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): ObjectSettingService {
    if (this.instance == null) {
      this.instance = new ObjectSettingService(config);
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

class ObjectTagsService extends Service {
  private static instance: ObjectTagsService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): ObjectTagsService {
    if (this.instance == null) {
      this.instance = new ObjectTagsService(config);
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

class ObjectRetentionService extends Service {
  private static instance: ObjectRetentionService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): ObjectRetentionService {
    if (this.instance == null) {
      this.instance = new ObjectRetentionService(config);
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

class ObjectLegalHoldService extends Service {
  private static instance: ObjectLegalHoldService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): ObjectLegalHoldService {
    if (this.instance == null) {
      this.instance = new ObjectLegalHoldService(config);
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
  BucketService,
  BucketSettingService,
  BucketEncryptionService,
  BucketPolicyService,
  BucketTagsService,
  BucketQuotaService,
  BucketVersioningService,
  ChunkUploadService,
  ObjectLockConfigurationService,
  ObjectService,
  ObjectStreamService,
  ObjectSettingService,
  ObjectTagsService,
  ObjectRetentionService,
  ObjectLegalHoldService
};
