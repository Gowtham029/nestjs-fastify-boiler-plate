import { Test, TestingModule } from '@nestjs/testing';
import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoggerService],
    }).compile();

    service = module.get<LoggerService>(LoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('log', () => {
    it('should log info message', () => {
      const logSpy = jest.spyOn(service['logger'], 'info').mockImplementation();
      
      service.log('Test message', 'TestContext');
      
      expect(logSpy).toHaveBeenCalledWith({ context: 'TestContext' }, 'Test message');
      logSpy.mockRestore();
    });

    it('should log message without context', () => {
      const logSpy = jest.spyOn(service['logger'], 'info').mockImplementation();
      
      service.log('Test message');
      
      expect(logSpy).toHaveBeenCalledWith({ context: undefined }, 'Test message');
      logSpy.mockRestore();
    });
  });

  describe('error', () => {
    it('should log error message with trace', () => {
      const errorSpy = jest.spyOn(service['logger'], 'error').mockImplementation();
      
      service.error('Error message', 'Stack trace', 'ErrorContext');
      
      expect(errorSpy).toHaveBeenCalledWith(
        { context: 'ErrorContext', trace: 'Stack trace' },
        'Error message'
      );
      errorSpy.mockRestore();
    });

    it('should log error message without trace and context', () => {
      const errorSpy = jest.spyOn(service['logger'], 'error').mockImplementation();
      
      service.error('Error message');
      
      expect(errorSpy).toHaveBeenCalledWith(
        { context: undefined, trace: undefined },
        'Error message'
      );
      errorSpy.mockRestore();
    });
  });

  describe('warn', () => {
    it('should log warning message', () => {
      const warnSpy = jest.spyOn(service['logger'], 'warn').mockImplementation();
      
      service.warn('Warning message', 'WarnContext');
      
      expect(warnSpy).toHaveBeenCalledWith({ context: 'WarnContext' }, 'Warning message');
      warnSpy.mockRestore();
    });
  });

  describe('debug', () => {
    it('should log debug message', () => {
      const debugSpy = jest.spyOn(service['logger'], 'debug').mockImplementation();
      
      service.debug('Debug message', 'DebugContext');
      
      expect(debugSpy).toHaveBeenCalledWith({ context: 'DebugContext' }, 'Debug message');
      debugSpy.mockRestore();
    });
  });

  describe('verbose', () => {
    it('should log verbose message', () => {
      const traceSpy = jest.spyOn(service['logger'], 'trace').mockImplementation();
      
      service.verbose('Verbose message', 'VerboseContext');
      
      expect(traceSpy).toHaveBeenCalledWith({ context: 'VerboseContext' }, 'Verbose message');
      traceSpy.mockRestore();
    });
  });

  describe('info', () => {
    it('should log info message with metadata', () => {
      const infoSpy = jest.spyOn(service['logger'], 'info').mockImplementation();
      const meta = { userId: 123, action: 'login' };
      
      service.info('User logged in', meta);
      
      expect(infoSpy).toHaveBeenCalledWith(meta, 'User logged in');
      infoSpy.mockRestore();
    });

    it('should log info message without metadata', () => {
      const infoSpy = jest.spyOn(service['logger'], 'info').mockImplementation();
      
      service.info('Simple info message');
      
      expect(infoSpy).toHaveBeenCalledWith(undefined, 'Simple info message');
      infoSpy.mockRestore();
    });
  });
});