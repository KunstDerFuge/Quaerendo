import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CommentRoundedIcon from '@material-ui/icons/CommentRounded'
import RateReviewRoundedIcon from '@material-ui/icons/RateReviewRounded'
import { Divider, Drawer, Grid, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { HeaderAppBar } from './HeaderAppBar'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import MainTheme from './MainTheme'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ClaimList from './ClaimsList'
import ClaimDetails from './ClaimDetails'
import EvidenceDetails from './EvidenceDetails'
import SubmitEvidence from './SubmitEvidence'
import Footer from './Footer'

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
  }
}))

function App() {
  const classes = useStyles()

  return (
    <ThemeProvider theme={MainTheme}>
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
                <Route path='/submit/evidence/for/:id'
                       component={(routerProps: any) => <SubmitEvidence id={routerProps.match.params.id} />} />
                <Route path='/'>
                  <ClaimList />
                </Route>
              </Switch>
            </Grid>
            <Footer />
          </Grid>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
