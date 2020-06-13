import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    textAlign: 'center',
    marginTop: 45,
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    fontFamily: 'garamond-premier-pro',
    fontSize: '18px'
  },
  footerPaper: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.primary.main
  },
  gridRoot: {
    width: '100%',
    height: '100%'
  },
  margin: {
    margin: theme.spacing(2)
  }
}))

const Footer: React.FC<{}> = () => {
  const classes = useStyles()
  return (
    <footer className={classes.footer}>
      <Grid container direction='column' className={classes.gridRoot}>
        <Grid item className={classes.margin}>
          <i>Quærendo Invenietis</i>
        </Grid>
      </Grid>
    </footer>
  )
}

export default Footer
