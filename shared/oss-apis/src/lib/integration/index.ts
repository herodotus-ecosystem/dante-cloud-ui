import type {
  AxiosHttpResult,
  AxiosProgressEvent,
  BucketDomain,
  CreateBucketArguments,
  DeleteBucketArguments,
  ListObjectsArguments,
  ObjectListingDomain,
  ListObjectsV2Arguments,
  ObjectListingV2Domain,
  DeleteObjectArguments,
  DeleteObjectsArguments,
  DeleteObjectDomain,
  PutObjectDomain,
  ObjectStreamDownloadArguments,
  CreateMultipartUploadArguments,
  CreateMultipartUploadBusiness,
  CompleteMultipartUploadArguments,
  CompleteMultipartUploadDomain,
} from '@/declarations';

import { ContentTypeEnum } from '@/enums';

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

  private getExistsAddress(): string {
    return this.getBaseAddress() + '/exists';
  }

  public doesBucketExist(bucketName: string): Promise<AxiosHttpResult<boolean>> {
    return this.getConfig()
      .getHttp()
      .get<boolean, string>(this.getExistsAddress(), { bucketName: bucketName });
  }

  public listBuckets(): Promise<AxiosHttpResult<Array<BucketDomain>>> {
    return this.getConfig().getHttp().get<Array<BucketDomain>, string>(this.getListAddress());
  }

  public createBucket(request: CreateBucketArguments): Promise<AxiosHttpResult<boolean>> {
    return this.getConfig()
      .getHttp()
      .post<boolean, CreateBucketArguments>(this.getBaseAddress(), request);
  }

  public deleteBucket(request: DeleteBucketArguments): Promise<AxiosHttpResult<boolean>> {
    return this.getConfig()
      .getHttp()
      .delete<boolean, DeleteBucketArguments>(this.getBaseAddress(), request);
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

  private getListAddress(): string {
    return this.getBaseAddress() + '/list';
  }

  private getListV2Address(): string {
    return this.getBaseAddress() + '/v2/list';
  }

  private getMultiDeleteAddress(): string {
    return this.getBaseAddress() + '/multi';
  }

  public listObjects(request: ListObjectsArguments): Promise<AxiosHttpResult<ObjectListingDomain>> {
    return this.getConfig()
      .getHttp()
      .get<ObjectListingDomain, ListObjectsArguments>(this.getListAddress(), request);
  }

  public listObjectsV2(
    request: ListObjectsV2Arguments,
  ): Promise<AxiosHttpResult<ObjectListingV2Domain>> {
    return this.getConfig()
      .getHttp()
      .get<ObjectListingV2Domain, ListObjectsV2Arguments>(this.getListV2Address(), request);
  }

  public delete(request: DeleteObjectArguments): Promise<AxiosHttpResult<boolean>> {
    return this.getConfig()
      .getHttp()
      .delete<boolean, DeleteObjectArguments>(this.getBaseAddress(), request);
  }

  public batchDelete(
    request: DeleteObjectsArguments,
  ): Promise<AxiosHttpResult<Array<DeleteObjectDomain>>> {
    return this.getConfig()
      .getHttp()
      .delete<
        Array<DeleteObjectDomain>,
        DeleteObjectsArguments
      >(this.getMultiDeleteAddress(), request);
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
    return this.getConfig().getOss() + '/oss/object/stream';
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

  public download(
    request: ObjectStreamDownloadArguments,
    onProgress?: (progressEvent: AxiosProgressEvent) => void,
  ): Promise<AxiosHttpResult<Blob>> {
    return this.getConfig()
      .getHttp()
      .post<
        Blob,
        any
      >(this.getDownloadAddress(), request, { contentType: ContentTypeEnum.JSON }, { responseType: 'blob', onDownloadProgress: onProgress });
  }

  public display(request: ObjectStreamDownloadArguments): Promise<AxiosHttpResult<Blob>> {
    return this.getConfig()
      .getHttp()
      .post<
        Blob,
        any
      >(this.getDisplayAddress(), request, { contentType: ContentTypeEnum.JSON }, { responseType: 'blob' });
  }

  public upload(
    bucketName: string,
    file: File,
    onProgress?: (progressEvent: AxiosProgressEvent) => void,
  ): Promise<AxiosHttpResult<PutObjectDomain>> {
    return this.getConfig()
      .getHttp()
      .post<
        PutObjectDomain,
        any
      >(this.getUploadAddress(), { bucketName: bucketName, file: file }, { contentType: ContentTypeEnum.JSON }, { onUploadProgress: onProgress });
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

export { BucketService, ObjectService, ObjectStreamService, MultipartUploadService };
