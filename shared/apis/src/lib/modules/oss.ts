import type {
  AxiosHttpResult,
  BucketResponse,
  ListBucketsRequest,
  BucketExistsRequest,
  MakeBucketRequest,
  RemoveBucketRequest,
  CreateMultipartUploadDto,
  CompleteMultipartUploadDto,
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

  public getCreateMultipartUploadAddress(): string {
    return this.getBaseAddress() + '/create';
  }

  public getCompleteMultipartUploadAddress(): string {
    return this.getBaseAddress() + '/complete';
  }

  public createMultipartUpload(
    domain: CreateMultipartUploadDto
  ): Promise<AxiosHttpResult<MultipartUploadCreateResponse>> {
    return this.getConfig()
      .getHttp()
      .post<MultipartUploadCreateResponse, CreateMultipartUploadDto>(this.getCreateMultipartUploadAddress(), domain);
  }

  public completeMultipartUpload(domain: CompleteMultipartUploadDto): Promise<AxiosHttpResult<string>> {
    return this.getConfig()
      .getHttp()
      .post<string, CompleteMultipartUploadDto>(this.getCompleteMultipartUploadAddress(), domain);
  }
}

export { BucketService, MultipartUploadService };
