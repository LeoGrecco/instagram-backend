# Instagram Backend

This project is a backend application designed to integrate with the Instagram API. It allows users to fetch and display posts from their Instagram feed.

## Features

- Fetch posts from the Instagram feed using the official Instagram API.
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
│   │   └── instagram.controller.ts # Controller for Instagram-related logic
│   ├── routes
│   │   └── instagram.routes.ts # Routes for Instagram endpoints
│   ├── services
│   │   └── instagram.service.ts # Service for interacting with the Instagram API
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

> The `INSTAGRAM_ACCESS_TOKEN` value is required. Without it, the endpoint `/posts` will return an error.

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