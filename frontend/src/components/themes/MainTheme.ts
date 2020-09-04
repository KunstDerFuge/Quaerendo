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
      letterSpacing: 'unset'
    },
    h5: {
      fontFamily: 'quadraat',
      fontSize: '1.75rem'
    },
    h6: {
      fontFamily: 'quadraat',
      fontSize: '1.5rem'
    },
    body1: {
      fontFamily: 'quadraat',
      fontSize: '1.1rem',
      textRendering: 'optimizeLegibility'
    }
  }
})

export default MainTheme