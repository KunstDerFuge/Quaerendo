import * as React from 'react'
import { Card, CardActionArea, CardContent, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Claim } from '../openapi-types'
import { Redirect } from 'react-router'

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
          <Redirect to={'/claims/' + claim.id} />
          :
        ''
      }
      <Card elevation={4} className={classes.card}>
        <CardActionArea onClick={() => setClicked(true)}>
          <CardContent>
            <Typography color='secondary'>
              {claim.source_of_claim.authors[0].name}
            </Typography>
            <Typography variant='h5'>
              {claim.claim_text}
            </Typography>
            <Typography color='secondary'>
              {claim.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  )
}

export default ClaimPreview
