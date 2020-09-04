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
    h4: {
      fontFamily: 'quadraat',
      fontSize: '2rem',
      letterSpacing: 'unset',
      fontVariantNumeric: 'lining-nums'
    },
    h5: {
      fontFamily: 'quadraat',
      fontSize: '1.6rem',
      fontVariantNumeric: 'lining-nums'
    },
    h6: {
      fontFamily: 'quadraat',
      fontSize: '1.35rem',
      fontVariantNumeric: 'lining-nums'
    },
    body1: {
      fontFamily: 'quadraat',
      fontSize: '1.1rem',
      fontVariantNumeric: 'lining-nums',
      textRendering: 'optimizeLegibility'
    },
    body2: {
      fontFamily: 'gill-sans-roman',
      fontSize: '1.1rem',
      textRendering: 'optimizeLegibility'
    }
  }
})

export default MainTheme