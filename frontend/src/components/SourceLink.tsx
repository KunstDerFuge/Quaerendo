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
    margin: theme.spacing(1)
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
    <div className={classes.source}>
      {
        source ?
          <Link to={'/source/' + props.id}>
            <Typography variant='body1'>
              Source
            </Typography>
          </Link>
          :
          ''
      }
    </div>
  )
}

export default SourceLink
