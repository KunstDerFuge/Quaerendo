import * as React from 'react'
import { Grid, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  hero: {
    minHeight: '40vh'
  }
}))

const LandingPage: React.FC<{}> = () => {
  const classes = useStyles()

  return (
    <Grid container className={classes.root} direction='column'>
      <Grid item className={classes.hero} />
    </Grid>
  )
}

export default LandingPage