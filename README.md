# AH STORE - Trading Bots Platform

A comprehensive full-stack application built for AH STORE, managing trading bots, user subscriptions, payments, and AI analysis.

## Features

- **Trading Bots Hub:** Access to Quotex Time Bot, Global Market Bot, and OTC Bot.
- **AI Analysis:** Integrated with Gemini AI for technical market analysis.
- **Subscription Management:** Tiered plans, secure gateways (Crypto USDT TRC20/BEP20, Binance Pay).
- **Admin Dashboard:** Comprehensive oversight of users, payments, tickets, and audit logs.
- **User Dashboard:** Dedicated workspace for managing active subscriptions and launching bots.

## Tech Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS 4, Vite, Framer Motion, Lucide React
- **Backend:** Node.js, Express, TypeScript, Esbuild
- **AI Integration:** Google GenAI SDK (`gemini-2.5-flash`)

## Prerequisites

- Node.js (v18+)
- npm or yarn

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
```
*(The API key is required to enable the AI Analyzer feature.)*

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd <repository_folder>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   *The server will start on `http://localhost:3000`.*

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Start the production server:**
   ```bash
   npm run start
   ```

## Project Structure

- `src/`: Frontend React application.
  - `components/`: Reusable UI components and layouts.
  - `pages/`: Application pages (Public, Hub, Admin, Auth).
  - `context/`: Global state management (`AppContext.tsx`).
  - `data/`: Mock database and initial state (`mockDb.ts`).
  - `lib/`: Utilities, API services, and assets.
- `server.ts`: Express backend server, API routes, and Vite middleware.
- `dist/`: Production build output (generated after `npm run build`).

## License

All rights reserved to AH STORE.
