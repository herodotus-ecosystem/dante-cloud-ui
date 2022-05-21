<template>
    <h-content-panel :title="title" :overlay="overlay">
        <h-bpmn-moddle v-model="bpmn" @deploy="create"></h-bpmn-moddle>
    </h-content-panel>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { Inject } from 'typescript-ioc';
import { HContentPanel } from '@/components';
import { Deployment, DeploymentService } from '@/modules';
import { Operation, BaseBpmnParam, BaseBpmnContent, BaseBpmnService } from '@/lib/declarations';
import diagram from '../../../../static/data/bpmn/diagram.bpmn';

@Component({
    components: {
        HContentPanel,
    },
})
export default class Modeler extends BaseBpmnContent<Deployment, BaseBpmnParam> {
    @Inject
    private deploymentService!: DeploymentService;
    private bpmn = diagram;
    private name = '';
    private id = '';

    public getBaseBpmnService(): BaseBpmnService<Deployment, BaseBpmnParam> {
        return this.deploymentService;
    }

    get title(): string {
        return this.operation === Operation.CREATE ? '添加模型信息' : '编辑' + this.name;
    }

    protected created(): void {
        super.created();
        this.id = this.editedItem.id;
        if (this.id) {
            this.fetchById(this.id);
        }
    }

    private mounted(): void {
        console.log(this.bpmn);
    }

    private fetchById(id: string): void {
        this.deploymentService.fetchById(id).then((result) => {
            console.log(result);
        });
    }

    public create(data: any): void {
        console.log(data);
        if (data) {
            this.deploymentService
                .create(data)
                .then((result) => {
                    this.overlay = false;
                    this.$lib.Swal.fire({
                        position: 'top',
                        title: '模型保存成功！',
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false,
                    }).then((result) => {
                        this.$navigation.goBack(this.$route);
                    });
                })
                .catch((error) => {
                    this.overlay = false;
                });
        } else {
            this.$notify.error('无法获取模型数据，请稍后再试！');
        }
    }
}
</script>
