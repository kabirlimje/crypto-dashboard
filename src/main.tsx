import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { store } from './app/store'
import {ThemeProvider, CssBaseline, createTheme} from "@mui/material";
import { Provider } from 'react-redux';

const darkMode = createTheme({
  palette : {
    mode : "dark",
    primary : {
      main: '#00d084',
    },
    secondary : {
      main: '#f6a623',
    }
  }
})

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <StrictMode>
    <Provider store={store}>
    <ThemeProvider theme={darkMode}>
      {/* CssBaseline is the MUI component removes all the Browser css styles */}
      <CssBaseline /> 
      <App />
    </ThemeProvider>
    </Provider>
  </StrictMode>
)
