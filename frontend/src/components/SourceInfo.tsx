import * as React from 'react'
import { ExpansionPanelDetails, Grid, Link, Theme, Typography } from '@material-ui/core'
import OpenInNewRoundedIcon from '@material-ui/icons/OpenInNewRounded'
import AuthorsLinksList from './AuthorsLinksList'
import { Source } from '../openapi-types'
import { makeStyles } from '@material-ui/styles'

interface SourceDetailsProps {
  source: Source
}

const useStyles = makeStyles((theme: Theme) => ({
  italic: {
    fontFamily: 'garamond-premier-pro',
    fontSize: '1.1rem'
  }
}))


const SourceInfo: React.FC<SourceDetailsProps> = (props) => {
  const classes = useStyles()
  const title = props.source.title === '' ? 'Untitled' : props.source.title
  const description = props.source.description === '' ? 'No description was provided for this source' : props.source.description
  const date = new Date(props.source.date_retrieved)
  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        <Typography variant='h5'>
          {
            props.source.url !== '' ?
              <>
                <Link variant='h5' href={props.source.url} target='_blank'>
                  {title}
                </Link>
                &nbsp;
                <OpenInNewRoundedIcon fontSize='small' color='primary' />
              </>
              :
              <Typography variant='h4'>
                {title}
              </Typography>
          }
        </Typography>
        <Typography variant='body2'>
          <span>Authors: <AuthorsLinksList authors={props.source.authors} /></span>
        </Typography>
      </Grid>
      <br />
      <Grid item>
        <Typography variant='body1'>
          {description}
        </Typography>
      </Grid>
      <Grid item>
        <Typography className={classes.italic}>
          <i>Retrieved {date.toDateString()}, {date.toTimeString()}.</i>
        </Typography>
      </Grid>
    </Grid>
  )
}

export default SourceInfo
