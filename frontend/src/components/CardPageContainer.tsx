import * as React from 'react'
import { PropsWithChildren } from 'react'
import { Grid, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
}))

const CardPageContainer: React.FC<PropsWithChildren<{}>> = (props) => {
  const classes = useStyles()
  return (
    <Grid container className={classes.root}>
      {props.children}
    </Grid>
  )
}

export default CardPageContainer
