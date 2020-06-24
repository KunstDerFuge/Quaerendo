import * as React from 'react'
import { useEffect } from 'react'
import QuaerendoLogo from './QuaerendoLogo'
import { Badge, Divider, Drawer, Fab, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import CommentRoundedIcon from '@material-ui/icons/CommentRounded'
import RateReviewRoundedIcon from '@material-ui/icons/RateReviewRounded'
import { useHistory } from 'react-router-dom'
import AddCommentRoundedIcon from '@material-ui/icons/AddCommentRounded'
import { makeStyles } from '@material-ui/core/styles'
import AvatarPanel from './AvatarPanel'
import { ReviewInvitation, useApiReviewInvitations } from '../openapi-types'
import { useAuth } from './auth'

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 260,
    flexShrink: 0
  },
  drawerPaper: {
    width: 260,
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
  },
  badge: {
    paddingRight: '0.1em'
  }
}))

const NavigationDrawer: React.FC<{}> = () => {
  const classes = useStyles()
  const history = useHistory()
  const [reviewInvitations, setReviewInvitations] = React.useState<ReviewInvitation[]>(null)

  const {data, loading, refetch: refetchInvitations} = useApiReviewInvitations({
    resolve: (data) => {
      setReviewInvitations(data)
      return data
    }
  })

  // @ts-ignore
  const {authToken, setAuthToken} = useAuth()

  function updateInvitations() {
    console.log('Token is ' + authToken)
    authToken && refetchInvitations()
  }

  useEffect(() => {
    const timer = setInterval(updateInvitations, 15000)
    return () => clearInterval(timer)
  }, [authToken])

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
            <ListItemText>
              <Badge color='primary' variant='dot' invisible={!reviewInvitations || reviewInvitations.length === 0}
                     className={classes.badge}>
                Review
              </Badge>
            </ListItemText>
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
