// configureStore is the redux tool which is used to create the redux store and replace combine reducer and createStore
import {configureStore} from "@reduxjs/toolkit";
import marketReducer from "../features/market/marketSlice";
import portfolioReducer from "../features/portfolio/portfolioSlice";
import watchlistReducer from "../features/watchlist/watchlistSlice";

export const store = configureStore({reducer: {
    market: marketReducer,
    portfolio: portfolioReducer,
    watchlist: watchlistReducer
}})

export type RootState = ReturnType<typeof store.getState>;
/* store.getstate ===> 
    coins: [],
    loading: false,
    error: null
*/

/* typeof store.getState ===>
   coins: Coin[]
   loading: boolean
   error: string | null
 */

/* 
    ReturnType<typeof store.getState> ===>
    market = MarkeState {market (is the slice name) MarketState (comes from the interface)}
*/

/**
 * RootState ===> MarketState = {
 *                  coins: Coin[]
                    loading: boolean
                    error: string | null
 *                }
 */
export type AppDispatch = typeof store.dispatch;
