# Budget Balancer

A monthly budget tracking application built with Next.js and Cloudflare Pages. Track your income, expenses, and savings over 6 months or 1 year periods.

## Features

- ✅ User authentication (register/login)
- ✅ Add income and expense entries
- ✅ Categorize transactions
- ✅ View budget overview with visual charts
- ✅ Calculate savings automatically
- ✅ View data for 6 months or 1 year periods
- ✅ Delete entries
- ✅ Responsive design

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Backend**: Cloudflare Pages Functions
- **Database**: Cloudflare D1 (SQLite)
- **Hosting**: Cloudflare Pages

## Setup

### Prerequisites

- Node.js 18+
- Cloudflare account
- Wrangler CLI

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Create Cloudflare D1 database:**
```bash
npx wrangler d1 create budget-balancer-db
```

3. **Update `wrangler.toml`** with your database ID from step 2

4. **Initialize database:**
```bash
npx wrangler d1 execute budget-balancer-db --file=./schema.sql
```

5. **Run development server:**
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Deployment to Cloudflare Pages

### Option 1: Via GitHub (Recommended)

1. Push your code to GitHub
2. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → **Pages** → **Create a project**
3. Connect your GitHub account and select your repository
4. Configure build settings:
   - **Framework preset**: Next.js
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
5. Add environment variables if needed
6. Click **Save and Deploy**

### Option 2: Via Wrangler CLI

```bash
npm run build
npx wrangler pages deploy .next --project-name=budget-balancer
```

## Custom Domain Setup

If you have a custom domain:

1. In Cloudflare Dashboard → Pages → Your Project → **Custom domains**
2. Click **Set up a custom domain**
3. Enter your domain name
4. Follow the DNS configuration instructions
5. Cloudflare will automatically provision SSL certificates

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard page
│   ├── login/             # Login page
│   ├── register/          # Register page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/             # React components
│   ├── Dashboard.tsx
│   ├── BudgetForm.tsx
│   ├── BudgetChart.tsx
│   └── BudgetTable.tsx
├── functions/              # Cloudflare Pages Functions
│   └── api/               # API routes
│       ├── auth/          # Authentication endpoints
│       └── budget.ts  # Budget endpoints
├── lib/                    # Utility functions
│   ├── auth.ts           # Auth helpers
│   ├── api.ts            # API client
│   └── utils.ts          # Password hashing
├── schema.sql             # Database schema
└── wrangler.toml         # Cloudflare configuration
```

## Environment Variables

For local development, you can create a `.env.local` file:

```
NEXT_PUBLIC_API_URL=/api
```

For production on Cloudflare Pages, set environment variables in the dashboard.

## Database Schema

The application uses three main tables:
- `users` - User accounts
- `sessions` - Authentication sessions
- `budget_entries` - Income and expense entries

See `schema.sql` for the complete schema.

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## License

MIT

