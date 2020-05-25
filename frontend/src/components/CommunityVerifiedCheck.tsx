import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Theme, Tooltip } from '@material-ui/core'
import DoneRoundedIcon from '@material-ui/icons/DoneRounded'

const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    marginLeft: theme.spacing(0.5)
  }
}))

const CommunityVerifiedCheck: React.FC<{}> = () => {
  const classes = useStyles()
  return (
    <Tooltip title='Community Verified'>
      <DoneRoundedIcon fontSize='small' className={classes.icon} aria-label='Community Verified' />
    </Tooltip>
  )
}

export default CommunityVerifiedCheck
