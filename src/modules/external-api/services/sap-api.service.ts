import { Injectable } from '@nestjs/common';
import { HttpClientService } from './http-client.service';
import { SapApiResponse } from '../interfaces/external-api.interface';

@Injectable()
export class SapApiService {
  constructor(private readonly httpClient: HttpClientService) {}

  async getCustomers(): Promise<SapApiResponse<any[]>> {
    return this.httpClient.get<any[]>('/sap/opu/odata/sap/API_BUSINESS_PARTNER/A_Customer', {
      headers: {
        'Authorization': 'Basic <sap-credentials>',
      },
    });
  }

  async getOrders(customerId: string): Promise<SapApiResponse<any[]>> {
    return this.httpClient.get<any[]>(`/sap/opu/odata/sap/API_SALES_ORDER_SRV/A_SalesOrder?$filter=SoldToParty eq '${customerId}'`, {
      headers: {
        'Authorization': 'Basic <sap-credentials>',
      },
    });
  }

  async createOrder(orderData: any): Promise<SapApiResponse<any>> {
    return this.httpClient.post<any>('/sap/opu/odata/sap/API_SALES_ORDER_SRV/A_SalesOrder', orderData, {
      headers: {
        'Authorization': 'Basic <sap-credentials>',
        'X-CSRF-Token': 'Fetch',
      },
    });
  }
}