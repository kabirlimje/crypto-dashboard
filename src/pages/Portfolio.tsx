import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToPortfolio, removeFromPortfolio } from '../features/portfolio/portfolioSlice'
import type { RootState, AppDispatch } from '../app/store'
import type { PortfolioItem } from '../types'
import {
  Box, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper,
  Avatar, Button, TextField, MenuItem,
  Select, FormControl, InputLabel, Chip, Dialog,
  DialogTitle, DialogContent, DialogActions
} from '@mui/material'

const Portfolio = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { items } = useSelector((state: RootState) => state.portfolio)
  const { coins } = useSelector((state: RootState) => state.market)

  const [open, setOpen] = useState(false)
  const [selectedCoinId, setSelectedCoinId] = useState('')
  const [buyPrice, setBuyPrice] = useState('')
  const [quantity, setQuantity] = useState('')

  const handleAdd = () => {
    const coin = coins.find((c) => c.id === selectedCoinId)
    if (!coin || !buyPrice || !quantity) return

    const newItem: PortfolioItem = {
      id: `${coin.id}-${Date.now()}`,
      coin,
      buyPrice: parseFloat(buyPrice),
      quantity: parseFloat(quantity),
      addedAt: new Date().toLocaleDateString(),
    }

    dispatch(addToPortfolio(newItem))
    setOpen(false)
    setSelectedCoinId('')
    setBuyPrice('')
    setQuantity('')
  }

  const totalValue = items.reduce((acc, item) => {
    return acc + item.coin.current_price * item.quantity
  }, 0)

  const totalInvested = items.reduce((acc, item) => {
    return acc + item.buyPrice * item.quantity
  }, 0)

  const totalPnL = totalValue - totalInvested

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          My Portfolio
        </Typography>
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
          + Add Coin
        </Button>
      </Box>

      <Box display="flex" gap={2} mb={3}>
        <Paper sx={{ p: 2, flex: 1, textAlign: 'center' }}>
          <Typography color="text.secondary" fontSize={13}>Total Value</Typography>
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
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Coin</TableCell>
              <TableCell align="right">Buy Price</TableCell>
              <TableCell align="right">Current Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Current Value</TableCell>
              <TableCell align="right">P&L</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography color="text.secondary" py={3}>
                    No coins added yet — click "+ Add Coin" to start
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => {
                const currentValue = item.coin.current_price * item.quantity
                const invested = item.buyPrice * item.quantity
                const pnl = currentValue - invested
                const pnlPercent = ((pnl / invested) * 100).toFixed(2)

                return (
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
                      ${item.buyPrice.toLocaleString()}
                    </TableCell>
                    <TableCell align="right">
                      ${item.coin.current_price.toLocaleString()}
                    </TableCell>
                    <TableCell align="right">
                      {item.quantity}
                    </TableCell>
                    <TableCell align="right">
                      ${currentValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell align="right">
                      <Chip
                        label={`${pnl >= 0 ? '+' : ''}$${pnl.toFixed(2)} (${pnlPercent}%)`}
                        size="small"
                        color={pnl >= 0 ? 'success' : 'error'}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        size="small"
                        color="error"
                        onClick={() => dispatch(removeFromPortfolio(item.id))}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add Coin to Portfolio</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <FormControl fullWidth>
              <InputLabel>Select Coin</InputLabel>
              <Select
                value={selectedCoinId}
                label="Select Coin"
                onChange={(e) => setSelectedCoinId(e.target.value)}
              >
                {coins.map((coin) => (
                  <MenuItem key={coin.id} value={coin.id}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Avatar src={coin.image} sx={{ width: 20, height: 20 }} />
                      {coin.name} ({coin.symbol.toUpperCase()})
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Buy Price (USD)"
              type="number"
              value={buyPrice}
              onChange={(e) => setBuyPrice(e.target.value)}
              fullWidth
            />
            <TextField
              label="Quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleAdd}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Portfolio;