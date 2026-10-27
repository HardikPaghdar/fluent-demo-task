# Fluent Demo — React + Node.js + MongoDB

A full-stack demo application with a React frontend and an Express/Mongoose backend. The repository includes a Postman collection for exploring the API.

## Repository layout

- `frontend/` — React application
- `backend/` — Express API and MongoDB integration
- `postman_collection/` — Postman collection, where present in this branch

## Requirements

- Node.js/npm compatible with the installed dependencies
- MongoDB
- Backend environment configuration and a frontend API base URL

## Start the backend

```bash
cd backend
npm install
npm start
```

The backend defaults to port `9999` unless `PORT` is set. Check `backend/Configs/db.config.js` for the database variables expected by this version. Create a local `backend/.env` file and configure it with your own development values.

## Start the frontend

In a separate terminal:

```bash
cd frontend
npm install
cp .env.example .env
npm start
```

The frontend example uses `REACT_APP_API_KEY` as a historical variable name for the API base URL. Do not put a private API secret in a React environment variable: values bundled into a browser application are visible to users.

## Security and limitations

- The tracked frontend `.env` file has been removed. Keep local environment files untracked; the frontend ignore rules exclude local environment configuration.
- If the removed value was ever a credential, rotate it. Removing a file does not erase it from Git history.
- The backend package does not define an automated test suite yet.
- Configure CORS, authentication, authorization, and error handling before exposing the API publicly.
- Verify API routes and required variables against the current implementation before deployment.
