import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid, Theme } from '@material-ui/core'
import SubmitSourceForm from './SubmitSourceForm'
import { EvidenceWithReview, PatchedEvidenceReview, PatchedEvidenceWithReview, PatchedSource } from '../openapi-types'
import EvidenceReviewForm from './EvidenceReviewForm'
import { useMutate } from 'restful-react'
import { useHistory } from 'react-router'

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

  function submitForm(review: PatchedEvidenceReview) {
    let evidence: PatchedEvidenceWithReview = {
      source_of_evidence: source,
      // @ts-ignore
      claim: Number.parseInt(props.id),
      // @ts-ignore
      reviews: [review]
    }
    console.log(evidence)
    post(evidence).then((response: EvidenceWithReview) => {
      history.push('/claim/' + props.id)
      console.log(response)
      return response
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
