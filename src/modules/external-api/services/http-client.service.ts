import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { ApiResponse, ApiRequestConfig } from '../interfaces/external-api.interface';

@Injectable()
export class HttpClientService {
  private readonly logger = new Logger(HttpClientService.name);

  constructor(private readonly httpService: HttpService) {}

  async get<T>(url: string, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
    return this.makeRequest<T>('GET', url, undefined, config);
  }

  async post<T>(url: string, data?: any, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
    return this.makeRequest<T>('POST', url, data, config);
  }

  async put<T>(url: string, data?: any, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
    return this.makeRequest<T>('PUT', url, data, config);
  }

  async delete<T>(url: string, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
    return this.makeRequest<T>('DELETE', url, undefined, config);
  }

  private async makeRequest<T>(
    method: string,
    url: string,
    data?: any,
    config?: ApiRequestConfig,
  ): Promise<ApiResponse<T>> {
    const requestConfig: AxiosRequestConfig = {
      method,
      url,
      data,
      timeout: config?.timeout || 30000,
      headers: {
        'Content-Type': 'application/json',
        ...config?.headers,
      },
    };

    try {
      const response: AxiosResponse<T> = await firstValueFrom(
        this.httpService.request(requestConfig)
      );
      this.logger.debug(`${method} ${url} - ${response.status}`);
      return {
        data: response.data,
        status: response.status,
        message: 'Success',
      };
    } catch (error) {
      this.logger.error(`HTTP ${method} request failed for ${url}`, error);
      throw error;
    }
  }


}