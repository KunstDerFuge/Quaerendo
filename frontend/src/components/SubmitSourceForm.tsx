import * as React from 'react'
import { Entity, PatchedSource } from '../openapi-types'
import {
  Button,
  CardActions,
  Checkbox,
  FormControlLabel,
  LinearProgress,
  Link,
  TextField,
  Theme,
  Typography
} from '@material-ui/core'
import { DatePicker } from '@material-ui/pickers'
import { makeStyles } from '@material-ui/styles'
import { useGet } from 'restful-react'
import AuthorsSelectInput from './AuthorsSelectInput'
import CardPage from './CardPage'
import CardFormField from './CardFormField'

interface SubmitSourceFormProps {
  setSource: (source: PatchedSource) => void
  setShowNextPage: (show: boolean) => void
  visible: boolean
  sourceOf: 'Claim' | 'Evidence'
}

const useStyles = makeStyles((theme: Theme) => ({
  skipUrl: {
    margin: theme.spacing(1),
    cursor: 'pointer'
  },
  leftMarginButton: {
    marginLeft: 'auto'
  },
  alignItemsRight: {
    display: 'flex',
    justifyContent: 'end'
  }
}))

const SubmitSourceForm: React.FC<SubmitSourceFormProps> = (props) => {
  const classes = useStyles()
  const [sourceUrl, setSourceUrl] = React.useState<string>('')
  const [sourceTitle, setSourceTitle] = React.useState<string>('')
  const [unconfirmedAuthors, setUnconfirmedAuthors] = React.useState<string[]>([])
  const [sourceAuthors, setSourceAuthors] = React.useState<Entity[]>([])
  const [sourceSummary, setSourceSummary] = React.useState<string>('')
  const [sourceDatePublished, setSourceDatePublished] = React.useState<Date>(new Date())
  const [publishDateUnknown, setPublishDateUnknown] = React.useState<boolean>(true)
  const [showOtherFields, setShowOtherFields] = React.useState<boolean>(false)

  const {data, loading} = useGet({
    path: 'api/article/',
    debounce: 500,
    queryParams: {url: sourceUrl},
    resolve: data => {
      setSourceTitle(data.title)
      setSourceSummary(data.summary)
      setUnconfirmedAuthors(data.authors)
      setShowOtherFields(true)
      setPublishDateUnknown(false)
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

  function handleClickNext() {
    props.setShowNextPage(true)
    props.setSource({
      authors: sourceAuthors,
      url: sourceUrl,
      date_published: new Date(sourceDatePublished).toISOString(),
      title: sourceTitle,
      summary: sourceSummary
    })
  }

  const cardActions = (
    <CardActions>
      <Button id='next' className={classes.leftMarginButton} onClick={handleClickNext}>
        Next
      </Button>
    </CardActions>
  )

  return (
    <>
      <CardPage invisible={!props.visible} title={'Source of ' + props.sourceOf}
                actions={showOtherFields && cardActions} width='40em'>
        <CardFormField fieldName='Source URL' required={false}
                       description='If this source has a URL, like an article or Tweet, paste it here. Some source data may be auto-filled from the URL. Try to eliminate unnecessary parameters (the portion after the question mark) if applicable, making sure that the URL remains valid. Must begin with https:// or http://'>
          <TextField fullWidth label="Source URL" variant="outlined" value={sourceUrl}
                     onChange={e => setSourceUrl(e.target.value)} />
          {
            !showOtherFields &&
              <Link onClick={() => setShowOtherFields(true)} color='secondary'>
                <Typography align='right' className={classes.skipUrl}>
                  Skip, this source does not have a URL 🠖
                </Typography>
              </Link>
          }
        </CardFormField>
        {
          loading && sourceUrl ?
            <LinearProgress />
            :
            showOtherFields &&
              <>
                <CardFormField fieldName='Source Title' required={false}
                               description={'The title of this source. Usually the headline, if an article. If the source is a tweet, use "Tweet from @User".'}>
                  <TextField fullWidth label='Title' variant='outlined' value={sourceTitle}
                             onChange={e => setSourceTitle(e.target.value)} />
                </CardFormField>
                <CardFormField fieldName='Authors' required={false}
                               description={'The authors of this source. Do not include \'et al\', include all authors where possible. This may be auto-filled from the URL. If so, please correct as needed.'}>
                  <AuthorsSelectInput
                    unconfirmedAuthors={unconfirmedAuthors}
                    setUnconfirmedAuthors={(authors) => setUnconfirmedAuthors(authors)}
                    confirmedAuthors={sourceAuthors}
                    setConfirmedAuthors={(authors) => setSourceAuthors(authors)} />
                </CardFormField>
                <CardFormField fieldName='Source Summary' required={false}
                               description={'Summary of the info in the source. This may be auto-generated in the case of an article. If so, please proofread and edit as needed. If this source is original research (i.e. mathematical deduction), include all necessary information here.'}>
                  <TextField fullWidth multiline label='Summary' variant='outlined' value={sourceSummary}
                             rows={4} rowsMax={12} onChange={e => setSourceSummary(e.target.value)} />
                </CardFormField>
                <CardFormField fieldName='Source Publication Date' required={false}
                               description={'The date the source was published. This may be auto-filled in the case of an article. Please double-check the value here if so.'}>
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
                </CardFormField>
              </>
        }
      </CardPage>
    </>
  )
}

export default SubmitSourceForm
