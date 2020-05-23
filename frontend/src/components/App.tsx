import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CommentRoundedIcon from '@material-ui/icons/CommentRounded'
import RateReviewRoundedIcon from '@material-ui/icons/RateReviewRounded'
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { HeaderAppBar } from './HeaderAppBar'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import MainTheme from './MainTheme'
import ClaimPreview from './ClaimPreview'
import { useGet } from 'restful-react'
import { Claim } from '../openapi-types'
import { BrowserRouter as Router } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: 1000
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
    flexGrow: 1
  }
}))

function App() {
  const classes = useStyles()
  const {data} = useGet({
    path: '/api/claims/'
  })

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
                  <CommentRoundedIcon />
                </ListItemIcon>
                <ListItemText primary='Popular Claims' />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <RateReviewRoundedIcon />
                </ListItemIcon>
                <ListItemText primary='Review' />
              </ListItem>
            </List>
          </Drawer>
          <main className={classes.content}>
            <HeaderAppBar />
            {
              data ?
                data.map((claim: Claim, index: number) =>
                  <ClaimPreview key={index} claim={claim} />
                )
                :
                ''
            }
          </main>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
