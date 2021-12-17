<template>
    <div>
        <div class="captcha-body" :style="`height: ${canvasHeight}px`">
            <!-- 主图，有缺口 -->
            <img
                :src="backgroundImage"
                :width="canvasWidth"
                :height="canvasHeight"
                :style="`width:${canvasWidth}px;height:${canvasHeight}px`"
            />
            <!-- 小图 -->
            <img
                class="jigsaw-slider"
                :src="jigsawImage"
                :height="canvasHeight"
                :style="`transform:translateX(${styleWidth - sliderSize}px)`"
            />
            <h-graph-captcha-feedback
                :width="canvasWidth"
                :height="canvasHeight"
                :loading="isLoading"
                :success="isSuccess"
                :show-message="isShowMessage"
                :message="message"
                @reset="onReset()"
            ></h-graph-captcha-feedback>
        </div>
        <div class="slider-control">
            <div class="range-box" :style="`height:${sliderSize}px`">
                <div class="range-text">{{ sliderTips }}</div>
                <div class="range-slider" ref="range-slider" :style="`width:${styleWidth}px`">
                    <div
                        :class="['range-btn', { isDown: isMouseDown }]"
                        :style="`width:${sliderSize}px`"
                        @mousedown="onRangeMouseDown($event)"
                        @touchstart="onRangeMouseDown($event)"
                    >
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Emit, Watch, Prop, Vue } from 'vue-property-decorator';
import HGraphCaptchaFeedback from './HGraphCaptchaFeedback.vue';

@Component({
    components: {
        HGraphCaptchaFeedback,
    },
})
export default class HJigsawCaptcha extends Vue {
    // 基础数据
    @Prop({ type: Object, default: () => {} }) readonly schema: unknown;
    // 显示加载动画
    @Prop({ type: Boolean, default: false }) readonly loading?: boolean;
    // 显示加载动画
    @Prop({ type: String }) readonly identity: string;
    // 验证码类型
    @Prop({ type: String }) readonly captchaType: string;
    // 是否可以操作
    @Prop({ type: Boolean, default: false }) readonly canOperate?: boolean;
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

    // 后台生成的背景图Base64
    public backgroundImageBase64 = '';
    // 后台生成的拼图滑块Base64
    public jigsawImageBase64 = '';
    // 验证成功
    public isSuccess = false;
    // 是否正在加在中，主要是等图片onload
    public isLoading = false;
    // 提示信息是否出现
    public isShowMessage = false;
    // 提示等信息
    public message = '';
    // 是否可以拉动滑动条
    public canAction = false;
    // 鼠标点下去时父级的width
    public startWidth = 50;
    // 鼠标按下时的X
    public startX = 0;
    // 鼠标当前的偏移X
    public newX = 0;
    // 鼠标是否在按钮上按下
    public isMouseDown = false;
    // 为了解决Mac上的click BUG
    public isCloseDown = false;
    // setTimout
    public timer = null;
    public sliderTips = '拖动滑块完成拼图';

    /** 生命周期 **/
    public mounted(): void {
        this.addEventListener();
    }
    public beforeDestroy(): void {
        this.removeEventListener();
    }

    /**
     * 添加移动/结束事件监听
     */
    private addEventListener(): void {
        // document.body.appendChild(this.$el);
        document.addEventListener('mousemove', this.onRangeMouseMove, false);
        document.addEventListener('mouseup', this.onRangeMouseUp, false);

        document.addEventListener('touchmove', this.onRangeMouseMove, {
            passive: false,
        });
        document.addEventListener('touchend', this.onRangeMouseUp, false);
    }
    /**
     * 移除移动/结束事件监听
     */
    private removeEventListener(): void {
        clearTimeout(this.timer);
        // document.body.removeChild(this.$el);
        document.removeEventListener('mousemove', this.onRangeMouseMove, false);
        document.removeEventListener('mouseup', this.onRangeMouseUp, false);
        document.removeEventListener('touchmove', this.onRangeMouseMove, {
            capture: false,
        });
        document.removeEventListener('touchend', this.onRangeMouseUp, false);
    }

    @Watch('schema', { immediate: true })
    public onSchemaChanged(newValue): void {
        this.init(newValue);
    }

    @Emit('reset')
    public onReset(): void {
        this.canAction = true;
        this.isSuccess = false;
        this.isShowMessage = false;
        this.isLoading = this.loading;
        this.startWidth = this.sliderSize; // 鼠标点下去时父级的width
        this.startX = 0; // 鼠标按下时的X
        this.newX = 0; // 鼠标当前的偏移X
    }

