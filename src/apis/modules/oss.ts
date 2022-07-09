import type {
	Bucket,
	AxiosHttpResult,
	RemoveBucketArgument,
	CreateMultipartUploadDto,
	CompleteMultipartUploadDto,
	MultipartUploadCreateResponse,
} from '/@/lib/declarations';

import { BaseService, Service } from '../base';
import { service, http } from '/@/lib/utils';

class BucketService extends BaseService<Bucket> {
	private static instance = new BucketService();

	private constructor() {
		super();
	}

	public static getInstance(): BucketService {
		return this.instance;
	}

	public getBaseAddress(): string {
		return '/oss/minio/bucket';
	}

	public remove(dto: RemoveBucketArgument): Promise<AxiosHttpResult<string>> {
		return http.delete<string, RemoveBucketArgument>(this.getBaseAddress(), dto);
	}
}

class MultipartUploadService extends Service {
	private static instance = new MultipartUploadService();

	private constructor() {
		super();
	}

	public static getInstance(): MultipartUploadService {
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

	public createMultipartUpload(domain: CreateMultipartUploadDto): Promise<AxiosHttpResult<MultipartUploadCreateResponse>> {
		return http.post<MultipartUploadCreateResponse, CreateMultipartUploadDto>(this.getCreateMultipartUploadAddress(), domain);
	}

	public completeMultipartUpload(domain: CompleteMultipartUploadDto): Promise<AxiosHttpResult<string>> {
		return http.post<string, CompleteMultipartUploadDto>(this.getCompleteMultipartUploadAddress(), domain);
	}
}

export function useOssApi() {
	return {
		bucket: BucketService.getInstance(),
		multipart: MultipartUploadService.getInstance(),
	};
}
