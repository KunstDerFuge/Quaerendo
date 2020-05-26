import * as React from 'react'
import { Evidence } from '../openapi-types'
import { Card, CardActionArea, CardContent, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import EvidenceChips from './EvidenceChips'
import { useHistory } from 'react-router'

interface EvidenceProps {
  evidence: Evidence
}

const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    marginLeft: theme.spacing(0.5)
  },
  evidenceCard: {
    marginTop: theme.spacing(1)
  }
}))

const EvidencePreviewCard: React.FC<EvidenceProps> = (props) => {
  const classes = useStyles()
  const history = useHistory()
  return (
    <Card variant='outlined' className={classes.evidenceCard}>
      <CardActionArea onClick={() => history.push('/evidence/' + props.evidence.id)}>
        <CardContent>
          <Typography variant='h6' display='inline'>
            {
              props.evidence.source_of_evidence.title !== '' ?
                props.evidence.source_of_evidence.title
                :
                'Untitled'
            }
          </Typography>
          <EvidenceChips evidence={props.evidence} />
          <Typography variant='body2' component='p'>
            {
              props.evidence.description !== '' ?
                props.evidence.description
                :
                'No description has been provided for this piece of evidence.'
            }
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default EvidencePreviewCard
