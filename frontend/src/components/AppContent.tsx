import * as React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavigationDrawer from './NavigationDrawer'
import { Grid } from '@material-ui/core'
import { HeaderAppBar } from './HeaderAppBar'
import ClaimDetails from './ClaimDetails'
import EvidenceDetails from './EvidenceDetails'
import SubmitClaim from './SubmitClaim'
import SubmitEvidence from './SubmitEvidence'
import ReviewPage from './ReviewPage'
import RegistrationPage from './RegistrationPage'
import LoginPage from './LoginPage'
import ClaimList from './ClaimsList'
import Footer from './Footer'
import { makeStyles } from '@material-ui/core/styles'
import { RestfulProvider } from 'restful-react'
import { useAuth } from './auth'

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

const AppContent: React.FC<{}> = () => {
  const classes = useStyles()

  // @ts-ignore
  const {authToken} = useAuth()

  return (
    <RestfulProvider
      base=''
      // @ts-ignore
      requestOptions={authToken ? {headers: {Authorization: 'TOKEN ' + authToken}} : {}}>
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
    </RestfulProvider>
  )
}

export default AppContent
