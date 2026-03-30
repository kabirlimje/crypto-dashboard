import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCoins } from './marketSlice'
import type { RootState, AppDispatch } from '@/app/store'
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Avatar,
  Typography, Box, CircularProgress, Chip
} from '@mui/material'

const MarketTable = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { coins, loading, error } = useSelector((state: RootState) => state.market)

  useEffect(() => {
    dispatch(fetchCoins())
    const interval = setInterval(() => {
      dispatch(fetchCoins())
    }, 60000)

    return () => clearInterval(interval)
  }, [dispatch])

  if (loading && coins.length === 0) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress color="primary" />
      </Box>
    )
  }

  if (error) {
    return (
      <Typography color="error" align="center" mt={4}>
        {error}
      </Typography>
    )
  }

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Live Market
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Coin</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">24h %</TableCell>
              <TableCell align="right">Market Cap</TableCell>
              <TableCell align="right">Volume</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coins.map((coin) => (
              <TableRow key={coin.id} hover>
                <TableCell>{coin.market_cap_rank}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Avatar src={coin.image} sx={{ width: 28, height: 28 }} />
                    <Typography fontWeight="bold">{coin.name}</Typography>
                    <Typography color="text.secondary" fontSize={12}>
                      {coin.symbol.toUpperCase()}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  ${coin.current_price.toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  <Chip
                    label={`${(coin.price_change_percentage_24h ?? 0).toFixed(2)}%`}
                    size="small"
                    color={(coin.price_change_percentage_24h ?? 0) >= 0 ? 'success' : 'error'}
                  />
                </TableCell>
                <TableCell align="right">
                  ${coin.market_cap.toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  ${coin.total_volume.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default MarketTable;