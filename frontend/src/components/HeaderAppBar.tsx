import * as React from 'react'
import { AppBar, IconButton, Theme, Toolbar, Typography } from '@material-ui/core'
import { Route, Switch, useHistory } from 'react-router'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme: Theme) => ({
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
  return (
    <AppBar position='static'>
      <Toolbar variant='dense'>
        <Switch>
          <Route path='/claim/'>
            <BackButton />
            <Typography variant='h6'>
              Claim
            </Typography>
          </Route>
          <Route path='/'>
            <Typography variant='h6'>
              Claims
            </Typography>
          </Route>
        </Switch>
      </Toolbar>
    </AppBar>
  )
}
