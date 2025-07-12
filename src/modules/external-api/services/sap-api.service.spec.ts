import { Test, TestingModule } from '@nestjs/testing';
import { SapApiService } from './sap-api.service';
import { HttpClientService } from './http-client.service';

describe('SapApiService', () => {
  let service: SapApiService;
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
        SapApiService,
        {
          provide: HttpClientService,
          useValue: mockHttpClientService,
        },
      ],
    }).compile();

    service = module.get<SapApiService>(SapApiService);
    httpClientService = module.get<HttpClientService>(HttpClientService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getCustomers', () => {
    it('should fetch customers from SAP', async () => {
      const mockCustomers = [
        { id: '1', name: 'Customer 1' },
        { id: '2', name: 'Customer 2' },
      ];

      mockHttpClientService.get.mockResolvedValue({
        data: mockCustomers,
        status: 200,
        message: 'Success',
      });

      const result = await service.getCustomers();

      expect(httpClientService.get).toHaveBeenCalledWith(
        '/sap/opu/odata/sap/API_BUSINESS_PARTNER/A_Customer',
        {
          headers: {
            'Authorization': 'Basic <sap-credentials>',
          },
        },
      );

      expect(result.data).toEqual(mockCustomers);
      expect(result.status).toBe(200);
    });
  });

  describe('getOrders', () => {
    it('should fetch orders for a customer from SAP', async () => {
      const customerId = '12345';
      const mockOrders = [
        { id: 'ORDER1', customerId: '12345' },
        { id: 'ORDER2', customerId: '12345' },
      ];

      mockHttpClientService.get.mockResolvedValue({
        data: mockOrders,
        status: 200,
        message: 'Success',
      });

      const result = await service.getOrders(customerId);

      expect(httpClientService.get).toHaveBeenCalledWith(
        `/sap/opu/odata/sap/API_SALES_ORDER_SRV/A_SalesOrder?$filter=SoldToParty eq '${customerId}'`,
        {
          headers: {
            'Authorization': 'Basic <sap-credentials>',
          },
        },
      );

      expect(result.data).toEqual(mockOrders);
    });
  });

  describe('createOrder', () => {
    it('should create an order in SAP', async () => {
      const orderData = {
        customerId: '12345',
        items: [{ product: 'PROD1', quantity: 2 }],
      };

      const mockCreatedOrder = {
        id: 'NEW_ORDER_123',
        ...orderData,
      };

      mockHttpClientService.post.mockResolvedValue({
        data: mockCreatedOrder,
        status: 201,
        message: 'Success',
      });

      const result = await service.createOrder(orderData);

      expect(httpClientService.post).toHaveBeenCalledWith(
        '/sap/opu/odata/sap/API_SALES_ORDER_SRV/A_SalesOrder',
        orderData,
        {
          headers: {
            'Authorization': 'Basic <sap-credentials>',
            'X-CSRF-Token': 'Fetch',
          },
        },
      );

      expect(result.data).toEqual(mockCreatedOrder);
      expect(result.status).toBe(201);
    });
  });
});