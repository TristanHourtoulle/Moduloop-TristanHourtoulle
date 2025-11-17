# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Moduloop is an environmental impact calculation platform for construction projects. It's built with **Next.js 16** (App Router with Turbopack), TypeScript, **React 19**, and PostgreSQL, allowing users to create projects, manage products, and calculate environmental impacts.

### Recent Upgrade (Next.js 16 & React 19)
The project has been upgraded from Next.js 14 to Next.js 16 with React 19. Key changes:
- **Turbopack** is now the default bundler (2-5× faster builds, up to 10× faster Fast Refresh)
- **React 19** with new features and breaking changes
- **Async Request APIs**: `params`, `searchParams`, `cookies()`, `headers()` are now async
- **bcryptjs** instead of bcrypt (for build compatibility)
- **Cache Components** enabled for performance optimization

### Known Compatibility Issues
⚠️ Some UI libraries have peer dependency warnings with React 19 (NextUI, Material Tailwind, Radix UI, etc.). These are warnings only - the libraries generally work but may need updates in the future. A build error related to `createContext` persists due to React 19 compatibility with certain component libraries.

## Core Commands

### Development
```bash
pnpm dev              # Start development server (default port 3000)
pnpm build            # Build for production
pnpm start            # Start production server on port 3000
pnpm lint             # Run ESLint
pnpm email            # Run email development server
```

### Testing
API testing is done via Python script:
```bash
cd tests
python3 app.py        # Run all API tests (requires dev server running on port 3000)
```

## Project Structure

### Directory Layout
- `app/` - Next.js App Router directory (main application code)
  - `api/` - API route handlers organized by resource (user, product, project, group, session, upload)
  - `pages/` - Application pages (login, register, products, projects, users, methodology)
  - `components/` - Reusable React components organized by feature
  - `lib/` - Core utilities (database connection, session management, utilities)
  - `models/` - TypeScript interfaces for data models
  - `hooks/` - Custom React hooks (useBlob, useGroupsAndProjects, useProjectData)
  - `utils/` - Utility functions (React Query Provider, formatters, converters)
  - `styles/` - Global styles
- `emails/` - Email templates using React Email
- `public/` - Static assets (fonts, icons, guideline, products, uploads)
- `tests/` - Python-based API testing suite

### Key Architecture Patterns

**Database Access:**
- PostgreSQL connection via `app/lib/database.ts` using `pg` Pool
- Direct SQL queries (no ORM)
- Database credentials configured via environment variables (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT)

**Authentication & Sessions:**
- JWT-based session management in `app/lib/session.ts`
- Sessions stored in HTTP-only cookies (7-day expiration)
- Password hashing with **bcryptjs** (10 salt rounds) - switched from bcrypt for Next.js 16 compatibility
- Session helpers: `login()`, `logout()`, `getSession()`, `updateSession()`
- **Important**: All session functions (`cookies()`, `headers()`) must be awaited in Next.js 16

**API Routes:**
- Follow Next.js App Router convention: `app/api/[resource]/route.ts`
- Standard CRUD operations exported as GET, POST, PUT, DELETE functions
- Dynamic routes use `[param]` folders (e.g., `app/api/user/[userId]/route.ts`)
- Response format: `Response.json({ success: boolean, data?: any, error?: any })`

**State Management:**
- React Query (TanStack Query) for server state
- Provider configured in `app/utils/Provider.tsx`
- React Query DevTools enabled in development

**Image Handling:**
- Vercel Blob storage for file uploads (`@vercel/blob` package)
- Upload endpoint: `app/api/upload/route.tsx`
- Product images stored via `app/api/upload/image/product/route.ts`
- Next.js Image component configured with Vercel Blob domain pattern

## Component Organization

Components are organized by feature/domain:
- `button/` - Various button components (Button, DeleteBtn, NewButton, TrashCan)
- `header/` - Navigation and header components (Logo, LoginButton, NavLinks)
- `input/` - Form inputs (Input, Select, TextArea, FileInput, Label)
- `products/` - Product management components (Card, impactTable, infoTable, UploadMaj)
- `projects/` - Project components including impact visualization and downloads
- `projects/impact/` - Environmental impact calculation and display components
- `landingPage/` - Landing page specific components
- `users/` - User management components
- `ui/` - shadcn/ui components (card, chart, toast, toaster)
- `features/` - Shared feature components (Dialogs, Sheet, ToolTip)
- `charts/` - Chart components using Chart.js and Recharts

## Styling & Design System

**CSS Framework:** Tailwind CSS with custom configuration

**UI Libraries:**
- NextUI (primary UI component library with custom theme)
- Material Tailwind (secondary components)
- Radix UI (headless primitives for dialogs, labels, selects, toasts)
- shadcn/ui components

**Custom Theme:**
- Primary color: `#30C1BD` (teal)
- Secondary color: `#E54600` (orange)
- Danger color: `#FE5858` (red)
- Background: `#F6F6F6` (light gray)
- Custom fonts: "M PLUS Rounded 1c" (sans), Outfit

**Icons:**
- Font Awesome
- Heroicons
- Lucide React
- Radix Icons

