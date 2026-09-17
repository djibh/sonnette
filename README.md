# Sonnette

Sonnette is a full-stack activities-sharing application built with **.NET 8** on the backend (Clean Architecture + CQRS) and **React 18 + TypeScript** on the frontend. Users can register, log in, and browse, create, edit or delete activities (events with a date, category, city and venue).

## Architecture

The backend follows a Clean Architecture layout with four projects, orchestrated through the `Sonnette.sln` solution, plus a standalone React client:

| Project                    | Responsibility                                                                                                                                    |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Domain](Domain)           | Core entities (`Activity`, `AppUser`) — no external dependencies.                                                                                 |
| [Application](Application) | Business logic implemented as CQRS commands/queries handled via **MediatR**, validated with **FluentValidation**, and mapped with **AutoMapper**. |
| [Persistence](Persistence) | EF Core `DataContext` (SQLite), migrations, and database seeding.                                                                                 |
| [API](API)                 | ASP.NET Core Web API — controllers, JWT authentication (**ASP.NET Core Identity**), CORS, Swagger, and global exception handling middleware.      |
| [Client](Client)           | React 18 + TypeScript SPA (Vite), state managed with **MobX**, forms with **Formik/Yup**, UI built with **Semantic UI React**.                    |

```
Domain  ←  Persistence  ←  Application  ←  API
                                            ↑
                                          Client (React SPA, consumed over HTTP)
```

## Features

- User registration and login with JWT-based authentication (ASP.NET Core Identity)
- CRUD operations on activities (create, list, view details, edit, delete)
- Activity filtering and a dashboard view on the client
- Global API exception handling middleware
- Swagger/OpenAPI documentation in development
- Database auto-migration and seeding on startup (demo users + sample activities)

## Tech stack

**Backend**

- .NET 8 / ASP.NET Core Web API
- Entity Framework Core (SQLite)
- ASP.NET Core Identity + JWT Bearer authentication
- MediatR (CQRS), AutoMapper, FluentValidation
- Swashbuckle (Swagger)

**Frontend**

- React 18 + TypeScript + Vite
- MobX / mobx-react-lite for state management
- React Router
- Formik + Yup for forms and validation
- Semantic UI React for components
- Axios for HTTP calls

## Getting started

### Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) (v18+) and npm

### 1. Configure the API

The API reads its connection string and JWT signing key from `API/appsettings.json`, which is git-ignored. Create it (or add an `API/appsettings.Development.json`) with:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=sonnette.db"
  },
  "TokenKey": "replace-with-a-long-random-secret-key",
  "AllowedHosts": "*"
}
```

### 2. Run the API

```bash
cd API
dotnet restore
dotnet run
```

The API applies EF Core migrations and seeds demo data automatically on startup. By default it's available at `https://localhost:7291` / `http://localhost:5038` (see [API/Properties/launchSettings.json](API/Properties/launchSettings.json)), with Swagger UI at `/swagger`.

Seeded demo accounts (password `Pa$$w0rd`):

| Username | Email          |
| -------- | -------------- |
| Juju     | juju@email.com |
| Jojo     | jojo@email.com |
| Kaka     | kaka@email.com |

### 3. Run the client

```bash
cd Client
npm install
npm run dev
```

The client expects the API to be reachable and configured for CORS at `http://localhost:3000` (see [API/Extensions/ApplicationServiceExtensions.cs](API/Extensions/ApplicationServiceExtensions.cs)). Adjust the Vite dev server port or the API's CORS policy if they don't match.

## Project structure

```
Sonnette/
├── API/                # ASP.NET Core entry point, controllers, DTOs, middleware
├── Application/         # CQRS handlers (Activities), validators, mapping profiles
├── Domain/              # Domain entities
├── Persistence/         # DbContext, migrations, seed data
└── Client/              # React + TypeScript SPA
    └── src/
        ├── app/          # API agent, layout, models, router, MobX stores
        └── features/     # Feature-organized components (activities, home, errors)
```

## Scripts reference

| Command                     | Location                 | Description                                    |
| --------------------------- | ------------------------ | ---------------------------------------------- |
| `dotnet run`                | `API/`                   | Run the API                                    |
| `dotnet ef database update` | `API/` or `Persistence/` | Apply EF Core migrations manually              |
| `npm run dev`               | `Client/`                | Start the Vite dev server                      |
| `npm run build`             | `Client/`                | Type-check and build the client for production |
| `npm run lint`              | `Client/`                | Run ESLint                                     |
| `npm run preview`           | `Client/`                | Preview the production build                   |
