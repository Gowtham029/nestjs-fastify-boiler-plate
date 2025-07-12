import { Test, TestingModule } from '@nestjs/testing';
import { SalesforceApiService } from './salesforce-api.service';
import { HttpClientService } from './http-client.service';

describe('SalesforceApiService', () => {
  let service: SalesforceApiService;
  let httpClientService: HttpClientService;

  const mockHttpClientService = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SalesforceApiService,
        {
          provide: HttpClientService,
          useValue: mockHttpClientService,
        },
      ],
    }).compile();

    service = module.get<SalesforceApiService>(SalesforceApiService);
    httpClientService = module.get<HttpClientService>(HttpClientService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAccounts', () => {
    it('should fetch accounts from Salesforce', async () => {
      const mockAccounts = [
        { Id: '001XX000003DHP0', Name: 'Account 1' },
        { Id: '001XX000003DHP1', Name: 'Account 2' },
      ];

      mockHttpClientService.get.mockResolvedValue({
        data: mockAccounts,
        status: 200,
        message: 'Success',
      });

      const result = await service.getAccounts();

      expect(httpClientService.get).toHaveBeenCalledWith(
        '/services/data/v58.0/sobjects/Account/',
        {
          headers: {
            'Authorization': 'Bearer <salesforce-token>',
          },
        },
      );

      expect(result.data).toEqual(mockAccounts);
    });
  });

  describe('getContacts', () => {
    it('should fetch contacts for an account from Salesforce', async () => {
      const accountId = '001XX000003DHP0';
      const mockContacts = [
        { Id: '003XX000004TmiQ', Name: 'John Doe', Email: 'john@example.com' },
        { Id: '003XX000004TmiR', Name: 'Jane Smith', Email: 'jane@example.com' },
      ];

      mockHttpClientService.get.mockResolvedValue({
        data: mockContacts,
        status: 200,
        message: 'Success',
      });

      const result = await service.getContacts(accountId);

      expect(httpClientService.get).toHaveBeenCalledWith(
        `/services/data/v58.0/query/?q=SELECT Id,Name,Email FROM Contact WHERE AccountId='${accountId}'`,
        {
          headers: {
            'Authorization': 'Bearer <salesforce-token>',
          },
        },
      );

      expect(result.data).toEqual(mockContacts);
    });
  });

  describe('createLead', () => {
    it('should create a lead in Salesforce', async () => {
      const leadData = {
        FirstName: 'John',
        LastName: 'Doe',
        Company: 'Test Company',
        Email: 'john.doe@test.com',
      };

      const mockCreatedLead = {
        Id: '00QXX0000000001',
        ...leadData,
      };

      mockHttpClientService.post.mockResolvedValue({
        data: mockCreatedLead,
        status: 201,
        message: 'Success',
      });

      const result = await service.createLead(leadData);

      expect(httpClientService.post).toHaveBeenCalledWith(
        '/services/data/v58.0/sobjects/Lead/',
        leadData,
        {
          headers: {
            'Authorization': 'Bearer <salesforce-token>',
          },
        },
      );

      expect(result.data).toEqual(mockCreatedLead);
    });
  });

  describe('updateAccount', () => {
    it('should update an account in Salesforce', async () => {
      const accountId = '001XX000003DHP0';
      const accountData = {
        Name: 'Updated Account Name',
        Phone: '+1234567890',
      };

      const mockUpdatedAccount = {
        Id: accountId,
        ...accountData,
      };

      mockHttpClientService.put.mockResolvedValue({
        data: mockUpdatedAccount,
        status: 200,
        message: 'Success',
      });

      const result = await service.updateAccount(accountId, accountData);

      expect(httpClientService.put).toHaveBeenCalledWith(
        `/services/data/v58.0/sobjects/Account/${accountId}`,
        accountData,
        {
          headers: {
            'Authorization': 'Bearer <salesforce-token>',
          },
        },
      );

      expect(result.data).toEqual(mockUpdatedAccount);
    });
  });
});