import * as React from 'react'
import { Card, CardActionArea, CardContent, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Claim } from '../openapi-types'
import { Redirect } from 'react-router'
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
  const claim = props.claim
  const [clicked, setClicked] = React.useState(false)
  return (
    <div>
      {
        clicked ?
          <Redirect to={'/claim/' + claim.id} />
          :
          ''
      }
      <Card elevation={4} className={classes.card}>
        <CardActionArea onClick={() => setClicked(true)}>
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
