import * as React from 'react'
import { Grid, IconButton, Popover, Theme, Typography } from '@material-ui/core'
import InfoRoundedIcon from '@material-ui/icons/InfoRounded'
import { makeStyles } from '@material-ui/styles'
import { ReactElement } from 'react'

const useStyles = makeStyles((theme: Theme) => ({
  garamond: {
    fontFamily: 'garamond-premier-pro, serif'
  },
  popover: {
    margin: theme.spacing(1),
    maxWidth: '30em'
  }
}))

interface InfoTooltipProps {
  fieldName: string
  required: boolean
  description: string | ReactElement
}

const InfoTooltip: React.FC<InfoTooltipProps> = (props) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <InfoRoundedIcon />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}>
        <Grid container direction='column' spacing={1} className={classes.popover}>
          <Grid item>
            <Typography variant='subtitle1'>
              {props.fieldName}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='body1' className={classes.garamond}>
              <i>
              {
                props.required ?
                  'Required'
                  :
                  'Optional'
              }
              </i>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='body1'>
              {props.description}
            </Typography>
          </Grid>
        </Grid>
      </Popover>
    </>
  )
}

export default InfoTooltip
