export const GARRI = {
  name: "GARRI",
  ticker: "$GARRI",
  tagline: "You already have garri at home. Have some in your wallet.",
  chain: "Robinhood Chain",
  chainId: 4663,
  currency: "ETH",
  rpcUrl: "https://rpc.mainnet.chain.robinhood.com",
  contract: "0xdDDF7AB756C35b4d0537825497e6932780710241",
  totalSupply: 1_000_000_000,
  totalSupplyLabel: "1,000,000,000",
  launchpad: "Pons",
  buyUrl:
    "https://www.ponsfamily.com/launchpad/0xdDDF7AB756C35b4d0537825497e6932780710241",
  feeWallet: "0x30c20ca7c669eda5c302809b1767c03716e51b7a",
  creatorAllocation: "0%",
  graduationEth: 4.2,
  graduationRule:
    "Bonding curve graduates at 4.2 ETH of real reserves into a permanently locked Uniswap v4 pool.",
  xUrl: "https://x.com/degenBRO__",
  xHandle: "@degenBRO__",
  telegramUrl: "https://t.me/WWDegenbro",
  explorerTokenUrl:
    "https://hoodexplorer.io/token/0xdDDF7AB756C35b4d0537825497e6932780710241",
  explorerBase: "https://hoodexplorer.io",
  geckoPoolUrl:
    "https://www.geckoterminal.com/robinhood/pools/0x0cdac677b67f886d805fdb9382feabb92df97d4b",
  poolAddress: "0x0cdac677b67f886d805fdb9382feabb92df97d4b",
} as const;

export const GECKO = {
  network: "robinhood",
  token:
    "https://api.geckoterminal.com/api/v2/networks/robinhood/tokens/0xdDDF7AB756C35b4d0537825497e6932780710241",
  tokenInfo:
    "https://api.geckoterminal.com/api/v2/networks/robinhood/tokens/0xdDDF7AB756C35b4d0537825497e6932780710241/info",
  trades:
    "https://api.geckoterminal.com/api/v2/networks/robinhood/pools/0x0cdac677b67f886d805fdb9382feabb92df97d4b/trades",
  pool: "https://api.geckoterminal.com/api/v2/networks/robinhood/pools/0x0cdac677b67f886d805fdb9382feabb92df97d4b",
} as const;

export const REFRESH_MS = 20_000;
export const CACHE_SECONDS = 18;
export const TRADE_LIMIT = 12;
export const UNAVAILABLE = "Live data unavailable";
