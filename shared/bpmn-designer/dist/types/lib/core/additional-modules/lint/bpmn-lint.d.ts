/**
 * 源代码地址：https://codesandbox.io/s/5nj1t?file=/src/index.js
 * @author felix.mueller
 */
/**
 * A resolver that caches rules and configuration as part of the bundle,
 * making them accessible in the browser.
 *
 * @param {Object} cache
 */
declare class Resolver {
    constructor();
    resolveRule(pkg: string, ruleName: string): string;
    resolveConfig(pkg: string, configName: string): void;
}
declare const resolver: Resolver;
declare const config: {
    rules: {
        'conditional-flows': string;
        'end-event-required': string;
        'event-sub-process-typed-start-event': string;
        'fake-join': string;
        'label-required': string;
        'no-bpmndi': string;
        'no-complex-gateway': string;
        'no-disconnected': string;
        'no-duplicate-sequence-flows': string;
        'no-gateway-join-fork': string;
        'no-implicit-split': string;
        'no-inclusive-gateway': string;
        'single-blank-start-event': string;
        'single-event-definition': string;
        'start-event-required': string;
        'sub-process-blank-start-event': string;
        'superfluous-gateway': string;
    };
};
declare const bundle: {
    resolver: Resolver;
    config: {
        rules: {
            'conditional-flows': string;
            'end-event-required': string;
            'event-sub-process-typed-start-event': string;
            'fake-join': string;
            'label-required': string;
            'no-bpmndi': string;
            'no-complex-gateway': string;
            'no-disconnected': string;
            'no-duplicate-sequence-flows': string;
            'no-gateway-join-fork': string;
            'no-implicit-split': string;
            'no-inclusive-gateway': string;
            'single-blank-start-event': string;
            'single-event-definition': string;
            'start-event-required': string;
            'sub-process-blank-start-event': string;
            'superfluous-gateway': string;
        };
    };
};
export { bundle, config, resolver };
