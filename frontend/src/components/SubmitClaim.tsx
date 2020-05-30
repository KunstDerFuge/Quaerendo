import * as React from 'react'
import { Card, CardContent, Grid, TextField, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    margin: theme.spacing(2),
    width: '30em'
  }
}))

const SubmitClaim: React.FC<{}> = () => {
  const classes = useStyles()
  return (
    <Grid container direction='column' className={classes.root}>
      <Grid item>
        <Card className={classes.card} elevation={8}>
          <CardContent>
            <Typography variant='h5' gutterBottom>Source of Claim</Typography>
            <TextField fullWidth label="Source URL" variant="outlined" />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default SubmitClaim
