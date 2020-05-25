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
  Theme,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import AuthorsLinksList from './AuthorsLinksList'
import SourceLink from './SourceLink'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import NoteAddRoundedIcon from '@material-ui/icons/NoteAddRounded'

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
  }
}))

const EvidencePanel: React.FC<EvidencePanelProps> = (props) => {
  const classes = useStyles()
  const [showEvidence, setShowEvidence] = React.useState(false)
  return (
    <div className={classes.evidencePanel}>
      <ExpansionPanel expanded={showEvidence} onChange={() => setShowEvidence(!showEvidence)}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography>Evidence</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            {
              props.evidence.length !== 0 ?
                props.evidence.map((evidence, index) => {
                  return evidence.evidence_relationship
                })
                :
                'No evidence is available for this claim.'
            }
          </Typography>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
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
