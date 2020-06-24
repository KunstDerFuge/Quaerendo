import * as React from 'react'
import { FormEvent } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid, Theme } from '@material-ui/core'
import SubmitSourceForm from './SubmitSourceForm'
import { EvidenceReview, EvidenceWithReview, PatchedEvidenceReview, PatchedSource } from '../openapi-types'
import EvidenceReviewForm from './EvidenceReviewForm'
import { useMutate } from 'restful-react'
import { Redirect, useHistory } from 'react-router'
import { useAuth } from './auth'

interface SubmitEvidenceProps {
  id: number
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    margin: theme.spacing(2),
    width: '30em',
    maxWidth: '90%'
  },
  maxSpace: {
    flexGrow: 10,
    flexBasis: 'min-content'
  },
  centerItems: {
    display: 'flex',
    alignItems: 'center'
  },
  alignItemsRight: {
    display: 'flex',
    justifyContent: 'end'
  }
}))

const SubmitEvidence: React.FC<SubmitEvidenceProps> = (props) => {
  const history = useHistory()
  const classes = useStyles()

  const [source, setSource] = React.useState<PatchedSource>(null)
  const [showReviewForm, setShowReviewForm] = React.useState(false)

  const {mutate: post, loading} = useMutate({
    verb: 'POST',
    path: '/api/evidence/'
  })

  // @ts-ignore
  const {authToken} = useAuth()
  if (!authToken) {
    return <Redirect to='/login' />
  }

  function submitForm(event: FormEvent, review: PatchedEvidenceReview) {
    event.preventDefault()
    let evidence: EvidenceWithReview = {
      // @ts-ignore
      source_of_evidence: source as PatchedSource,
      claim: props.id,
      reviews: [review as EvidenceReview]
    }
    console.log(evidence)
    post(evidence).then((response: EvidenceWithReview) => {
      history.push('/claim/' + props.id)
      console.log(response)
      return 'success'
    }).catch((errors) => {
      return errors.data
    })
  }

  return (
    <Grid container direction='column' className={classes.root}>
      <Grid item>
        <SubmitSourceForm setShowNextPage={(show: boolean) => setShowReviewForm(show)}
                          setSource={(source: PatchedSource) => setSource(source)} visible={!showReviewForm}
                          sourceOf='Evidence' />
        <EvidenceReviewForm visible={showReviewForm} submitForm={submitForm}
                            showPreviousForm={() => setShowReviewForm(false)} />
      </Grid>
    </Grid>
  )
}

export default SubmitEvidence
