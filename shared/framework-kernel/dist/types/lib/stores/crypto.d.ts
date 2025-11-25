export declare const useCryptoStore: import('pinia').StoreDefinition<"Crypto", {
    sessionId: string;
    key: string;
    state: string;
}, {}, {
    setSessionId(sessionId: string): void;
    setKey(key: string): void;
    getKey(): string;
    encrypt(content: string): string;
    decrypt(content: string): string;
    exchange(identity?: string): Promise<string>;
}>;
