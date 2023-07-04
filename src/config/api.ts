/**
 * API Request Configuration
 * Description: This file defines the configuration for different API providers.
 * Created by: shuresarwasyi
 */

interface ApiConfig {
  [provider: string]: ApiProviderConfig;
}

export interface ApiProviderConfig {
  baseURL: string;
  authMethod: "none" | "basic" | "apiKey" | "bearer" | "oauth";
  authConfig?:
    | AuthApiKeyConfig
    | AuthBasicConfig
    | AuthBearerConfig
    | AuthOauthConfig;
}

export interface AuthBasicConfig {
  username: string;
  password: string;
  addTo: "header" | "query";
}

export interface AuthApiKeyConfig {
  key: string;
  value: string;
  addTo: "header" | "query";
}

export interface AuthBearerConfig {
  token?: string;
}

export interface AuthOauthConfig {
  headerPrefix: string;
  clientID: string;
  clientSecret: string;
  authUrl: string;
}

// Retrieve the API configuration
const apiConfig: ApiConfig = {
  provider1: {
    baseURL: import.meta.env.VITE_API_PROVIDER1_BASEURL!,
    authMethod: import.meta.env.VITE_API_PROVIDER1_AUTHMETHOD!,
    authConfig: {
      key: import.meta.env.VITE_API_PROVIDER1_AUTHCONFIG_KEY!,
      value: import.meta.env.VITE_API_PROVIDER1_AUTHCONFIG_VALUE!,
      addTo: import.meta.env.VITE_API_PROVIDER1_AUTHCONFIG_ADDTO!,
    },
  },
  provider2: {
    baseURL: import.meta.env.VITE_API_PROVIDER2_BASEURL!,
    authMethod: import.meta.env.VITE_API_PROVIDER2_AUTHMETHOD!,
  },
  provider3: {
    baseURL: import.meta.env.VITE_API_PROVIDER3_BASEURL!,
    authMethod: import.meta.env.VITE_API_PROVIDER3_AUTHMETHOD!,
    authConfig: {
      token: import.meta.env.VITE_API_PROVIDER3_AUTHCONFIG_TOKEN!,
    },
  },
  provider4: {
    baseURL: import.meta.env.VITE_API_PROVIDER4_BASEURL!,
    authMethod: import.meta.env.VITE_API_PROVIDER4_AUTHMETHOD!,
    authConfig: {
      username: import.meta.env.VITE_API_PROVIDER4_AUTHCONFIG_USERNAME!,
      password: import.meta.env.VITE_API_PROVIDER4_AUTHCONFIG_PASSWORD!,
      addTo: import.meta.env.VITE_API_PROVIDER4_AUTHCONFIG_ADDTO!,
    },
  },
  provider5: {
    baseURL: import.meta.env.VITE_API_PROVIDER5_BASEURL!,
    authMethod: import.meta.env.VITE_API_PROVIDER5_AUTHMETHOD!,
    authConfig: {
      headerPrefix: import.meta.env.VITE_API_PROVIDER5_AUTHCONFIG_HEADERPREFIX!,
      clientID: import.meta.env.VITE_API_PROVIDER5_AUTHCONFIG_CLIENTID!,
      clientSecret: import.meta.env.VITE_API_PROVIDER5_AUTHCONFIG_CLIENTSECRET!,
      authUrl: import.meta.env.VITE_API_PROVIDER5_AUTHCONFIG_AUTHURL!,
    },
  },
};

/**
 * Retrieve the API configuration for a given provider.
 * @param provider The name of the API provider.
 * @returns The configuration object for the specified provider.
 * @throws Error if the specified provider is not found in the configuration.
 */
export function getApiConfig(provider: string): ApiProviderConfig {
  if (!apiConfig.hasOwnProperty(provider)) {
    throw new Error(`Invalid API provider: ${provider}`);
  }

  return apiConfig[provider];
}