## Path Aliases

TypeScript is configured with path alias:
```typescript
"@*": ["./app/*"]
```

Examples:
- `@/lib/database` → `app/lib/database.ts`
- `@components/Header` → `app/components/Header.tsx`
- `@models/User` → `app/models/User.tsx`

## Data Models

Key TypeScript interfaces in `app/models/`:
- **User** - User accounts (id, firstName, name, email, password, role, avatar, timestamps)
- **Project** - Construction projects (id, name, description, budget, products, company, location, area, user_id, group, timestamps)
- **Product** - Building products/materials
- **Group** - Project groupings/organizations
- **AddProduct** - Product associations with projects
- **Impact** - Environmental impact calculations
- **Session** - Authentication session data

## API Resources

### User (`/api/user`)
- POST: Register new user (bcrypt password hashing)
- GET: Login with email/password (creates session)
- PUT: Update user
- DELETE: Delete user
- GET `/api/user/list` - List all users
- GET `/api/user/[userId]` - Get user by ID
- GET `/api/user/email/[userEmail]` - Get user by email
- PUT `/api/user/password` - Update password

### Product (`/api/product`)
- Standard CRUD for products
- GET `/api/product/list` - List all products
- GET/POST `/api/product/image` - Product image handling

### Project (`/api/project`)
- Standard CRUD for projects
- GET `/api/project/byUser/[userId]` - Get user's projects
- GET `/api/project/product/[idProject]` - Get project products
- POST `/api/project/addProduct` - Add product to project
- PUT `/api/project/changeProduct` - Modify project product
- POST `/api/project/duplicate` - Duplicate existing project
- POST `/api/project/duplicate/template` - Duplicate as template
- GET `/api/project/allFields` - Get all project fields
- PUT `/api/project/update/description` - Update project description

### Group (`/api/group`)
- GET `/api/group/[idUser]` - Get user's groups
- GET `/api/group/findUnique/[idGroup]` - Get specific group
- POST `/api/group/id` - Group operations by ID

### Session (`/api/session`)
- Session management endpoint

### Upload (`/api/upload`)
- File upload with Vercel Blob storage

## Environment Variables Required

```
DB_HOST=          # PostgreSQL host
DB_USER=          # PostgreSQL user
DB_PASSWORD=      # PostgreSQL password
DB_NAME=          # PostgreSQL database name
DB_PORT=          # PostgreSQL port
```

Additional services:
- Vercel Blob (for image uploads)
- Resend (for email sending via `@/api/sendMail`)

## Development Notes

**React Query Usage:**
- All components wrapped in `<Provider>` from `@utils/Provider.tsx`
- Use hooks from `@tanstack/react-query` for data fetching
- DevTools available in development mode

**Email Templates:**
- Built with React Email (`react-email` package)
- Located in `emails/` directory
- Currently: `ResetPassword.tsx` template

**Charts & Visualization:**
- Chart.js with react-chartjs-2
- Recharts for additional visualizations
- Custom pie/doughnut charts in `app/components/charts/` and `app/components/Chart/`

**Image Generation:**
- Project PNG export using Satori and resvg-wasm
- Located in `app/components/projects/download/`

**Form Validation:**
- No centralized validation library currently in use
- Handle validation manually in components and API routes

**Error Handling:**
- API routes return `{ success: false, error }` on failure
- Use try-catch blocks in all API handlers
- Toast notifications using Sonner library

## Next.js 16 & React 19 Migration Notes

### Async Request APIs
In Next.js 16, several APIs that were previously synchronous are now asynchronous:

**Dynamic Route Params:**
```typescript
// ❌ Old (Next.js 14)
export default function Page({ params: { id } }: { params: { id: string } }) {
  // use id directly
}

// ✅ New (Next.js 16)
import { use } from "react";
export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  // use id
}
```

**Cookies and Headers:**
```typescript
// ❌ Old
cookies().set("name", "value");

// ✅ New
(await cookies()).set("name", "value");
```

### Other Breaking Changes
- `export const dynamic = "force-dynamic"` is incompatible with `cacheComponents` - remove it
- `JSX.Element` type should be `React.JSX.Element` in React 19
- TypeScript config automatically updated by Next.js 16 (jsx: "react-jsx", target: "ES2017")

## Best Practices for This Codebase

1. **API Routes**: Always include try-catch blocks and return proper success/error responses
2. **Authentication**: Use `getSession()` from `@/lib/session` to check authentication in protected routes
3. **Database Queries**: Use parameterized queries to prevent SQL injection
4. **Image Uploads**: Always use Vercel Blob storage, never store files locally
5. **Styling**: Prefer Tailwind classes over custom CSS; use NextUI/Material Tailwind components when available
6. **Type Safety**: All API responses and component props should be properly typed
7. **Path Imports**: Always use `@/` alias for app directory imports
8. **Async APIs**: Always await `params`, `searchParams`, `cookies()`, and `headers()` in Next.js 16
9. **Password Hashing**: Use `bcryptjs` (not `bcrypt`) for compatibility

## French Language

The application is in French (lang="fr" in layout). UI text, comments, and error messages should be in French.