    public init(value): void {
        this.backgroundImageBase64 = value.originalImageBase64;
        this.jigsawImageBase64 = value.sliderImageBase64;
        this.isLoading = this.loading;
        this.canAction = this.canOperate;
        this.isShowMessage = false;
        this.startX = 0; // 鼠标按下时的X
        this.newX = 0; // 鼠标当前的偏移X
    }

    /**
     * styleWidth是底部用户操作的滑块的父级，就是轨道在鼠标的作用下应该具有的宽度
     */
    get styleWidth(): number {
        const w = this.startWidth + this.newX - this.startX;
        return w < this.sliderSize ? this.sliderSize : w > this.canvasWidth ? this.canvasWidth : w;
    }

    get backgroundImage(): string {
        return 'data:image/png;base64,' + this.backgroundImageBase64;
    }

    get jigsawImage(): string {
        return 'data:image/png;base64,' + this.jigsawImageBase64;
    }

    // 鼠标按下准备拖动
    public onRangeMouseDown(e): void {
        if (this.canAction) {
            this.isMouseDown = true;
            let slider = this.$refs['range-slider'] as InstanceType<typeof HTMLDivElement>;
            this.startWidth = slider.clientWidth;
            this.newX = e.clientX || e.changedTouches[0].clientX;
            this.startX = e.clientX || e.changedTouches[0].clientX;
        }
    }
    // 鼠标移动
    public onRangeMouseMove(e): void {
        if (this.isMouseDown) {
            e.preventDefault();
            this.newX = e.clientX || e.changedTouches[0].clientX;
        }
    }
    // 鼠标抬起
    public onRangeMouseUp(): void {
        if (this.isMouseDown) {
            this.isMouseDown = false;
            this.submit();
        }
    }

    public submit(): void {
        this.canAction = false;
        this.isLoading = true;
        const x = this.newX - this.startX;

        this.$security
            .checkCaptcha(this.identity, this.captchaType, { x: x, y: 5 })
            .then((result) => {
                if (result.data) {
                    this.message = this.successText;
                    this.isSuccess = true;
                    this.isShowMessage = true;
                    this.canAction = false;

                    // 成功后准备关闭
                    clearTimeout(this.timer);
                    this.timer = setTimeout(() => {
                        // 成功的回调
                        this.$emit('success', x);
                    }, 800);
                }
            })
            .catch((error) => {
                if (error.code && error.code === 40610) {
                    // 失败
                    this.message = this.failedText;
                } else {
                    this.message = error.message;
                }
                this.isSuccess = false;
                this.isShowMessage = true;
                this.canAction = false;

                // 800ms后重置
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.$emit('failed', x);
                }, 800);
            });
    }
}
</script>

<style lang="scss">
.captcha-body {
    position: relative;
    overflow: hidden;
    border-radius: 3px;
    .jigsaw-slider {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        z-index: 2;
    }
}
.slider-control {
    .range-box {
        position: relative;
        width: 100%;
        background-color: #eef1f8;
        margin-top: 20px;
        border-radius: 3px;
        box-shadow: 0 0 8px rgba(240, 240, 240, 0.6) inset;
        .range-text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 14px;
            color: #b7bcd1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: center;
            width: 100%;
        }
        .range-slider {
            position: absolute;
            height: 100%;
            width: 50px;
            background-color: rgba(106, 160, 255, 0.8);
            border-radius: 3px;
            .range-btn {
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: center;
                right: 0;
                width: 50px;
                height: 100%;
                background-color: #fff;
                border-radius: 3px;
                box-shadow: 0 0 4px #ccc;
                cursor: pointer;
                & > div {
                    width: 0;
                    height: 40%;

                    transition: all 200ms;
                    &:nth-child(2) {
                        margin: 0 4px;
                    }
                    border: solid 1px #6aa0ff;
                }
                &:hover,
                &.isDown {
                    & > div:first-child {
                        border: solid 4px transparent;
                        height: 0;
                        border-right-color: #6aa0ff;
                    }
                    & > div:nth-child(2) {
                        border-width: 3px;
                        height: 0;
                        border-radius: 3px;
                        margin: 0 6px;
                        border-right-color: #6aa0ff;
                    }
                    & > div:nth-child(3) {
                        border: solid 4px transparent;
                        height: 0;
                        border-left-color: #6aa0ff;
                    }
                }
            }
        }
    }
}
</style>
