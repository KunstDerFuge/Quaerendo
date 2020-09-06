import * as React from 'react'
import { ReactElement, useEffect } from 'react'
import QuaerendoLogo from './QuaerendoLogo'
import {
  Badge,
  Divider,
  Drawer,
  Fab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme
} from '@material-ui/core'
import CommentRoundedIcon from '@material-ui/icons/CommentRounded'
import RateReviewRoundedIcon from '@material-ui/icons/RateReviewRounded'
import { useHistory } from 'react-router-dom'
import AddCommentRoundedIcon from '@material-ui/icons/AddCommentRounded'
import { makeStyles } from '@material-ui/core/styles'
import { ReviewInvitation, useApiReviewInvitations } from '../../openapi-types'
import { useAuth } from '../utilities/auth'
import AvatarPanel from './AvatarPanel'

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.down('md')]: {
      width: 80
    },
    [theme.breakpoints.up('lg')]: {
      width: 260
    },
    flexShrink: 0
  },
  drawerPaper: {
    [theme.breakpoints.down('md')]: {
      width: 80
    },
    [theme.breakpoints.up('lg')]: {
      width: 260
    },
    justifyContent: 'space-between',
    left: 'unset',
    right: 'unset',
    border: '1px solid rgba(0, 0, 0, 0.12)'
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
  },
  listItem: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    fontFamily: 'gill-sans-roman',
    fontSize: '1.1em'
  },
  mobileListItem: {
    justifyContent: 'center',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  mobileCenteredIcon: {
    justifyContent: 'center'
  },
  logoContainer: {
    minHeight: '46px',
    display: 'flex',
    alignSelf: 'center'
  }
}))

interface NavigationItemProps {
  onClick: () => void
  icon: ReactElement
  text: string
  hasBadge?: boolean
}

const NavigationItem: React.FC<NavigationItemProps> = (props) => {
  const classes = useStyles()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <ListItem button onClick={props.onClick} className={isMobile ? classes.mobileListItem : classes.listItem}>
      {
        isMobile ?
          <Badge color='primary' variant='dot'
                 invisible={!props.hasBadge}
                 className={classes.badge}>
            <ListItemIcon className={classes.mobileCenteredIcon}>
              {props.icon}
            </ListItemIcon>
          </Badge>
          :
          <>
            <ListItemIcon>
              {props.icon}
            </ListItemIcon>
            <Badge color='primary' variant='dot'
                   invisible={!props.hasBadge}
                   className={classes.badge}>
              <ListItemText disableTypography primary={props.text} />
            </Badge>
          </>
      }
    </ListItem>
  )
}

const NavigationDrawer: React.FC<{}> = () => {
  const classes = useStyles()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const history = useHistory()
  const [reviewInvitations, setReviewInvitations] = React.useState<ReviewInvitation[]>(null)

  const {refetch: refetchInvitations} = useApiReviewInvitations({
    resolve: (data) => {
      setReviewInvitations(data)
      return data
    }
  })

  // @ts-ignore
  const {authToken} = useAuth()

  function updateInvitations() {
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
    >
      <div className={classes.mainNavigationContent}>
        <div className={classes.logoContainer}>
          <QuaerendoLogo />
        </div>
        <Divider />
        <List>
          <NavigationItem
            onClick={() => history.push('/')}
            icon={<CommentRoundedIcon color='primary' />}
            text='Popular Claims'
          />
          <NavigationItem
            onClick={() => history.push('/review')}
            icon={<RateReviewRoundedIcon color='primary' />}
            text='Review'
            hasBadge={!!reviewInvitations && reviewInvitations.length > 0}
          />
          <ListItem>
            <Fab size='medium' variant={isMobile ? 'round' : 'extended'} color='secondary' aria-label='submit claim'
                 className={classes.submitClaimFab}
                 onClick={() => history.push('/submit/claim')}>
              <AddCommentRoundedIcon className={!isMobile ? classes.extendedIcon : ''} />
              {!isMobile && 'Submit Claim'}
            </Fab>
          </ListItem>
        </List>
      </div>
      <AvatarPanel />
    </Drawer>
  )
}

export default NavigationDrawer
