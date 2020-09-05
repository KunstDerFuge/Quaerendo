import { createMuiTheme } from '@material-ui/core'

const MainTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#800d0d'
    },
    secondary: {
      main: '#0e2d5e'
    }
  },
  typography: {
    fontFamily: 'gill-sans-roman',
    h1: {
      fontFamily: 'quadraat',
      fontSize: '1.75rem',
      letterSpacing: 'unset',
      fontVariantNumeric: 'lining-nums'
    },
    h2: {
      fontFamily: 'quadraat',
      fontSize: '1.5rem',
      fontVariantNumeric: 'lining-nums'
    },
    h3: {
      fontFamily: 'quadraat',
      fontSize: '1.35rem',
      fontVariantNumeric: 'lining-nums'
    },
    overline: {
      fontSize: '0.8rem',
      fontWeight: 600,
      letterSpacing: '0.08333em'
    },
    body1: {
      fontFamily: 'quadraat',
      fontSize: '1.1rem',
      color: '#4D4D4D',
      fontVariantNumeric: 'lining-nums',
      textRendering: 'optimizeLegibility'
    },
    body2: {
      fontFamily: 'quadraat',
      fontSize: '1.1rem',
      color: '#5D5D5D',
      textRendering: 'optimizeLegibility'
    },
    subtitle1: {
      color: '#6D6D6D'
    },
    button: {
      fontFamily: 'gill-sans-roman',
      fontSize: '0.9rem',
      letterSpacing: '0.02857em'
    }
  }
})

export default MainTheme