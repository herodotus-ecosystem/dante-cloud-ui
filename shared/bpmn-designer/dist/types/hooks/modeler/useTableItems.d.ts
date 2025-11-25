import { Ref } from 'vue';
import { BpmnSortable, BpmnListEntity, BpmnListQueryParams, BpmnDeleteQueryParams, QTableOnRequestProps } from '../../declarations';
import { BpmnQueryByGetService } from '../../lib/logic';
export default function useBpmnTableItems<E extends BpmnListEntity, Q extends BpmnListQueryParams, S, D extends BpmnDeleteQueryParams = BpmnDeleteQueryParams>(AbstractService: BpmnQueryByGetService<E, Q, S, D>, sortable: BpmnSortable<S>, queryParams?: Q, loadOnMount?: boolean): {
    pagination: Ref<{
        sortBy: string | null;
        descending: boolean;
        page: number;
        rowsPerPage: number;
        rowsNumber: number;
    }, Required<{
        sortBy?: string | null;
        descending?: boolean;
        page?: number;
        rowsPerPage?: number;
        rowsNumber?: number;
    }> | {
        sortBy: string | null;
        descending: boolean;
        page: number;
        rowsPerPage: number;
        rowsNumber: number;
    }>;
    tableRows: Ref<E[], E[]>;
    loading: Ref<boolean, boolean>;
    totalPages: Ref<number, number>;
    conditions: Ref<Q, Q>;
    findItemsByPage: (pageNumber?: number, pageSize?: number, params?: Q) => void;
    findItems: QTableOnRequestProps;
};
