<template>
    <div>
        <v-parallax src="../static/images/signin/background.png" :height="height">
            <particles id="tsparticles" :options="options" />
            <v-main>
                <v-container class="fill-height" fluid>
                    <v-row align="center" justify="center">
                        <v-col cols="12" sm="8" md="4">
                            <v-card class="elevation-12" style="z-index: 2">
                                <v-toolbar color="primary" dark flat>
                                    <v-btn icon class="ml-1">
                                        <v-icon large>gavel</v-icon>
                                    </v-btn>
                                    <v-toolbar-title>欢迎使用{{ systemName }}</v-toolbar-title>
                                    <v-spacer></v-spacer>
                                </v-toolbar>

                                <v-card-text tile>
                                    <validation-observer ref="observer">
                                        <v-alert
                                            v-if="hasError"
                                            dense
                                            outlined
                                            border="right"
                                            type="error"
                                            class="mt-2"
                                        >
                                            {{ errorMessage }}
                                        </v-alert>
                                        <v-form>
                                            <validation-provider v-slot="{ errors }" name="用户名" rules="required">
                                                <v-text-field
                                                    id="username"
                                                    v-model="username"
                                                    label="用户名"
                                                    name="username"
                                                    prepend-icon="person"
                                                    type="text"
                                                    :error-messages="errors"
                                                    :disabled="disabled"
                                                    required
                                                    @blur="hasError = false"
                                                ></v-text-field>
                                            </validation-provider>
                                            <validation-provider v-slot="{ errors }" name="密码" rules="required">
                                                <v-text-field
                                                    id="password"
                                                    v-model="password"
                                                    label="密码"
                                                    name="password"
                                                    prepend-icon="lock"
                                                    type="password"
                                                    :error-messages="errors"
                                                    :disabled="disabled"
                                                    required
                                                    @blur="hasError = false"
                                                ></v-text-field>
                                            </validation-provider>
                                        </v-form>
                                    </validation-observer>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        color="primary"
                                        class="mr-2"
                                        :loading="loading"
                                        :disabled="disabled"
                                        @click="submit"
                                        @keyup.enter="submit"
                                        >登录</v-btn
                                    >
                                    <v-btn color="primary" v-if="!loading" :disabled="disabled" @click="reset"
                                        >重置</v-btn
                                    >
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-main>
        </v-parallax>
        <h-graph-captcha :show="verify" :type="captcha" @success="signin()"></h-graph-captcha>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import options from '../static/data/signin/particles.json';
import { HCaptcha, HWordClick, HGraphCaptcha } from '@/components';

@Component({
    components: {
        HCaptcha,
        HWordClick,
        HGraphCaptcha,
    },
})
export default class Signin extends Vue {
    public systemName = process.env.VUE_APP_SYSTEM_NAME;
    public captcha = process.env.VUE_APP_CAPTCHA;
    public loading = false;
    public errorMessage = '';
    public username = '';
    public password = '';
    public options = options;
    public height = window.innerHeight;
    public disabled = true;
    public hasError = false;
    public verify = false;

    get observer(): any {
        return this.$refs.observer;
    }

    public created(): void {
        window.onresize = () => {
            return (() => {
                this.height = window.innerHeight;
            })();
        };
    }

    public mounted(): void {
        this.exchange();
    }

    public signin(): void {
        /**
         * dispatch：含有异步操作，数据提交至 actions ，可用于向后台提交数据
         * commit：同步操作，数据提交至 mutations ，可用于登录成功后读取用户信息写到缓存里
         */
        this.$security
            .signin(this.username, this.password)
            .then(() => {
                this.verify = false;
                this.loading = false;
                this.$router.push({ path: '/' });
            })
            .catch((error) => {
                this.verify = false;
                if (error.message) {
                    this.errorMessage = error.message;
                    this.hasError = true;
                }
                this.loading = false;
            });
    }
    public submit(): void {
        this.observer.validate().then((result: any) => {
            if (result) {
                this.loading = true;
                this.verify = true;
            }
        });
    }
    public reset(): void {
        this.username = '';
        this.password = '';
        this.observer.reset();
    }

    public async exchange() {
        this.$security
            .exchangeAesKey()
            .then(() => {
                this.disabled = false;
            })
            .catch(() => {
                this.disabled = true;
            });
    }

    public enterKey(e): void {
        if (e.keyCode === 13) {
            this.submit();
        }
    }
}
</script>

<style lang="scss">
.particles {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1; //这里建议层级设为-1，但-1可能会导致被其他元素遮挡
}

#tsparticles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
}
</style>
