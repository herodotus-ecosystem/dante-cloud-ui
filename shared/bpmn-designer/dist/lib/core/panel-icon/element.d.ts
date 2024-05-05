import { Element } from '../../../declarations';
import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';

declare const getRawType: (type: string) => string;
declare const parseElementType: (element: Element) => string;
export { parseElementType, getRawType, getBusinessObject };
