import { Injectable } from '@nestjs/common';
import { HttpClientService } from './http-client.service';
import { SalesforceApiResponse } from '../interfaces/external-api.interface';

@Injectable()
export class SalesforceApiService {
  constructor(private readonly httpClient: HttpClientService) {}

  async getAccounts(): Promise<SalesforceApiResponse<any[]>> {
    return this.httpClient.get<any[]>('/services/data/v58.0/sobjects/Account/', {
      headers: {
        'Authorization': 'Bearer <salesforce-token>',
      },
    });
  }

  async getContacts(accountId: string): Promise<SalesforceApiResponse<any[]>> {
    return this.httpClient.get<any[]>(`/services/data/v58.0/query/?q=SELECT Id,Name,Email FROM Contact WHERE AccountId='${accountId}'`, {
      headers: {
        'Authorization': 'Bearer <salesforce-token>',
      },
    });
  }

  async createLead(leadData: any): Promise<SalesforceApiResponse<any>> {
    return this.httpClient.post<any>('/services/data/v58.0/sobjects/Lead/', leadData, {
      headers: {
        'Authorization': 'Bearer <salesforce-token>',
      },
    });
  }

  async updateAccount(accountId: string, accountData: any): Promise<SalesforceApiResponse<any>> {
    return this.httpClient.put<any>(`/services/data/v58.0/sobjects/Account/${accountId}`, accountData, {
      headers: {
        'Authorization': 'Bearer <salesforce-token>',
      },
    });
  }
}