declare class AvatarUtilities {
    private static instance;
    private constructor();
    static getInstance(): AvatarUtilities;
    generate(id: string): string;
}
export declare const AvatarUtils: AvatarUtilities;
export {};
