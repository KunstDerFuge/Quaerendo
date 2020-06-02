import * as React from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  Link,
  TextField,
  Theme,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Mutate, useGet, useMutate } from 'restful-react'
import { DatePicker } from '@material-ui/pickers'
import * as assert from 'assert'
import { useHistory } from 'react-router'

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
  }
}))

const SubmitClaim: React.FC<{}> = () => {
  const classes = useStyles()
  const history = useHistory()
  const [sourceUrl, setSourceUrl] = React.useState('')
  const [sourceTitle, setSourceTitle] = React.useState('')
  const [sourceAuthors, setSourceAuthors] = React.useState('')
  const [sourceSummary, setSourceSummary] = React.useState('')
  const [sourceDatePublished, setSourceDatePublished] = React.useState(new Date())
  const [showOtherFields, setShowOtherFields] = React.useState(false)

  const [showClaimForm, setShowClaimForm] = React.useState(false)
  const [claimText, setClaimText] = React.useState('')
  const [claimDescription, setClaimDescription] = React.useState('')

  const {data, loading} = useGet({
    path: 'api/article/',
    debounce: 500,
    queryParams: {url: sourceUrl},
    resolve: data => {
      setSourceTitle(data.title)
      setSourceSummary(data.summary)
      setShowOtherFields(true)
      setSourceDatePublished(new Date(data.date_published))
    }
  })

  function isValidUrl(url: string) {
    try {
      new URL(url)
    } catch (_) {
      return false
    }
    return true
  }

  function validateForm() {
    try {
      assert(!sourceUrl || isValidUrl(sourceUrl))
      assert(claimText)
    } catch (_) {
      return false
    }
    return true
  }

  return (
    <Grid container direction='column' className={classes.root}>
      <Grid item>
        {
          !showClaimForm ?

            // Source form
            <Card className={classes.card} elevation={8}>
              <CardContent>
                <Grid container direction='column' spacing={2}>
                  <Grid item>
                    <Typography variant='h5' gutterBottom>Source of Claim</Typography>
                  </Grid>
                  <Grid item>
                    <TextField fullWidth label="Source URL" variant="outlined" value={sourceUrl}
                               onChange={e => setSourceUrl(e.target.value)} />
                    {
                      showOtherFields ?
                        ''
                        :
                        <Link onClick={() => setShowOtherFields(true)} color='secondary'>
                          <Typography align='right' className={classes.skipUrl}>
                            Skip, this source does not have a URL 🠖
                          </Typography>
                        </Link>
                    }
                  </Grid>
                  {
                    loading && sourceUrl ?
                      <CircularProgress />
                      :
                      showOtherFields ?
                        <>
                          <Grid item>
                            <TextField fullWidth label='Title' variant='outlined' value={sourceTitle}
                                       onChange={e => setSourceTitle(e.target.value)} />
                          </Grid>
                          <Grid item>
                            <TextField fullWidth multiline label='Summary' variant='outlined' value={sourceSummary}
                                       onChange={e => setSourceSummary(e.target.value)} />
                          </Grid>
                          <Grid item>
                            <DatePicker value={sourceDatePublished} label='Date Published' fullWidth
                                        format='MMMM d, yyyy'
                                        onChange={date => setSourceDatePublished(new Date(date.toString()))} />
                          </Grid>
                        </>
                        :
                        ''
                  }
                </Grid>
              </CardContent>
              {
                showOtherFields ?
                  <CardActions>
                    <Button id='next' className={classes.leftMarginButton} onClick={() => setShowClaimForm(true)}>
                      Next
                    </Button>
                  </CardActions>
                  :
                  ''
              }
            </Card>
            :

            // Claim form
            <Card className={classes.card} elevation={8}>
              <CardContent>
                <Grid container direction='column' spacing={2}>
                  <Grid item>
                    <Typography variant='h5' gutterBottom>Claim Details</Typography>
                  </Grid>
                  <Grid item>
                    <TextField fullWidth label="Claim Text" variant="outlined" value={claimText}
                               onChange={e => setClaimText(e.target.value)} />
                  </Grid>
                  <Grid item>
                    <TextField fullWidth label="Claim Description" variant="outlined" value={claimDescription} multiline
                               onChange={e => setClaimDescription(e.target.value)} />
                  </Grid>
                </Grid>
              </CardContent>
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
                        source_of_claim: {
                          title: sourceTitle,
                          url: sourceUrl,
                          summary: sourceSummary,
                          date_published: sourceDatePublished.toISOString()
                        }
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
            </Card>
        }
      </Grid>
    </Grid>
  )
}

export default SubmitClaim
