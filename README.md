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

The backend defaults to port `9999` unless `PORT` is set. Check `backend/Configs/db.config.js` for the database variables expected by this version.

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

## Security follow-up

A frontend `.env` file is still present in the repository because the automated removal action was blocked. Review its value, remove it from version control, and rotate it if it is a credential. The replacement `.env.example` contains only a local API URL placeholder. Deleting a file does not remove it from Git history.
