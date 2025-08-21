import { BpmnEntity } from '../base';
export interface CalledProcessDefinitionEntity extends BpmnEntity {
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
