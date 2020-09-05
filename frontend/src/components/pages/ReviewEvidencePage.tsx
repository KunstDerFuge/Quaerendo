import * as React from 'react'
import { FormEvent } from 'react'
import {
  EvidenceReview,
  ReviewInvitationDetails,
  useApiEvidenceReviewsCreate,
  useApiReviewInvitationsDetailsDestroy,
  useApiReviewInvitationsDetailsRetrieve
} from '../../openapi-types'
import CardPageContainer from '../layout/CardPageContainer'
import EvidenceReviewForm from '../forms/EvidenceReviewForm'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Fab,
  Grid,
  Theme,
  Typography
} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import SourceInfo from '../SourceInfo'
import { makeStyles } from '@material-ui/styles'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import { useHistory } from 'react-router'

interface ReviewEvidencePageProps {
  id: number
}

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    margin: theme.spacing(2)
  },
  description: {
    marginTop: theme.spacing(1)
  },
  expansionPanel: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2)
  },
  fullWidth: {
    width: '100%'
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  extendedFabIcon: {
    marginRight: theme.spacing(1)
  }
}))

const ReviewEvidencePage: React.FC<ReviewEvidencePageProps> = (props) => {
  const classes = useStyles()
  const history = useHistory()
  const [reviewInfo, setReviewInfo] = React.useState<ReviewInvitationDetails>(null)
  const [showSource, setShowSource] = React.useState(true)
  const [showClaim, setShowClaim] = React.useState(true)
  const [showSkipDialog, setShowSkipDialog] = React.useState(false)

  const {loading} = useApiReviewInvitationsDetailsRetrieve({
    id: props.id.toString(),
    resolve: (data) => {
      setReviewInfo(data)
      return data
    }
  })

  const {mutate: skipReview} = useApiReviewInvitationsDetailsDestroy({})

  const {mutate: submitReview} = useApiEvidenceReviewsCreate({})

  function handleSubmitForm(event: FormEvent, review: EvidenceReview) {
    event.preventDefault()
    review.evidence = reviewInfo.evidence.id
    submitReview(review).then((response: EvidenceReview) => {
      console.log(response)
      history.goBack()
      return response
    })
  }

  function handleCancelReview() {
    skipReview(props.id.toString()).then(() => {
      history.goBack()
    })
  }

  return (
    <CardPageContainer>
      <Grid item className={classes.fullWidth}>
        <div className={classes.expansionPanel}>
          <ExpansionPanel expanded={showClaim} onChange={() => setShowClaim(!showClaim)}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography variant='h2'>Claim</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container direction='column'>
                <Grid item>
                  <Typography variant='h2'>
                    {
                      loading ?
                        <Skeleton />
                        :
                        '“' + reviewInfo.evidence.claim.claim_text + '”'
                    }
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant='body1'>
                    {
                      loading ?
                        <Skeleton />
                        :
                        reviewInfo.evidence.claim.description
                    }
                  </Typography>
                </Grid>
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
        <div className={classes.expansionPanel}>
          <ExpansionPanel expanded={showSource} onChange={() => setShowSource(!showSource)}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography variant='h2'>Source</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <SourceInfo source={!reviewInfo ? undefined : reviewInfo.evidence.source_of_evidence}
                          loading={!reviewInfo} />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </Grid>
      <EvidenceReviewForm visible submitForm={handleSubmitForm} />
      <Fab variant='extended' color='secondary' className={classes.fab} onClick={() => setShowSkipDialog(true)}>
        <CloseRoundedIcon className={classes.extendedFabIcon} />
        Skip Review
      </Fab>
      <Dialog
        open={showSkipDialog}
        onClose={() => setShowSkipDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Really skip this review?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Skip this review if you can't answer objectively due to bias, or if you don't fully understand the evidence.
            You won't be asked to review this evidence again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSkipDialog(false)} color="secondary" autoFocus>
            Go back
          </Button>
          <Button onClick={handleCancelReview} color="primary">
            Confirm Skip Review
          </Button>
        </DialogActions>
      </Dialog>
    </CardPageContainer>
  )
}

export default ReviewEvidencePage