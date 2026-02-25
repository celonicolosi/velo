# Velô Sprint – Electric Vehicle Configurator

> This project uses **Yarn** as the package manager.

A React web application for configuring and purchasing the **Velô Sprint** electric vehicle.

---

## About the Project

This is a SPA (Single Page Application) that allows users to:
- Customize vehicle colors, wheels, and optional features
- Calculate pricing in real time
- Place orders with integrated credit analysis
- Check order status

**Velô Sprint Specs:**  
450 km range | 0–100 km/h in 3.2s | 500 hp

---

## Tech Stack

| Category | Technologies |
|----------|--------------|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui |
| **State Management** | Zustand (global state), React Hook Form (forms) |
| **Validation** | Zod |
| **Data Fetching** | TanStack Query |
| **Backend** | Supabase (PostgreSQL + Edge Functions) |

---

## Installation

```bash
# Install dependencies
yarn install

# Start development server
yarn dev
```

Access the app at:  
`http://localhost:5173`

---

## Supabase Setup

### 1. Create a Project

1. Go to https://supabase.com and create an account
2. Click **New Project**
3. Choose a project name and database password
4. Wait for the project to be created (~2 minutes)

---

### 2. Environment Variables

Create a `.env` file in the root of the project:

```env
VITE_SUPABASE_PROJECT_ID="your_project_id"
VITE_SUPABASE_PUBLISHABLE_KEY="your_public_anon_key"
VITE_SUPABASE_URL="https://your_project_id.supabase.co"
```

You can find this information in:  
**Project Settings → API**

---

### 3. Deploy (Database + Edge Functions)

```bash
# Install Supabase CLI (dev dependency)
yarn add supabase -D

# Login and link project
yarn supabase login
yarn supabase link --project-ref kibwiwpnailctpuafcin

# Apply migrations (creates tables and RLS policies)
yarn supabase db push

# Deploy Edge Functions
yarn supabase functions deploy
```

Done! Your database and Edge Functions should now be configured.

---

## Project Structure

```
src/
├── pages/              # Application pages
├── components/         # React components
│   ├── configurator/   # Vehicle configurator
│   ├── landing/        # Landing page
│   └── ui/             # shadcn/ui components
├── store/              # Global state (Zustand)
├── hooks/              # Custom hooks
└── integrations/       # Supabase client
```

---

## Routes

| Route | Description |
|-------|------------|
| `/` | Landing page |
| `/configure` | Vehicle configurator |
| `/order` | Checkout / Order |
| `/success` | Order confirmation |
| `/lookup` | Order lookup |

---

## Pricing Model

- **Base price:** R$ 40,000
- **Sport Wheels:** +R$ 2,000
- **Precision Park:** +R$ 5,500
- **Flux Capacitor:** +R$ 5,000
- **Financing:** 12 installments with 2% monthly interest

---

## Database

### `orders` table — main fields:

- `order_number` — Format: VLO-XXXXXX
- `color`, `wheel_type`, `optionals` — Configuration details
- `customer_name`, `customer_email`, `customer_cpf` — Customer info
- `payment_method`, `total_price` — Payment details
- `status` — pending, approved, rejected, analysis

---

## Credit Analysis Rules

| Score | Result |
|-------|--------|
| > 700 | Approved |
| 501–700 | Under review |
| ≤ 500 | Rejected |

*If the down payment is ≥ 50% of the total price, the order is approved even if the score is below 700.*

---

## Main Flow

```
Landing → Configurator → Checkout → Credit Analysis → Confirmation
```

---

## Scripts

```bash
yarn dev        # Development
yarn build      # Production build
yarn lint       # Linting
```