import * as React from 'react'
import { Grid, Link, Theme, Typography } from '@material-ui/core'
import OpenInNewRoundedIcon from '@material-ui/icons/OpenInNewRounded'
import AuthorsLinksList from './AuthorsLinksList'
import { Source } from '../openapi-types'
import { makeStyles } from '@material-ui/styles'
import { Skeleton } from '@material-ui/lab'

interface SourceDetailsProps {
  source: Source
  loading?: boolean
}

const useStyles = makeStyles((theme: Theme) => ({
  italic: {
    fontFamily: 'garamond-premier-pro',
    fontSize: '1.1rem'
  }
}))


const SourceInfo: React.FC<SourceDetailsProps> = (props) => {
  const classes = useStyles()
  const title = props.loading ? '' : props.source.title === '' ? 'Untitled' : props.source.title
  const summary = props.loading ? '' : props.source.summary === '' ? 'No summary was provided for this source' : props.source.summary
  const datePublished = props.loading ? new Date() : props.source.date_published ? new Date(props.source.date_published) : null
  const dateRetrieved = props.loading ? new Date() : new Date(props.source.date_retrieved)
  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        <Typography variant='h5'>
          {
            props.loading ?
              <Skeleton />
              :
              props.source.url !== '' ?
                <>
                  <Link href={props.source.url} target='_blank'>
                    {title}
                  </Link>
                  &nbsp;
                  <OpenInNewRoundedIcon fontSize='small' color='primary' />
                </>
                :
                title
          }
        </Typography>
        <Typography variant='subtitle1'>
          {
            props.loading ?
              <Skeleton />
              :
              <span>Authors: <AuthorsLinksList authors={props.source.authors} /></span>
          }
        </Typography>
      </Grid>
      <br />
      <Grid item>
        <Typography variant='body1'>
          {
            props.loading ?
              <Skeleton />
              :
              summary
          }
        </Typography>
      </Grid>
      <Grid item>
        <Typography className={classes.italic}>
          {
            props.loading ?
              <Skeleton />
              :
              <i>
                {datePublished ? 'Published ' + datePublished.toDateString() + '. ' : 'Publish date unknown. '}
                Retrieved {dateRetrieved.toDateString()}, {dateRetrieved.toTimeString()}.
              </i>
          }
        </Typography>
      </Grid>
    </Grid>
  )
}

export default SourceInfo
