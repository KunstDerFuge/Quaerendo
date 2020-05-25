import * as React from 'react'
import { useGet } from 'restful-react'
import { ClaimWithEvidence, Evidence } from '../openapi-types'
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
import SourceLink from './SourceLink'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import NoteAddRoundedIcon from '@material-ui/icons/NoteAddRounded'
import EvidenceInfo from './EvidenceInfo'

interface ClaimDetailsProps {
  id: number
}

interface EvidencePanelProps {
  evidence: Evidence[]
}

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    margin: theme.spacing(2),
    padding: theme.spacing(0.5)
  },
  evidencePanel: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
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

const EvidencePanel: React.FC<EvidencePanelProps> = (props) => {
  const classes = useStyles()
  const [showEvidence, setShowEvidence] = React.useState(false)
  const evidenceSummary = 'This claim remains unverified.'
  const supportingEvidence = props.evidence.filter(
    (evidence) => evidence.evidence_relationship === 'SUPPORTS' || evidence.evidence_relationship === 'PROVES')

  const disputingEvidence = props.evidence.filter(
    (evidence) => evidence.evidence_relationship === 'DISPROVES' || evidence.evidence_relationship === 'DISPUTES')

  return (
    <div className={classes.evidencePanel}>
      <ExpansionPanel expanded={showEvidence} onChange={() => setShowEvidence(!showEvidence)}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography variant='h5'>Evidence</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container className={classes.fullWidth} direction='row' spacing={2}>
            <Typography variant='body1' className={classes.fullWidth} paragraph>
              {evidenceSummary}
            </Typography>
            <Grid item container direction='column' xs={6}>
              <Typography>
                <b>Supporting:</b>
              </Typography>
              <Grid item>
                {
                  supportingEvidence.length !== 0 ?
                    supportingEvidence.map((evidence, index) => {
                      return <EvidenceInfo evidence={evidence} key={index} />
                    })
                    :
                    <Typography variant='body1' className={classes.noEvidence}>
                      No supporting evidence is available for this claim.
                    </Typography>
                }
              </Grid>
            </Grid>
            <Grid item container direction='column' xs={6}>
              <Typography>
                <b>Disputing:</b>
              </Typography>
              <Grid item>
                {
                  disputingEvidence.length !== 0 ?
                    disputingEvidence.map((evidence, index) => {
                      return <EvidenceInfo evidence={evidence} key={index} />
                    })
                    :
                    <Typography variant='body1' className={classes.noEvidence}>
                      No disputing evidence is available for this claim.
                    </Typography>
                }
              </Grid>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions className={classes.evidenceActions}>
          <Fab size='medium' variant="extended" color="primary" aria-label="add" className={classes.margin}>
            <NoteAddRoundedIcon className={classes.extendedIcon} />
            Submit Evidence
          </Fab>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  )
}

const ClaimDetails: React.FC<ClaimDetailsProps> = (props) => {
  const classes = useStyles()
  const {data} = useGet({
    path: '/api/claims/' + props.id
  })
  let claim: ClaimWithEvidence = undefined
  if (data) {
    claim = data
  }
  return (
    <>
      <Card className={classes.card}>
        <CardContent>
          {
            claim ?
              <>
                <Typography variant='h5' gutterBottom>
                  {'“' + claim.claim_text + '”'}
                </Typography>
                <Typography variant='caption'>
                  <span>― <AuthorsLinksList authors={claim.source_of_claim.authors} /></span>
                </Typography>
                <SourceLink id={claim.source_of_claim.id} />
                <Typography variant='body1' component='p'>
                  {
                    claim.description !== '' ?
                      claim.description
                      :
                      'No description has been provided for this claim.'
                  }
                </Typography>
              </>
              :
              ''
          }
        </CardContent>
      </Card>
      {
        claim ?
          <EvidencePanel evidence={claim.related_evidence} />
          :
          ''
      }
    </>
  )
}

export default ClaimDetails
