<template>
  <h-authorize-layout :title="title" :overlay="overlay">
    <h-container mode="three" wider="center" :offset="4">
      <h-text-field
        v-model="editedItem.applicationName"
        name="applicationName"
        label="应用名称 * "
        placeholder="请输入应用名称"
        :error="v.editedItem.applicationName.$error"
        :error-message="
          v.editedItem.applicationName.$errors[0]
            ? v.editedItem.applicationName.$errors[0].$message
            : ''
        "
        @blur="v.editedItem.applicationName.$validate()"
      ></h-text-field>
      <h-text-field
        v-model="editedItem.abbreviation"
        label="应用简称(可选)"
        placeholder="请输入应用简称"
      ></h-text-field>
      <h-text-field
        v-model="editedItem.logo"
        label="应用图标(可选)"
        placeholder="请输入应用图标"
      ></h-text-field>
      <h-text-field
        v-model="editedItem.homepage"
        label="应用主页(可选)"
        placeholder="请输入应用主页"
      ></h-text-field>
      <h-dictionary-select
        v-model="editedItem.applicationType"
        dictionary="ApplicationType"
        label="应用类型"
      ></h-dictionary-select>
      <h-dictionary-select
        v-model="editedItem.authorizationGrantTypes"
        dictionary="GrantType"
        label="认证模式 * "
        multiple
        placeholder="请选择认证模式，可以多个"
        :error="v.editedItem.authorizationGrantTypes.$error"
        :error-message="
          v.editedItem.authorizationGrantTypes.$errors[0]
            ? v.editedItem.authorizationGrantTypes.$errors[0].$message
            : ''
        "
        @blur="v.editedItem.authorizationGrantTypes.$validate()"
      ></h-dictionary-select>
      <h-dictionary-select
        v-model="editedItem.clientAuthenticationMethods"
        dictionary="AuthenticationMethod"
        label="客户端验证模式 * "
        multiple
        placeholder="请选择客户端验证模式，可以多个"
        :error="v.editedItem.clientAuthenticationMethods.$error"
        :error-message="
          v.editedItem.clientAuthenticationMethods.$errors[0]
            ? v.editedItem.clientAuthenticationMethods.$errors[0].$message
            : ''
        "
        @blur="v.editedItem.clientAuthenticationMethods.$validate()"
      ></h-dictionary-select>
      <h-date-time
        v-model="editedItem.clientSecretExpiresAt"
        label="客户端密钥过期时间"
      ></h-date-time>
      <h-text-field
        v-model.lazy="v.editedItem.redirectUris.$model"
        name="redirectUris"
        label="回调地址(可多个逗号分隔)"
        placeholder="请输入回调地址"
        debounce="5000"
        :error="v.editedItem.redirectUris.$error"
        :error-message="
          v.editedItem.redirectUris.$errors[0] ? v.editedItem.redirectUris.$errors[0].$message : ''
        "
        @blur="v.editedItem.redirectUris.$validate()"
      ></h-text-field>
      <h-text-field
        v-model="editedItem.postLogoutRedirectUris"
        label="OIDC Logout 回调地址(可多个逗号分隔)"
        placeholder="请输入OIDC Logout 回调地址"
      ></h-text-field>
      <h-divider label="客户端设置(Client Settings)"></h-divider>
      <div class="column q-mb-sm">
        <h-switch v-model="editedItem.requireProofKey" label="是否需要 Proof Key"></h-switch>
        <h-switch
          v-model="editedItem.requireAuthorizationConsent"
          label="是否需要认证确认"
        ></h-switch>
      </div>
      <h-text-field
        v-model="editedItem.jwkSetUrl"
        label="客户端密钥集URL"
        placeholder="请输入客户端密钥集URL"
      ></h-text-field>
      <q-select
        v-if="isShowAuthenticationSigningAlgorithm"
        v-model="editedItem.authenticationSigningAlgorithm"
        :options="authenticationSigningAlgorithmItem"
        label="令牌端点认证签名算法"
        outlined
        use-chips
        clearable
        emit-value
        map-options
        transition-show="scale"
        transition-hide="scale"
        bottom-slots
      ></q-select>
      <h-divider label="令牌设置(Token Settings)" class="q-mb-md"></h-divider>
      <h-label text="令牌有效期" size="subtitle-1" weight="bolder" align="left"></h-label>
      <h-duration v-model="editedItem.accessTokenTimeToLive" label="令牌有效期"></h-duration>
      <h-label text="刷新令牌有效期" size="subtitle-1" weight="bolder" align="left"></h-label>
      <h-duration v-model="editedItem.refreshTokenTimeToLive" label="刷新令牌有效期"></h-duration>
      <h-label text="授权码有效期" size="subtitle-1" weight="bolder" align="left"></h-label>
      <h-duration
        v-model="editedItem.authorizationCodeTimeToLive"
        label="授权码有效期"
      ></h-duration>
      <h-label text="设备激活码有效期" size="subtitle-1" weight="bolder" align="left"></h-label>
      <h-duration v-model="editedItem.deviceCodeTimeToLive" label="设备激活码有效期"></h-duration>
      <div class="column q-mb-sm">
        <h-switch v-model="editedItem.reuseRefreshTokens" label="是否允许重用刷新令牌"></h-switch>
      </div>
      <!-- <h-dictionary-select
        v-model="editedItem.accessTokenFormat"
        dictionary="tokenFormat"
        label="令牌格式(需同步修改后端配置)"></h-dictionary-select> -->
      <h-dictionary-select
        v-model="editedItem.idTokenSignatureAlgorithmJwsAlgorithm"
        dictionary="SignatureJwsAlgorithm"
        label="OIDC idToken 端点认证签名算法"
      ></h-dictionary-select>
      <h-divider label="数据条目设置"></h-divider>
      <h-text-field
        v-model="editedItem.description"
        label="备注"
        placeholder="请输入备注"
        class="q-mt-md"
      ></h-text-field>
      <h-text-field
        v-model.number="editedItem.ranking"
        label="排序值"
        placeholder="请输入排序值"
        type="number"
      />
      <h-dictionary-select
        v-model="editedItem.status"
        dictionary="DataItemStatus"
        label="数据状态"
      ></h-dictionary-select>
      <div class="column q-mb-sm">
        <h-switch v-model="editedItem.reserved" label="是否为保留数据"></h-switch>
      </div>
      <div>
        <q-btn color="red" @click="onFinish()">取消</q-btn>
        <q-btn color="primary" class="q-ml-sm" @click="onSave()">保存</q-btn>
      </div>
    </h-container>

    <template #right>
      <h-text-field
        v-if="isEdit"
        v-model="editedItem.clientId"
        label="Client Id"
        disable
        readonly
      ></h-text-field>
      <h-text-field
        v-if="isEdit"
        v-model="editedItem.clientSecret"
        label="Client Secret"
        disable
        readonly
      ></h-text-field>
      <q-table
        :rows="tableRows"
        :columns="columns"
        row-key="scopeId"
        selection="multiple"
        v-model:selected="editedItem.scopes"
        v-model:pagination="pagination"
        :loading="loading"
        title="应用范围"
      ></q-table>
    </template>
  </h-authorize-layout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

