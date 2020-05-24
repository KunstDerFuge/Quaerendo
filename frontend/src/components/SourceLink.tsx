import * as React from 'react'
import { useGet } from 'restful-react'
import { Link } from 'react-router-dom'
import { Source } from '../openapi-types'
import { Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

interface SourceLinkProps {
  id: number
}

const useStyles = makeStyles((theme: Theme) => ({
  source: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.primary.light,
      textDecoration: 'underline'
    }
  }
}))

const SourceLink: React.FC<SourceLinkProps> = (props) => {
  const classes = useStyles()
  const {data} = useGet('/api/sources/' + props.id)
  let source: Source = undefined
  if (data) {
    source = data
  }
  return (
    <>
      {
        source ?
          <Link to={'/source/' + props.id}>
            <Typography variant='body1' className={classes.source}>
              Source
            </Typography>
          </Link>
          :
          ''
      }
    </>
  )
}

export default SourceLink
