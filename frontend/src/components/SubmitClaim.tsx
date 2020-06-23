import * as React from 'react'
import { FormEvent } from 'react'
import { Button, CardActions, Grid, TextField, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useMutate } from 'restful-react'
import * as assert from 'assert'
import { Redirect, useHistory } from 'react-router'
import SubmitSourceForm from './SubmitSourceForm'
import { PatchedSource } from '../openapi-types'
import CardPage from './CardPage'
import CardFormField from './CardFormField'
import { useAuth } from './auth'

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

interface claimErrors {
  claim_text?: string
  description?: string
  non_field_errors?: string
}

const SubmitClaim: React.FC<{}> = () => {
  const classes = useStyles()
  const history = useHistory()

  const [source, setSource] = React.useState(null)
  const [showClaimForm, setShowClaimForm] = React.useState(false)
  const [claimText, setClaimText] = React.useState('')
  const [claimDescription, setClaimDescription] = React.useState('')
  const [formErrors, setFormErrors] = React.useState<claimErrors>({})

  const {mutate: post, loading} = useMutate({
    verb: 'POST',
    path: '/api/claims/'
  })

  // @ts-ignore
  const {authToken} = useAuth()
  if (!authToken) {
    return <Redirect to='/login' />
  }

  function validateForm() {
    try {
      assert(claimText)
    } catch (_) {
      return false
    }
    return true
  }

  function submitForm(event: FormEvent) {
    event.preventDefault()
    post({
      claim_text: claimText,
      description: claimDescription,
      source_of_claim: source
    }).then((claim) => {
      console.log(claim)
      history.push('/claim/' + claim.id)
    }).catch((error) => {
      console.log(error)
      setFormErrors(error.data)
    })
  }

  const cardActions = (
    <CardActions>
      <Button id='back' className={classes.leftMarginButton} onClick={() => setShowClaimForm(false)}>
        Back
      </Button>
      <Button type='submit' onClick={submitForm}>
        Submit
      </Button>
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
            <form onSubmit={submitForm}>
              <CardPage title='Claim Details' actions={cardActions} width='40em'>
                <CardFormField fieldName='Claim Text' required={true} description={
                  <>
                    The text of the claim. Don't use quotes or end with punctuation.
                    <p>Example: Wearing a face mask helps reduce transmission of Covid-19</p>
                  </>
                }>
                  <TextField fullWidth label="Claim Text" variant="outlined" value={claimText}
                             onChange={e => setClaimText(e.target.value)} error={formErrors.hasOwnProperty('claim_text')}
                             helperText={formErrors['claim_text']} />
                </CardFormField>
                <CardFormField fieldName='Claim Description' required={false}
                               description='Provide some context for the claim.'>
                  <TextField fullWidth label="Claim Description" variant="outlined" value={claimDescription}
                             multiline rows={4} rowsMax={12} onChange={e => setClaimDescription(e.target.value)}
                             error={formErrors.hasOwnProperty('description')}
                             helperText={formErrors['description']} />
                </CardFormField>
                {
                  formErrors.hasOwnProperty('non_field_errors') &&
                  <Grid item>
                    <Typography variant='caption' color='error'>
                      {formErrors.non_field_errors}
                    </Typography>
                  </Grid>
                }
              </CardPage>
            </form>
        }
      </Grid>
    </Grid>
  )
}

export default SubmitClaim
