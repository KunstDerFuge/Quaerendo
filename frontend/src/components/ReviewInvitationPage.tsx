import * as React from 'react'
import { useAuth } from './auth'
import { Redirect, useHistory } from 'react-router'
import { ReviewInvitationDetails, useApiReviewInvitationsDetailsList } from '../openapi-types'
import CardPage from './CardPage'
import { Card, CardActionArea, CardContent, Grid, Typography } from '@material-ui/core'
import CardPageContainer from './CardPageContainer'

const InvitationDetails: React.FC<ReviewInvitationDetails> = (props) => {
  const history = useHistory()
  return (
    <Card variant='outlined'>
      <CardActionArea onClick={() => history.push('/review/' + props.id)}>
        <CardContent>
          <Typography>
            <strong>Evidence:</strong> {props.evidence.source_of_evidence.title ? props.evidence.source_of_evidence.title : 'Untitled'}
          </Typography>
          <Typography>
            <strong>Claim:</strong> "{props.evidence.claim.claim_text}"
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

const ReviewInvitationPage: React.FC<{}> = (props) => {
  const [invitationData, setInvitationData] = React.useState<ReviewInvitationDetails[]>([])

  // @ts-ignore
  const {authToken} = useAuth()
  if (!authToken) {
    return <Redirect to='/login' />
  }

  const {data, loading} = useApiReviewInvitationsDetailsList({
    resolve: (data) => {
      setInvitationData(data)
      return data
    }
  })

  return (
    <CardPageContainer>
      <CardPage title='Invitations to Review'>
        {
          invitationData.map((invitation, index) => {
            return (
              <Grid item key={index}>
                <InvitationDetails {...invitation} />
              </Grid>
            )
          })
        }
      </CardPage>
    </CardPageContainer>
  )
}

export default ReviewInvitationPage
