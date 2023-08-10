var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { BaseService, Service, ContentTypeEnum, HttpConfig } from "@herodotus/core";
import { Axios, BaseService as BaseService2, HttpConfig as HttpConfig2, Service as Service2 } from "@herodotus/core";
const _OssConstantService = class _OssConstantService extends BaseService {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _OssConstantService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getOss() + "/oss/minio/constant/enums";
  }
};
__publicField(_OssConstantService, "instance");
let OssConstantService = _OssConstantService;
const _MinioBucketSettingService = class _MinioBucketSettingService extends Service {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _MinioBucketSettingService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getOss() + "/oss/minio/bucket/setting";
  }
  get(bucketName, region = "") {
    return this.getConfig().getHttp().get(this.getBaseAddress(), { bucketName, region });
  }
};
__publicField(_MinioBucketSettingService, "instance");
let MinioBucketSettingService = _MinioBucketSettingService;
const _MinioChunkUploadService = class _MinioChunkUploadService extends Service {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _MinioChunkUploadService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getOss() + "/oss/minio/chunk";
  }
  getChunkUploadCreateAddress() {
    return this.getBaseAddress() + "/create";
  }
  getChunkUploadCompleteAddress() {
    return this.getBaseAddress() + "/complete";
  }
  createChunkUpload(request) {
    return this.getConfig().getHttp().post(this.getChunkUploadCreateAddress(), request);
  }
  completeChunkUpload(request) {
    return this.getConfig().getHttp().post(this.getChunkUploadCompleteAddress(), request);
  }
};
__publicField(_MinioChunkUploadService, "instance");
let MinioChunkUploadService = _MinioChunkUploadService;
const _MinioBucketEncryptionService = class _MinioBucketEncryptionService extends Service {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _MinioBucketEncryptionService(config);
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
};
__publicField(_MinioBucketEncryptionService, "instance");
let MinioBucketEncryptionService = _MinioBucketEncryptionService;
const _MinioBucketPolicyService = class _MinioBucketPolicyService extends Service {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _MinioBucketPolicyService(config);
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
};
__publicField(_MinioBucketPolicyService, "instance");
let MinioBucketPolicyService = _MinioBucketPolicyService;
const _MinioBucketTagsService = class _MinioBucketTagsService extends Service {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _MinioBucketTagsService(config);
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
};
__publicField(_MinioBucketTagsService, "instance");
let MinioBucketTagsService = _MinioBucketTagsService;
const _MinioBucketQuotaService = class _MinioBucketQuotaService extends Service {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _MinioBucketQuotaService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getOss() + "/oss/minio/bucket/quota";
  }
  set(request) {
    return this.getConfig().getHttp().put(this.getBaseAddress(), request);
  }
};
__publicField(_MinioBucketQuotaService, "instance");
let MinioBucketQuotaService = _MinioBucketQuotaService;
const _MinioBucketVersioningService = class _MinioBucketVersioningService extends Service {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _MinioBucketVersioningService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getOss() + "/oss/minio/bucket/versioning";
  }
  set(request) {
    return this.getConfig().getHttp().put(this.getBaseAddress(), request);
  }
};
__publicField(_MinioBucketVersioningService, "instance");
let MinioBucketVersioningService = _MinioBucketVersioningService;
const _MinioObjectLockConfigurationService = class _MinioObjectLockConfigurationService extends Service {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _MinioObjectLockConfigurationService(config);
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
};
__publicField(_MinioObjectLockConfigurationService, "instance");
let MinioObjectLockConfigurationService = _MinioObjectLockConfigurationService;
const _MinioObjectService = class _MinioObjectService extends Service {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _MinioObjectService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getOss() + "/oss/minio/object";
  }
  getListAddress() {
    return this.getBaseAddress() + "/list";
  }
  getMultiDeleteAddress() {
    return this.getBaseAddress() + "/multi";
  }
  delete(request) {
    return this.getConfig().getHttp().delete(this.getBaseAddress(), request);
  }
  batchDelete(request) {
    return this.getConfig().getHttp().delete(this.getMultiDeleteAddress(), request);
  }
};
__publicField(_MinioObjectService, "instance");
let MinioObjectService = _MinioObjectService;
const _MinioObjectStreamService = class _MinioObjectStreamService extends Service {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _MinioObjectStreamService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getOss() + "/oss/minio/object/stream";
  }
  getDownloadAddress() {
    return this.getBaseAddress() + "/download";
  }
  getUploadAddress() {
    return this.getBaseAddress() + "/upload";
  }
  download(request) {
    return this.getConfig().getHttp().post(
      this.getDownloadAddress(),
      request,
      { contentType: ContentTypeEnum.JSON },
      { responseType: "blob" }
    );
  }
  upload(bucketName, file) {
    return this.getConfig().getHttp().post(this.getDownloadAddress(), { bucketName, file });
  }
};
__publicField(_MinioObjectStreamService, "instance");
let MinioObjectStreamService = _MinioObjectStreamService;
const _MinioObjectSettingService = class _MinioObjectSettingService extends Service {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _MinioObjectSettingService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getOss() + "/oss/minio/object/setting";
  }
  get(bucketName, objectName) {
    return this.getConfig().getHttp().get(this.getBaseAddress(), { bucketName, objectName });
  }
};
__publicField(_MinioObjectSettingService, "instance");
let MinioObjectSettingService = _MinioObjectSettingService;
const _MinioObjectTagsService = class _MinioObjectTagsService extends Service {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _MinioObjectTagsService(config);
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
};
__publicField(_MinioObjectTagsService, "instance");
let MinioObjectTagsService = _MinioObjectTagsService;
const _MinioObjectRetentionService = class _MinioObjectRetentionService extends Service {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _MinioObjectRetentionService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getOss() + "/oss/minio/object/retention";
  }
  set(request) {
    return this.getConfig().getHttp().put(this.getBaseAddress(), request);
  }
};
__publicField(_MinioObjectRetentionService, "instance");
let MinioObjectRetentionService = _MinioObjectRetentionService;
const _MinioObjectLegalHoldService = class _MinioObjectLegalHoldService extends Service {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _MinioObjectLegalHoldService(config);
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
};
__publicField(_MinioObjectLegalHoldService, "instance");
let MinioObjectLegalHoldService = _MinioObjectLegalHoldService;
const _BucketService = class _BucketService extends Service {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _BucketService(config);
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
};
__publicField(_BucketService, "instance");
let BucketService = _BucketService;
const _ObjectService = class _ObjectService extends Service {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _ObjectService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getOss() + "/oss/object";
  }
  getListAddress() {
    return this.getBaseAddress() + "/list";
  }
  listObjects(request) {
    return this.getConfig().getHttp().get(this.getListAddress(), request);
  }
};
__publicField(_ObjectService, "instance");
let ObjectService = _ObjectService;
const _OssApiResources = class _OssApiResources {
  constructor(config) {
    __publicField(this, "config", {});
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _OssApiResources(config);
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
  constant() {
    return OssConstantService.getInstance(this.config);
  }
  minioBucketSetting() {
    return MinioBucketSettingService.getInstance(this.config);
  }
  minioChunk() {
    return MinioChunkUploadService.getInstance(this.config);
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
  minioObject() {
    return MinioObjectService.getInstance(this.config);
  }
  minioObjectStream() {
    return MinioObjectStreamService.getInstance(this.config);
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
};
__publicField(_OssApiResources, "instance");
let OssApiResources = _OssApiResources;
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
  MinioChunkUploadService,
  MinioObjectLegalHoldService,
  MinioObjectLockConfigurationService,
  MinioObjectRetentionService,
  MinioObjectService,
  MinioObjectSettingService,
  MinioObjectStreamService,
  MinioObjectTagsService,
  OssConstantService,
  Service2 as Service,
  createOssApi
};
