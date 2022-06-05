<template>
	<div>
		<div class="corner-top">
			<corner-top :start-color="lightColor" :end-color="darkColor"></corner-top>
		</div>
		<div class="corner-bottom">
			<corner-bottom :start-color="darkColor" :end-color="lightColor"></corner-bottom>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs } from 'vue';

import { getColorPalette } from '/@/lib/utils';
import CornerBottom from './CornerBottom.vue';
import CornerTop from './CornerTop.vue';

export default defineComponent({
	name: 'Background',

	components: {
		CornerTop,
		CornerBottom,
	},

	props: {
		themeColor: String,
	},

	setup(props) {
		const { themeColor } = toRefs(props);
		const lightColor = computed(() => {
			return getColorPalette(themeColor.value as string, 3);
		});

		const darkColor = computed(() => {
			return getColorPalette(props.themeColor as string, 6);
		});

		return {
			lightColor,
			darkColor,
		};
	},
});
</script>

<style scoped>
.corner-top {
	position: absolute;
	right: -300px;
	top: -900px;
}
.corner-bottom {
	position: absolute;
	left: -200px;
	bottom: -400px;
}
</style>
