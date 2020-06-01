import * as React from 'react'
import { Card, CardContent, CircularProgress, Grid, Link, TextField, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useGet } from 'restful-react'
import { DatePicker } from '@material-ui/pickers'

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
  }
}))

const SubmitClaim: React.FC<{}> = () => {
  const classes = useStyles()
  const [sourceUrl, setSourceUrl] = React.useState('')
  const [sourceTitle, setSourceTitle] = React.useState('')
  const [sourceAuthors, setSourceAuthors] = React.useState('')
  const [sourceSummary, setSourceSummary] = React.useState('')
  const [sourceDatePublished, setSourceDatePublished] = React.useState(new Date())
  const [showOtherFields, setShowOtherFields] = React.useState(false)

  const {data, loading} = useGet({
    path: 'api/article/',
    debounce: 1000,
    queryParams: {url: sourceUrl},
    resolve: data => {
      setSourceTitle(data.title)
      setSourceSummary(data.summary)
      setShowOtherFields(true)
      setSourceDatePublished(new Date(data.date_published))
      console.log(data.date_published)
    }
  })
  console.log(sourceDatePublished)

  return (
    <Grid container direction='column' className={classes.root}>
      <Grid item>
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
                        <DatePicker value={sourceDatePublished} label='Date Published' fullWidth format='MMMM d, yyyy'
                                    onChange={date => setSourceDatePublished(new Date(date.toString()))} />
                      </Grid>
                    </>
                    :
                    ''
              }
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default SubmitClaim
