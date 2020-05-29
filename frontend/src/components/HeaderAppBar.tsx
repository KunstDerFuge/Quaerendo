import * as React from 'react'
import { AppBar, IconButton, Theme, Toolbar, Typography } from '@material-ui/core'
import { Route, Switch, useHistory } from 'react-router'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme: Theme) => ({
  roboto: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '1.25rem'
  },
  contrastButton: {
    color: theme.palette.primary.contrastText,
    marginLeft: theme.spacing(-2)
  }
}))

const BackButton: React.FC<{}> = () => {
  const classes = useStyles()
  const history = useHistory()
  return (
    <IconButton aria-label='back' className={classes.contrastButton} onClick={() => history.goBack()}>
      <ArrowBackIcon />
    </IconButton>
  )
}

export function HeaderAppBar() {
  const classes = useStyles()
  return (
    <AppBar position='sticky'>
      <Toolbar variant='dense'>
        <Switch>
          <Route path='/claim/'>
            <BackButton />
            <Typography variant='h6' className={classes.roboto}>
              Claim
            </Typography>
          </Route>
          <Route path='/evidence/'>
            <BackButton />
            <Typography variant='h6' className={classes.roboto}>
              Evidence
            </Typography>
          </Route>
          <Route path='/submit/evidence/'>
            <BackButton />
            <Typography variant='h6' className={classes.roboto}>
              Submit Evidence
            </Typography>
          </Route>
          <Route path='/'>
            <Typography variant='h6' className={classes.roboto}>
              Claims
            </Typography>
          </Route>
        </Switch>
      </Toolbar>
    </AppBar>
  )
}
