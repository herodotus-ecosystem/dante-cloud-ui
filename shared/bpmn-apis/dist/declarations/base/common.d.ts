import { BpmnQueryParams, BpmnEntity } from './core';

export interface Link {
    method: string;
    href: string;
    rel: string;
}
interface SkipCustomListeners {
    /**
     * true, if only the built-in ExecutionListeners should be notified with the end event.
     */
    skipCustomListeners?: boolean;
}
interface SkipIoMappings {
    /**
     * A boolean value to control whether input/output mappings should be executed during deletion. true,
     * if input/output mappings should not be invoked.
     */
    skipIoMappings?: boolean;
}
export type BpmnSkip = SkipCustomListeners & SkipIoMappings;
export interface BpmnDeleteQueryParams extends BpmnSkip, BpmnQueryParams {
}
export interface BaseValueInfo {
    transient?: boolean;
}
/**
 * For serialized variables of type Object, the following properties can be provided:
 */
export interface ObjectTypeValueInfo extends BaseValueInfo {
    /**
     * A string representation of the object's type name.
     */
    objectTypeName: string;
    /**
     * The serialization format used to store the variable.
     */
    serializationDataFormat: string;
}
export interface FileTypeValueInfo extends BaseValueInfo {
    /**
     * The name of the file. This is not the variable name but the name that will be used when downloading the file again.
     */
    filename: string;
    /**
     * The MIME type of the file that is being uploaded.
     */
    mimetype: string;
    /**
     * The encoding of the file that is being uploaded.
     */
    encoding: string;
}
export type ValueInfo = ObjectTypeValueInfo | FileTypeValueInfo;
export interface VariableValue {
    /**
     * The variable's value. For variables of type Object, the serialized value has to be submitted as a String value.
     * For variables of type File the value has to be submitted as Base64 encoded string.
     */
    value: string | number | boolean;
    /**
     * The value type of the variable.
     */
    type?: 'Object' | 'File' | 'String' | 'Number' | 'Boolean';
    valueInfo?: ValueInfo;
    /**
     * Indicates whether the variable should be a local variable or not.
     * If set to true, the variable becomes a local variable of the execution entering the target activity
     */
    local?: boolean;
}
/**
 * A JSON object containing the variables the process is to be initialized with. Each key corresponds to a variable name
 * and each value to a variable value. A variable value is a JSON object with the following properties:
 */
export type Variables = Record<string, VariableValue>;
/**
 * Mandatory. One of the following values: startBeforeActivity, startAfterActivity, startTransition.
 * A startBeforeActivity instruction requests to enter a given activity.
 * A startAfterActivity instruction requests to execute the single outgoing sequence flow of a given activity.
 * A startTransition instruction requests to execute a specific sequence flow.
 */
export type InstructionType = 'startBeforeActivity' | 'startAfterActivity' | 'startTransition';
export interface Instruction {
    type: InstructionType;
    /**
     * Can be used with instructions of types startBeforeActivity and startAfterActivity. Specifies the activity the instruction targets.
     */
    activityId?: string;
    /**
     * Can be used with instructions of types startTransition. Specifies the sequence flow to start.
     */
    transitionId?: string;
}
export interface FormKeyEntity extends BpmnEntity {
    /**
     * The form key for the task.
     */
    key: string;
    /**
     * The process application's context path the task belongs to.
     * If the task does not belong to a process application deployment or a process definition at all, this property is not set.
     */
    contextPath: string;
}
export {};
