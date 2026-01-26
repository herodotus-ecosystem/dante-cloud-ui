import type {
  AxiosHttpResult,
  AxiosProgressEvent,
  CreateMultipartUploadArguments,
  CreateMultipartUploadBusiness,
  CompleteMultipartUploadArguments,
  CompleteMultipartUploadDomain,
  CreateBucketArgument,
  DeleteBucketArgument,
  DeleteObjectArgument,
  DeleteObjectsArgument,
  ListObjectsV2Argument,
  GetObjectArgument,
  CreateBucketResult,
  DeleteBucketResult,
  DeleteObjectResult,
  DeleteObjectsResult,
  ListObjectsV2Result,
  ListBucketsResult,
  PutObjectResult,
} from '@/declarations';

import { ContentTypeEnum } from '@herodotus-cloud/core';

import { Service, HttpConfig } from '../base';

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
    return this.getConfig().getOss() + '/oss/bucket';
  }

  private getListAddress(): string {
    return this.getBaseAddress() + '/list';
  }

  public listBuckets(): Promise<AxiosHttpResult<ListBucketsResult>> {
    return this.getConfig().getHttp().get<ListBucketsResult, string>(this.getListAddress());
  }

  public createBucket(request: CreateBucketArgument): Promise<AxiosHttpResult<CreateBucketResult>> {
    return this.getConfig()
      .getHttp()
      .post<CreateBucketResult, CreateBucketArgument>(this.getBaseAddress(), request);
  }

  public deleteBucket(request: DeleteBucketArgument): Promise<AxiosHttpResult<DeleteBucketResult>> {
    return this.getConfig()
      .getHttp()
      .delete<DeleteBucketResult, DeleteBucketArgument>(this.getBaseAddress(), request);
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
    return this.getConfig().getOss() + '/oss/object';
  }

  private getListV2Address(): string {
    return this.getBaseAddress() + '/list';
  }

  private getMultiDeleteAddress(): string {
    return this.getBaseAddress() + '/multi';
  }

  private getDownloadAddress(): string {
    return this.getBaseAddress() + '/download';
  }

  private getDisplayAddress(): string {
    return this.getBaseAddress() + '/display';
  }

  public getUploadAddress(): string {
    return this.getBaseAddress() + '/upload';
  }

  public listObjectsV2(
    request: ListObjectsV2Argument,
  ): Promise<AxiosHttpResult<ListObjectsV2Result>> {
    return this.getConfig()
      .getHttp()
      .get<ListObjectsV2Result, ListObjectsV2Argument>(this.getListV2Address(), request);
  }

  public delete(request: DeleteObjectArgument): Promise<AxiosHttpResult<DeleteObjectResult>> {
    return this.getConfig()
      .getHttp()
      .delete<DeleteObjectResult, DeleteObjectArgument>(this.getBaseAddress(), request);
  }

  public upload(
    bucketName: string,
    file: File,
    onProgress: (progressEvent: AxiosProgressEvent) => void,
  ): Promise<AxiosHttpResult<PutObjectResult>> {
    return this.getConfig()
      .getHttp()
      .post<
        PutObjectResult,
        any
      >(this.getUploadAddress(), { bucketName: bucketName, file: file }, { contentType: ContentTypeEnum.JSON }, { onUploadProgress: onProgress });
  }

  public download(
    request: GetObjectArgument,
    onProgress: (progressEvent: AxiosProgressEvent) => void,
  ): Promise<AxiosHttpResult<Blob>> {
    return this.getConfig()
      .getHttp()
      .post<
        Blob,
        any
      >(this.getDownloadAddress(), request, { contentType: ContentTypeEnum.JSON }, { responseType: 'blob', onDownloadProgress: onProgress });
  }

  public display(request: GetObjectArgument): Promise<AxiosHttpResult<Blob>> {
    return this.getConfig()
      .getHttp()
      .post<
        Blob,
        any
      >(this.getDisplayAddress(), request, { contentType: ContentTypeEnum.JSON }, { responseType: 'blob' });
  }

  public batchDelete(
    request: DeleteObjectsArgument,
  ): Promise<AxiosHttpResult<DeleteObjectsResult>> {
    return this.getConfig()
      .getHttp()
      .delete<DeleteObjectsResult, DeleteObjectsArgument>(this.getMultiDeleteAddress(), request);
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
    return this.getConfig().getOss() + '/oss/multipart-upload';
  }

  public getCreateMultipartUploadAddress(): string {
    return this.getBaseAddress() + '/create';
  }

  public getCompleteMultipartUploadAddress(): string {
    return this.getBaseAddress() + '/complete';
  }

  public createChunkUpload(
    request: CreateMultipartUploadArguments,
  ): Promise<AxiosHttpResult<CreateMultipartUploadBusiness>> {
    return this.getConfig()
      .getHttp()
      .post<
        CreateMultipartUploadBusiness,
        CreateMultipartUploadArguments
      >(this.getCreateMultipartUploadAddress(), request);
  }

  public completeChunkUpload(
    request: CompleteMultipartUploadArguments,
  ): Promise<AxiosHttpResult<CompleteMultipartUploadDomain>> {
    return this.getConfig()
      .getHttp()
      .post<
        CompleteMultipartUploadDomain,
        CompleteMultipartUploadArguments
      >(this.getCompleteMultipartUploadAddress(), request);
  }
}

export { BucketService, ObjectService, MultipartUploadService };
