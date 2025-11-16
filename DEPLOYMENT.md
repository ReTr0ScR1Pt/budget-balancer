# Deployment Guide - Budget Balancer

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Cloudflare D1 Database

```bash
# Login to Cloudflare
npx wrangler login

# Create D1 database
npx wrangler d1 create budget-balancer-db
```

**Important:** Copy the `database_id` from the output and update `wrangler.toml` line 10.

### 3. Initialize Database

```bash
npx wrangler d1 execute budget-balancer-db --file=./schema.sql
```

### 4. Test Locally

```bash
# Run Next.js dev server
npm run dev
```

Visit `http://localhost:3000`

### 5. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Budget Balancer"
git remote add origin https://github.com/ReTr0ScR1Pt/budget_planner.git
git branch -M main
git push -u origin main
```

### 6. Deploy to Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Pages** → **Create a project**
3. Connect your GitHub account
4. Select your repository: `budget_planner`
5. Configure build settings:
   - **Framework preset**: Next.js (Static HTML Export)
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
   - **Root directory**: `/` (leave as root)
6. Add environment variables (if needed):
   - `NEXT_PUBLIC_API_URL` = `/api` (optional, defaults to `/api`)
7. Click **Save and Deploy**

### 7. Connect Custom Domain

1. In Cloudflare Pages → Your Project → **Custom domains**
2. Click **Set up a custom domain**
3. Enter your domain name
4. Follow DNS configuration instructions
5. Cloudflare will automatically provision SSL

## Important Notes

- The API functions are in the `functions/` directory and will be automatically deployed with Cloudflare Pages
- Make sure your D1 database is created in the same Cloudflare account
- The database binding is configured in `wrangler.toml`

## Troubleshooting

**Build fails:**
- Ensure Node.js 18+ is installed
- Check that all dependencies are installed: `npm install`
- Verify `wrangler.toml` has correct database ID

**API routes return 404:**
- Verify functions are in `functions/api/` directory
- Check Cloudflare Pages Functions settings
- Ensure routes match `/api/*` pattern

**Database errors:**
- Verify D1 database is created
- Check database ID in `wrangler.toml`
- Ensure schema is initialized: `npx wrangler d1 execute budget-balancer-db --file=./schema.sql`

