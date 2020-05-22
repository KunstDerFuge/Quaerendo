import * as React from 'react'
import { Card, CardContent, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Claim } from '../openapi-types'

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
  return (
    <div>
      <Card elevation={4} className={classes.card}>
        <CardContent>
          <Typography color='secondary'>
            { claim.source_of_claim.authors[0].name }
          </Typography>
          <Typography variant='h5'>
            {claim.claim_text}
          </Typography>
          <Typography color='secondary'>
            {claim.description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default ClaimPreview
