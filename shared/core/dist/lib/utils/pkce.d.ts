import { PkceCodePair } from '../../declarations';

declare class PkceUtilities {
    private static instance;
    private constructor();
    static getInstance(): PkceUtilities;
    /**
     * Thanks to @SEIAROTg on stackoverflow:
     * "Convert a 32bit integer into 4 bytes of data in javascript"
     * @param num The 32bit integer
     * @returns An ArrayBuffer representing 4 bytes of binary data
     */
    private toBytesInt32;
    /**
     * Creates an array of length `size` of random bytes
     * @param size
     * @returns Array of random ints (0 to 255)
     */
    private getRandomValues;
    /** Generate cryptographically strong random string
     * @param size The desired length of the string
     * @returns The random string
     */
    private random;
    /** Generate a PKCE challenge verifier
     * @param length Length of the verifier
     * @returns A random verifier `length` characters long
     */
    private generateVerifier;
    /** Generate a PKCE code challenge from a code verifier
     * @param code_verifier
     * @returns The base64 url encoded code challenge
     */
    generateChallenge(code_verifier: string): string;
    /** Generate a PKCE challenge pair
     * @param length Length of the verifer (between 43-128). Defaults to 43.
     * @returns PKCE challenge pair
     */
    generateCodePair(length?: number): PkceCodePair;
    /** Verify that a code_verifier produces the expected code challenge
     * @param code_verifier
     * @param expectedChallenge The code challenge to verify
     * @returns True if challenges are equal. False otherwise.
     */
    verifyChallenge(code_verifier: string, expectedChallenge: string): boolean;
}
export declare const PKCE: PkceUtilities;
export {};
