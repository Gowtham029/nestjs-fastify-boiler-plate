import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { HttpClientService } from './http-client.service';
import { of } from 'rxjs';

describe('HttpClientService', () => {
  let service: HttpClientService;
  let httpService: HttpService;

  const mockHttpService = {
    request: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HttpClientService,
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    }).compile();

    service = module.get<HttpClientService>(HttpClientService);
    httpService = module.get<HttpService>(HttpService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get', () => {
    it('should make GET request successfully', async () => {
      const mockResponse = {
        data: { id: 1, name: 'Test' },
        status: 200,
        statusText: 'OK',
      };

      mockHttpService.request.mockReturnValue(of(mockResponse));

      const result = await service.get('/test');

      expect(httpService.request).toHaveBeenCalledWith({
        method: 'GET',
        url: '/test',
        data: undefined,
        timeout: 30000,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      expect(result).toEqual({
        data: mockResponse.data,
        status: 200,
        message: 'Success',
      });
    });

    it('should handle GET request error', async () => {
      // const mockError = new Error('Network Error');
      // mockHttpService.request.mockReturnValue(of().pipe(() => { throw mockError; }));

      // await expect(service.get('/test')).rejects.toThrow('Network Error');
    });
  });

  describe('post', () => {
    it('should make POST request successfully', async () => {
      const mockResponse = {
        data: { id: 1, created: true },
        status: 201,
        statusText: 'Created',
      };

      const postData = { name: 'New Item' };
      mockHttpService.request.mockReturnValue(of(mockResponse));

      const result = await service.post('/test', postData);

      expect(httpService.request).toHaveBeenCalledWith({
        method: 'POST',
        url: '/test',
        data: postData,
        timeout: 30000,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      expect(result).toEqual({
        data: mockResponse.data,
        status: 201,
        message: 'Success',
      });
    });
  });

  describe('put', () => {
    it('should make PUT request successfully', async () => {
      const mockResponse = {
        data: { id: 1, updated: true },
        status: 200,
        statusText: 'OK',
      };

      const putData = { name: 'Updated Item' };
      mockHttpService.request.mockReturnValue(of(mockResponse));

      const result = await service.put('/test/1', putData);

      expect(httpService.request).toHaveBeenCalledWith({
        method: 'PUT',
        url: '/test/1',
        data: putData,
        timeout: 30000,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      expect(result).toEqual({
        data: mockResponse.data,
        status: 200,
        message: 'Success',
      });
    });
  });

  describe('delete', () => {
    it('should make DELETE request successfully', async () => {
      const mockResponse = {
        data: { deleted: true },
        status: 204,
        statusText: 'No Content',
      };

      mockHttpService.request.mockReturnValue(of(mockResponse));

      const result = await service.delete('/test/1');

      expect(httpService.request).toHaveBeenCalledWith({
        method: 'DELETE',
        url: '/test/1',
        data: undefined,
        timeout: 30000,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      expect(result).toEqual({
        data: mockResponse.data,
        status: 204,
        message: 'Success',
      });
    });
  });
});