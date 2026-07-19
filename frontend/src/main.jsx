import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './style.css'

import { SnackbarProvider } from './context/SnackbarContext.jsx'

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
  </React.StrictMode>,
)
