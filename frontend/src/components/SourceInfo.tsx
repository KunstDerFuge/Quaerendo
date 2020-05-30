import * as React from 'react'
import { ExpansionPanelDetails, Grid, Link, Theme, Typography } from '@material-ui/core'
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
  const description = props.loading ? '' : props.source.description === '' ? 'No description was provided for this source' : props.source.description
  const date = props.loading? new Date() : new Date(props.source.date_retrieved)
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
        <Typography variant='body2'>
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
              description
          }
        </Typography>
      </Grid>
      <Grid item>
        <Typography className={classes.italic}>
          {
            props.loading ?
              <Skeleton />
              :
              <i>Retrieved {date.toDateString()}, {date.toTimeString()}.</i>
          }
        </Typography>
      </Grid>
    </Grid>
  )
}

export default SourceInfo