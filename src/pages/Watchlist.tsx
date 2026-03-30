import { useDispatch, useSelector } from 'react-redux'
import { addToWatchlist, removeFromWatchlist } from '../features/watchlist/watchlistSlice'
import type { RootState, AppDispatch } from '../app/store'
import type { WatchlistItem } from '../types'
import {
  Box, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper,
  Avatar, Button, Chip, IconButton, Tooltip
} from '@mui/material'
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd'

const Watchlist = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { items } = useSelector((state: RootState) => state.watchlist)
  const { coins } = useSelector((state: RootState) => state.market)

  const handleAdd = (coinId: string) => {
    const coin = coins.find((c) => c.id === coinId)
    if (!coin) return

    const newItem: WatchlistItem = {
      id: `${coin.id}-${Date.now()}`,
      coin,
      addedAt: new Date().toLocaleDateString(),
    }
    dispatch(addToWatchlist(newItem))
  }

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        My Watchlist
      </Typography>

      {items.length === 0 ? (
        <Box textAlign="center" mt={6}>
          <Typography color="text.secondary" mb={2}>
            No coins in watchlist yet.
          </Typography>
          <Typography color="text.secondary" fontSize={13}>
            Go to Market page and click the bookmark icon to add coins.
          </Typography>
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Coin</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">24h %</TableCell>
                <TableCell align="right">Market Cap</TableCell>
                <TableCell align="right">Added On</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Avatar src={item.coin.image} sx={{ width: 28, height: 28 }} />
                      <Typography fontWeight="bold">{item.coin.name}</Typography>
                      <Typography color="text.secondary" fontSize={12}>
                        {item.coin.symbol.toUpperCase()}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    ${item.coin.current_price.toLocaleString()}
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      label={`${(item.coin.price_change_percentage_24h ?? 0).toFixed(2)}%`}
                      size="small"
                      color={( item.coin.price_change_percentage_24h ?? 0) >= 0 ? 'success' : 'error'}
                    />
                  </TableCell>
                  <TableCell align="right">
                    ${item.coin.market_cap.toLocaleString()}
                  </TableCell>
                  <TableCell align="right">
                    {item.addedAt}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      color="error"
                      onClick={() => dispatch(removeFromWatchlist(item.id))}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Box mt={4}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Add From Market
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Coin</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">24h %</TableCell>
                <TableCell align="right">Add</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coins.slice(0, 10).map((coin) => {
                const alreadyAdded = items.some((item) => item.coin.id === coin.id)
                return (
                  <TableRow key={coin.id} hover>
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
                      <Tooltip title={alreadyAdded ? 'Already in watchlist' : 'Add to watchlist'}>
                        <span>
                          <IconButton
                            size="small"
                            color="primary"
                            disabled={alreadyAdded}
                            onClick={() => handleAdd(coin.id)}
                          >
                            <BookmarkAddIcon fontSize="small" />
                          </IconButton>
                        </span>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}

export default Watchlist;