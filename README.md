# Frontend Configuration Setup

## Requirements

[NodeJS](https://nodejs.org/en)
[pnpm](https://pnpm.io/installation)

Make sure to install dependencies:

```bash
# pnpm
pnpm install
```

Copy the `.env.example` into `.env` file

```bash
cp .env.example .env
```

Ensure all the env has been filled.

```env
BASE_URL=
COOKIE_TOKEN_NAME=
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# pnpm
pnpm dev
```
