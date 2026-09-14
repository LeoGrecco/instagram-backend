# Instagram Backend

This project is the initial SaaS backend for connecting accounts to Instagram and consuming their media. The internal-pilot release has account isolation, authentication and per-account Instagram configuration. Asaas payments are intentionally deferred until the internal product flow is validated.

## Features

- Fetch posts from the Instagram feed using the official Instagram API.
- Register and authenticate independent SaaS accounts.
- Keep each account's Instagram connection isolated.
- Run the internal pilot without payment activation.
- Organized structure with controllers, services, and routes for maintainability.
- Environment variable management for sensitive information.

## Project Structure

```
instagram-backend
├── src
│   ├── app.ts                  # Entry point of the application
│   ├── config
│   │   └── env.ts             # Environment variable configuration
│   ├── controllers
│   │   ├── account.controller.ts # Account profile and Instagram connection
│   │   ├── auth.controller.ts # Registration and login
│   │   └── instagram.controller.ts # Controller for Instagram-related logic
│   ├── routes
│   │   └── instagram.routes.ts # Routes for Instagram endpoints
│   ├── services
│   │   ├── auth.service.ts # Password hashing and signed sessions
│   │   └── instagram.service.ts # Service for interacting with the Instagram API
│   ├── stores
│   │   └── account.store.ts # In-memory store used by the internal pilot
│   ├── types
│   │   └── index.ts            # Type definitions for the application
│   └── utils
│       └── http.ts             # Utility functions for HTTP requests
├── package.json                 # NPM package configuration
├── tsconfig.json                # TypeScript configuration
├── .env.example                 # Example environment variables
├── .gitignore                   # Git ignore file
├── README.md                    # Project documentation
└── jest.config.js               # Jest configuration for testing
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd instagram-backend
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Create a `.env` file based on the `.env.example` file and fill in your Instagram API credentials.

## CasaOS deployment (manual)

Follow these steps to run the backend manually in CasaOS using Docker Compose:

1. Open the project folder in CasaOS or upload it to a folder like `/appdata/instagram-backend`.
2. Edit the `.env` file and add your Instagram token:
   ```env
   PORT=3000
   INSTAGRAM_API_URL=https://graph.instagram.com
   INSTAGRAM_ACCESS_TOKEN=SEU_TOKEN_REAL
   APP_SECRET=your_app_secret
   SESSION_TTL_HOURS=24
   ```
3. Make sure the project contains the `docker-compose.yml` or `casaos-compose.yml` file.
4. Start the container:
   ```bash
   docker compose up -d --build
   ```
   If you are using the CasaOS-specific compose file:
   ```bash
   docker compose -f casaos-compose.yml up -d
   ```
5. Check the logs:
   ```bash
   docker compose logs -f instagram-backend
   ```
6. If everything started correctly, the API will be available at:
   ```text
   http://SEU_IP_DO_CASAOS:3000/posts
   ```

> In the internal SaaS flow, connect Instagram through `PUT /api/account/instagram`. The legacy global `INSTAGRAM_ACCESS_TOKEN` setting is not used by authenticated account requests.

## Internal pilot API

The current account store is in memory, so accounts reset when the process restarts. This is intentional for internal testing and must be replaced with persistent storage before public launch.

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/account                 Authorization: Bearer <token>
PUT  /api/account/instagram       { "accessToken": "..." }
GET  /api/posts                   Authorization: Bearer <token>
GET  /health
```

## Launch sequence

1. Internal pilot: validate registration, account isolation and Instagram reads.
2. Persistence: replace the in-memory account store with a database and encrypted token storage.
3. Operations: add rate limiting, audit logs, observability and Instagram token refresh handling.
4. Billing: integrate Asaas behind a billing service and verified webhooks only after the previous stages are stable.

## Usage
To start the application locally, run:
```
npm start
```

The server will start and listen for requests. You can access the Instagram posts by navigating to the appropriate endpoint defined in the routes.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.