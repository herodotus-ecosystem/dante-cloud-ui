import type { BpmnEntity, BpmnParams, BpmnListParams, BaseSkip, Instruction, ProcessInstanceIds, HistoricProcessInstanceQuery, Variables } from '../base';
export interface ProcessDefinition extends BpmnEntity {
    id: string;
    key: string;
    category: string;
    description: string;
    name: string;
    version: number;
    resource: string;
    deploymentId: string;
    diagram: string;
    suspended: boolean;
    tenantId: string;
    versionTag: string;
    historyTimeToLive: number;
    startableInTasklist: boolean;
}
export interface ProcessDefinitionListQueryParams extends BpmnListParams {
    processDefinitionId: string;
    processDefinitionIdIn: string;
    name: string;
    nameLike: string;
    deploymentId: string;
    key: string;
    keysIn: string;
    keyLike: string;
    category: string;
    categoryLike: string;
    version: string;
    latestVersion: string;
    resourceName: string;
    resourceNameLike: string;
    startableBy: string;
    active: boolean;
    suspended: boolean;
    incidentId: string;
    incidentType: string;
    incidentMessage: string;
    incidentMessageLike: string;
    tenantIdIn: string;
    withoutTenantId: boolean;
    includeProcessDefinitionsWithoutTenantId: boolean;
    versionTag: string;
    versionTagLike: string;
    withoutVersionTag: string;
    startableInTasklist: string;
    startablePermissionCheck: string;
    notStartableInTasklist: string;
}
export interface StatisticsQueryParams extends BpmnParams {
    failedJobs: boolean;
    /**
     * Valid values for this property are true or false. If this property has been set to true the result will include the corresponding number
     * of incidents for each occurred incident type. If it is set to false, the incidents will not be included in the result.
     */
    incidents: boolean;
    /**
     * If this property has been set with any incident type (i.e., a String value) the result will only include the number of incidents for
     * the assigned incident type. See the User Guide for a list of incident types.
     */
    incidentsForType: string;
}
export interface ProcessDefinitionStatisticsIncident {
    /**
     * The type of the incident the number of incidents is aggregated for. See the User Guide for a list of incident types
     */
    incidentType: string;
    /**
     * The total number of incidents for the corresponding incident type.
     */
    incidentCount: number;
}
export interface ProcessDefinitionStatistics extends BpmnEntity {
    /**
     * The id of the activity the results are aggregated for.
     */
    id: string;
    /**
     * The total number of running instances of this activity.
     */
    instances: number;
    /**
     * The total number of failed jobs for the running instances.
     * Note: Will be 0 (not null), if failed jobs were excluded.
     */
    failedJobs: number;
    /**
     * Each item in the resulting array is an object which contains the following properties:
     * Note: Will be an empty array, if incidents or incidentsForType were excluded. Furthermore, the array will be also empty if no incidents were found.
     */
    incidents: Array<ProcessDefinitionStatisticsIncident>;
}
export interface ProcessDefinitionActivityInstanceStatistics extends ProcessDefinitionStatistics {
}
export interface ProcessDefinitionProcessInstanceStatistics extends ProcessDefinitionStatistics {
    definition: ProcessDefinition;
}
export interface CalledProcessDefinition extends BpmnEntity {
    /**
     * The id of the process definition.
     */
    id: string;
    /**
     * The key of the process definition, i.e., the id of the BPMN 2.0 XML process definition.
     */
    key: string;
    /**
     * The category of the process definition.
     */
    category: string;
    /**
     * The description of the process definition.
     */
    description: string;
    /**
     * The name of the process definition.
     */
    name: string;
    /**
     * The version of the process definition that the engine assigned to it.
     */
    version: number;
    /**
     * The file name of the process definition.
     */
    resource: string;
    /**
     * 	The deployment id of the process definition.
     */
    deploymentId: string;
    /**
     * The file name of the process definition diagram, if it exists.
     */
    diagram: string;
    /**
     * A flag indicating whether the definition is suspended or not.
     */
    suspended: boolean;
    /**
     * The tenant id of the process definition.
     */
    tenantId: string;
    /**
     * The version tag of the process definition.
     */
    versionTag: string;
    /**
     * History time to live value of the process definition. Is used within History cleanup.
     */
    historyTimeToLive: number;
    /**
     * 	A flag indicating whether the process definition is startable in Tasklist or not.
     */
    startableInTasklist: boolean;
    /**
     * Ids of the CallActivities which call this process.
     */
    calledFromActivityIds: Array<string>;
    /**
     * The id of the calling process definition
     */
    callingProcessDefinitionId: string;
}
export interface ProcessDefinitionFormVariablesValueInfo {
    /**
     * A string representation of the object's type name.
     */
    objectTypeName: string;
    /**
     * The serialization format used to store the variable.
     */
    serializationDataFormat: string;
}
export interface ProcessDefinitionFormVariables extends BpmnEntity {
    /**
     * 	The variable's value. Value differs depending on the variable's type and on the deserializeValues parameter.
     */
    value: string | number | boolean;
    /**
     * The value type of the variable.
     */
    type: string;
    /**
     * A JSON object containing additional, value-type-dependent properties.
     * For variables of type Object, the following properties are returned:
     */
    valueInfo: ProcessDefinitionFormVariablesValueInfo;
}
export interface ProcessDefinitionFormVariablesQueryParams extends BpmnParams {
    /**
     * A comma-separated list of variable names. Allows restricting the list of requested variables to the variable names in the list.
     * It is best practice to restrict the list of variables to the variables actually required by the form in order to minimize fetching of data.
     * If the query parameter is ommitted all variables are fetched. If the query parameter contains non-existent variable names,
     * the variable names are ignored.
     */
    variableNames: string;
    /**
     * Determines whether serializable variable values (typically variables that store custom Java objects) should be deserialized on server side (default true).
     * If set to true, a serializable variable will be deserialized on server side and transformed to JSON using Jackson's
     * POJO/bean property introspection feature. Note that this requires the Java classes of the variable value to be on the REST API's classpath.
     * If set to false, a serializable variable will be returned in its serialized format. For example,
     * a variable that is serialized as XML will be returned as a JSON string containing XML.
     * Note: While true is the default value for reasons of backward compatibility, we recommend setting this parameter to false when developing
     * web applications that are independent of the Java process applications deployed to the engine.
     */
    deserializeValues: boolean;
}
export interface ProcessDefinitionStartForm extends BpmnEntity {
    /**
     * The form key for the process definition.
     */
    key: string;
    /**
     * The context path of the process application.
     */
    contextPath: string;
}
export interface ProcessDefinitionProcessInstanceStatisticsQueryParams extends StatisticsQueryParams {
    /**
     * Valid values for this property are true or false. If this property has been set to true the result will include the corresponding
     * number of root incidents for each occurred incident type. If it is set to false, the incidents will not be included in the result.
     * Cannot be used in combination with incidentsForType or incidents.
     */
    rootIncidents: boolean;
}
export interface ProcessDefinitionXml extends BpmnEntity {
    /**
     * The id of the process definition.
     */
    id: string;
    /**
     * An escaped XML string containing the XML that this definition was deployed with. Carriage returns, line feeds and quotation marks are escaped.
     */
    bpmn20Xml: string;
}
export interface StartInstruction extends Instruction {
    variables: Variables;
}
export interface ProcessDefinitionStartBody extends BaseSkip {
    variables: Variables;
    /**
     * The business key the process instance is to be initialized with.
     * The business key uniquely identifies the process instance in the context of the given process definition.
     */
    businessKey: string;
    /**
     * The case instance id the process instance is to be initialized with.
     */
    caseInstanceId: string;
    /**
     * Optional. A JSON array of instructions that specify which activities to start the process instance at.
     * If this property is omitted, the process instance starts at its default blank start event.
     *
     * The instructions are executed in the order they are in. An instruction may have the following properties:
     */
    startInstructions?: Array<StartInstruction>;
    /**
     * Indicates if the variables, which was used by the process instance during execution, should be returned. Default value: false
     */
    withVariablesInReturn: boolean;
}
export interface ProcessDefinitionSubmitFormBody {
    variables: Variables;
    businessKey: string;
}
export interface ProcessDefinitionSuspendedByIdBody {
    /**
     * A Boolean value which indicates whether to activate or suspend a given process definition.
     * When the value is set to true, the given process definition will be suspended and
     * when the value is set to false, the given process definition will be activated.
     */
    suspended: boolean;
    /**
     * A Boolean value which indicates whether to activate or suspend also all process instances of the given process definition.
     * When the value is set to true, all process instances of the provided process definition will be activated or suspended and
     * when the value is set to false, the suspension state of all process instances of the provided process definition will not be updated.
     */
    includeProcessInstances: boolean;
    /**
     * The date on which the given process definition will be activated or suspended.
     * If null, the suspension state of the given process definition is updated immediately.
     * By default*, the date must have the format yyyy-MM-dd'T'HH:mm:ss.SSSZ, e.g., 2013-01-23T14:42:45.234+0200.
     */
    executionDate: Date | null;
}
export interface ProcessDefinitionSuspendedByKeyBody extends ProcessDefinitionSuspendedByIdBody {
    /**
     * The key of the process definitions to activate or suspend.
     */
    processDefinitionKey: string;
}
export interface ProcessDefinitionHistoryTimeToLiveBody {
    /**
     * New value for historyTimeToLive field of process definition. Can be null. Can not be negative.
     */
    historyTimeToLive: number | null;
}
export interface ProcessDefinitionDeleteQueryParams extends BaseSkip {
    /**
     * true, if all process instances, historic process instances and jobs for this process definition should be deleted.
     */
    cascade: boolean;
}
export interface ProcessDefinitionRestartAsyncBody extends BaseSkip, ProcessInstanceIds, HistoricProcessInstanceQuery {
    /**
     * Set the initial set of variables during restart. By default, the last set of variables is used.
     */
    initialVariables: any;
    /**
     * Do not take over the business key of the historic process instance.
     */
    withoutBusinessKey: boolean;
    /**
     * A JSON array of instructions. The instructions are executed in the order they are in. An instruction may have the following properties:
     */
    instructions: Array<Instruction>;
}
