import * as React from 'react'
import { Card, CardContent, Grid, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { ReactElement } from 'react'

interface CardPageProps {
  invisible?: Boolean
  title?: string
  actions?: ReactElement
  width?: string
}

const useStyles = makeStyles((theme: Theme) => ({
  card: (props: CardPageProps) => ({
    margin: theme.spacing(2),
    width: props.width ? props.width : '50em',
    maxWidth: '90%'
  })
}))

const CardPage: React.FC<CardPageProps> = (props) => {
  const classes = useStyles(props)
  return (
    <>
      {
        !props.invisible &&
        <Card className={classes.card} elevation={8}>
          <CardContent>
            <Grid container direction='column' spacing={2}>
              {
                props.title &&
                <Grid item>
                  <Typography variant='h5' gutterBottom>{props.title}</Typography>
                </Grid>
              }
              {props.children}
            </Grid>
          </CardContent>
          {props.actions}
        </Card>
      }
    </>
  )
}

export default CardPage
