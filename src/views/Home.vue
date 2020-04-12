<template>
    <v-parallax src="../static/login/background.jpg">
        <div class="home">
            <img alt="Vue logo" src="/login/background.jpg" />
            <HelloWorld msg="Welcome to Your Vue.js App" />
        </div>
    </v-parallax>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
    name: "Home",
    components: {
        HelloWorld
    }
};
</script>
