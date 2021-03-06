import * as React from 'react'
import { useGet } from 'restful-react'
import { ClaimWithEvidence, Evidence, Source } from '../openapi-types'
import {
  Card,
  CardContent,
  Divider,
  ExpansionPanel,
  ExpansionPanelActions,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Fab,
  Grid,
  Theme,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import AuthorsLinksList from './AuthorsLinksList'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import NoteAddRoundedIcon from '@material-ui/icons/NoteAddRounded'
import EvidencePreviewCard from './EvidencePreviewCard'
import { Skeleton } from '@material-ui/lab'
import SourceInfo from './SourceInfo'
import { useHistory } from 'react-router'
import TruthChips from './TruthChips'

interface ClaimDetailsProps {
  id: number
}

interface SourcePanelProps {
  source: Source | undefined
}

interface EvidencePanelProps {
  evidence: Evidence[] | undefined
  claimId: number
}

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    margin: theme.spacing(2),
    padding: theme.spacing(0.5)
  },
  expansionPanel: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  margin: {
    margin: theme.spacing(0.5)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  evidenceActions: {
    justifyContent: 'flex-start'
  },
  fullWidth: {
    width: '100%'
  },
  noEvidence: {
    marginTop: theme.spacing(2)
  }
}))


const ClaimDetails: React.FC<ClaimDetailsProps> = (props) => {
  const classes = useStyles()
  const [showSource, setShowSource] = React.useState(false)
  let loading = true
  const {data} = useGet({
    path: '/api/claims/' + props.id
  })
  let claim: ClaimWithEvidence = undefined
  if (data) {
    claim = data
    loading = false
    document.title = '“' + claim!.claim_text + '” - Quaerendo - Democratized Fact-Checking for the 21st Century'
  }
  return (
    <>
      <Card className={classes.card}>
        <CardContent>
          <Grid container direction='column' spacing={2}>
            <Grid item>
              <Typography variant='h1'>
                {
                  loading ?
                    <Skeleton />
                    :
                    '“' + claim!.claim_text + '”'
                }
              </Typography>
              <Typography variant='subtitle1'>
                {
                  loading ?
                    <Skeleton />
                    :
                    claim!.claimants.length > 0 ?
                      <span>
                      ― <AuthorsLinksList authors={claim!.claimants} />
                      </span>
                      :
                      'Claimant unknown'
                }
              </Typography>
            </Grid>
            <Grid item>
              {
                loading ?
                  <Skeleton />
                  :
                  <TruthChips community_consensus={claim!.community_truth_consensus}
                              expert_consensus={claim!.expert_truth_consensus}
                              size='medium' />
              }
            </Grid>
            <Grid item>
              <Typography variant='body1'>
                {
                  loading ?
                    <Skeleton />
                    :
                    claim!.description !== '' ?
                      claim!.description
                      :
                      'No description has been provided for this claim.'
                }
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='subtitle2'>
                {
                  loading ?
                    <Skeleton />
                    :
                    claim!.submitted_by.first_name ?
                      'Claim submitted by ' + claim!.submitted_by.first_name + ' ' + claim!.submitted_by.last_name
                      :
                      'Claim submitted by ' + claim!.submitted_by.username
                }
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {
        !loading ?
          <>
            <div className={classes.expansionPanel}>
              <ExpansionPanel expanded={showSource} onChange={() => setShowSource(!showSource)}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}>
                  <Typography variant='h4'>Source</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  {
                    !claim!.source_of_claim ?
                      ''
                      :
                      <SourceInfo source={claim!.source_of_claim} />
                  }
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </div>
            <EvidencePanel evidence={claim!.related_evidence} claimId={props.id} />
          </>
          :
          ''
      }
    </>
  )
}


const EvidencePanel: React.FC<EvidencePanelProps> = (props) => {
  const classes = useStyles()
  const history = useHistory()
  const [showEvidence, setShowEvidence] = React.useState(true)
  const evidenceSummary = 'This claim remains unverified.'
  const positiveRels = ['SUPPORTS', 'PROVES']
  const negativeRels = ['DISPUTES', 'DISPROVES']
  const otherRels = ['UNRELATED', 'INCONCLUSIVE', 'SPLIT']
  const supportingEvidence = props.evidence.filter(
    (evidence) => evidence.num_expert_reviews >= 1 && (
        positiveRels.includes(evidence.expert_consensus_relationship)) ||
      evidence.num_community_reviews >= 3 && (
        positiveRels.includes(evidence.community_consensus_relationship)))
  const disputingEvidence = props.evidence.filter(
    (evidence) => evidence.num_expert_reviews >= 1 && (
        negativeRels.includes(evidence.expert_consensus_relationship)) ||
      evidence.num_community_reviews >= 3 && (
        negativeRels.includes(evidence.community_consensus_relationship)))
  const supportingAndDisputingEvidenceIds = supportingEvidence.map((evidence) => evidence.id)
    .concat(disputingEvidence.map((evidence) => evidence.id))
  const otherEvidence = props.evidence.filter(
    (evidence) => evidence.num_expert_reviews >= 1 && (
        otherRels.includes(evidence.expert_consensus_relationship)) ||
      evidence.num_community_reviews >= 3 && (
        otherRels.includes(evidence.community_consensus_relationship)) ||
      !supportingAndDisputingEvidenceIds.includes(evidence.id))


  return (
    <div className={classes.expansionPanel}>
      <ExpansionPanel expanded={showEvidence} onChange={() => setShowEvidence(!showEvidence)}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}>
          <Typography variant='h4'>Evidence</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant='body1' gutterBottom>
                {evidenceSummary}
              </Typography>
            </Grid>
            <Grid item container spacing={2} xs={12}>
              <Grid item container direction='column' xs={6}>
                <Typography variant='overline'>
                  Supporting
                </Typography>
                <Grid item>
                  {
                    supportingEvidence.length !== 0 ?
                      supportingEvidence.map((evidence, index) => {
                        return <EvidencePreviewCard evidence={evidence} key={index} />
                      })
                      :
                      <Typography variant='body1' className={classes.noEvidence}>
                        No supporting evidence is available for this claim.
                      </Typography>
                  }
                </Grid>
              </Grid>
              <Grid item container direction='column' xs={6}>
                <Typography variant='overline'>
                  Disputing
                </Typography>
                <Grid item>
                  {
                    disputingEvidence.length !== 0 ?
                      disputingEvidence.map((evidence, index) => {
                        return <EvidencePreviewCard evidence={evidence} key={index} />
                      })
                      :
                      <Typography variant='body1' className={classes.noEvidence}>
                        No disputing evidence is available for this claim.
                      </Typography>
                  }
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
        {
          otherEvidence.length !== 0 ?
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography variant='h5'>Other Evidence</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container spacing={1}>
                  {
                    otherEvidence.length !== 0 ?
                      otherEvidence.map((evidence, index) => {
                        return (
                          <Grid item xs={6} key={index}>
                            <EvidencePreviewCard evidence={evidence} />
                          </Grid>
                        )
                      })
                      :
                      <Typography variant='body1' className={classes.noEvidence}>
                        No other evidence is available for this claim.
                      </Typography>
                  }
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            :
            ''
        }
        <Divider />
        <ExpansionPanelActions className={classes.evidenceActions}>
          <Fab size='medium' variant="extended" color="primary" aria-label="add" className={classes.margin}
               onClick={() => history.push('/submit/evidence/for/' + props.claimId)}>
            <NoteAddRoundedIcon className={classes.extendedIcon} />
            Submit Evidence
          </Fab>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  )
}


export default ClaimDetails
