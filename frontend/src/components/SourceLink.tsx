import * as React from 'react'
import { useGet } from 'restful-react'
import { Link } from 'react-router-dom'
import { Source } from '../openapi-types'
import { Typography } from '@material-ui/core'

interface SourceLinkProps {
  id: number
}

const SourceLink: React.FC<SourceLinkProps> = (props) => {
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
            <Typography variant='h6'>
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
