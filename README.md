# Fluent Demo — React + Node.js + MongoDB

A full-stack demo application with a React frontend and an Express/Mongoose backend. The repository includes a Postman collection for exploring the API.

## Repository layout

- `frontend/` — React application
- `backend/` — Express API and MongoDB integration
- `postman_collection/` — Postman collection (if present in the checked-out branch)

## Requirements

- Node.js 18 or a compatible version supported by the installed dependencies
- npm
- MongoDB for the backend
- A configured backend environment file and frontend API base URL

## Start the backend

```bash
cd backend
npm install
```

Create `backend/.env` locally using the backend's required settings. Use placeholder values in any example file and never commit live credentials or private connection strings.

Start the API:

```bash
npm start
```

The backend package script starts the server through nodemon. Confirm the port and required environment variables in `backend/server.js` and its configuration before connecting the frontend.

## Start the frontend

In a separate terminal:

```bash
cd frontend
npm install
cp .env.example .env
npm start
```

Set `REACT_APP_API_KEY` to the **API base URL** used by this demo, as documented in the frontend environment example. The variable name is historical; do not place a private API secret in a React environment variable, because values compiled into a browser application are visible to users.

## Current limitations

- The backend package does not define an automated test suite yet.
- Configure CORS and authentication appropriately before exposing the API publicly.
- Verify all required environment variables and API routes against the current implementation before deployment.

## Security

A frontend `.env` file was removed from version control because it contained a configured API-related value. If that value was a credential rather than a public base URL, rotate it. Deleting a file does not remove it from Git history.
