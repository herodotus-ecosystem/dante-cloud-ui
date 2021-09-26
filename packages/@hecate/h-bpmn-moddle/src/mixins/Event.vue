<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class Event extends Vue {
    public success(): void {
        this.addModelerListener();
        this.addEventBusListener();
    }
    // 监听 modeler
    private addModelerListener(): void {
        const _bpmnModeler = this.bpmnModeler;

        // 这里我是用了一个forEach给modeler上添加要绑定的事件
        const events = ['shape.added', 'shape.move.end', 'shape.removed', 'connect.end', 'connect.move'];
        events.forEach(function (event) {
            _bpmnModeler.on(event, (e) => {
                console.log('[HBM] |- (1) Event is: ', event);
                console.log('[HBM] |- (2) Param is: ', e);
                let elementRegistry = _bpmnModeler.get('elementRegistry');
                let shape = e.element ? elementRegistry.get(e.element.id) : e.shape;
                console.log('[HBM] |- (3) Shape is: ', shape);
                if (event === 'shape.added') {
                    console.log('[HBM] |- Add shape.');
                } else if (event === 'shape.move.end') {
                    console.log('[HBM] |- Move shape');
                } else if (event === 'shape.removed') {
                    console.log('[HBM] |- Remove shape');
                }
            });
        });
    }

    private addEventBusListener(): void {
        const _that = this;
        const eventBus = _that.bpmnModeler.get('eventBus');
        const eventTypes = ['element.click', 'element.changed'];
        eventTypes.forEach((eventType) => {
            eventBus.on(eventType, (e) => {
                if (!e || e.element.type == 'bpmn:Process') return;
                console.log('[HBM] |- Event Type : ', eventType);
                console.log('[HBM] |- E : ', e);
                if (eventType === 'element.changed') {
                    _that.elementChanged(eventType, e);
                } else if (eventType === 'element.click') {
                    console.log('[HBM] |- Click element.');
                }
            });
        });
    }

    private elementChanged(eventType, e): void {
        const _that = this;
        let shape = _that.getShape(e.element.id);
        if (!shape) {
            // 若是shape为null则表示删除, 无论是shape还是connect删除都调用此处
            console.log('[HBM] |- Invalid shape.');
        } else if (shape.type && !_that.isInvalid(shape.type)) {
            // 由于上面已经用 shape.removed 检测了shape的删除, 因此这里只判断是否是线
            if (_that.isSequenceFlow(shape.type)) {
                console.log('[HBM] |- Changing line.');
            }
        }
    }

    private getShape(id) {
        var elementRegistry = this.bpmnModeler.get('elementRegistry');
        return elementRegistry.get(id);
    }
    private isInvalid(param): boolean {
        // 判断是否是无效的值
        return param === null || param === undefined || param === '';
    }
    private isSequenceFlow(type): boolean {
        // 判断是否是线
        return type === 'bpmn:SequenceFlow';
    }
}
</script>
