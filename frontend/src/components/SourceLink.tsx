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
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.primary.light,
      textDecoration: 'underline'
    }
  },
  margin: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
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
    <div className={classes.margin}>
      <Typography variant='body1' display='inline'>
        {
          source ?
            <Link to={'/source/' + props.id} className={classes.source}>
              Source
            </Link>
            :
            'No source provided.'
        }
      </Typography>
    </div>
  )
}

export default SourceLink