import type {
  OAuth2ApplicationEntity,
  OAuth2ScopeEntity,
  OAuth2ScopeConditions,
  QTableColumnProps,
} from '@/lib/declarations';

import { HDictionarySelect, useDictionary } from '@/composables/constants';
import { CONSTANTS, API } from '@/configurations';
import { HAuthorizeLayout } from '@/components';
import { includes } from 'lodash-es';
import { useTableItem, useTable, useEditFinish } from '@/composables/hooks';

defineOptions({
  name: 'OAuth2ApplicationContent',
  components: { HAuthorizeLayout, HDictionarySelect },
});

const { editedItem, isEdit, title, overlay, saveOrUpdate } = useTableItem<OAuth2ApplicationEntity>(
  API.core.oauth2Application(),
);
const { tableRows, pagination, loading } = useTable<OAuth2ScopeEntity, OAuth2ScopeConditions>(
  API.core.oauth2Scope(),
  CONSTANTS.ComponentName.OAUTH2_SCOPE,
  true,
);

const { options } = useDictionary('AllJwsAlgorithm');

const columns: QTableColumnProps = [
  { name: 'scopeCode', field: 'scopeCode', align: 'center', label: '范围代码' },
  { name: 'scopeName', field: 'scopeName', align: 'center', label: '范围名称' },
  { name: 'description', field: 'description', align: 'center', label: '说明' },
];

const { onFinish } = useEditFinish();

const isRedirectUrisRequired = () => {
  let authorizationGrantTypes = editedItem.value.authorizationGrantTypes;
  let redirectUris = editedItem.value.redirectUris;

  if (
    authorizationGrantTypes &&
    authorizationGrantTypes.includes('authorization_code') &&
    !redirectUris
  ) {
    return false;
  } else {
    return true;
  }
};

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
    redirectUris: {
      isRedirectUrisRequired: helpers.withMessage(
        '授权码模式下 Redirect URI 不能为空',
        isRedirectUrisRequired,
      ),
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

const includePrivateKeyJwt = () => {
  return includes(editedItem.value.clientAuthenticationMethods, 'private_key_jwt');
};

const includeClientSecretJwt = () => {
  return includes(editedItem.value.clientAuthenticationMethods, 'client_secret_jwt');
};

const onlyHasPrivateKeyJwt = () => {
  return includePrivateKeyJwt() && !includeClientSecretJwt();
};

const onlyHasClientSecretJwt = () => {
  return !includePrivateKeyJwt() && includeClientSecretJwt();
};

/**
 * 参见后端 SAS ： JwtClientAssertionAuthenticationProvider
 * 1. 只有当客户端配置了 urn:ietf:params:oauth:client-assertion-type:jwt-bearer 认证模式时，配置 private_key_jwt 或 client_secret_jwt 才有意义。
 * 2. private_key_jwt 是针对 签名算法 client_secret_jwt 是针对 mac 算法。
 */
const isShowAuthenticationSigningAlgorithm = computed(() => {
  return includePrivateKeyJwt() || includeClientSecretJwt();
});

const authenticationSigningAlgorithmItem = computed(() => {
  if (onlyHasPrivateKeyJwt()) {
    return options.value.filter((item) => item.ordinal < 9);
  }

  if (onlyHasClientSecretJwt()) {
    return options.value.filter((item) => item.ordinal < 9);
  }

  return options.value;
});
</script>
