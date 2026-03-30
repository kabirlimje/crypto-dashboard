import { useSelector } from 'react-redux'
import type { RootState } from '../app/store'
import {
  Box, Typography, Paper, Avatar,
  Chip, CircularProgress
} from '@mui/material'
import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'

const Dashboard = () => {
  const { coins, loading } = useSelector((state: RootState) => state.market)
  const { items: portfolioItems } = useSelector((state: RootState) => state.portfolio)
  const { items: watchlistItems } = useSelector((state: RootState) => state.watchlist)

  if (loading && coins.length === 0) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress color="primary" />
      </Box>
    )
  }

  const totalValue = portfolioItems.reduce((acc, item) => {
    return acc + item.coin.current_price * item.quantity
  }, 0)

  const totalInvested = portfolioItems.reduce((acc, item) => {
    return acc + item.buyPrice * item.quantity
  }, 0)

  const totalPnL = totalValue - totalInvested

  const topGainers = [...coins]
    .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
    .slice(0, 5)

  const topLosers = [...coins]
    .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
    .slice(0, 5)

  const chartData = coins.slice(0, 10).map((coin) => ({
    name: coin.symbol.toUpperCase(),
    price: coin.current_price,
  }))

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Dashboard
      </Typography>

      {/* Summary Cards */}
      <Box display="flex" gap={2} mb={3}>
        <Paper sx={{ p: 2, flex: 1, textAlign: 'center' }}>
          <Typography color="text.secondary" fontSize={13}>Portfolio Value</Typography>
          <Typography variant="h6" fontWeight="bold">
            ${totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </Typography>
        </Paper>
        <Paper sx={{ p: 2, flex: 1, textAlign: 'center' }}>
          <Typography color="text.secondary" fontSize={13}>Total Invested</Typography>
          <Typography variant="h6" fontWeight="bold">
            ${totalInvested.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </Typography>
        </Paper>
        <Paper sx={{ p: 2, flex: 1, textAlign: 'center' }}>
          <Typography color="text.secondary" fontSize={13}>Total P&L</Typography>
          <Typography variant="h6" fontWeight="bold"
            color={totalPnL >= 0 ? 'success.main' : 'error.main'}
          >
            {totalPnL >= 0 ? '+' : ''}${totalPnL.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </Typography>
        </Paper>
        <Paper sx={{ p: 2, flex: 1, textAlign: 'center' }}>
          <Typography color="text.secondary" fontSize={13}>Watchlist</Typography>
          <Typography variant="h6" fontWeight="bold">
            {watchlistItems.length} coins
          </Typography>
        </Paper>
      </Box>

      {/* Price Chart */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography fontWeight="bold" mb={2}>
          Top 10 Coins — Current Price (USD)
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#00d084"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Paper>

      {/* Top Gainers and Losers */}
      <Box display="flex" gap={2}>
        <Paper sx={{ p: 2, flex: 1 }}>
          <Typography fontWeight="bold" mb={2} color="success.main">
            Top 5 Gainers
          </Typography>
          {topGainers.map((coin) => (
            <Box key={coin.id} display="flex"
              justifyContent="space-between"
              alignItems="center" mb={1}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <Avatar src={coin.image} sx={{ width: 24, height: 24 }} />
                <Typography fontSize={13}>{coin.name}</Typography>
              </Box>
              <Chip
                label={`+${(coin.price_change_percentage_24h ?? 0).toFixed(2)}%`}
                size="small"
                color="success"
              />
            </Box>
          ))}
        </Paper>

        <Paper sx={{ p: 2, flex: 1 }}>
          <Typography fontWeight="bold" mb={2} color="error.main">
            Top 5 Losers
          </Typography>
          {topLosers.map((coin) => (
            <Box key={coin.id} display="flex"
              justifyContent="space-between"
              alignItems="center" mb={1}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <Avatar src={coin.image} sx={{ width: 24, height: 24 }} />
                <Typography fontSize={13}>{coin.name}</Typography>
              </Box>
              <Chip
                label={`${(coin.price_change_percentage_24h ?? 0).toFixed(2)}%`}
                size="small"
                color="error"
              />
            </Box>
          ))}
        </Paper>
      </Box>
    </Box>
  )
}

export default Dashboard;