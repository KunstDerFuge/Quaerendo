import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import { HeaderAppBar } from './HeaderAppBar'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import MainTheme from './MainTheme'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ClaimList from './ClaimsList'
import ClaimDetails from './ClaimDetails'
import EvidenceDetails from './EvidenceDetails'
import SubmitEvidence from './SubmitEvidence'
import Footer from './Footer'
import SubmitClaim from './SubmitClaim'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import RegistrationPage from './RegistrationPage'
import { RestfulProvider } from 'restful-react'
import LoginPage from './LoginPage'
import { AuthContext } from './auth'
import ReviewPage from './ReviewPage'
import NavigationDrawer from './NavigationDrawer'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    minHeight: '100vh'
  },
  fullWidth: {
    width: '100%'
  },
  content: {
    flex: 1
  },
  mainWindow: {
    flex: 1
  }
}))

function App() {
  const classes = useStyles()

  const existingToken = localStorage.getItem('token')
  const [authToken, setAuthToken] = React.useState(existingToken)

  const setToken = (token: string) => {
    localStorage.setItem('token', token)
    setAuthToken(token)
    console.log(token)
  }

  return (
    <ThemeProvider theme={MainTheme}>
      <AuthContext.Provider value={{authToken, setAuthToken: setToken}}>
        <RestfulProvider
          base=''
          // @ts-ignore
          requestOptions={() => ({headers: {Authorization: authToken ? 'TOKEN ' + authToken : ''}})}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Router>
              <div className={classes.root}>
                <NavigationDrawer />
                <Grid container direction='column' alignContent='space-between' className={classes.mainWindow}>
                  <HeaderAppBar />
                  <Grid item className={classes.content}>
                    <Switch>
                      <Route path='/claim/:id'
                             component={(routerProps: any) => <ClaimDetails id={routerProps.match.params.id} />} />
                      <Route path='/evidence/:id'
                             component={(routerProps: any) => <EvidenceDetails id={routerProps.match.params.id} />} />
                      <Route path='/submit/claim'
                             component={SubmitClaim} />
                      <Route path='/submit/evidence/for/:id'
                             component={(routerProps: any) => <SubmitEvidence id={routerProps.match.params.id} />} />
                      <Route path='/review'
                             component={ReviewPage} />
                      <Route path='/register'
                             component={RegistrationPage} />
                      <Route path='/login'
                             component={LoginPage} />
                      <Route path='/'>
                        <ClaimList />
                      </Route>
                    </Switch>
                  </Grid>
                  <Footer />
                </Grid>
              </div>
            </Router>
          </MuiPickersUtilsProvider>
        </RestfulProvider>
      </AuthContext.Provider>
    </ThemeProvider>
  )
}

export default App
