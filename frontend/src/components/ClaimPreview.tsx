import * as React from 'react'
import { Card, CardActionArea, CardContent, Grid, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Claim } from '../openapi-types'
import { useHistory } from 'react-router-dom'
import AuthorsLinksList from './AuthorsLinksList'
import TruthChips from './TruthChips'

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    margin: theme.spacing(2)
  }
}))

interface ClaimPreviewProps {
  claim: Claim
}

const ClaimPreview: React.FC<ClaimPreviewProps> = (props: ClaimPreviewProps) => {
  const classes = useStyles()
  const history = useHistory()
  const claim = props.claim
  return (
    <div>
      <Card elevation={4} className={classes.card}>
        <CardActionArea onClick={() => history.push('/claim/' + claim.id)}>
          <CardContent>
            <Grid container direction='column' spacing={1}>
              <Grid item>
                <Typography variant='h5'>
                  {claim.claim_text}
                </Typography>
                <Typography>
                  {
                    claim.source_of_claim ?
                      <AuthorsLinksList authors={claim.source_of_claim.authors} />
                      :
                      'Claimant unknown'
                  }
                </Typography>
              </Grid>
              <Grid item>
                <TruthChips community_consensus={claim.community_truth_consensus}
                            expert_consensus={claim.expert_truth_consensus} />
              </Grid>
              <Grid item>
                <Typography variant='subtitle2' color='textSecondary'>
                  {claim.description}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  )
}

export default ClaimPreview
