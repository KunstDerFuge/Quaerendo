import * as React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  logo: {
    alignSelf: 'center',
    margin: '3px',
    display: 'flex',
    fontVariantLigatures: 'contextual',
    WebkitFontVariantLigatures: 'contextual'
  }
}))

const QuaerendoLogo: React.FC<{}> = () => {
  const classes = useStyles()

  return (
    <Typography color='primary' variant='h4' className={classes.logo}>
      Quærendo
    </Typography>
  )
}

export default QuaerendoLogo
