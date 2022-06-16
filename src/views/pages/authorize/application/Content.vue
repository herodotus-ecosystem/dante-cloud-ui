<template>
	<h-authorize-layout :title="title" :overlay="overlay">
		<validation-observer ref="formRef" :initial-values="editedItem">
			<h-container mode="three" gutter="md" gutter-col horizontal>
				<template #left>
					<validation-provider
						v-model="editedItem.applicationName"
						name="applicationName"
						validate-on-input
						label="应用名称"
						rules="required"
						v-slot="{ errorMessage, field }"
					>
						<h-text-field
							v-model="editedItem.applicationName"
							v-bind="field"
							name="applicationName"
							label="应用名称 * "
							placeholder="请输入应用名称"
							:error-message="errorMessage"
						></h-text-field>
					</validation-provider>
					<h-text-field v-model="editedItem.abbreviation" label="应用简称(可选)" placeholder="请输入应用简称"></h-text-field>
					<h-text-field v-model="editedItem.logo" label="应用图标(可选)" placeholder="请输入应用图标"></h-text-field>
					<h-text-field v-model="editedItem.homepage" label="应用主页(可选)" placeholder="请输入应用主页"></h-text-field>
					<h-text-field v-model="editedItem.redirectUris" label="回调地址(可多个逗号分隔)" placeholder="请输入回调地址"></h-text-field>
					<h-dictionary-select v-model="editedItem.applicationType" dictionary="applicationType" label="应用类型"></h-dictionary-select>
				</template>

				<h-text-field v-if="isEdit" v-model="editedItem.clientId" label="Client Id" disable readonly></h-text-field>
				<h-text-field v-if="isEdit" v-model="editedItem.clientSecret" label="Client Secret" disable readonly></h-text-field>
				<h-duration v-model="editedItem.accessTokenValidity"></h-duration>
				<div class="column q-gutter-y-sm">
					<h-switch v-model="editedItem.requireProofKey" label="是否需要 Proof Key" color="primary"></h-switch>
					<h-switch v-model="editedItem.requireAuthorizationConsent" label="是否需要认证确认" color="primary"></h-switch>
					<h-switch v-model="editedItem.reuseRefreshTokens" label="是否允许重用 Refresh Token" color="primary"></h-switch>
				</div>

				<template #right>
					<validation-provider
						v-model="editedItem.authorizationGrantTypes"
						name="authorizationGrantTypes"
						label="认证模式"
						rules="required"
						v-slot="{ errorMessage, field }"
					>
						<h-dictionary-select
							v-model="editedItem.authorizationGrantTypes"
							v-bind="field"
							dictionary="grantType"
							label="认证模式 * "
							multiple
							placeholder="请选择认证模式，可以多个"
							:error-message="errorMessage"
						></h-dictionary-select>
					</validation-provider>
					<validation-provider
						v-model="editedItem.clientAuthenticationMethods"
						name="clientAuthenticationMethods"
						label="客户端验证模式"
						rules="required"
						v-slot="{ errorMessage, field }"
					>
						<h-dictionary-select
							v-model="editedItem.clientAuthenticationMethods"
							v-bind="field"
							dictionary="authenticationMethod"
							label="客户端验证模式 * "
							multiple
							placeholder="请选择客户端验证模式，可以多个"
							:error-message="errorMessage"
						></h-dictionary-select>
					</validation-provider>
					<h-dictionary-select v-model="editedItem.accessTokenFormat" dictionary="tokenFormat" label="令牌格式"></h-dictionary-select>
					<h-dictionary-select
						v-if="isShowAuthenticationSigningAlgorithm"
						v-model="editedItem.authenticationSigningAlgorithm"
						dictionary="signature"
						label="令牌端点认证签名算法"
					></h-dictionary-select>
					<h-dictionary-select v-model="editedItem.signature" dictionary="signature" label="JWS 算法"></h-dictionary-select>
					<h-dictionary-select
						v-model="editedItem.idTokenSignatureAlgorithm"
						dictionary="signature"
						label="OIDC idToken 端点认证签名算法"
					></h-dictionary-select>
				</template>
			</h-container>
		</validation-observer>
		<template #right>
			<q-table
				:rows="tableRows"
				:columns="columns"
				row-key="scopeId"
				selection="multiple"
				v-model:selected="editedItem.scopes"
				v-model:pagination="pagination"
				:loading="loading"
				class="q-ml-md"
				title="应用范围"
			>
			</q-table>
		</template>
	</h-authorize-layout>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, Ref } from 'vue';

import type { QTableProps } from 'quasar';
import type { OAuth2Application, OAuth2Scope } from '/@/lib/declarations';
import { ComponentNameEnum } from '/@/lib/enums';

import { useAuthorizeApi } from '/@/apis';
import { useTableItem, useTableItems } from '/@/hooks';

import { HAuthorizeLayout, HContainer, HSwitch, HDuration, HTextField, HDictionarySelect } from '/@/components';

export default defineComponent({
	name: 'OAuth2ApplicationContent',

	components: {
		HAuthorizeLayout,
		HContainer,
		HDuration,
		HDictionarySelect,
		HSwitch,
		HTextField,
	},

	setup() {
		const api = useAuthorizeApi();

		const { editedItem, isEdit, title, assign, overlay } = useTableItem<OAuth2Application>(api.application);
		const { tableRows, totalPages, pagination, loading, findAll } = useTableItems<OAuth2Scope>(api.scope, ComponentNameEnum.OAUTH2_SCOPE, true);

		const columns: QTableProps['columns'] = [
			{ name: 'scopeCode', field: 'scopeCode', align: 'center', label: '范围代码' },
			{ name: 'scopeName', field: 'scopeName', align: 'center', label: '范围名称' },
			{ name: 'description', field: 'description', align: 'center', label: '说明' },
		];

		onMounted(() => {
			findAll();
		});

		const isShowAuthenticationSigningAlgorithm = computed(() => {
			const item = editedItem as unknown as OAuth2Application;
			return item.clientAuthenticationMethods === '2' || item.clientAuthenticationMethods === '3';
		});

		return {
			editedItem,
			title,
			overlay,
			tableRows,
			columns,
			pagination,
			loading,
			isShowAuthenticationSigningAlgorithm,
			isEdit,
		};
	},
});
</script>
