import * as React from 'react'
import { useGet } from 'restful-react'
import { Claim } from '../openapi-types'
import { Card, CardContent, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import AuthorsLinksList from './AuthorsLinksList'
import SourceLink from './SourceLink'

interface ClaimDetailsProps {
  id: number
}

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    margin: theme.spacing(2)
  },
  claimText: {
    marginBottom: theme.spacing(1)
  }
}))

const ClaimDetails: React.FC<ClaimDetailsProps> = (props) => {
  const classes = useStyles()
  const {data} = useGet({
    path: '/api/claims/' + props.id
  })
  let claim: Claim = undefined
  if (data) {
    claim = data
  }
  return (
    <Card className={classes.card}>
      <CardContent>
        {
          claim ?
            <>
              <Typography variant='h5' className={classes.claimText}>
                {'“' + claim.claim_text + '”'}
              </Typography>
              <Typography variant='caption'>
                <span>― <AuthorsLinksList authors={claim.source_of_claim.authors} /></span>
              </Typography>
              <SourceLink id={claim.source_of_claim.id} />
              <Typography variant='body1' component='p'>
                {claim.description}
              </Typography>
            </>
            :
            ''
        }
      </CardContent>
    </Card>
  )
}

export default ClaimDetails
