import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HttpClientService } from './services/http-client.service';
import { SapApiService } from './services/sap-api.service';
import { SalesforceApiService } from './services/salesforce-api.service';

@Module({
  imports: [HttpModule],
  providers: [HttpClientService, SapApiService, SalesforceApiService],
  exports: [HttpClientService, SapApiService, SalesforceApiService],
})
export class ExternalApiModule {}