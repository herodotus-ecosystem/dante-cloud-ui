<template>
	<h-authorize-layout :title="title" :overlay="overlay">
		<h-container mode="three" gutter="md" gutter-col horizontal>
			<template #left>
				<h-text-field
					v-model="editedItem.applicationName"
					name="applicationName"
					label="应用名称 * "
					placeholder="请输入应用名称"
					:error="v.editedItem.applicationName.$error"
					:error-message="v.editedItem.applicationName.$errors[0] ? v.editedItem.applicationName.$errors[0].$message : ''"
					@blur="v.editedItem.applicationName.$validate()"
				></h-text-field>

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
				<h-switch v-model="editedItem.reserved" label="是否为保留数据"></h-switch>
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
				<h-switch v-model="editedItem.requireProofKey" label="是否需要 Proof Key"></h-switch>
				<h-switch v-model="editedItem.requireAuthorizationConsent" label="是否需要认证确认"></h-switch>
				<h-switch v-model="editedItem.reuseRefreshTokens" label="是否允许重用 Refresh Token"></h-switch>
			</div>

			<template #right>
				<h-dictionary-select
					v-model="editedItem.authorizationGrantTypes"
					dictionary="grantType"
					label="认证模式 * "
					multiple
					placeholder="请选择认证模式，可以多个"
					:error="v.editedItem.authorizationGrantTypes.$error"
					:error-message="v.editedItem.authorizationGrantTypes.$errors[0] ? v.editedItem.authorizationGrantTypes.$errors[0].$message : ''"
					@blur="v.editedItem.authorizationGrantTypes.$validate()"
				></h-dictionary-select>

				<h-dictionary-select
					v-model="editedItem.clientAuthenticationMethods"
					dictionary="authenticationMethod"
					label="客户端验证模式 * "
					multiple
					placeholder="请选择客户端验证模式，可以多个"
					:error="v.editedItem.clientAuthenticationMethods.$error"
					:error-message="v.editedItem.clientAuthenticationMethods.$errors[0] ? v.editedItem.clientAuthenticationMethods.$errors[0].$message : ''"
					@blur="v.editedItem.clientAuthenticationMethods.$validate()"
				></h-dictionary-select>

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
import { defineComponent, computed } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

import type { QTableProps } from 'quasar';
import type { OAuth2Application, OAuth2Scope, OAuth2ScopeConditions } from '/@/lib/declarations';

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

		const { editedItem, isEdit, title, overlay, saveOrUpdate } = useTableItem<OAuth2Application>(api.application);
		const { tableRows, pagination, loading } = useTableItems<OAuth2Scope, OAuth2ScopeConditions>(api.scope, ComponentNameEnum.OAUTH2_SCOPE, true);

		const columns: QTableProps['columns'] = [
			{ name: 'scopeCode', field: 'scopeCode', align: 'center', label: '范围代码' },
			{ name: 'scopeName', field: 'scopeName', align: 'center', label: '范围名称' },
			{ name: 'description', field: 'description', align: 'center', label: '说明' },
		];

		const isShowAuthenticationSigningAlgorithm = computed(() => {
			const item = editedItem as unknown as OAuth2Application;
			return item.clientAuthenticationMethods === '2' || item.clientAuthenticationMethods === '3';
		});

		const { onFinish } = useEditFinish();

		const rules = {
			editedItem: {
				applicationName: {
					required: helpers.withMessage('应用名称不能为空', required),
				},
				authorizationGrantTypes: {
					required: helpers.withMessage('认证模式不能为空', required),
				},
				clientAuthenticationMethods: {
					required: helpers.withMessage('客户端验证模式不能为空', required),
				},
			},
		};

		const v = useVuelidate(rules, { editedItem }, { $lazy: true });

		const onSave = () => {
			v.value.$validate().then((result) => {
				if (result) {
					saveOrUpdate();
				}
			});
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
			v,
			onSave,
		};
	},
});
</script>
