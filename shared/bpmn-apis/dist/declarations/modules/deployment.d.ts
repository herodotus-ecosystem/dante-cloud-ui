import type { BpmnEntity, BpmnListQueryParams, BpmnRequestBody, Link } from '../base';
import type { CaseDefinitionEntity } from './case-definition';
import type { DecisionDefinitionEntity } from './decision-definition';
import type { DecisionRequirementsDefinitionEntity } from './decision-requirements-definition';
import type { ProcessDefinitionEntity } from './process-definition';
export interface DeploymentEntity extends BpmnEntity {
    /**
     * The id of the deployment.
     */
    id: string;
    /**
     * The name of the deployment.
     */
    name: string;
    /**
     * The source of the deployment.
     */
    source: string;
    /**
     * The date and time of the deployment.
     */
    deploymentTime: Date;
    tenantId: string;
    links: Array<Link>;
}
export declare type DeploymentSortBy = 'id' | 'name' | 'deploymentTime' | 'tenantId';
export interface DeploymentQueryParams extends BpmnListQueryParams {
    /**
     * Filter by deployment id.
     */
    id?: string;
    /**
     * Filter by the deployment name. Exact match.
     */
    name?: string;
    /**
     * Filter by the deployment name that the parameter is a substring of. The parameter can include the wildcard % to express like-strategy such as:
     * starts with (%name), ends with (name%) or contains (%name%).
     */
    nameLike?: string;
    /**
     * Filter by the deployment source.
     */
    source?: string;
    /**
     * Filter by the deployment source whereby source is equal to null.
     */
    withoutSource?: string;
    /**
     * Filter by a comma-separated list of tenant ids. A deployment must have one of the given tenant ids.
     */
    tenantIdIn?: string;
    /**
     * Only include deployments which belong to no tenant. Value may only be true, as false is the default behavior.
     */
    withoutTenantId?: boolean;
    /**
     * Include deployments which belong to no tenant. Can be used in combination with tenantIdIn. Value may only be true,
     * as false is the default behavior.
     */
    includeDeploymentsWithoutTenantId?: boolean;
    /**
     * Restricts to all deployments after the given date. By default*, the date must have the format yyyy-MM-dd'T'HH:mm:ss.SSSZ,
     * e.g., 2013-01-23T14:42:45.000+0200.
     */
    after?: Date;
    /**
     * Restricts to all deployments before the given date. By default*, the date must have the format yyyy-MM-dd'T'HH:mm:ss.SSSZ,
     * e.g., 2013-01-23T14:42:45.000+0200.
     */
    before?: Date;
}
export interface DeploymentCreateRequestBody extends BpmnRequestBody {
    /**
     * 字符串格式的模型数据
     */
    resource: string;
    /**
     * The name for the deployment to be created.
     */
    deploymentName: string;
    /**
     * A flag indicating whether the process engine should perform duplicate checking for the deployment or not.
     * This allows you to check if a deployment with the same name and the same resources already exists and if true,
     * not create a new deployment but instead return the existing deployment. The default value is false
     */
    enableDuplicateFiltering?: boolean;
    /**
     * A flag indicating whether the process engine should perform duplicate checking on a per-resource basis. If set to true, only those resources that have actually changed are deployed. Checks are made against resources included previous deployments of the same name and only against the latest versions of those resources. If set to true, the option enable-duplicate-filtering is overridden and set to true.
     */
    deployChangedOnly?: boolean;
    /**
     * The source for the deployment to be created.
     * 部署来源(是在那个终端上进行的部署)
     */
    deploymentSource?: string;
    /**
     * Sets the date on which the process definitions contained in this deployment will be activated. This means that all process definitions
     * will be deployed as usual, but they will be suspended from the start until the given activation date.
     * By default*, the date must have the format yyyy-MM-dd'T'HH:mm:ss.SSSZ, e.g., 2013-01-23T14:42:45.000+0200.
     */
    deploymentActivationTime?: Date;
    /**
     *The tenant id for the deployment to be created.
     */
    tenantId?: string;
}
export interface DeploymentRedeployRequestBody extends BpmnRequestBody {
    /**
     * A list of deployment resource ids to re-deploy.
     */
    resourceIds: Array<string>;
    /**
     * A list of deployment resource names to re-deploy.
     */
    resourceNames: Array<string>;
    /**
     * Sets the source of the deployment.
     */
    source: Array<string>;
}
export interface DeploymentDeployEntity extends BpmnEntity {
    /**
     * Link to the newly created deployment with method, href and rel.
     */
    links: Array<Link>;
    /**
     * The id of the deployment.
     */
    id: string;
    /**
     * The name of the deployment.
     */
    name: string;
    /**
     * The source of the deployment.
     */
    source: string;
    /**
     * The tenant id of the deployment.
     */
    tenantId: string;
    /**
     * The time when the deployment was created.
     */
    deploymentTime: String;
    /**
     * A JSON Object containing a property for each of the process definitions, which are successfully deployed with that deployment.
     * The key is the process definition id, the value is a JSON Object corresponding to the process definition,
     * which is defined in the Process Definition resource.
     */
    deployedProcessDefinitions?: Record<string, ProcessDefinitionEntity>;
    /**
     * A JSON Object containing a property for each of the case definitions, which are successfully deployed with that deployment.
     * The key is the case definition id, the value is a JSON Object corresponding to the case definition,
     * which is defined in the Case Definition resource.
     */
    deployedCaseDefinitions?: Record<string, CaseDefinitionEntity>;
    /**
     * A JSON Object containing a property for each of the decision definitions, which are successfully deployed with that deployment.
     * The key is the decision definition id, the value is a JSON Object corresponding to the decision definition,
     * which is defined in the Decision Definition resource.
     */
    deployedDecisionDefinitions?: Record<string, DecisionDefinitionEntity>;
    deployedDecisionRequirementsDefinitions?: Record<string, DecisionRequirementsDefinitionEntity>;
}
export interface DeploymentResourceEntity extends BpmnEntity {
    /**
     * The id of the deployment resource.
     */
    id: string;
    /**
     * The name of the deployment resource.
     */
    name: string;
    /**
     * The id of the deployment.
     */
    deploymentId: string;
}
