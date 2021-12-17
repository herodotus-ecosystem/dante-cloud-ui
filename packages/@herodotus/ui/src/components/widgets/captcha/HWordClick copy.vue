<template>
    <div :class="['captcha', { show_: show }]">
        <div class="captcha-box">
            <div class="captcha-body" :style="`height: ${canvasHeight}px`">
                <!-- 主图，有缺口 -->
                <img
                    ref="canvas"
                    :src="backgroundImage"
                    :width="canvasWidth"
                    :height="canvasHeight"
                    :style="`width:${canvasWidth}px;height:${canvasHeight}px`"
                    @click="canClick ? onWordClick($event) : ''"
                />
                <div
                    v-for="(coordinate, index) in flagCoordinate"
                    :key="index"
                    :style="{
                        position: 'absolute',
                        'z-index': 9999,
                        width: '25px',
                        height: '25px',
                        border: '3px solid #fff',
                        color: '#fff',
                        'background-color': '#0D47A1',
                        'font-size': '14px',
                        'text-align': 'center',
                        'line-height': '18px',
                        'border-radius': '50%',
                        'box-sizing': 'border-box',
                        'box-shadow': '0 0 10px black',
                        top: coordinate.y - 10 + 'px',
                        left: coordinate.x - 10 + 'px',
                    }"
                >
                    {{ index + 1 }}
                </div>
                <h-graph-captcha-feedback
                    :width="canvasWidth"
                    :height="canvasHeight"
                    :loading="loading"
                    :success="isSuccess"
                    :show-message="isShowMessage"
                    :message="message"
                    @reset="reset()"
                ></h-graph-captcha-feedback>
            </div>
            <div class="slider-control">
                <div class="range-box" :style="`height:${sliderDisplaySize}px`">
                    <div class="range-text">{{ sliderTips }}【{{ wordTips }}】</div>
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
export default class HWordClick extends Vue {
    // 显示验证码
    @Prop({ type: Boolean, default: false }) readonly show?: boolean;
    // 主canvas的宽
    @Prop({ type: Number, default: 310 }) readonly canvasWidth?: number;
    // 主canvas的高
    @Prop({ type: Number, default: 155 }) readonly canvasHeight?: number;
    // 滑块的大小
    @Prop({ type: Number, default: 30 }) readonly sliderSize?: number;
    // 滑块区域提示信息
    @Prop({ type: String, default: '请顺序点选' }) readonly sliderTips?: string;
    // 滑块区域提示信息
    @Prop({ type: String, default: '验证通过！' }) readonly successText?: string;
    // 滑块区域提示信息
    @Prop({ type: String, default: '验证失败，请重试！' }) readonly failText?: string;

    public flagCoordinate = [];
    // 用户点击的坐标
    public verifyCoordinate = [];
    // 默认需要点击的字数
    public verifyWordCount = 3;
    // 点击的记数;
    public clickWordCount = 0;
    public wordTips = '';
    // 验证成功
    public isSuccess = false;
    public loading = false;
    // 提示信息是否出现
    public isShowMessage = false;
    // 提示等信息
    public message = '';
    // setTimout
    public timer = null;
    // 后台生成的背景图Base64
    public backgroundImageBase64 = '';
    public identity = '';
    public canClick = false;

    /**
     * 处理一下sliderSize，弄成整数，以免计算有偏差
     */
    get sliderDisplaySize(): number {
        return Math.max(Math.min(Math.round(this.sliderSize), Math.round(this.canvasWidth * 0.5)), 10);
    }

    get backgroundImage(): string {
        return 'data:image/png;base64,' + this.backgroundImageBase64;
    }

    /** 生命周期 **/
    public created() {
        this.init();
    }

    // 获取坐标
    public getMouseCoordinate(e) {
        var x = e.offsetX;
        var y = e.offsetY;
        return { x, y };
    }

    public onWordClick(e): void {
        let coordinate = this.getMouseCoordinate(e);
        if (this.clickWordCount <= this.verifyWordCount) {
            this.verifyCoordinate.push(coordinate);
            this.flagCoordinate.push(coordinate);
            this.clickWordCount = ++this.clickWordCount;
        }

        if (this.clickWordCount === this.verifyWordCount) {
            this.submit();
        }
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

    @Emit('success')
    public onSuccess(x): void {
        return x;
    }

    public init() {
        this.loading = true;
        this.$session.get().then((sessionId) => {
            if (sessionId) {
                this.identity = sessionId;
                this.$security
                    .getCaptcha(sessionId)
                    .then((result) => {
                        this.backgroundImageBase64 = result.data.wordClickImageBase64;
                        this.verifyWordCount = result.data.wordsCount;
                        this.wordTips = result.data.words;
                        this.loading = false;
                        this.canClick = true;
                    })
                    .catch(() => {
                        this.loading = false;
                    });
            }
        });
    }

    public submit(): void {
        this.loading = true;

        this.$security
            .checkCaptcha(this.identity, 'WORD_CLICK', this.verifyCoordinate)
            .then((result) => {
                if (result.data) {
                    this.message = this.successText;
                    this.isSuccess = true;
                    this.isShowMessage = true;
                    this.canClick = false;
                    this.flagCoordinate = [];

                    // 成功后准备关闭
                    clearTimeout(this.timer);
                    this.timer = setTimeout(() => {
                        // 失败的回调
                        this.$emit('success', this.verifyCoordinate);
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
                this.canClick = false;
                this.flagCoordinate = [];

                // 失败的回调
                this.$emit('fail', this.verifyCoordinate);
                // 800ms后重置
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.reset();
                }, 800);
            });
    }

    /**
     * 重置
     */
    public reset(): void {
        this.isSuccess = false;
        this.isShowMessage = false;
        this.flagCoordinate = [];
        this.verifyCoordinate = [];
        this.clickWordCount = 0;
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
