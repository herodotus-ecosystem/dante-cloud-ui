export interface ValidateField {
    valid: boolean;
    errors: Array<string>;
}
export interface ValidateResult {
    valid: boolean;
    result: Record<string, ValidateField>;
    errors: Record<string, string>;
}
