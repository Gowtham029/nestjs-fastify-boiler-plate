export interface ApiResponse<T = any> {
  data: T;
  status: number;
  message?: string;
}

export interface ApiRequestConfig {
  timeout?: number;
  headers?: Record<string, string>;
  retries?: number;
}

export interface SapApiResponse<T = any> extends ApiResponse<T> {
  sapMetadata?: any;
}

export interface SalesforceApiResponse<T = any> extends ApiResponse<T> {
  totalSize?: number;
  done?: boolean;
}