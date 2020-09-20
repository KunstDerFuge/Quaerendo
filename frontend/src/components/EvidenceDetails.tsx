import * as React from 'react'
import { Evidence } from '../openapi-types'
import { useGet } from 'restful-react'
import {
  Card,
  CardContent,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Theme,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import SourceInfo from './SourceInfo'
import { Skeleton } from '@material-ui/lab'

interface EvidenceDetailProps {
  id: number
}

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    margin: theme.spacing(2)
  },
  description: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.primary.light,
      textDecoration: 'underline'
    }
  },
  margin: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  expansionPanel: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}))

const EvidenceDetails: React.FC<EvidenceDetailProps> = (props) => {
  const classes = useStyles()
  const [showSource, setShowSource] = React.useState(true)
  const [showReviews, setShowReviews] = React.useState(false)
  let loading = true
  const {data} = useGet({
    path: '/api/evidence/' + props.id
  })
  let evidence: Evidence = undefined
  if (data) {
    evidence = data
    loading = false
  }
  return (
    <>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant='h1' gutterBottom>
            {
              loading ?
                <Skeleton />
                :
                evidence!.source_of_evidence.title !== '' ?
                  evidence!.source_of_evidence.title
                  :
                  'Untitled Evidence'
            }
          </Typography>
          <Typography variant='body1' component='p' className={classes.description}>
            {
              loading ?
                <Skeleton />
                :
                evidence.description !== '' ?
                  evidence.description
                  :
                  'No description has been provided for this piece of evidence.'
            }
          </Typography>
          <Typography variant='subtitle2'>
            {
              loading ?
                <Skeleton />
                :
                evidence!.submitted_by.first_name ?
                  'Evidence submitted by ' + evidence!.submitted_by.first_name + ' ' + evidence!.submitted_by.last_name
                  :
                  'Evidence submitted by ' + evidence!.submitted_by.username
            }
          </Typography>
        </CardContent>
      </Card>
      <div className={classes.expansionPanel}>
        <ExpansionPanel expanded={showSource} onChange={() => setShowSource(!showSource)}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography variant='h2'>Source</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <SourceInfo source={loading ? undefined : evidence.source_of_evidence} loading={!evidence} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
      <div className={classes.expansionPanel}>
        <ExpansionPanel expanded={showReviews} onChange={() => setShowReviews(!showReviews)}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography variant='h2'>Reviews</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography variant='body1' paragraph>
              {
                evidence ?
                  evidence.num_expert_reviews === 0 ?
                    'This evidence has not been reviewed by experts.'
                    :
                    'This evidence has been reviewed by ' + evidence.num_expert_reviews + ' experts.'
                  :
                  ''
              }
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    </>
  )
}

export default EvidenceDetails
