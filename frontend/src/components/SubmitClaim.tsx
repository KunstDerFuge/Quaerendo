import * as React from 'react'
import { Button, CardActions, Grid, TextField, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Mutate } from 'restful-react'
import * as assert from 'assert'
import { useHistory } from 'react-router'
import SubmitSourceForm from './SubmitSourceForm'
import { PatchedSource } from '../openapi-types'
import CardPage from './CardPage'
import CardFormField from './CardFormField'

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
  skipUrl: {
    margin: theme.spacing(1),
    cursor: 'pointer'
  },
  leftMarginButton: {
    marginLeft: 'auto'
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

const SubmitClaim: React.FC<{}> = () => {
  const classes = useStyles()
  const history = useHistory()

  const [source, setSource] = React.useState(null)
  const [showClaimForm, setShowClaimForm] = React.useState(false)
  const [claimText, setClaimText] = React.useState('')
  const [claimDescription, setClaimDescription] = React.useState('')


  function validateForm() {
    try {
      assert(claimText)
    } catch (_) {
      return false
    }
    return true
  }

  const cardActions = (
    <CardActions>
      <Button id='back' className={classes.leftMarginButton} onClick={() => setShowClaimForm(false)}>
        Back
      </Button>
      <Mutate verb='POST' path='/api/claims/'>
        {
          mutate => (
            <Button type='submit' onClick={() => mutate({
              claim_text: claimText,
              description: claimDescription,
              source_of_claim: source
            }).then((claim) => {
              console.log(claim)
              history.push('/claim/' + claim.id)
            })
            }>
              Submit
            </Button>
          )
        }
      </Mutate>
    </CardActions>
  )

  return (
    <Grid container direction='column' className={classes.root}>
      <Grid item>
        <SubmitSourceForm setShowNextPage={(show: boolean) => setShowClaimForm(show)} sourceOf='Claim'
                          setSource={(source: PatchedSource) => setSource(source)} visible={!showClaimForm} />
        {
          !showClaimForm ?
            ''
            :
            // Claim form
            <CardPage title='Claim Details' actions={cardActions} width='40em'>
              <CardFormField fieldName='Claim Text' required={true} description={
                <>
                  The text of the claim. Don't use quotes or end with punctuation.
                  <p>Example: Wearing a face mask helps reduce transmission of Covid-19</p>
                </>
              }>
                <TextField fullWidth label="Claim Text" variant="outlined" value={claimText}
                           onChange={e => setClaimText(e.target.value)} />
              </CardFormField>
              <CardFormField fieldName='Claim Description' required={false}
                             description='Provide some context for the claim.'>
                <TextField fullWidth label="Claim Description" variant="outlined" value={claimDescription}
                           multiline
                           rows={4} rowsMax={12} onChange={e => setClaimDescription(e.target.value)} />
              </CardFormField>
            </CardPage>
        }
      </Grid>
    </Grid>
  )
}

export default SubmitClaim
