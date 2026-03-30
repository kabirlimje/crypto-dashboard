import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { WatchlistItem, WatchlistState } from '../../types'

const loadFromStorage = (): WatchlistItem[] => {
  try {
    const data = localStorage.getItem('watchlist')
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

const saveToStorage = (items: WatchlistItem[]) => {
  localStorage.setItem('watchlist', JSON.stringify(items))
}

const initialState: WatchlistState = {
  items: loadFromStorage(),
}

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    addToWatchlist: (state, action: PayloadAction<WatchlistItem>) => {
      const exists = state.items.find((item) => item.coin.id === action.payload.coin.id)
      if (exists) return
      state.items.push(action.payload)
      saveToStorage(state.items)
    },
    removeFromWatchlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
      saveToStorage(state.items)
    },
  },
})

export const { addToWatchlist, removeFromWatchlist } = watchlistSlice.actions
export default watchlistSlice.reducer;