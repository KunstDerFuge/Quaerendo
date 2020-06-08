import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CommentRoundedIcon from '@material-ui/icons/CommentRounded'
import RateReviewRoundedIcon from '@material-ui/icons/RateReviewRounded'
import { Divider, Drawer, Fab, Grid, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { HeaderAppBar } from './HeaderAppBar'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import MainTheme from './MainTheme'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import ClaimList from './ClaimsList'
import ClaimDetails from './ClaimDetails'
import EvidenceDetails from './EvidenceDetails'
import SubmitEvidence from './SubmitEvidence'
import Footer from './Footer'
import AddCommentRoundedIcon from '@material-ui/icons/AddCommentRounded'
import SubmitClaim from './SubmitClaim'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import RegistrationPage from './RegistrationPage'
import { RestfulProvider } from 'restful-react'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    minHeight: '100vh'
  },
  fullWidth: {
    width: '100%'
  },
  drawer: {
    width: 240,
    flexShrink: 0
  },
  drawerPaper: {
    width: 240
  },
  content: {
    flex: 1
  },
  mainWindow: {
    flex: 1
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  submitClaimFab: {
    marginLeft: 'auto',
    marginRight: 'auto'
  }
}))

function App() {
  const classes = useStyles()

  const token = localStorage.getItem('token')
  console.log(token)

  return (
    <ThemeProvider theme={MainTheme}>
      <RestfulProvider
        base=''
        // @ts-ignore
        requestOptions={() => ({headers: {Authorization: 'TOKEN ' + token}})}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Router>
            <div className={classes.root}>
              <Drawer
                className={classes.drawer}
                variant='permanent'
                classes={{
                  paper: classes.drawerPaper
                }}
                anchor="left"
              >
                <Divider />
                <List>
                  <ListItem button>
                    <ListItemIcon>
                      <CommentRoundedIcon color='primary' />
                    </ListItemIcon>
                    <ListItemText primary='Popular Claims' />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <RateReviewRoundedIcon color='primary' />
                    </ListItemIcon>
                    <ListItemText primary='Review' />
                  </ListItem>
                  <ListItem>
                    <Link to='/submit/claim' className={classes.submitClaimFab}>
                      <Fab size='medium' variant="extended" color="secondary" aria-label="add">
                        <AddCommentRoundedIcon className={classes.extendedIcon} />
                        Submit Claim
                      </Fab>
                    </Link>
                  </ListItem>
                </List>
              </Drawer>
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
                    <Route path='/register'
                           component={RegistrationPage} />
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
    </ThemeProvider>
  )
}

export default App
