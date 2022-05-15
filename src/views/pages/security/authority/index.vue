<template>
	<v-table>
		<thead>
			<tr>
				<th class="text-left">Name</th>
				<th class="text-left">Calories</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="item in desserts" :key="item.name">
				<td>{{ item.name }}</td>
				<td>{{ item.calories }}</td>
			</tr>
		</tbody>
	</v-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useSecurityApi } from '/@/apis';

export default defineComponent({
	name: 'SysAuthority',

	setup() {
		const api = useSecurityApi();
	},
});
</script>
