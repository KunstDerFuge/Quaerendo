import * as React from 'react'
import { FormEvent } from 'react'
import {
  EvidenceReview,
  ReviewInvitationDetails,
  useApiEvidenceReviewsCreate,
  useApiReviewInvitationsDetailsRetrieve
} from '../openapi-types'
import CardPageContainer from './CardPageContainer'
import EvidenceReviewForm from './EvidenceReviewForm'
import {
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
import SourceInfo from './SourceInfo'
import { makeStyles } from '@material-ui/styles'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'

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
  const [reviewInfo, setReviewInfo] = React.useState<ReviewInvitationDetails>(null)
  const [showSource, setShowSource] = React.useState(true)
  const [showClaim, setShowClaim] = React.useState(true)

  const {data, loading} = useApiReviewInvitationsDetailsRetrieve({
    id: props.id.toString(),
    resolve: (data) => {
      setReviewInfo(data)
      return data
    }
  })

  const {mutate: submitReview, loading: submitLoading} = useApiEvidenceReviewsCreate({})

  function handleSubmitForm(event: FormEvent, review: EvidenceReview) {
    event.preventDefault()
    review.evidence = reviewInfo.evidence.id
    submitReview(review).then((response: EvidenceReview) => {
      console.log(response)
      return response
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
              <Typography variant='h5'>Claim</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container direction='column'>
                <Grid item>
                  <Typography variant='h5'>
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
              <Typography variant='h5'>Source</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <SourceInfo source={!reviewInfo ? undefined : reviewInfo.evidence.source_of_evidence}
                          loading={!reviewInfo} />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </Grid>
      <EvidenceReviewForm visible submitForm={handleSubmitForm} />
      <Fab variant='extended' color='secondary' className={classes.fab}>
        <CloseRoundedIcon className={classes.extendedFabIcon} />
        Skip Review
      </Fab>
    </CardPageContainer>
  )
}

export default ReviewEvidencePage