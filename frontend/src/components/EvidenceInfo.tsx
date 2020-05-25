import * as React from 'react'
import { Evidence } from '../openapi-types'
import { Card, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import VerifiedUserRoundedIcon from '@material-ui/icons/VerifiedUserRounded'
import DoneRoundedIcon from '@material-ui/icons/DoneRounded'
import EvidenceRelationshipChip from './EvidenceRelationshipChip'

interface EvidenceProps {
  evidence: Evidence
}

const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    marginLeft: theme.spacing(0.5)
  },
  evidenceCard: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(1)
  }
}))

const EvidenceInfo: React.FC<EvidenceProps> = (props) => {
  const classes = useStyles()
  return (
    <Card variant='outlined' className={classes.evidenceCard}>
      <Typography variant='h6' display='inline'>
        {
          props.evidence.source_of_evidence.title !== '' ?
            props.evidence.source_of_evidence.title
            :
            'Untitled'
        }
      </Typography>
      {
        props.evidence.is_expert_verified ?
          <VerifiedUserRoundedIcon fontSize='small' className={classes.icon} />
          :
          ''
      }
      <DoneRoundedIcon fontSize='small' className={classes.icon} />
      <EvidenceRelationshipChip relationship={props.evidence.evidence_relationship} />
      <Typography variant='body2' component='p'>
        {
          props.evidence.description !== '' ?
            props.evidence.description
            :
            'No description has been provided for this piece of evidence.'
        }
      </Typography>
    </Card>
  )
}

export default EvidenceInfo
