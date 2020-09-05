import * as React from 'react'
import { Evidence } from '../openapi-types'
import { Card, CardActionArea, CardContent, Grid, Theme, Typography } from '@material-ui/core'
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
          <Grid container direction='column' spacing={1}>
            <Grid item>
              <Typography variant='h3'>
                {
                  props.evidence.source_of_evidence.title !== '' ?
                    props.evidence.source_of_evidence.title
                    :
                    'Untitled'
                }
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='body2' component='p'>
                {
                  props.evidence.description !== '' ?
                    props.evidence.description
                    :
                    'No description has been provided for this piece of evidence.'
                }
              </Typography>
            </Grid>
            <Grid item>
              <EvidenceChips evidence={props.evidence} />
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default EvidencePreviewCard
