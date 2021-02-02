import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import { AuthProvider } from './hooks/useAuth'
import { theme } from './theme/theme'
import { Routes } from './Routes'

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
