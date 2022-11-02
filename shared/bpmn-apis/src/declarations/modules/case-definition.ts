import type { BpmnBaseEntity } from '../base';

export interface CaseDefinition extends BpmnBaseEntity {
  /**
   * The id of the case definition.
   */
  id: string;
  /**
   * The key of the case definition, i.e., the id of the CMMN 2.0 XML case definition.
   */
  key: string;
  /**
   * The category of the case definition.
   */
  category: string;
  /**
   * The name of the case definition.
   */
  name: string;
  /**
   * The version of the case definition that the engine assigned to it.
   */
  version: number;
  /**
   * The file name of the case definition.
   */
  resource: string;
  /**
   * The deployment id of the case definition.
   */
  deploymentId: string;
  /**
   * The tenant id of the case definition.
   */
  tenantId: string;
  /**
   * History time to live value of the case definition. Is used within History cleanup.
   */
  historyTimeToLive: number;
}
