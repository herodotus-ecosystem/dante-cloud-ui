<template>
    <div>
        <div class="captcha-body" :style="`height: ${canvasHeight}px`">
            <!-- 主图，有缺口 -->
            <img
                :src="backgroundImage"
                :width="canvasWidth"
                :height="canvasHeight"
                :style="`width:${canvasWidth}px;height:${canvasHeight}px`"
                @click="canAction ? onWordClick($event) : ''"
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
                :loading="isLoading"
                :success="isSuccess"
                :show-message="isShowMessage"
                :message="message"
                @reset="onReset()"
            ></h-graph-captcha-feedback>
        </div>
        <div class="slider-control">
            <div class="range-box" :style="`height:${sliderSize}px`">
                <div class="range-text">{{ sliderTips }}【{{ prompt }}】</div>
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
    // 默认需要点击的字数
    public verifyWordCount = 3;
    public prompt = '';
    public isLoading = false;
    public canAction = false;
    public sliderTips = '请顺序点选';
    public flagCoordinate = [];
    // 用户点击的坐标
    public verifyCoordinate = [];
    // 点击的记数;
    public clickWordCount = 0;
    // 验证成功
    public isSuccess = false;
    // 提示信息是否出现
    public isShowMessage = false;
    // 提示等信息
    public message = '';
    // setTimout
    public timer = null;

    @Watch('schema', { immediate: true })
    public onSchemaChanged(newValue): void {
        this.init(newValue);
    }

    @Emit('reset')
    public onReset(): void {
        this.canAction = true;
        this.isSuccess = false;
        this.isShowMessage = false;
        this.flagCoordinate = [];
        this.verifyCoordinate = [];
        this.clickWordCount = 0;
    }

    public init(value): void {
        this.backgroundImageBase64 = value.wordClickImageBase64;
        this.verifyWordCount = value.wordsCount;
        this.prompt = value.words;
        this.isLoading = this.loading;
        this.canAction = this.canOperate;
        this.isShowMessage = false;
        this.clickWordCount = 0;
    }

    get backgroundImage(): string {
        return 'data:image/png;base64,' + this.backgroundImageBase64;
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

    public submit(): void {
        this.canAction = false;
        this.isLoading = true;

        this.$security
            .checkCaptcha(this.identity, this.captchaType, this.verifyCoordinate)
            .then((result) => {
                if (result.data) {
                    this.message = this.successText;
                    this.isSuccess = true;
                    this.isShowMessage = true;
                    this.canAction = false;
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
                    this.flagCoordinate = [];
                    this.$emit('failed', this.verifyCoordinate);
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
