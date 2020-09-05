import * as React from 'react'
import { Typography, useMediaQuery, useTheme } from '@material-ui/core'
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
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Typography color='primary' variant='h1' className={classes.logo}>
      {
        isMobile ?
          'Q'
          :
          'Quærendo'
      }
    </Typography>
  )
}

export default QuaerendoLogo
