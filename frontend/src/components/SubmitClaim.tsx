import * as React from 'react'
import { FormEvent } from 'react'
import { Button, CardActions, Checkbox, FormControlLabel, Grid, TextField, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useMutate } from 'restful-react'
import { Redirect, useHistory } from 'react-router'
import SubmitSourceForm from './forms/SubmitSourceForm'
import { Entity, PatchedSource, Source, Topic } from '../openapi-types'
import CardPage from './layout/CardPage'
import CardFormField from './layout/CardFormField'
import { useAuth } from './utilities/auth'
import TopicSelectionInput from './inputs/TopicSelectionInput'
import AuthorsSelectInput from './inputs/AuthorsSelectInput'

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

  const [source, setSource] = React.useState<Source>(null)
  const [showClaimForm, setShowClaimForm] = React.useState(false)
  const [claimText, setClaimText] = React.useState('')
  const [claimDescription, setClaimDescription] = React.useState('')
  const [unconfirmedClaimants, setUnconfirmedClaimants] = React.useState<string[]>([])
  const [confirmedClaimants, setConfirmedClaimants] = React.useState<Entity[]>([])
  const [claimantsAreAuthors, setClaimantsAreAuthors] = React.useState<boolean>(true)
  const [claimantsError, setClaimantsError] = React.useState<boolean>(false)
  const [topics, setTopics] = React.useState<Topic[]>([])
  const [formErrors, setFormErrors] = React.useState<claimErrors>({})

  const {mutate: post} = useMutate({
    verb: 'POST',
    path: '/api/claims/'
  })

  // @ts-ignore
  const {authToken} = useAuth()
  if (!authToken) {
    return <Redirect to='/login' />
  }

  function submitForm(event: FormEvent) {
    event.preventDefault()
    if (unconfirmedClaimants.length > 0) {
      setClaimantsError(true)
      return
    }
    post({
      claim_text: claimText,
      description: claimDescription,
      claimants: claimantsAreAuthors ? source.authors : confirmedClaimants.map((claimant) => claimant.id),
      source_of_claim: source,
      topics: topics.map((topic: Topic) => topic.id)
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
              {
                claimantsAreAuthors && source && confirmedClaimants.length > 0 &&
                  setConfirmedClaimants([])
              }
              <CardPage title='Claim Details' actions={cardActions} width='40em'>
                <CardFormField fieldName='Claim Text' required={true} description={
                  <>
                    The text of the claim. Don't use quotes or end with punctuation.
                    <p>Example: Wearing a face mask helps reduce transmission of Covid-19</p>
                  </>
                }>
                  <TextField fullWidth label="Claim Text" variant="outlined" value={claimText}
                             onChange={e => setClaimText(e.target.value)}
                             error={formErrors.hasOwnProperty('claim_text')}
                             helperText={formErrors['claim_text']} />
                </CardFormField>
                <CardFormField fieldName='Claim Description' required={false}
                               description='Provide some context for the claim.'>
                  <TextField fullWidth label="Claim Description" variant="outlined" value={claimDescription}
                             multiline rows={4} rowsMax={12} onChange={e => setClaimDescription(e.target.value)}
                             error={formErrors.hasOwnProperty('description')}
                             helperText={formErrors['description']} />
                </CardFormField>
                <CardFormField fieldName='Who made this claim?' required={false}
                               description={'A list of people who made this claim. Only include claimants from the source you provided.'}>
                  <AuthorsSelectInput
                    isForClaimants={true}
                    sameAsAuthors={claimantsAreAuthors}
                    unconfirmedAuthors={unconfirmedClaimants}
                    setUnconfirmedAuthors={(claimants) => setUnconfirmedClaimants(claimants)}
                    confirmedAuthors={confirmedClaimants}
                    setConfirmedAuthors={(claimants) => setConfirmedClaimants(claimants)}
                    error={claimantsError} />
                  <div className={classes.alignItemsRight}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={claimantsAreAuthors}
                          onChange={() => setClaimantsAreAuthors(!claimantsAreAuthors)}
                        />
                      }
                      label="Same as source authors"
                      labelPlacement='start'
                    />
                  </div>
                </CardFormField>
                <CardFormField fieldName='Claim Topics' required={false}
                               description='Select relevant topics from the list. If your expected topic is not listed, you can create a new entry by typing it out. Experts in the selected topics will be given special privileges on this claim, so choose sparingly and wisely.'>
                  <TopicSelectionInput selectedTopics={topics} setSelectedTopics={setTopics} />
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
