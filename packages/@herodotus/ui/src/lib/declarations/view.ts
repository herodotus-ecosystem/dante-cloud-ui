import { BaseBpmnEntity, BaseBpmnQueryParam, BpmnPageableParam } from './entity';
import { BaseService, BaseBpmnService } from './service';
import { Vue } from 'vue-property-decorator';
import { ValidationObserver } from 'vee-validate';

export enum Operation {
    CREATE = 'create',
    EDIT = 'edit',
}

export abstract class BaseView<E> extends Vue {
    public abstract getBaseService(): BaseService<E>;
}

export abstract class CrudView<E> extends BaseView<E> {
    public operation = Operation.CREATE;
}
export abstract class AuthorizeView<E, R> extends BaseView<E> {
    public abstract getResourceService(): BaseService<R>;
}

export abstract class BaseContent<E> extends CrudView<E> {
    public overlay = false;
    public editedItem: E = {} as E;

    protected created(): void {
        const entity = this.$route.params.entity;
        const operation = this.$route.params.operation;
        if (entity) {
            this.editedItem = JSON.parse(entity);
        }
        if (operation) {
            this.operation = operation as Operation;
        }
    }

    public saveOrUpdate(): void {
        (this.$refs.observer as InstanceType<typeof ValidationObserver>).validate().then((validateResulte) => {
            if (validateResulte) {
                this.overlay = true;
                this.getBaseService()
                    .saveOrUpdate(this.editedItem)
                    .then(() => {
                        this.overlay = false;
                        this.$navigation.goBack(this.$route);
                    })
                    .catch(() => {
                        this.overlay = false;
                    });
            }
        });
    }
}

export abstract class BaseIndex<E> extends CrudView<E> {
    public tableItems: E[] = new Array<E>();
    public pageSize = 10;
    public totalItems = 0;
    public totalPages = 0;
    public tableLoading = true;
    public skeletonLoading = false;
    public operationType = Operation.CREATE;
    public editedItem = {} as E;

    public abstract getItemKey(): string;

    public abstract getDomainName(): string;

    public getContentComponentName(): string {
        return this.getDomainName() + 'Content';
    }

    public getAuthorizeComponentName(): string {
        return this.getDomainName() + 'Authorize';
    }

    public mounted(): void {
        this.skeletonLoading = true;
        this.findItemsByPage();
    }

    public findItemsByPage(pageNumber = 1, others = {}): void {
        this.tableLoading = true;
        this.getBaseService()
            .fetchByPage(
                {
                    pageNumber: pageNumber - 1,
                    pageSize: this.pageSize,
                },
                others
            )
            .then((result) => {
                const data = result.data;
                this.tableLoading = false;
                this.skeletonLoading = false;
                this.tableItems = data.content;
                this.totalPages = data.totalPages;
                this.totalItems = parseInt(data.totalElements, 0);
            })
            .catch(() => {
                this.tableLoading = false;
            });
    }

    public deleteItem(item: E): void {
        this.getBaseService()
            .delete(item[this.getItemKey()])
            .then(() => {
                this.findItemsByPage();
            });
    }

    public goToDetail(name: string): void {
        this.$navigation.goToDetail(name, { entity: JSON.stringify(this.editedItem), operation: this.operation });
    }

    public editItem(item: E): void {
        this.operation = Operation.EDIT;
        this.editedItem = item;
        this.goToDetail(this.getContentComponentName());
    }

    public createItem(item: E = {} as E): void {
        this.operation = Operation.CREATE;
        this.editedItem = item;
        this.goToDetail(this.getContentComponentName());
    }

    public authorizeItem(item: E): void {
        this.editedItem = item;
        this.goToDetail(this.getAuthorizeComponentName());
    }
}

export abstract class BaseAuthorize<E, R> extends AuthorizeView<E, R> {
    public tableItems: R[] = new Array<R>();
    public assignedItems: R[] = new Array<R>();
    public tableLoading = true;
    public totalItems = 0;
    public totalPages = 0;
    public pageSize = 10;
    public currentEntity: E = {} as E;
    public overlay = false;

    public abstract getCompareKey(): string;

    public fetchParams(collectionKey: string): void {
        const entity = this.$route.params.entity;
        if (entity) {
            this.currentEntity = JSON.parse(entity);
            if (this.currentEntity[collectionKey]) {
                const data = this.currentEntity[collectionKey];
                if (data instanceof Array) {
                    this.assignedItems = data;
                } else {
                    this.assignedItems = [data];
                }
            }
        }
    }

