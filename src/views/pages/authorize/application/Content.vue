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
					<h-dictionary-select v-model="editedItem.applicationType" dictionary="applicationType" label="应用类型"></h-dictionary-select>

					<h-text-field v-if="isEdit" v-model="editedItem.clientId" label="Client Id" disable readonly></h-text-field>
					<h-text-field v-if="isEdit" v-model="editedItem.clientSecret" label="Client Secret" disable readonly></h-text-field>
					<h-text-field v-model="editedItem.description" label="备注" placeholder="请输入备注"></h-text-field>
					<h-text-field v-model.number="editedItem.ranking" label="排序值" placeholder="请输入排序值" type="number" />
					<!-- <h-dictionary-select v-model="editedItem.status" dictionary="status" label="数据状态" class="q-mb-md"></h-dictionary-select> -->
					<q-separator></q-separator>
					<q-toggle v-model="editedItem.reserved" label="是否为保留数据"></q-toggle>
					<div>
						<q-btn color="red" @click="onFinish()">取消</q-btn>
						<q-btn color="primary" class="q-ml-sm" @click="onSave()">保存</q-btn>
					</div>
				</template>

				<h-text-field v-model="editedItem.redirectUris" label="回调地址(可多个逗号分隔)" placeholder="请输入回调地址"></h-text-field>
				<h-label text="Token 有效期" size="subtitle-1" weight="bolder" align="left"></h-label>
				<h-duration v-model="editedItem.accessTokenValidity" label="Token有效期"></h-duration>
				<h-label text="RefreshToken 有效期" size="subtitle-1" weight="bolder" align="left"></h-label>
				<h-duration v-model="editedItem.refreshTokenValidity" label="RefreshToken有效期"></h-duration>
				<h-date-time v-model="editedItem.clientSecretExpiresAt" label="客户端密钥过期时间"></h-date-time>
				<h-text-field v-model="editedItem.jwkSetUrl" label="客户端密钥集URL" placeholder="请输入客户端密钥集URL"></h-text-field>
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
import { defineComponent, computed, onMounted, ref } from 'vue';

import type { QTableProps, QForm } from 'quasar';
import type { OAuth2Application, OAuth2Scope, ValidateResult } from '/@/lib/declarations';

import { useEditFinish } from '/@/hooks';
import { ComponentNameEnum } from '/@/lib/enums';

import { useAuthorizeApi } from '/@/apis';
import { useTableItem, useTableItems } from '/@/hooks';

import { HAuthorizeLayout, HContainer, HSwitch, HDuration, HTextField, HDictionarySelect, HDateTime, HLabel } from '/@/components';

export default defineComponent({
	name: 'OAuth2ApplicationContent',

	components: {
		HAuthorizeLayout,
		HContainer,
		HDateTime,
		HDuration,
		HDictionarySelect,
		HLabel,
		HSwitch,
		HTextField,
	},

	setup() {
		const api = useAuthorizeApi();

		const { editedItem, isEdit, title, assign, overlay, saveOrUpdate } = useTableItem<OAuth2Application>(api.application);
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

		const formRef = ref(null);

		const { onFinish } = useEditFinish();

		const onSave = async () => {
			const refs = formRef.value as unknown as InstanceType<typeof QForm>;
			if (refs) {
				const result = (await refs.validate()) as unknown as ValidateResult;
				if (result.valid) {
					saveOrUpdate();
				}
			}
		};

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
			onFinish,
			onSave,
			formRef,
		};
	},
});
</script>
