import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let userModel: typeof User;

  const mockUser = {
    id: 1,
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
    isActive: true,
  };

  const mockUserModel = {
    findOne: jest.fn(),
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userModel = module.get<typeof User>(getModelToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user successfully', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
      };

      mockUserModel.findOne.mockResolvedValue(null);
      mockUserModel.create.mockResolvedValue(mockUser);

      const result = await service.create(createUserDto);

      expect(result).toEqual(mockUser);
      expect(mockUserModel.findOne).toHaveBeenCalledWith({
        where: { email: createUserDto.email },
      });
    });

    it('should throw ConflictException if user already exists', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
      };

      mockUserModel.findOne.mockResolvedValue(mockUser);

      await expect(service.create(createUserDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('findOne', () => {
    it('should return a user if found', async () => {
      mockUserModel.findByPk.mockResolvedValue(mockUser);

      const result = await service.findOne(1);

      expect(result).toEqual(mockUser);
    });

    it('should throw NotFoundException if user not found', async () => {
      mockUserModel.findByPk.mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });
});