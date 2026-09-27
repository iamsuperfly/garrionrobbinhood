# GARRI community site

Community website for **GARRI ($GARRI)** on Robinhood Chain.

Tagline: *You already have garri at home. Have some in your wallet.*

- Token: `0xdDDF7AB756C35b4d0537825497e6932780710241`
- Chain ID: `4663`
- Launchpad: [Pons](https://www.ponsfamily.com/launchpad/0xdDDF7AB756C35b4d0537825497e6932780710241)

This site is not Robinhood and not Pons. Official contract only.

## Stack

Next.js 15 App Router, TypeScript, Tailwind CSS v4. Live market data is fetched on the server through Route Handlers so the browser never talks to GeckoTerminal directly.

## Local run

```bash
npm install
npm test
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

None required. Public GeckoTerminal endpoints are used from the Route Handlers:

- `GET /api/garri` — price, FDV/market cap, 24h volume, 24h change, holders, liquidity, token image, bonding-curve progress
- `GET /api/garri/trades` — last 12 pool trades

Responses are cached for 18 seconds. The UI refreshes every 20 seconds.

Optional:

```bash
# unused by default; reserved if you later proxy a private RPC
ROBINHOOD_RPC_URL=https://rpc.mainnet.chain.robinhood.com
```

## Tests

```bash
npm test
```

Coverage:

- unit tests for number/address formatters
- unit tests for GeckoTerminal payload parsing
- smoke tests for `/api/garri` and `/api/garri/trades`

## Deploy to Vercel

1. Push this repository to GitHub.
2. In Vercel, **Add New Project** and import `garrionrobbinhood`.
3. Framework preset: Next.js. Root directory: repository root.
4. No environment variables are required.
5. Deploy.

Or with the Vercel CLI:

```bash
npx vercel
```

## Pages

Single scrolling site with anchors:

- Hero
- Live market
- Official details
- How it works
- How to buy
- Rewards
- Recent trades
- Community
- Footer
