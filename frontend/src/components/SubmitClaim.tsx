import * as React from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  LinearProgress,
  Link,
  TextField,
  Theme,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Mutate, useGet } from 'restful-react'
import { DatePicker } from '@material-ui/pickers'
import * as assert from 'assert'
import { useHistory } from 'react-router'
import InfoTooltip from './InfoTooltip'

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
    flexGrow: 10
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
  const [sourceUrl, setSourceUrl] = React.useState('')
  const [sourceTitle, setSourceTitle] = React.useState('')
  const [sourceAuthors, setSourceAuthors] = React.useState('')
  const [sourceSummary, setSourceSummary] = React.useState('')
  const [sourceDatePublished, setSourceDatePublished] = React.useState(new Date())
  const [publishDateUnknown, setPublishDateUnknown] = React.useState(false)
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
      data.date_published ?
        setSourceDatePublished(new Date(data.date_published))
        :
        setPublishDateUnknown(true)
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
                  <Grid item container>
                    <Grid item className={classes.maxSpace}>
                      <TextField fullWidth label="Source URL" variant="outlined" value={sourceUrl}
                                 onChange={e => setSourceUrl(e.target.value)} />
                    </Grid>
                    <Grid item className={classes.centerItems}>
                      <InfoTooltip
                        fieldName='Source URL'
                        required={false}
                        description={'If this source has a URL, like an article or Tweet, paste it here. Some source data may be auto-filled from the URL. Try to eliminate unnecessary parameters (the portion after the question mark) if applicable, making sure that the URL remains valid. Must begin with https:// or http://'} />
                    </Grid>
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
                      <LinearProgress />
                      :
                      showOtherFields ?
                        <>
                          <Grid item container>
                            <Grid item className={classes.maxSpace}>
                              <TextField fullWidth label='Title' variant='outlined' value={sourceTitle}
                                         onChange={e => setSourceTitle(e.target.value)} />
                            </Grid>
                            <Grid item className={classes.centerItems}>
                              <InfoTooltip
                                fieldName='Source Title'
                                required={false}
                                description={'The title of this source. Usually the headline, if an article. If the source is a tweet, use "Tweet from @User".'} />
                            </Grid>
                          </Grid>
                          <Grid item container>
                            <Grid item className={classes.maxSpace}>
                              <TextField fullWidth multiline label='Summary' variant='outlined' value={sourceSummary}
                                         rows={4} rowsMax={12} onChange={e => setSourceSummary(e.target.value)} />
                            </Grid>
                            <Grid item className={classes.centerItems}>
                              <InfoTooltip
                                fieldName='Source Summary'
                                required={false}
                                description={'Summary of the info in the source. This may be auto-generated in the case of an article. If so, please proofread and edit as needed. If this source is original research (i.e. mathematical deduction), include all necessary information here.'} />
                            </Grid>
                          </Grid>
                          <Grid item container>
                            <Grid item className={classes.maxSpace}>
                              <DatePicker value={sourceDatePublished} label='Date Published' fullWidth
                                          format='MMMM d, yyyy'
                                          disabled={publishDateUnknown}
                                          onChange={date => setSourceDatePublished(new Date(date.toString()))} />
                              <div className={classes.alignItemsRight}>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={publishDateUnknown}
                                      onChange={() => setPublishDateUnknown(!publishDateUnknown)}
                                    />
                                  }
                                  label="I don't know the publication date"
                                  labelPlacement='start'
                                />
                              </div>
                            </Grid>
                            <Grid item className={classes.centerItems}>
                              <InfoTooltip
                                fieldName='Source Publication Date'
                                required={false}
                                description={'The date the source was published. This may be auto-filled in the case of an article. Please double-check the value here if so.'} />
                            </Grid>
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
                  <Grid item container>
                    <Grid item className={classes.maxSpace}>
                      <TextField fullWidth label="Claim Text" variant="outlined" value={claimText}
                                 onChange={e => setClaimText(e.target.value)} />
                    </Grid>
                    <Grid item className={classes.centerItems}>
                      <InfoTooltip
                        fieldName='Claim Text'
                        required={true}
                        description={'The text of the claim. Dont use quotes or end with punctuation.\nExample: Wearing a face mask helps reduce transmission of Covid-19'} />
                    </Grid>
                  </Grid>
                  <Grid item container>
                    <Grid item className={classes.maxSpace}>
                      <TextField fullWidth label="Claim Description" variant="outlined" value={claimDescription}
                                 multiline
                                 rows={4} rowsMax={12} onChange={e => setClaimDescription(e.target.value)} />
                    </Grid>
                    <Grid item className={classes.centerItems}>
                      <InfoTooltip
                        fieldName='Claim Description'
                        required={false}
                        description={'Provide some context for the claim.'} />
                    </Grid>
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
                          date_published: publishDateUnknown ? null : sourceDatePublished.toISOString()
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
