import * as React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavigationDrawer from './layout/NavigationDrawer'
import { Grid } from '@material-ui/core'
import { HeaderAppBar } from './layout/HeaderAppBar'
import ClaimDetails from './ClaimDetails'
import EvidenceDetails from './EvidenceDetails'
import SubmitClaim from './SubmitClaim'
import SubmitEvidence from './SubmitEvidence'
import ReviewInvitationPage from './pages/ReviewInvitationPage'
import RegistrationPage from './pages/RegistrationPage'
import LoginPage from './pages/LoginPage'
import ClaimList from './ClaimsList'
import Footer from './layout/Footer'
import { makeStyles } from '@material-ui/core/styles'
import { RestfulProvider } from 'restful-react'
import { useAuth } from './utilities/auth'
import ReviewEvidencePage from './pages/ReviewEvidencePage'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    justifyContent: 'center'
  },
  fullWidth: {
    width: '100%'
  },
  content: {
    flex: 1,
  },
  mainWindow: {
    flex: 1,
    maxWidth: '55em',
    border: '1px solid rgba(0, 0, 0, 0.12)',
    borderBottom: 0,
    borderTop: 0,
    backgroundColor: '#f3f3f3'
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
                <Route path='/review/:id'
                       component={(routerProps: any) => <ReviewEvidencePage id={routerProps.match.params.id} />} />
                <Route path='/review'
                       component={ReviewInvitationPage} />
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
