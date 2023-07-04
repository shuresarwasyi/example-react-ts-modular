/**
 * API Request Utility
 * Description: This utility module provides functions for sending HTTP requests to different API providers.
 * Created by: shuresarwasyi
 */

import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

import {
  ApiProviderConfig,
  AuthApiKeyConfig,
  AuthBasicConfig,
  AuthBearerConfig,
  AuthOauthConfig,
  getApiConfig,
} from "../config/api";

// Create a new instance of Axios
const api: AxiosInstance = axios.create();

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    // Check if the response status code indicates token expiration
    if (error.response?.status === 401) {
      const originalRequest = error.config;

      // Perform token refresh logic
      try {
        const newToken = await refreshAccessToken(); // Perform the token refresh

        // Update the Authorization header with the new token
        if (newToken && originalRequest) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api.request(originalRequest); // Retry the original request with the new token
        }
      } catch (refreshError) {
        // Handle token refresh error
        console.error("Token refresh failed:", refreshError);
        // You can redirect to a login page, show an error message, or perform any other necessary action.
      }
    }

    return Promise.reject(error);
  }
);

// Global constant to store the provider config
let providerName: string;
let providerConfig: ApiProviderConfig;

/**
 * Send a request to refresh the access token.
 * @returns A Promise that resolves to the new access token.
 */
async function refreshAccessToken(): Promise<string> {
  if (providerConfig && providerConfig.authMethod === "oauth") {
    const oauthConfig = providerConfig.authConfig as AuthOauthConfig;
    const refreshToken = getRefreshToken(providerName);

    if (refreshToken) {
      // Make a request to the OAuth token endpoint using clientID, clientSecret, and authUrl
      const tokenResponse = await axios.post(oauthConfig.authUrl, {
        client_id: oauthConfig.clientID,
        client_secret: oauthConfig.clientSecret,
        grant_type: "refresh_token",
        refresh_token: refreshToken, // Use the refresh token directly
      });

      // Extract the new access token from the token response
      const newAccessToken = tokenResponse.data.access_token;
      const newRefreshToken = tokenResponse.data.refresh_token;

      setAccessToken(providerName, newAccessToken);
      setRefreshToken(providerName, newRefreshToken);

      return newAccessToken;
    } else {
      throw new Error("Refresh token not available.");
    }
  }

  throw new Error(
    "Token refresh not supported for the current authentication method."
  );
}

/**
 * Fetches the refresh token from local storage.
 * @param provider - The name of the API provider.
 * @returns The refresh token.
 */
function getRefreshToken(provider: string): string {
  const refreshTokenKey = `${provider}_rsess`;
  const refreshToken = localStorage.getItem(refreshTokenKey);
  return refreshToken ? refreshToken : "";
}

/**
 * Fetches the access token from local storage.
 * @param provider - The name of the API provider.
 * @returns The refresh token.
 */
function getAccessToken(provider: string): string {
  const refreshTokenKey = `${provider}_asess`;
  const refreshToken = localStorage.getItem(refreshTokenKey);
  return refreshToken ? refreshToken : "";
}

/**
 * Sets the access token in local storage.
 * @param provider - The name of the API provider.
 * @param accessToken - The access token.
 */
function setAccessToken(provider: string, accessToken: string): void {
  const accessTokenKey = `${provider}_asess`;
  localStorage.setItem(accessTokenKey, accessToken);
}

/**
 * Sets the refresh token in local storage.
 * @param provider - The name of the API provider.
 * @param refreshToken - The refresh token.
 */
function setRefreshToken(provider: string, refreshToken: string): void {
  const refreshTokenKey = `${provider}_rsess`;
  localStorage.setItem(refreshTokenKey, refreshToken);
}

/**
 * Send a request using Axios with the specified parameters and additional options.
 * @param provider - The name of the API provider.
 * @param method - The HTTP method for the request (e.g., GET, POST).
 * @param path - The path or endpoint for the request.
 * @param params - Optional query parameters for the request.
 * @param data - Optional form data for the request.
 * @param headers - Optional headers for the request.
 * @returns A Promise that resolves to the AxiosResponse.
 */
export function sendRequest(
  provider: string,
  method: string,
  path: string,
  params?: Record<string, any>,
  data?: Record<string, any>,
  headers?: Record<string, any>
): Promise<AxiosResponse> {
  // Fetch the provider config
  providerConfig = getApiConfig(provider);
  providerName = provider;

  const requestOptions: AxiosRequestConfig = {
    method,
    url: path,
    params: params,
    data: data,
    headers: headers,
    baseURL: providerConfig.baseURL,
  };

  // Handle authentication based on the authMethod
  switch (providerConfig.authMethod) {
    case "basic":
      const basicConfig = providerConfig.authConfig as AuthBasicConfig;

      requestOptions.headers = {
        ...requestOptions.headers,
        Authorization: `Basic ${btoa(
          `${basicConfig.username}:${basicConfig.password}`
        )}`,
      };

      break;
    case "apiKey":
      const apiKeyConfig = providerConfig.authConfig as AuthApiKeyConfig;

      if (apiKeyConfig.addTo === "header") {
        requestOptions.headers = {
          ...requestOptions.headers,
          [apiKeyConfig.key]: apiKeyConfig.value,
        };
      } else if (apiKeyConfig.addTo === "query") {
        requestOptions.params = {
          ...requestOptions.params,
          [apiKeyConfig.key]: apiKeyConfig.value,
        };
      }

      break;
    case "bearer":
      const bearerConfig = providerConfig.authConfig as AuthBearerConfig;

      requestOptions.headers = {
        ...requestOptions.headers,
        Authorization: `Bearer ${bearerConfig.token}`,
      };

      break;
    case "oauth":
      const oauthConfig = providerConfig.authConfig as AuthOauthConfig;

      let accessToken = getAccessToken(providerName);
      if (accessToken) {
        // Include the refresh token in the request
        requestOptions.headers = {
          ...requestOptions.headers,
          Authorization: `${oauthConfig.headerPrefix} ${accessToken}`,
        };
      }

      break;
    case "none":
    default:
      // No authentication needed
      break;
  }

  return api.request(requestOptions);
}
