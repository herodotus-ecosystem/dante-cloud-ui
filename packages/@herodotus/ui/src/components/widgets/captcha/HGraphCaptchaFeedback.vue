<template>
    <div>
        <div :class="['loading-box', { hide_: !loading }]">
            <div class="loading-gif">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        <div :class="['message-box', { show: showMessage }, { fail: !success }]">
            {{ message }}
        </div>
        <div
            :class="['flash', { show: success }]"
            :style="`transform: translateX(${
                success ? `${width + height * 0.578}px` : `-${height * 0.578}px`
            }) skew(-30deg, 0);`"
        ></div>
        <img class="reset" @click="reset" src="../../../static/images/captcha/reset.png" />
    </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HGraphCaptchaFeedback extends Vue {
    // 主canvas的宽
    @Prop({ type: Number, default: 310 }) readonly width?: number;
    // 主canvas的高
    @Prop({ type: Number, default: 155 }) readonly height?: number;
    // 是否成功
    @Prop({ type: Boolean, default: false }) readonly success?: boolean;
    // 是否显示加载
    @Prop({ type: Boolean, default: false }) readonly loading?: boolean;
    // 是否显示信息
    @Prop({ type: Boolean, default: false }) readonly showMessage?: boolean;
    // 滑块区域提示信息
    @Prop({ type: String, default: '' }) readonly message?: string;

    @Emit()
    public reset(): void {}
}
</script>

<style lang="scss" >
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
</style>
