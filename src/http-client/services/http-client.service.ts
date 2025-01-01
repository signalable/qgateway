import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

import { AxiosError } from 'axios';
import {
  HttpClientInterface,
  HttpRequestConfig,
  HttpResponse,
} from '../interfaces/http-client.interface';

@Injectable()
export class HttpClientService implements HttpClientInterface {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  // HTTP GET 요청
  async get<T>(
    url: string,
    config?: HttpRequestConfig,
  ): Promise<HttpResponse<T>> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<T>(url, this.getRequestConfig(config)),
      );
      return this.transformResponse(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // HTTP POST 요청
  async post<T>(
    url: string,
    data?: any,
    config?: HttpRequestConfig,
  ): Promise<HttpResponse<T>> {
    try {
      const response = await firstValueFrom(
        this.httpService.post<T>(url, data, this.getRequestConfig(config)),
      );
      return this.transformResponse(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // HTTP PUT 요청
  async put<T>(
    url: string,
    data?: any,
    config?: HttpRequestConfig,
  ): Promise<HttpResponse<T>> {
    try {
      const response = await firstValueFrom(
        this.httpService.put<T>(url, data, this.getRequestConfig(config)),
      );
      return this.transformResponse(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // HTTP DELETE 요청
  async delete<T>(
    url: string,
    config?: HttpRequestConfig,
  ): Promise<HttpResponse<T>> {
    try {
      const response = await firstValueFrom(
        this.httpService.delete<T>(url, this.getRequestConfig(config)),
      );
      return this.transformResponse(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // 요청 설정 병합
  private getRequestConfig(config?: HttpRequestConfig): any {
    return {
      timeout: this.configService.get<number>('authService.timeout'),
      ...config,
    };
  }

  // 응답 변환
  private transformResponse(response: any): HttpResponse {
    return {
      data: response.data,
      status: response.status,
      headers: response.headers,
    };
  }

  // 에러 처리
  private handleError(error: unknown): never {
    if (error instanceof AxiosError) {
      const status = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      const message =
        error.response?.data?.message ||
        '외부 서비스 요청 중 오류가 발생했습니다.';

      throw new HttpException(message, status);
    }
    throw error;
  }
}
