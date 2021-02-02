import { unstable_createMuiStrictModeTheme as createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'

import { themes } from './themes'

const mode = localStorage.getItem('themeMode') || 'light'
const palette = themes[mode]

export const theme = responsiveFontSizes(
  createMuiTheme({
    palette: palette[mode],
    layout: {
      contentWidth: 1140,
    },
    typography: {
      fontFamily: 'Lato',
    },
    zIndex: {
      appBar: 1200,
      drawer: 1100,
    },
    overrides: {
    },
  })
)
