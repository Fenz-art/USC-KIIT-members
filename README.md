# USC KIIT Members

Monorepo structured for separate deployment targets.

## Structure

```
USC-KIIT-members/
├─ frontend/          ← Vercel
│  ├─ public/
│  ├─ src/
│  ├─ index.html
│  ├─ vite.config.ts
│  ├─ tsconfig.json
│  └─ package.json
│
├─ backend/           ← Railway
│  ├─ server/
│  │  ├─ index.js
│  │  ├─ routes/
│  │  └─ config/
│  └─ package.json
│
└─ README.md
```

## Frontend

- `cd frontend`
- `npm install`
- Development: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`

Set `VITE_API_URL` environment variable to point to the backend (e.g. `https://your-railway-app.up.railway.app`).

## Backend

- `cd backend`
- `npm install`
- Start: `npm start`

Environment variables required:

- `PORT` (optional, defaults to 5000)
- `MONGO_URI`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

Health check: `GET /api/health` → `{ status: "OK" }`

## Notes

- The root `package.json` contains no scripts and is not used for running the app.
- Frontend API calls read `VITE_API_URL`; in local dev, Vite proxy targets `http://localhost:5000`.
