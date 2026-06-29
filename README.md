# Lendsqr Frontend Test

A Lendsqr-style user management dashboard built with React, TypeScript, Vite, SCSS, Zustand, React Router, and Jest. The app includes a login screen, protected dashboard layout, searchable and filterable users table, user statistics cards, user details pages, IndexedDB caching, and component tests.

## Features

- Login page with form validation, password visibility toggle, loading state, and environment-based demo credentials.
- Protected dashboard routes that redirect unauthenticated users back to login.
- Dashboard overview with total users, active users, users with loans, and users with savings.
- Users table with global search, debounced filtering, column sorting, pagination, filter modal, empty state, and row action menu.
- User details page with loading, success, not-found, invalid-data, and network-error states.
- IndexedDB caching for user detail records after they are loaded from the JSON dataset.
- Responsive dashboard shell with navbar, sidebar navigation, mobile drawer behavior, and logout.
- Jest and React Testing Library tests for `UserDetails` and `UsersTable`.

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Zustand
- React Hook Form
- React Icons
- SCSS/Sass
- Jest
- ts-jest
- React Testing Library
- jest-dom

## Project Structure

```text
public/
  users_data.json          Static user dataset used by the dashboard

src/
  assets/                  SVG assets and dashboard icons
  components/              Reusable UI components
    FilterModal/
    Logo/
    NavBar/
    SideBar/
    StatsCard/
    UsersTable/
  hooks/                   Shared React hooks
  layouts/                 Dashboard layout wrapper
  pages/                   Route-level pages
    Dashboard/
    Login/
    NotFound/
    UserDetails/
  store/                   Zustand stores
  styles/                  Global SCSS reset and variables
  types/                   Shared TypeScript types
  utils/                   IndexedDB helpers
```

## Getting Started

### Prerequisites

Use Node.js 20.19 or newer. Some installed packages, including Vite and React Router, declare Node 20+ engine requirements.

Check your version:

```bash
node --version
```

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```bash
VITE_EMAIL=admin@example.com
VITE_PASSWORD=password123
```

These values are used by the login page for local demo authentication.

### Run the App

```bash
npm run dev
```

Open the local Vite URL shown in the terminal, usually:

```text
http://localhost:5173
```

Log in with the credentials from your `.env` file.

## Available Scripts

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run build
```

Runs TypeScript build checks and creates a production build.

```bash
npm run preview
```

Serves the production build locally.

```bash
npm run lint
```

Runs ESLint across the project.

```bash
npm test
```

Runs Jest tests.

For a single-threaded Jest run:

```bash
npm test -- --runInBand
```

## Routes

- `/` - Login page.
- `/users` - Protected users dashboard.
- `/users/:id` - Protected user details page.
- `*` - Not found page.

The dashboard layout checks `localStorage.login`. When the value is not `"true"`, users are redirected to `/`.

## Data Flow

The dashboard loads users from:

```text
public/users_data.json
```

The dataset currently contains 500 user records. The dashboard uses this data to calculate statistics and render the users table.

The user details page first checks IndexedDB through:

```text
src/utils/db.ts
```

If the user is cached, it renders the cached record. If the user is not cached, it fetches `users_data.json`, finds the matching user by ID, saves it to IndexedDB, and renders the details page.

## State Management

Global search state is handled by Zustand:

```text
src/store/useSearchStore.ts
```

The navbar updates `searchQuery`, and `UsersTable` reads that value to filter users by username, email, phone number, account number, or organization.

## Testing

The project uses Jest, `ts-jest`, `@testing-library/react`, and `@testing-library/jest-dom`.

Test setup lives in:

```text
src/setupTests.ts
jest.config.cjs
tsconfig.jest.json
src/__mocks__/fileMock.ts
```

Current component test files:

```text
src/pages/UserDetails/UserDetails.test.tsx
src/components/UsersTable/UsersTable.test.tsx
```

The tests cover:

- `UserDetails` loading state.
- `UserDetails` IndexedDB cache hit.
- `UserDetails` JSON fetch success and IndexedDB caching.
- `UserDetails` not-found, network-error, and invalid-data states.
- `UserDetails` back navigation.
- `UsersTable` rendering users.
- `UsersTable` filtering by Zustand search query.
- `UsersTable` empty states.
- `UsersTable` clear-filter interaction.

Run tests:

```bash
npm test
```

Run coverage:

```bash
npm test -- --coverage
```

## Important Implementation Notes

- Login is a local demo flow, not a real backend authentication system.
- The app stores login status in `localStorage`.
- User data is static and served from the Vite public folder.
- User details are cached in browser IndexedDB after a JSON fetch.
- SCSS, SVG, and image imports are mocked in Jest through `fileMock.ts`.
- React Router 7 needs `TextEncoder`/`TextDecoder` in Jest, so `setupTests.ts` provides Node polyfills.

## Main Files

- `src/App.tsx` - App routing.
- `src/pages/Login/Login.tsx` - Login form and demo auth.
- `src/layouts/Dashboard/DashboardLayout.tsx` - Protected dashboard shell.
- `src/pages/Dashboard/Dashboard.tsx` - Users dashboard and stats.
- `src/components/UsersTable/UsersTable.tsx` - Users table, filtering, sorting, and pagination.
- `src/pages/UserDetails/UserDetails.tsx` - User profile details and cache loading.
- `src/utils/db.ts` - IndexedDB persistence helpers.
- `src/store/useSearchStore.ts` - Global search store.

## Deployment

Build the production assets:

```bash
npm run build
```

The output is written to `dist/` and can be hosted on any static hosting service that supports client-side routing.
