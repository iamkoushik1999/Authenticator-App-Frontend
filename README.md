# Authenticator App — Frontend

A React + Vite frontend for a demo authentication system: email/password
signup with OTP verification, passwordless OTP login, TOTP-based 2FA with
authenticator apps, a per-user login history timeline, and an admin
dashboard for managing users.

> This is a learning / portfolio project, not a production-ready app.
> Pairs with the [`authenticator-app-backend`](../authenticator-app-backend)
> API — start that first.

## Tech Stack

- **React 18** + **Vite** (SWC-based dev/build)
- **Material UI (MUI) v6** for components, with a custom theme (`src/theme.js`)
- **React Router v7** for routing
- **Axios** / `fetch` for API calls
- **react-hot-toast** and **SweetAlert2** for notifications/dialogs
- **@mui/lab Timeline** for the login history view
- **speakeasy**-compatible QR flow rendered from the backend's generated QR code

## Getting Started

### Prerequisites

- Node.js 20+
- The backend running locally (see `authenticator-app-backend/README.md`) or a deployed backend URL

### Setup

```bash
npm install
cp .env.example .env   # set VITE_BASE_URL to point at your backend
npm run dev             # starts the Vite dev server (default http://localhost:5173)
```

### Environment Variables

Create a `.env` file in the project root:

```env
# Base URL of the backend API, including the /api/v1 prefix
VITE_BASE_URL=http://localhost:5050/api/v1
```

### Scripts

| Command          | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite dev server with HMR   |
| `npm run build`   | Type-check-free production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint over the project          |

## Project Structure

```
src/
├── App.jsx                # Route definitions
├── main.jsx                # Entry point — wraps the app in the MUI ThemeProvider
├── theme.js                 # Shared MUI theme (palette, typography, component overrides)
├── api/                     # API endpoint constants + axios instance
├── routes/
│   └── PrivateRoute.jsx     # Redirects to /login when there's no access token
├── components/               # UI building blocks, grouped by feature
│   ├── Common/                # Header, Footer, Layout, shared PageBanner
│   ├── Home/                  # Hero, Features, HowItWorks, TechStack (landing page)
│   ├── SignUp/, Login/        # Auth forms
│   ├── Authenticate/          # 2FA QR enrollment
│   ├── History/               # Login history timeline
│   └── Admin/                 # Admin sign-in + user management table
└── pages/                    # One page component per route, composing the above
```

## Routes

| Path            | Access  | Description |
| ---------------- | ------- | ----------- |
| `/`               | Public  | Landing page explaining the app |
| `/signup`         | Public  | Create an account (email + password → OTP) |
| `/login`          | Public  | Log in via OTP or a 2FA code |
| `/admin/login`     | Public  | Admin sign-in |
| `/history`         | Private | The logged-in user's login timeline |
| `/authenticate`    | Private | Link an authenticator app / view 2FA status |
| `/dashboard`       | Private (admin) | Manage registered users |

"Private" routes require an `accessToken` in `localStorage` (set on
successful login/signup) and are gated by `PrivateRoute`.

## Notes

- No real emails are sent — OTPs are returned directly in the API response
  and surfaced in the UI, so the whole flow can be demoed without a mail
  provider.
- If the UI ever looks unstyled or the color theme seems to have reverted to
  MUI's defaults after a dependency change, clear Vite's dependency cache:
  `rm -rf node_modules/.vite` and restart the dev server.
