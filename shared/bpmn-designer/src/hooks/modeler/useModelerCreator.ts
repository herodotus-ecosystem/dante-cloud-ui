import { markRaw } from 'vue';
import Modeler from 'bpmn-js/lib/Modeler';

// moddle 定义文件
import camundaModdleDescriptors from 'camunda-bpmn-moddle/resources/camunda';

// camunda 官方侧边栏扩展
import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
  CamundaPlatformPropertiesProviderModule,
} from 'bpmn-js-properties-panel';

// 官方扩展工具 元素模板选择
import ElementTemplateChooserModule from '@bpmn-io/element-template-chooser';
import ConnectorsExtensionModule from 'bpmn-js-connectors-extension';

// 官方流程模拟 module
import TokenSimulationModule from 'bpmn-js-token-simulation';

// 流程图校验部分
import BpmnLintModule from 'bpmn-js-bpmnlint';

// 小地图
import MinimapModule from 'diagram-js-minimap';

// 官方网格背景
import GridModule from 'diagram-js-grid';

// 自定义 modules 扩展模块
import { Translator, BpmnLinter, HerodotusPropertiesProviderModule } from '@/lib/core';

import { useSettingStore, useDesignerStore } from '@/stores';
import { lodash, Logger } from '@/lib/utils';

export default function useModelerCreator() {
  const settings = useSettingStore();
  const designer = useDesignerStore();

  const createModules = (panelHtmlId: string) => {
    const modules = [];
    const options = {} as Record<string, any>;
    const extensions = {} as Record<string, any>;

    modules.push(
      BpmnPropertiesPanelModule,
      BpmnPropertiesProviderModule,
      CamundaPlatformPropertiesProviderModule,
      HerodotusPropertiesProviderModule,
    );

    extensions['camunda'] = camundaModdleDescriptors;

    if (settings.useOfficialPanel) {
      options['propertiesPanel'] = {
        parent: panelHtmlId,
      };
    }

    if (settings.useOfficialTemplateChooser) {
      modules.push(ElementTemplateChooserModule, ConnectorsExtensionModule);
      options['exporter'] = {
        name: 'element-template-chooser',
        version: '1.0.0',
      };
      options['connectorsExtension'] = {
        appendAnything: true,
      };
    }

    // // 设置 lint 校验
    if (settings.showBpmnLint) {
      modules.push(BpmnLintModule);
      options['linting'] = {
        active: true,
        bpmnlint: BpmnLinter,
      };
    }

    // 设置 lint 校验
    if (settings.showMiniMap) {
      modules.push(MinimapModule);
      options['minimap'] = {
        open: true,
      };
    }

    // 官方网点背景
    if (settings.useOfficialBackground) {
      modules.push(GridModule);
    }

    // 设置其他模块的启用
    if (settings.useOtherModule) {
      modules.push(TokenSimulationModule);
      // 设置键盘事件绑定
      options['keyboard'] = {
        bindTo: document,
      };
    }

    // 翻译模块
    const TranslateModule = {
      translate: ['value', Translator],
    };
    modules.push(TranslateModule);

    return {
      additionalModules: modules,
      moddleExtensions: extensions,
      ...options,
    };
  };

  const createBpmnModeler = (containerHtmlId: string, panelHtmlId: string): Modeler => {
    const modules = createModules(panelHtmlId);

    designer.$reset();

    const modeler: Modeler = new Modeler({
      container: containerHtmlId,
      ...modules,
    });

    designer.modeler = markRaw(modeler);
    designer.modeling = markRaw(modeler.get('modeling'));
    designer.canvas = markRaw(modeler.get('canvas'));
    designer.moddle = markRaw(modeler.get('moddle'));
    designer.elementRegistry = markRaw(modeler.get('elementRegistry'));

    return modeler;
  };

  const createEmptyDiagram = (key: string, name: string): string => {
    return `<?xml version="1.0" encoding="UTF-8"?>
    <bpmn:definitions
      xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
      xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
      xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
      xmlns:camunda="http://camunda.org/schema/1.0/bpmn"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
      xmlns:modeler="http://camunda.org/schema/modeler/1.0"
      id="Definitions_${key}" targetNamespace="http://bpmn.io/schema/bpmn" exporter="Dante Cloud Modeler" exporterVersion="5.7.0" modeler:executionPlatform="Camunda Platform" modeler:executionPlatformVersion="7.18.0">
      <bpmn:process id="${key}" name="${name}" isExecutable="true">
        <bpmn:startEvent id="StartEvent_1" />
      </bpmn:process>
      <bpmndi:BPMNDiagram id="BPMNDiagram_1">
        <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="${key}">
          <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
            <dc:Bounds x="179" y="159" width="36" height="36" />
          </bpmndi:BPMNShape>
        </bpmndi:BPMNPlane>
      </bpmndi:BPMNDiagram>
    </bpmn:definitions>
    `;
  };

  const createNewDiagram = async (diagram = '') => {
    const processId = settings.processId;
    const processName = settings.processName;
    try {
      const timestamp = Date.now();
      const newId: string = processId ? processId : `Process_${timestamp}`;
      const newName: string = processName || `业务流程_${timestamp}`;
      const xmlString = diagram || createEmptyDiagram(newId, newName);

      const result = await designer.modeler.importXML(xmlString);
      const { warnings } = result;
      if (lodash.isEmpty(warnings)) {
        Logger.prettyPrimary('Diagram xml imported', 'Succeed!');
      } else {
        Logger.prettyWarn('Diagram xml imported has warnings', warnings);
      }
    } catch (error) {
      Logger.prettyError('[HBM] |- Could not create BPMN 2.0 diagram!', error);
    }
  };

  const createModelerListeners = (modeler: Modeler) => {
    modeler.on('herodotus.element.changed', (data) => {
      designer.switchElement(
        // @ts-ignore
        markRaw(data.activeElement),
        // @ts-ignore
        data.activeElementId,
        // @ts-ignore
        data.panelGroups,
        // @ts-ignore
        data.elementType,
        // @ts-ignore
        data.elementRawType,
        // @ts-ignore
        data.elementTitle,
        // @ts-ignore
        data.elementIcon,
        // @ts-ignore
        data.elementCaption,
        // @ts-ignore
        data.isMultiInstance,
      );
    });
  };

  const create = (diagram = '') => {
    const modeler = createBpmnModeler('#designer', '#camunda-panel');
    createModelerListeners(modeler);
    createNewDiagram(diagram);
  };

  const destroy = () => {
    if (!lodash.isEmpty(designer.modeler)) {
      designer.modeler.destroy();
      designer.$reset();
    }
  };

  return {
    createBpmnModeler,
    createNewDiagram,
    create,
    destroy,
  };
}