    public findResourcesByPage(pageNumber = 1, others = {}): void {
        this.tableLoading = true;
        this.getResourceService()
            .fetchByPage(
                {
                    pageNumber: pageNumber - 1,
                    pageSize: this.pageSize,
                },
                others
            )
            .then((result) => {
                const data = result.data;
                this.tableLoading = false;
                this.tableItems = data.content;
                this.totalPages = data.totalPages;
                this.totalItems = parseInt(data.totalElements, 0);
            })
            .catch(() => {
                this.tableLoading = false;
            });
    }

    public selectItem(e): void {
        const item = e.item;
        const isSelected = e.value;
        if (isSelected) {
            this.assignedItems.push(item);
        } else {
            this.$lib._array.remove(this.assignedItems, item, this.getCompareKey());
        }
    }

    public selectAllItems(e): void {
        if (e.value) {
            this.assignedItems = e.items;
        } else {
            this.assignedItems = [];
        }
    }
}

export abstract class BaseBpmnView<E extends BaseBpmnEntity, Q extends BaseBpmnQueryParam> extends Vue {
    abstract getBaseBpmnService(): BaseBpmnService<E, Q>;
}

export abstract class CrudBpmnView<E extends BaseBpmnEntity, Q extends BaseBpmnQueryParam> extends BaseBpmnView<E, Q> {
    protected operation = Operation.CREATE;
}

export abstract class BaseBpmnContent<E, Q> extends CrudBpmnView<E, Q> {
    protected overlay = false;
    protected editedItem: E = {} as E;

    protected created(): void {
        const entity = this.$route.params.entity;
        const operation = this.$route.params.operation;
        if (entity) {
            this.editedItem = JSON.parse(entity);
        }
        if (operation) {
            this.operation = operation as Operation;
        }
    }
}

export abstract class BaseBpmnIndex<E extends BaseBpmnEntity, Q extends BaseBpmnQueryParam> extends CrudBpmnView<E, Q> {
    protected tableItems: E[] = new Array<E>();
    protected pageSize = 10;
    protected totalItems = 0;
    protected totalPages = 0;
    protected tableLoading = true;
    protected skeletonLoading = false;
    protected operationType = Operation.CREATE;
    protected editedItem = {} as E;

    abstract getItemKey(): string;

    abstract getDomainName(): string;

    private getContentComponentName(): string {
        return this.getDomainName() + 'Content';
    }

    private getModelerComponentName(): string {
        return this.getDomainName() + 'Modeler';
    }

    protected mounted(): void {
        this.skeletonLoading = true;
        this.findItemsByPage();
    }

    protected findItemsByPage(pageNumber = 1, others: Q = {} as Q): void {
        this.tableLoading = true;
        this.getBaseBpmnService()
            .count(others)
            .then((value) => {
                this.getBaseBpmnService()
                    .list({
                        sortBy: 'id',
                        sortOrder: 'desc',
                        firstResult: (pageNumber - 1) * this.pageSize,
                        maxResults: this.pageSize,
                    } as BpmnPageableParam<Q>)
                    .then((result) => {
                        this.tableLoading = false;
                        this.tableItems = result;
                        this.totalPages = value.count ? (value.count + this.pageSize - 1) / this.pageSize : value.count;
                        this.totalItems = value.count;
                        if (this.skeletonLoading) {
                            this.skeletonLoading = false;
                        }
                    });
            })
            .catch(() => {
                this.tableLoading = false;
            });
    }

    protected deleteItem(item: E): void {
        this.getBaseBpmnService()
            .delete(item[this.getItemKey()])
            .then(() => {
                this.findItemsByPage();
            });
    }

    private goToDetail(name: string): void {
        this.$navigation.goToDetail(name, { entity: JSON.stringify(this.editedItem), operation: this.operation });
    }

    protected editItem(item: E): void {
        this.operation = Operation.EDIT;
        this.editedItem = item;
        this.goToDetail(this.getContentComponentName());
    }

    protected createItem(item: E = {} as E): void {
        this.operation = Operation.CREATE;
        this.editedItem = item;
        this.goToDetail(this.getContentComponentName());
    }

    protected createModeler(item: E = {} as E): void {
        this.operation = Operation.CREATE;
        this.editedItem = item;
        this.goToDetail(this.getModelerComponentName());
    }

    protected editModeler(item: E = {} as E): void {
        this.operation = Operation.EDIT;
        this.editedItem = item;
        this.goToDetail(this.getModelerComponentName());
    }
}
