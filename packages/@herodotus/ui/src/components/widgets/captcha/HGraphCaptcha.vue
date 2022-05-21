<template>
    <div :class="['captcha', { show: show }]">
        <div class="captcha-box">
            <component
                :is="type"
                :schema="schema"
                :loading="loading"
                :identity="identity"
                :can-operate="canOperate"
                :success-text="successText"
                :failed-text="failedText"
                :canvas-width="canvasWidth"
                :canvas-height="canvasHeight"
                :slider-size="sliderDisplaySize"
                :captcha-type="type"
                @reset="reset()"
                @success="onSuccess($data)"
                @failed="reset()"
            ></component>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Emit, Watch, Prop, Vue } from 'vue-property-decorator';
import HWordClickCaptcha from './HWordClickCaptcha.vue';
import HJigsawCaptcha from './HJigsawCaptcha.vue';

@Component({
    components: {
        WORD_CLICK: HWordClickCaptcha,
        JIGSAW: HJigsawCaptcha,
    },
})
export default class HGraphCaptcha extends Vue {
    // 显示验证码
    @Prop({ type: Boolean, default: false }) readonly show?: boolean;
    @Prop({ type: String, default: 'JIGSAW' }) readonly type?: boolean;
    // 主canvas的宽
    @Prop({ type: Number, default: 310 }) readonly canvasWidth?: number;
    // 主canvas的高
    @Prop({ type: Number, default: 155 }) readonly canvasHeight?: number;
    // 滑块的大小
    @Prop({ type: Number, default: 30 }) readonly sliderSize?: number;
    // 滑块区域提示信息
    @Prop({ type: String, default: '验证通过!' }) readonly successText?: string;
    // 滑块区域提示信息
    @Prop({ type: String, default: '验证失败，请重试!' }) readonly failedText?: string;

    public schema = {};
    public loading = false;
    public canOperate = false;
    public identity = '';

    /**
     * 处理一下sliderSize，弄成整数，以免计算有偏差
     */
    get sliderDisplaySize(): number {
        return Math.max(Math.min(Math.round(this.sliderSize), Math.round(this.canvasWidth * 0.5)), 10);
    }

    public created(): void {
        this.init();
    }

    @Watch('show', { immediate: true })
    onShowChanged(newValue: string): void {
        if (newValue) {
            document.body.classList.add('captcha-overflow');
            this.init();
        } else {
            document.body.classList.remove('captcha-overflow');
        }
    }

    @Emit('success')
    public onSuccess(data) {
        return data;
    }

    public init() {
        this.loading = true;
        this.$session.get().then((sessionId) => {
            if (sessionId) {
                this.identity = sessionId;
                this.$security
                    .getCaptcha(sessionId, this.type)
                    .then((result) => {
                        this.schema = result.data;
                        this.loading = false;
                        this.canOperate = true;
                    })
                    .catch(() => {
                        this.loading = false;
                    });
            }
        });
    }

    public reset(): void {
        this.canOperate = false;
        this.init();
    }
}
</script>

<style lang="scss">
.captcha {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 999;
    opacity: 0;
    pointer-events: none;
    transition: opacity 200ms;
    &.show {
        opacity: 1;
        pointer-events: auto;
    }
}

.captcha-box {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background: #fff;
    user-select: none;
    border-radius: 3px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    .captcha-body {
        position: relative;
        overflow: hidden;
        border-radius: 3px;
    }
}
.captcha-overflow {
    overflow: hidden !important;
}
</style>

