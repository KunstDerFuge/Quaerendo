import * as React from 'react'
import { useAuth } from '../utilities/auth'
import { Redirect, useHistory } from 'react-router'
import { ReviewInvitationDetails, useApiReviewInvitationsDetailsList } from '../../openapi-types'
import CardPage from '../layout/CardPage'
import { Card, CardActionArea, CardContent, Grid, Typography } from '@material-ui/core'
import CardPageContainer from '../layout/CardPageContainer'

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

  useApiReviewInvitationsDetailsList({
    resolve: (data) => {
      setInvitationData(data)
      return data
    }
  })

  return (
    <CardPageContainer>
      {
        invitationData.length > 0 ?
          <CardPage title='Invitations to Review Evidence'>
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
          :
          <>
            <Typography>
              Nothing to review.
              Check back later!
            </Typography>
          </>
      }
    </CardPageContainer>
  )
}

export default ReviewInvitationPage
