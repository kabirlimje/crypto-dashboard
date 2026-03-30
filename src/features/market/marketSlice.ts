import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
// import type {Coin, MarketState} from "@/types";
import type {Coin, MarketState} from "../../types";


const initialState : MarketState = {
    coins: [],
    loading: false,
    error: null
}

// createAsyncThunk is the function provided by the redux tookit which takes 2 args.
// arg1 : action name
// arg2 : async function
// used to call the API in the redux
// it implicitly handles the pending/fulfilled/rejected inside the extra reducer with deafult
// builder parameter which listens all the cases from the slice

// REGARDING TO THE API CALL METHOD IN createAsyncThunk
// we can call the API with any method. createAsyncThunk doesn't care about it.

// REGARDING TO FILTERATION OF THE API RESPONSE THROUGH THE params object
// we can filter the API response with the params object if the API is called with axios
// while the API response from the normal fetch can also be filtered but we have to modify the
// API by using the query parameter and & operator 

export const fetchCoins = createAsyncThunk("market/fetchCoins", async() => {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets',
        {
            params: {
                vs_currency: 'usd', // converts the currency into the USD 
                order: 'market_cap_desc', // provide the coin (high to low priority)
                per_page: 100, // return the data with the length of 100
                page: 1 // first page
            }
        }
    )
    console.log("data --> ", response.data);
    return response.data as Coin[];
})

const marketSlice = createSlice({
    name: 'market', // slice name
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // listens all 3 cases (pending / fulfilled / rejected)
        builder
        .addCase(fetchCoins.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchCoins.fulfilled, (state, action) => {
            state.loading = false;
            state.coins = action.payload;
        })
        .addCase(fetchCoins.rejected, (state, action) => {
            state.error = action.error.message || 'failed to fetch coins';
        })
    },
})

export default marketSlice.reducer;