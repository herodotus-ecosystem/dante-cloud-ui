<template>
    <div
        :class="['captcha', { show_: show }]"
        @mousedown="onCloseMouseDown"
        @mouseup="onCloseMouseUp"
        @touchstart="onCloseMouseDown"
        @touchend="onCloseMouseUp"
    >
        <div class="captcha-box">
            <div class="captcha-body" :style="`height: ${canvasHeight}px`">
                <!-- 主图，有缺口 -->
                <img
                    ref="canvas1"
                    :src="backgroundImage"
                    :width="canvasWidth"
                    :height="canvasHeight"
                    :style="`width:${canvasWidth}px;height:${canvasHeight}px`"
                />
                <!-- 小图 -->
                <img
                    ref="canvas2"
                    class="jigsaw-slider"
                    :src="jigsawImage"
                    :height="canvasHeight"
                    :style="`transform:translateX(${styleWidth - sliderDisplaySize}px)`"
                />
                <div :class="['loading-box', { hide_: !loading }]">
                    <div class="loading-gif">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div :class="['message-box', { show: isShowMessage }, { fail: !isSuccess }]">
                    {{ message }}
                </div>
                <div
                    :class="['flash', { show: isSuccess }]"
                    :style="`transform: translateX(${
                        isSuccess ? `${canvasWidth + canvasHeight * 0.578}px` : `-${canvasHeight * 0.578}px`
                    }) skew(-30deg, 0);`"
                ></div>
                <img class="reset" @click="reset" src="../../../static/images/captcha/reset.png" />
            </div>
            <div class="slider-control">
                <div class="range-box" :style="`height:${sliderDisplaySize}px`">
                    <div class="range-text">{{ sliderTips }}</div>
                    <div class="range-slider" ref="range-slider" :style="`width:${styleWidth}px`">
                        <div
                            :class="['range-btn', { isDown: isMouseDown }]"
                            :style="`width:${sliderDisplaySize}px`"
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
    </div>
</template>

<script lang="ts">
import { Component, Emit, Watch, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HCaptcha extends Vue {
    // 显示验证码
    @Prop({ type: Boolean, default: false }) readonly show?: boolean;
    // 主canvas的宽
    @Prop({ type: Number, default: 310 }) readonly canvasWidth?: number;
    // 主canvas的高
    @Prop({ type: Number, default: 155 }) readonly canvasHeight?: number;
    // 滑块的大小
    @Prop({ type: Number, default: 50 }) readonly sliderSize?: number;
    // 滑块区域提示信息
    @Prop({ type: String, default: '拖动滑块完成拼图' }) readonly sliderTips?: string;
    // 滑块区域提示信息
    @Prop({ type: String, default: '验证通过！' }) readonly successText?: string;
    // 滑块区域提示信息
    @Prop({ type: String, default: '验证失败，请重试！' }) readonly failText?: string;

    // 验证成功
    public isSuccess = false;
    // 是否验证失败
    public isFailed = false;
    // 是否正在加在中，主要是等图片onload
    public loading = false;
    // 提示信息是否出现
    public isShowMessage = false;
    // 提示等信息
    public message = '';
    // 是否可以拉动滑动条
    public canSlide = false;
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
    // 后台生成的背景图Base64
    public backgroundImageBase64 = '';
    // 后台生成的拼图滑块Base64
    public jigsawImageBase64 = '';
    public identity = '';

    /**
     * styleWidth是底部用户操作的滑块的父级，就是轨道在鼠标的作用下应该具有的宽度
     */
    get styleWidth(): number {
        const w = this.startWidth + this.newX - this.startX;
        return w < this.sliderDisplaySize ? this.sliderDisplaySize : w > this.canvasWidth ? this.canvasWidth : w;
    }

    /**
     * 处理一下sliderSize，弄成整数，以免计算有偏差
     */
    get sliderDisplaySize(): number {
        return Math.max(Math.min(Math.round(this.sliderSize), Math.round(this.canvasWidth * 0.5)), 10);
    }

    get backgroundImage(): string {
        return 'data:image/png;base64,' + this.backgroundImageBase64;
    }

    get jigsawImage(): string {
        return 'data:image/png;base64,' + this.jigsawImageBase64;
    }

    /** 生命周期 **/
    public created() {
        this.init();
    }
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
        document.body.appendChild(this.$el);
        document.addEventListener('mousemove', this.onRangeMouseMove, false);
        document.addEventListener('mouseup', this.onRangeMouseUp, false);

        document.addEventListener('touchmove', this.onRangeMouseMove, {
            passive: false,
        });
        document.addEventListener('touchend', this.onRangeMouseUp, false);
        if (this.show) {
            document.body.classList.add('captcha-overflow');
            this.reset();
        }
    }
    /**
     * 移除移动/结束事件监听
     */
    private removeEventListener(): void {
        clearTimeout(this.timer);
        document.body.removeChild(this.$el);
        document.removeEventListener('mousemove', this.onRangeMouseMove, false);
        document.removeEventListener('mouseup', this.onRangeMouseUp, false);
        document.removeEventListener('touchmove', this.onRangeMouseMove, {
            capture: false,
        });
        document.removeEventListener('touchend', this.onRangeMouseUp, false);
    }

    @Watch('show', { immediate: true })
    onShowChanged(newValue: string): void {
        if (newValue) {
            document.body.classList.add('captcha-overflow');
            this.reset();
        } else {
            document.body.classList.remove('captcha-overflow');
        }
    }

    @Emit('close')
    public onClose(): void {}

    @Emit('success')
    public onSuccess(x): void {
        return x;
    }

    // 关闭
    private close(): void {
        if (!this.isMouseDown) {
            clearTimeout(this.timer);
            this.onClose();
        }
    }

    public onCloseMouseDown(): void {
        this.isCloseDown = true;
    }

    public onCloseMouseUp(): void {
        if (this.isCloseDown) {
            this.close();
        }
        this.isCloseDown = false;
    }

    // 鼠标按下准备拖动
    public onRangeMouseDown(e): void {
        if (this.canSlide) {
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

    public init() {
        this.loading = true;
        this.$session.get().then((sessionId) => {
            if (sessionId) {
                this.identity = sessionId;
                this.$security
                    .getCaptcha(sessionId)
                    .then((result) => {
                        this.backgroundImageBase64 = result.data.originalImageBase64;
                        this.jigsawImageBase64 = result.data.sliderImageBase64;
                        this.loading = false;
                        this.canSlide = true;
                    })
                    .catch(() => {
                        this.loading = false;
                    });
            }
        });
    }

    /**
     * 重置
     */
    public reset(): void {
        this.canSlide = true;
        this.isSuccess = false;
        this.isShowMessage = false;
        this.startWidth = this.sliderDisplaySize; // 鼠标点下去时父级的width
        this.startX = 0; // 鼠标按下时的X
        this.newX = 0; // 鼠标当前的偏移X
        this.init();
    }

    public submit(): void {
        this.canSlide = false;
        this.loading = true;
        const x = this.newX - this.startX;

        this.$security
            .checkCaptcha(this.identity, x)
            .then((result) => {
                if (result.data) {
                    this.message = this.successText;
                    this.isSuccess = true;
                    this.isShowMessage = true;
                    this.canSlide = false;

                    // 成功后准备关闭
                    clearTimeout(this.timer);
                    this.timer = setTimeout(() => {
                        // 成功的回调
                        this.onSuccess(x);
                    }, 800);
                }
            })
            .catch((error) => {
                if (error.code && error.code === 40610) {
                    // 失败
                    this.message = this.failText;
                } else {
                    this.message = error.message;
                }
                this.isSuccess = false;
                this.isShowMessage = true;
                this.canSlide = false;

                // 失败的回调
                this.$emit('fail', x);
                // 800ms后重置
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.reset();
                }, 800);
            });
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
    &.show_ {
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
        .loading-box {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background-color: rgba(0, 0, 0, 0.8);
            z-index: 20;
            opacity: 1;
            transition: opacity 200ms;
            display: flex;
            align-items: center;
            justify-content: center;
            &.hide_ {
                opacity: 0;
                pointer-events: none;
                .loading-gif {
                    span {
                        animation-play-state: paused;
                    }
                }
            }
            .loading-gif {
                flex: none;
                height: 5px;
                line-height: 0;
                @keyframes load {
                    0% {
                        opacity: 1;
                        transform: scale(1.3);
                    }
                    100% {
                        opacity: 0.2;
                        transform: scale(0.3);
                    }
                }
                span {
                    display: inline-block;
                    width: 5px;
                    height: 100%;
                    margin-left: 2px;
                    border-radius: 50%;
                    background-color: #888;
                    animation: load 1.04s ease infinite;
                    &:nth-child(1) {
                        margin-left: 0;
                    }
                    &:nth-child(2) {
                        animation-delay: 0.13s;
                    }
                    &:nth-child(3) {
                        animation-delay: 0.26s;
                    }
                    &:nth-child(4) {
                        animation-delay: 0.39s;
                    }
                    &:nth-child(5) {
                        animation-delay: 0.52s;
                    }
                }
            }
        }
        .message-box {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 24px;
            line-height: 24px;
            text-align: center;
            overflow: hidden;
            font-size: 13px;
            background-color: #83ce3f;
            opacity: 0;
            transform: translateY(24px);
            transition: all 200ms;
            color: #fff;
            z-index: 30;
            &.show {
                opacity: 0.95;
                transform: translateY(0);
            }
            &.fail {
                background-color: #ce594b;
            }
        }
        .jigsaw-slider {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            z-index: 2;
        }
        .success-canvas {
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
            transition: opacity 600ms;
            z-index: 3;
            &.show {
                opacity: 1;
            }
        }
        .flash {
            position: absolute;
            top: 0;
            left: 0;
            width: 30px;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.1);
            z-index: 3;
            &.show {
                transition: transform 600ms;
            }
        }
        .reset {
            position: absolute;
            top: 2px;
            right: 2px;
            width: 35px;
            height: auto;
            z-index: 12;
            cursor: pointer;
            transition: transform 200ms;
            transform: rotate(0deg);
            &:hover {
                transform: rotate(-90deg);
            }
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
}
.captcha-overflow {
    overflow: hidden !important;
}
</style>
