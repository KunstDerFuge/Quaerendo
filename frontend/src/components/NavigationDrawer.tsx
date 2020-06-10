import * as React from 'react'
import QuaerendoLogo from './QuaerendoLogo'
import { Divider, Drawer, Fab, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import CommentRoundedIcon from '@material-ui/icons/CommentRounded'
import RateReviewRoundedIcon from '@material-ui/icons/RateReviewRounded'
import { Link, Redirect, useHistory } from 'react-router-dom'
import AddCommentRoundedIcon from '@material-ui/icons/AddCommentRounded'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    flexShrink: 0
  },
  drawerPaper: {
    width: 240
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  submitClaimFab: {
    marginLeft: 'auto',
    marginRight: 'auto'
  }
}))

const NavigationDrawer: React.FC<{}> = () => {
  const classes = useStyles()
  const history = useHistory()

  return (
    <Drawer
      className={classes.drawer}
      variant='permanent'
      classes={{
        paper: classes.drawerPaper
      }}
      anchor="left"
    >
      <QuaerendoLogo />
      <Divider />
      <List>
        <ListItem button onClick={() => history.push('/')}>
          <ListItemIcon>
            <CommentRoundedIcon color='primary' />
          </ListItemIcon>
          <ListItemText primary='Popular Claims' />
        </ListItem>
        <ListItem button onClick={() => history.push('/review')}>
          <ListItemIcon>
            <RateReviewRoundedIcon color='primary' />
          </ListItemIcon>
          <ListItemText primary='Review' />
        </ListItem>
        <ListItem>
          <Link to='/submit/claim' className={classes.submitClaimFab}>
            <Fab size='medium' variant="extended" color="secondary" aria-label="add">
              <AddCommentRoundedIcon className={classes.extendedIcon} />
              Submit Claim
            </Fab>
          </Link>
        </ListItem>
      </List>
    </Drawer>
  )
}

export default NavigationDrawer
