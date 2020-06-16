import * as React from 'react'
import QuaerendoLogo from './QuaerendoLogo'
import { Divider, Drawer, Fab, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import CommentRoundedIcon from '@material-ui/icons/CommentRounded'
import RateReviewRoundedIcon from '@material-ui/icons/RateReviewRounded'
import { useHistory } from 'react-router-dom'
import AddCommentRoundedIcon from '@material-ui/icons/AddCommentRounded'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    flexShrink: 0
  },
  drawerPaper: {
    width: 240,
    justifyContent: 'space-between'
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  submitClaimFab: {
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  mainNavigationContent: {
    display: 'flex',
    flexDirection: 'column'
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
      <div className={classes.mainNavigationContent}>
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
            <Fab size='medium' variant="extended" color="secondary" aria-label="add" className={classes.submitClaimFab}
                 onClick={() => history.push('/submit/claim')}>
              <AddCommentRoundedIcon className={classes.extendedIcon} />
              Submit Claim
            </Fab>
          </ListItem>
        </List>
      </div>
      <AvatarPanel />
    </Drawer>
  )
}

export default NavigationDrawer
