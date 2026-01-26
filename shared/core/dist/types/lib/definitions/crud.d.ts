import { AxiosHttpResult, Conditions, Domain, Page, Pageable, Tree } from '../../declarations';
import { HttpConfig } from './config';
export declare abstract class Service {
    private config;
    constructor(config: HttpConfig);
    abstract getBaseAddress(): string;
    protected getConfig(): HttpConfig;
    protected getParamPath(path: string, param: string): string;
    protected getIdPath(id: string): string;
}
export declare abstract class AbstractService<I extends Domain, O extends Domain = I> extends Service {
    private getConditionAddress;
    private getListAddress;
    getTreeAddress(): string;
    fetch(params?: {}): Promise<AxiosHttpResult<O>>;
    fetchByPage(params: Pageable, others?: {}): Promise<AxiosHttpResult<Page<O>>>;
    fetchAll(params?: Conditions): Promise<AxiosHttpResult<O[]>>;
    fetchTree(params?: Conditions): Promise<AxiosHttpResult<Tree[]>>;
    saveOrUpdate(data: I): Promise<AxiosHttpResult<O>>;
    delete(id: string): Promise<AxiosHttpResult<string>>;
    assign(data: any): Promise<AxiosHttpResult<O>>;
}
