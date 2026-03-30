export interface Coin {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  total_volume: number
  price_change_percentage_24h: number
  market_cap_rank: number
}

export interface MarketState {
  coins: Coin[]
  loading: boolean
  error: string | null
}

export interface PortfolioItem {
  id: string
  coin: Coin
  buyPrice: number
  quantity: number
  addedAt: string
}

export interface PortfolioState {
  items: PortfolioItem[]
}

export interface WatchlistItem {
  id: string
  coin: Coin
  addedAt: string
}

export interface WatchlistState {
  items: WatchlistItem[]
}