import { BaseService, Service, ContentTypeEnum, HttpConfig } from "@herodotus/core";
import { Axios, BaseService as BaseService2, HttpConfig as HttpConfig2, Service as Service2 } from "@herodotus/core";
class OssConstantService extends BaseService {
  static instance;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OssConstantService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getOss() + "/oss/minio/constant/enums";
  }
}
class MinioBucketSettingService extends Service {
  static instance;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new MinioBucketSettingService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getOss() + "/oss/minio/bucket/setting";
  }
  get(bucketName, region = "") {
    return this.getConfig().getHttp().get(this.getBaseAddress(), { bucketName, region });
  }
}
class MinioBucketEncryptionService extends Service {
  static instance;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new MinioBucketEncryptionService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getOss() + "/oss/minio/bucket/encryption";
  }
  set(request) {
    return this.getConfig().getHttp().put(this.getBaseAddress(), request);
  }
  delete(request) {
    return this.getConfig().getHttp().delete(this.getBaseAddress(), request);
  }
}
class MinioBucketPolicyService extends Service {
  static instance;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new MinioBucketPolicyService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getOss() + "/oss/minio/bucket/policy";
  }
  set(request) {
    return this.getConfig().getHttp().put(this.getBaseAddress(), request);
  }
  delete(request) {
    return this.getConfig().getHttp().delete(this.getBaseAddress(), request);
  }
}
class MinioBucketTagsService extends Service {
  static instance;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new MinioBucketTagsService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getOss() + "/oss/minio/bucket/tags";
  }
  set(request) {
    return this.getConfig().getHttp().put(this.getBaseAddress(), request);
  }
  delete(request) {
    return this.getConfig().getHttp().delete(this.getBaseAddress(), request);
  }
}
class MinioBucketQuotaService extends Service {
  static instance;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new MinioBucketQuotaService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getOss() + "/oss/minio/bucket/quota";
  }
  set(request) {
    return this.getConfig().getHttp().put(this.getBaseAddress(), request);
  }
}
class MinioBucketVersioningService extends Service {
  static instance;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new MinioBucketVersioningService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getOss() + "/oss/minio/bucket/versioning";
  }
  set(request) {
    return this.getConfig().getHttp().put(this.getBaseAddress(), request);
  }
}
class MinioObjectLockConfigurationService extends Service {
  static instance;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new MinioObjectLockConfigurationService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getOss() + "/oss/minio/bucket/object-lock";
  }
  set(request) {
    return this.getConfig().getHttp().put(this.getBaseAddress(), request);
  }
  delete(request) {
    return this.getConfig().getHttp().delete(this.getBaseAddress(), request);
  }
}
class MinioObjectSettingService extends Service {
  static instance;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new MinioObjectSettingService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getOss() + "/oss/minio/object/setting";
  }
  get(bucketName, objectName) {
    return this.getConfig().getHttp().get(this.getBaseAddress(), { bucketName, objectName });
  }
}
class MinioObjectTagsService extends Service {
  static instance;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new MinioObjectTagsService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getOss() + "/oss/minio/object/tags";
  }
  set(request) {
    return this.getConfig().getHttp().put(this.getBaseAddress(), request);
  }
  delete(request) {
    return this.getConfig().getHttp().delete(this.getBaseAddress(), request);
  }
}
class MinioObjectRetentionService extends Service {
  static instance;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new MinioObjectRetentionService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getOss() + "/oss/minio/object/retention";
  }
  set(request) {
    return this.getConfig().getHttp().put(this.getBaseAddress(), request);
  }
}
class MinioObjectLegalHoldService extends Service {
  static instance;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new MinioObjectLegalHoldService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getOss() + "/oss/minio/object/legal-hold";
  }
  getEnableAddress() {
    return this.getBaseAddress() + "/enable";
  }
  getDisableAddress() {
    return this.getBaseAddress() + "/disable";
  }
  enable(request) {
    return this.getConfig().getHttp().put(this.getEnableAddress(), request);
  }
  disable(request) {
    return this.getConfig().getHttp().put(this.getDisableAddress(), request);
  }
}
class BucketService extends Service {
  static instance;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new BucketService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getOss() + "/oss/bucket";
  }
  getListAddress() {
    return this.getBaseAddress() + "/list";
  }
  getExistsAddress() {
    return this.getBaseAddress() + "/exists";
  }
  doesBucketExist(bucketName) {
    return this.getConfig().getHttp().get(this.getExistsAddress(), { bucketName });
  }
  listBuckets() {
    return this.getConfig().getHttp().get(this.getListAddress());
  }
  createBucket(request) {
    return this.getConfig().getHttp().post(this.getBaseAddress(), request);
  }
  deleteBucket(request) {
    return this.getConfig().getHttp().delete(this.getBaseAddress(), request);
  }
}
class ObjectService extends Service {
  static instance;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new ObjectService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getOss() + "/oss/object";
  }
  getListAddress() {
    return this.getBaseAddress() + "/list";
  }
  getListV2Address() {
    return this.getBaseAddress() + "/v2/list";
  }
  getMultiDeleteAddress() {
    return this.getBaseAddress() + "/multi";
  }
  listObjects(request) {
    return this.getConfig().getHttp().get(this.getListAddress(), request);
  }
  listObjectsV2(request) {
    return this.getConfig().getHttp().get(this.getListV2Address(), request);
  }
  delete(request) {
    return this.getConfig().getHttp().delete(this.getBaseAddress(), request);
  }
  batchDelete(request) {
    return this.getConfig().getHttp().delete(this.getMultiDeleteAddress(), request);
  }
}
class ObjectStreamService extends Service {
  static instance;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new ObjectStreamService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getOss() + "/oss/object/stream";
  }
  getDownloadAddress() {
    return this.getBaseAddress() + "/download";
  }
  getDisplayAddress() {
    return this.getBaseAddress() + "/display";
  }
  getUploadAddress() {
    return this.getBaseAddress() + "/upload";
  }
  download(request, onProgress) {
    return this.getConfig().getHttp().post(this.getDownloadAddress(), request, { contentType: ContentTypeEnum.JSON }, { responseType: "blob", onDownloadProgress: onProgress });
  }
  display(request) {
    return this.getConfig().getHttp().post(this.getDisplayAddress(), request, { contentType: ContentTypeEnum.JSON }, { responseType: "blob" });
  }
  upload(bucketName, file, onProgress) {
    return this.getConfig().getHttp().post(this.getUploadAddress(), { bucketName, file }, { contentType: ContentTypeEnum.JSON }, { onUploadProgress: onProgress });
  }
}
class MultipartUploadService extends Service {
  static instance;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new MultipartUploadService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getOss() + "/oss/multipart-upload";
  }
  getCreateMultipartUploadAddress() {
    return this.getBaseAddress() + "/create";
  }
  getCompleteMultipartUploadAddress() {
    return this.getBaseAddress() + "/complete";
  }
  createChunkUpload(request) {
    return this.getConfig().getHttp().post(this.getCreateMultipartUploadAddress(), request);
  }
  completeChunkUpload(request) {
    return this.getConfig().getHttp().post(this.getCompleteMultipartUploadAddress(), request);
  }
}
class OssApiResources {
  static instance;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OssApiResources(config);
    }
    return this.instance;
  }
  getConfig() {
    return this.config;
  }
  bucket() {
    return BucketService.getInstance(this.config);
  }
  object() {
    return ObjectService.getInstance(this.config);
  }
  objectStream() {
    return ObjectStreamService.getInstance(this.config);
  }
  multipartUpload() {
    return MultipartUploadService.getInstance(this.config);
  }
  constant() {
    return OssConstantService.getInstance(this.config);
  }
  minioBucketSetting() {
    return MinioBucketSettingService.getInstance(this.config);
  }
  minioBucketEncryption() {
    return MinioBucketEncryptionService.getInstance(this.config);
  }
  minioBucketPolicy() {
    return MinioBucketPolicyService.getInstance(this.config);
  }
  minioBucketTags() {
    return MinioBucketTagsService.getInstance(this.config);
  }
  minioBucketQuota() {
    return MinioBucketQuotaService.getInstance(this.config);
  }
  minioBucketVersioning() {
    return MinioBucketVersioningService.getInstance(this.config);
  }
  minioObjectLock() {
    return MinioObjectLockConfigurationService.getInstance(this.config);
  }
  minioObjectSetting() {
    return MinioObjectSettingService.getInstance(this.config);
  }
  minioObjectTags() {
    return MinioObjectTagsService.getInstance(this.config);
  }
  minioObjectRetention() {
    return MinioObjectRetentionService.getInstance(this.config);
  }
  minioObjectLegalHold() {
    return MinioObjectLegalHoldService.getInstance(this.config);
  }
}
const createOssApi = (project, clientId, clientSecret, http) => {
  const config = new HttpConfig(project, clientId, clientSecret, http);
  return OssApiResources.getInstance(config);
};
export {
  Axios,
  BaseService2 as BaseService,
  HttpConfig2 as HttpConfig,
  MinioBucketEncryptionService,
  MinioBucketPolicyService,
  MinioBucketQuotaService,
  MinioBucketSettingService,
  MinioBucketTagsService,
  MinioBucketVersioningService,
  MinioObjectLegalHoldService,
  MinioObjectLockConfigurationService,
  MinioObjectRetentionService,
  MinioObjectSettingService,
  MinioObjectTagsService,
  OssConstantService,
  Service2 as Service,
  createOssApi
};
