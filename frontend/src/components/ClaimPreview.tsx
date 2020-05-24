import * as React from 'react'
import { Card, CardActionArea, CardContent, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Claim } from '../openapi-types'
import { useHistory } from 'react-router-dom'
import AuthorsLinksList from './AuthorsLinksList'

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
            <Typography color='textSecondary'>
              <AuthorsLinksList authors={claim.source_of_claim.authors} />
            </Typography>
            <Typography variant='h5' gutterBottom>
              {claim.claim_text}
            </Typography>
            <Typography variant='subtitle2' color='textSecondary'>
              {claim.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  )
}

export default ClaimPreview
