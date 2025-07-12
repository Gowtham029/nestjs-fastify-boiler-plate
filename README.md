# NestJS Fastify BFF (Backend for Frontend)

Enterprise-level BFF application built with NestJS, Fastify, and PostgreSQL.

## Features

- **Authentication & Authorization**: JWT, OAuth2, and API Key support
- **Database**: PostgreSQL with Sequelize ORM
- **Logging**: Structured logging with Pino
- **Rate Limiting**: Global rate limiting middleware
- **Response Time Tracking**: Built-in response time measurement
- **Global Error Handling**: Comprehensive error handling
- **API Documentation**: Swagger/OpenAPI integration
- **Testing**: Jest unit and e2e tests
- **Docker**: Development and production containers

## Quick Start

### Using Docker (Recommended)

1. Clone the repository
2. Copy environment variables:
   ```bash
   cp .env.example .env
   ```
3. Start the application:
   ```bash
   docker-compose up
   ```

The application will be available at:
- API: http://localhost:3000/api/v1
- Swagger Docs: http://localhost:3000/api/v1/docs

### Local Development

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Set up PostgreSQL database and update `.env` file

3. Start the application:
   ```bash
   pnpm run start:dev
   ```

## API Endpoints

### Authentication
- `POST /api/v1/auth/login` - User login

### Users
- `POST /api/v1/users` - Create user (public)
- `GET /api/v1/users` - Get all users (requires JWT)
- `GET /api/v1/users/:id` - Get user by ID (requires JWT)

### Health
- `GET /api/v1/health` - Health check

## Authentication Methods

### 1. JWT Bearer Token
```bash
curl -H "Authorization: Bearer <jwt-token>" http://localhost:3000/api/v1/users
```

### 2. API Key
```bash
curl -H "x-api-key: <api-key>" http://localhost:3000/api/v1/users
```

## Testing

```bash
# Unit tests
pnpm run test

# E2E tests
pnpm run test:e2e

# Test coverage
pnpm run test:cov
```

## Production Deployment

```bash
# Build for production
docker-compose -f docker-compose.prod.yml up --build
```

## Environment Variables

See `.env.example` for all available configuration options.

## Project Structure

```
src/
├── modules/             # Feature modules
│   ├── auth/           # Authentication module
│   └── user/           # User management module
├── config/              # Configuration files
├── database/            # Database configuration
└── shared/              # Shared utilities
    ├── decorators/      # Custom decorators
    ├── filters/         # Exception filters
    ├── guards/          # Auth guards
    ├── interceptors/    # Interceptors
    └── services/        # Shared services
```