<template>

    <v-parallax src="../static/login/background.png" :height="height">
        <v-content>
            <v-container class="fill-height" fluid>
                <v-row align="center" justify="center">
                    <v-col cols="12" sm="8" md="4">
                        <v-card class="elevation-12">
                            <v-toolbar color="primary" dark flat>
                                <v-btn icon class="ml-1">
                                    <v-icon large>gavel</v-icon>
                                </v-btn>
                                <v-toolbar-title>欢迎使用智慧电科院业务中台</v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                            <v-alert v-if="errorMessage" dense outlined type="error" class="ml-2 mr-2 mt-2">
                                {{ this.errorMessage }}
                            </v-alert>

                            <v-card-text tile>
                                <ValidationObserver ref="observer">
                                    <v-form>
                                        <ValidationProvider v-slot="{ errors }" name="用户名" rules="required">
                                            <v-text-field id="username" v-model="loginModel.username" label="用户名" name="username" prepend-icon="person" type="text" :error-messages="errors" required></v-text-field>
                                        </ValidationProvider>
                                        <ValidationProvider v-slot="{ errors }" name="密码" rules="required">
                                            <v-text-field id="password" v-model="loginModel.password" label="密码" name="password" prepend-icon="lock" type="password" :error-messages="errors" required></v-text-field>
                                        </ValidationProvider>
                                    </v-form>
                                </ValidationObserver>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" class="mr-2" :loading="loading" @click="submit">登录</v-btn>
                                <v-btn color="primary" v-if="!loading" @click="clear">重置</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-parallax>
</template>

<script>
export default {
    data: () => ({
        height: 0,
        loading: false,
        errorMessage: '',
        loginModel: {
            username: '',
            password: ''
        }
    }),

    created () {
        this.dynamicHeight();
    },

    mounted () {
        this.loading = false;
    },

    methods: {
        dynamicHeight () {
            this.height = window.innerHeight;
        },
        login () {
            /**
             * dispatch：含有异步操作，数据提交至 actions ，可用于向后台提交数据
             * commit：同步操作，数据提交至 mutations ，可用于登录成功后读取用户信息写到缓存里
             */
            this.$api.auth
                .login(this.loginModel.username, this.loginModel.password).then(response => {
                    let token = response.access_token;
                    let expires_in = response.expires_in;
                    if (token && expires_in != 0) {
                        this.$authrization.setAuthorizationToken(token, expires_in).then(() => {
                            this.loading = false;
                            this.$router.push({ path: '/' });
                        });

                    }
                }).catch(error => {
                    this.loading = false;
                    this.errorMessage = error.data;
                });

        },
        submit () {
            this.$refs.observer.validate().then((result) => {
                if (result) {
                    this.loading = true;
                    this.login();
                }
            });
        },
        clear () {
            this.loginModel.username = '';
            this.loginModel.password = '';
            this.$refs.observer.reset();
        }
    }
};
</script>
