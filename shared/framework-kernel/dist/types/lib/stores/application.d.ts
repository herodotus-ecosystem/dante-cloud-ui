/**
 * Pinia Store 响应式
 *
 * 1. 直接访问使用 state 中的属性，例如：useStore.attr方式，就是响应式
 * 2. 使用 storeToRefs 包裹后，进行解构会具备响应式
 * 3. 使用 {XXX，XXX} = useStore，会丢失响应式
 */
export declare const useApplicationStore: import('pinia').StoreDefinition<"Application", {
    leftDrawer: boolean;
    rightDrawer: boolean;
    signInPanel: string;
}, {}, {
    switchToMobilePanel(): void;
    switchToScanPanel(): void;
    switchToAccountPanel(): void;
}>;
