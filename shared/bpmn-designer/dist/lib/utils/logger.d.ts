declare class BpmnLog {
    private static instance;
    private static types;
    private constructor();
    static getInstance(): BpmnLog;
    private isArray;
    private switchColor;
    print(type: string | undefined, text: any, back?: boolean): void;
    printBack(type: string | undefined, text: string): void;
    pretty(type: string | undefined, title: string, text: string): void;
    prettyPrimary(title: string, ...text: any[]): void;
    prettySuccess(title: string, ...text: any[]): void;
    prettyWarn(title: string, ...text: any[]): void;
    prettyError(title: string, ...text: any[]): void;
    prettyInfo(title: string, ...text: any[]): void;
}
export declare const Logger: BpmnLog;
export {};
