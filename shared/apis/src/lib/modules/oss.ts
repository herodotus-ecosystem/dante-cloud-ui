import type {
  AxiosHttpResult,
  BucketResponse,
  ListBucketsRequest,
  BucketExistsRequest,
  MakeBucketRequest,
  RemoveBucketRequest,
  ObjectWriteResponse,
  BucketSettingResponse,
  MultipartUploadCreateRequest,
  MultipartUploadCompleteRequest,
  MultipartUploadCreateResponse
} from '/@/declarations';

import { HttpConfig, BaseService, Service } from '../base';

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

  public list(request: ListBucketsRequest = {}): Promise<AxiosHttpResult<BucketResponse[]>> {
    return this.getConfig().getHttp().get<BucketResponse[], ListBucketsRequest>(this.getListAddress(), request);
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

  private getListAddress(): string {
    return this.getBaseAddress() + '/list';
  }

  private getExistsAddress(): string {
    return this.getBaseAddress() + '/exists';
  }

  public get(bucketName: string, region = ''): Promise<AxiosHttpResult<BucketSettingResponse>> {
    return this.getConfig()
      .getHttp()
      .get<BucketSettingResponse, string>(this.getListAddress(), { bucketName: bucketName, region: region });
  }
}

class MultipartUploadService extends Service {
  private static instance: MultipartUploadService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): MultipartUploadService {
    if (this.instance == null) {
      this.instance = new MultipartUploadService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return '/oss/minio/multipart';
  }

  public getMultipartUploadCreateAddress(): string {
    return this.getBaseAddress() + '/create';
  }

  public getMultipartUploadCompleteAddress(): string {
    return this.getBaseAddress() + '/complete';
  }

  public createMultipartUpload(
    request: MultipartUploadCreateRequest
  ): Promise<AxiosHttpResult<MultipartUploadCreateResponse>> {
    return this.getConfig()
      .getHttp()
      .post<MultipartUploadCreateResponse, MultipartUploadCreateRequest>(
        this.getMultipartUploadCreateAddress(),
        request
      );
  }

  public completeMultipartUpload(
    request: MultipartUploadCompleteRequest
  ): Promise<AxiosHttpResult<ObjectWriteResponse>> {
    return this.getConfig()
      .getHttp()
      .post<ObjectWriteResponse, MultipartUploadCompleteRequest>(this.getMultipartUploadCompleteAddress(), request);
  }
}

export { BucketService, MultipartUploadService, BucketSettingService };
