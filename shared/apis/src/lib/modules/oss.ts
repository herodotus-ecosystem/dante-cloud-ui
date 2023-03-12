import type {
  BucketEntity,
  AxiosHttpResult,
  RemoveBucketArgument,
  CreateMultipartUploadDto,
  CompleteMultipartUploadDto,
  MultipartUploadCreateResponse
} from '/@/declarations';

import { HttpConfig, BaseService, Service } from '../base';

class BucketService extends BaseService<BucketEntity> {
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
    return '/oss/minio/bucket';
  }

  public remove(dto: RemoveBucketArgument): Promise<AxiosHttpResult<string>> {
    return this.getConfig().getHttp().delete<string, RemoveBucketArgument>(this.getBaseAddress(), dto);
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
