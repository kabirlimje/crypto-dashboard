import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'

const pages = [
  { label: 'Market', path: '/' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Watchlist', path: '/watchlist' },
  { label: 'Dashboard', path: '/dashboard' },
]

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <AppBar position="static" color="default" elevation={0}
      sx={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
    >
      <Toolbar>
        <Typography variant="h6" fontWeight="bold"
          color="primary" sx={{ flexGrow: 0, mr: 4 }}
        >
          CryptoTracker
        </Typography>
        <Box display="flex" gap={1}>
          {pages.map((page) => (
            <Button
              key={page.path}
              onClick={() => navigate(page.path)}
              color={location.pathname === page.path ? 'primary' : 'inherit'}
              sx={{
                fontWeight: location.pathname === page.path ? 'bold' : 'normal',
                borderBottom: location.pathname === page.path
                  ? '2px solid #00d084'
                  : '2px solid transparent',
                borderRadius: 0,
              }}
            >
              {page.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;