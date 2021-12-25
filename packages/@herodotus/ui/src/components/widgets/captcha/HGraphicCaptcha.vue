<template>
    <v-container class="pa-0">
        <v-row no-gutters>
            <v-col cols="12" sm="6" md="8">
                <v-text-field id="password" label="密码" name="password" prepend-icon="lock" required></v-text-field>
            </v-col>
            <v-col cols="6" md="4">
                <img :src="captchaImageBase64" style="width: 100%; height: 50px" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Component, Emit, Watch, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HWordClick extends Vue {
    public captchaImageBase64 = '';
    public identity = '';

    public created(): void {
        this.init();
    }

    public init() {
        this.$session.get().then((sessionId) => {
            if (sessionId) {
                this.identity = sessionId;
                this.$security
                    .getCaptcha(sessionId, 'HUTOOL_SHEAR')
                    .then((result) => {
                        this.captchaImageBase64 = result.data.graphicImageBase64;
                    })
                    .catch(() => {});
            }
        });
    }
}
</script>
