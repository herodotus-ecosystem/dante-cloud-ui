import { ref } from 'vue';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import type { SweetAlertResult } from 'sweetalert2';
import type { BpmnAlign } from '/@/declarations';

import { lodash, toast, Swal, exception, download, downloadEncode } from '/@/lib';

import useModelerCreator from './useModelerCreator';

export default function useModelerOperator(
  containerHtmlId: string,
  panelHtmlId: string,
  type = 'camunda',
  isViewer = false
) {
  let bpmnModeler: InstanceType<typeof BpmnModeler> = {};
  const zoom = ref(1);
  const simulation = ref(false);

  const { createBpmnModeler } = useModelerCreator(containerHtmlId, panelHtmlId, type, isViewer);

  /** ---------- 常用方法封装 ---------- */
  const getAction = (action: string) => {
    return bpmnModeler.get(action);
  };

  const getCanvas = () => {
    return getAction('canvas');
  };

  const getEventBus = () => {
    return getAction('eventBus');
  };

  const getToggleMode = () => {
    return getAction('toggleMode');
  };

  const getCommandStack = () => {
    return getAction('commandStack');
  };

  const getAlignElements = () => {
    return getAction('alignElements');
  };

  const getSelection = () => {
    return getAction('selection');
  };

  const importDiagram = async (diagram: string) => {
    try {
      const result = await bpmnModeler.importXML(diagram);
      const { warnings } = result;
      // log('Import Diagram Success !', warnings);
    } catch (error) {
      exception('Could not create BPMN 2.0 diagram!', error);
    }
  };

  const createModelerListeners = () => {
    const EventBus = getEventBus();
    const EventTypes = [
      'diagram.init',
      'element.hover',
      'element.out',
      'element.click',
      'element.dblclick',
      'element.mousedown',
      'element.mouseup'
    ];
    EventTypes.forEach(action => {
      EventBus.on(action, (event: any) => {
        // log('Event is : ', action, event);
        // 注册需要的监听事件, 将. 替换为 - , 避免解析异常
        const name = action.replace(/\./g, '-');
        const element = event ? event.element : null;
      });
    });
  };

  const init = (diagram: string) => {
    bpmnModeler = createBpmnModeler();
    if (!isViewer) {
      createModelerListeners();
    }
    importDiagram(diagram);
  };

  const destroy = () => {
    if (!lodash.isEmpty(bpmnModeler)) {
      bpmnModeler.destroy();
      bpmnModeler = {};
    }
  };

  const downloadProcess = async (type: string, name = 'diagram') => {
    try {
      if (type === 'xml' || type === 'bpmn') {
        const { xml } = await bpmnModeler.saveXML();
        const { href, filename } = downloadEncode(type, name, xml);
        download(href, filename);
      } else {
        const { svg } = await bpmnModeler.saveSVG();
        const { href, filename } = downloadEncode('svg', name, svg);
        download(href, filename);
      }
    } catch (error: any) {
      exception('Could not download diagram!', error);
    }
  };

  const downloadAsXml = (name = 'diagram') => {
    downloadProcess('xml', name);
  };

  const downloadAsBpmn = (name = 'diagram') => {
    downloadProcess('bpmn', name);
  };

  const downloadAsSvg = (name = 'diagram') => {
    downloadProcess('svg', name);
  };

  const undo = () => {
    return getCommandStack().undo();
  };

  const redo = () => {
    return getCommandStack().redo();
  };

  const zoomMinus = (step = 0.1) => {
    const newZoom = Math.floor(zoom.value * 100 - step * 100) / 100;
    zoom.value = newZoom;
    getCanvas().zoom(zoom.value);
  };

  const zoomPlus = (step = 0.1) => {
    const newZoom = Math.floor(zoom.value * 100 + step * 100) / 100;
    zoom.value = newZoom;
    getCanvas().zoom(zoom.value);
  };

  const zoomReset = () => {
    zoom.value = 1;
    getCanvas().zoom('fit-viewport', 'auto');
  };

  const alignment = (align: BpmnAlign) => {
    const alignElements = getAlignElements();
    const selection = getSelection();
    const selectedElements = selection.get();
    if (!selectedElements || selectedElements.length <= 1) {
      toast.warning('请按住 Ctrl 键选择多个元素对齐');
      return;
    }

    Swal.fire({
      title: '确定删除?',
      text: '您将无法恢复此操作！',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '确定!',
      cancelButtonText: '取消'
    }).then((confirm: SweetAlertResult) => {
      if (confirm.value) {
        alignElements.trigger(selectedElements, align);
      }
    });
  };

  const alignLeft = () => {
    alignment('left');
  };

  const alignRight = () => {
    alignment('right');
  };

  const alignTop = () => {
    alignment('top');
  };

  const alignBottom = () => {
    alignment('bottom');
  };

  const alignHorizontalCenter = () => {
    alignment('center');
  };

  const alignVerticalCenter = () => {
    alignment('middle');
  };

  const playSimulation = () => {
    getToggleMode().toggleMode();
  };

  return {
    init,
    destroy,
    importDiagram,
    downloadAsXml,
    downloadAsBpmn,
    downloadAsSvg,
    undo,
    redo,
    zoom,
    zoomMinus,
    zoomPlus,
    zoomReset,
    alignLeft,
    alignRight,
    alignTop,
    alignBottom,
    alignHorizontalCenter,
    alignVerticalCenter,
    playSimulation
  };
}
