import { AxiosRequestConfig } from '../../../declarations';
export declare const getPendingUrl: (config: AxiosRequestConfig) => string;
export declare class AxiosCanceler {
    /**
     * Add request
     * @param {Object} config
     */
    addPending(config: AxiosRequestConfig): void;
    /**
     * @description: Clear all pending
     */
    removeAllPending(): void;
    /**
     * Removal request
     * @param {Object} config
     */
    removePending(config: AxiosRequestConfig): void;
    /**
     * @description: reset
     */
    reset(): void;
}
