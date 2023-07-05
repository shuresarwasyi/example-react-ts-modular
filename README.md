# Example Vite React TypeScript Modular

This is a sample application built with Vite, React, TypeScript, and a modular architecture. It demonstrates how to make API requests using an API helper and retrieve a list of members from an API provider.

## Features

- Fetches a list of members from an API provider.
- Uses an API helper module to handle API requests and authentication.
- Demonstrates how to handle token expiration and refreshing in the API helper.
- Implements TypeScript interfaces for improved type safety.
- Written in TypeScript for enhanced type checking and developer productivity.
- Follows a modular architecture for easier code organization and scalability.

## Project Structure

The project structured as follows:

- `src/`
  - `entities/`: Contains the data models or interfaces used in the application.
  - `services/`: Provides the business logic and handles API requests and data manipulation.
  - `components/`: Contains reusable UI components used in various parts of the application.
  - `modules/`: Contains feature-specific modules or components.
  - `layouts/`: Includes layout components for structuring the application's overall appearance.
  - `utils/`: Holds utility functions and helper modules used across the application.
    - `apiRequest.ts`: Provides utility functions for making API requests and handling authentication.
  - `config/`: Contains configuration files, such as API configurations.
    - `api.ts`: Contains the API configuration details, including endpoints, authentication methods, and credentials.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/shuresarwasyi/example-vite-react-typescript-modular.git
   ```

2. Navigate to the project directory:

   ```bash
   cd example-vite-react-typescript-modular
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Configuration

1. Open the `config/api.ts` file.
2. Update the `apiConfig` object with the configuration details of your API providers. You can add or modify the providers, their base URLs, authentication methods, and credentials.

## Customization

- You can customize the API endpoints, methods, and data formats by modifying the `sendRequest` function in `util/apiRequest.ts`.
- Adjust the member data structure by updating the Member interface in `services/memberService.ts` to match the structure of your API response.
- Implement token refresh logic in the request interceptor of `util/apiRequest.ts` based on your specific token management system.

## Getting Started

1. Run the development server:

   ```bash
   npm run dev
   ```

2. Open the app in your browser: `http://localhost:5173`

Now you can start exploring the application and making changes according to your needs.

Feel free to adjust the content based on your specific project structure and requirements.
