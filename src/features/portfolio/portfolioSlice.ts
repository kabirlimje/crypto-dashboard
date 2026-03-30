import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { PortfolioItem, PortfolioState } from '../../types'

/**
 * PayloadAction is TypeScript type provided by the redux toolkit 
 * it tells the TypeScript what is payload (action:PayloadAction)
 * it also help to tells the TypeScript what is the type of payload (action:PayloadAction<PortfolioItem))
 */

const loadFromStorage = (): PortfolioItem[] => {
  try {
    const data = localStorage.getItem('portfolio')
    // if data we got then return the data in its actual form through JSON.parse(data)
    // if not then return []
    return data ? JSON.parse(data) : []
  } catch {
    // if the parsed data got crashed it got catched by the catch and return []
    return []
  }
}

const saveToStorage = (items: PortfolioItem[]) => {
  localStorage.setItem('portfolio', JSON.stringify(items))
}

const initialState: PortfolioState = {
  items: loadFromStorage(),
}

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    addToPortfolio: (state, action: PayloadAction<PortfolioItem>) => {
      state.items.push(action.payload)
      saveToStorage(state.items)
    },
    removeFromPortfolio: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
      saveToStorage(state.items)
    },
  },
})

export const { addToPortfolio, removeFromPortfolio } = portfolioSlice.actions
export default portfolioSlice.reducer