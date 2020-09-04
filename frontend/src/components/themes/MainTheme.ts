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
      letterSpacing: 'unset'
    },
    h5: {
      fontFamily: 'quadraat',
      fontSize: '1.6rem'
    },
    h6: {
      fontFamily: 'quadraat',
      fontSize: '1.35rem'
    },
    body1: {
      fontFamily: 'quadraat',
      fontSize: '1.1rem',
      textRendering: 'optimizeLegibility'
    }
  }
})

export default MainTheme