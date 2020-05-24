import * as React from 'react'
import { Entity } from '../openapi-types'
import { Link } from '@material-ui/core'

interface AuthorsLinksListProps {
  authors: Entity[]
}

const AuthorsLinksList: React.FC<AuthorsLinksListProps> = (props) => {
  let authors = props.authors.map((author, index) => {
    return <Link href='/'>{author.name}</Link>
  })
  const separators = authors.map((author, index) => {
    return index === authors.length - 1 ? '' : ', '
  })
  console.log(authors)
  console.log(separators)
  return (
    <>
      {
        authors.map((author, index) => {
          return <span key={index}>{authors[index]}{separators[index]}</span>
        })
      }
    </>
  )
}

export default AuthorsLinksList
