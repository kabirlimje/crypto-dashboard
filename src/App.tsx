import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'
import MarketTable from './features/market/MarketTable'
import Portfolio from './pages/Portfolio'
import Watchlist from './pages/Watchlist'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
      <Box>
        <Navbar />
        <Routes>
          <Route path="/" element={<MarketTable />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Box>
    </BrowserRouter>
  )
}

export default App;