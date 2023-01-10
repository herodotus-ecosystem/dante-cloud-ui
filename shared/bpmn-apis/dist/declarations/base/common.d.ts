export interface Link {
    method: string;
    href: string;
    rel: string;
}
export interface SkipCustomListeners {
    /**
     * true, if only the built-in ExecutionListeners should be notified with the end event.
     */
    skipCustomListeners?: boolean;
}
export interface SkipIoMappings {
    /**
     * A boolean value to control whether input/output mappings should be executed during deletion. true,
     * if input/output mappings should not be invoked.
     */
    skipIoMappings?: boolean;
}
export interface SkipSubprocesses {
    /**
     * Skip deletion of the subprocesses related to deleted processes as part of this request.
     */
    skipSubprocesses: boolean;
}
export interface FailIfNotExists {
    /**
     * If set to false, the request will still be successful if one ore more of the process ids are not found.
     */
    failIfNotExists: boolean;
}
export declare type BaseSkip = SkipCustomListeners & SkipIoMappings;
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
export declare type ValueInfo = ObjectTypeValueInfo | FileTypeValueInfo;
export interface VariableValue {
    /**
     * The variable's value. For variables of type Object, the serialized value has to be submitted as a String value.
     * For variables of type File the value has to be submitted as Base64 encoded string.
     */
    value: string;
    /**
     * The value type of the variable.
     */
    type: 'Object' | 'File';
    valueInfo: ValueInfo;
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
export declare type Variables = Record<string, VariableValue>;
/**
 * Mandatory. One of the following values: startBeforeActivity, startAfterActivity, startTransition.
 * A startBeforeActivity instruction requests to enter a given activity.
 * A startAfterActivity instruction requests to execute the single outgoing sequence flow of a given activity.
 * A startTransition instruction requests to execute a specific sequence flow.
 */
export declare type InstructionType = 'startBeforeActivity' | 'startAfterActivity' | 'startTransition';
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
export interface ProcessInstanceIds {
    /**
     * A list of process instance ids which defines a group of process instances which will be activated or suspended by the operation.
     */
    processInstanceIds: Array<string>;
}
export interface ProcessInstanceQuery {
    /**
     * A process instance query which defines a group of process instances which will be activated or suspended by the operation.
     * See GET /process-instance
     */
    processInstanceQuery: string;
}
export interface HistoricProcessInstanceQuery {
    /**
     * A historical process instance query which defines a group of process instances which will be activated or suspended by the operation.
     * See GET history/process-instance
     */
    historicProcessInstanceQuery: string;
}
export interface BpmnBaseDeleteQueryParams extends BaseSkip {
}
export interface BpmnDeleteQueryParams extends BpmnBaseDeleteQueryParams {
    /**
     * true, if all process instances, historic process instances and jobs for this process definition should be deleted.
     */
    cascade: boolean;
}
