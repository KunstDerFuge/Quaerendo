import * as React from 'react'
import { Entity } from '../openapi-types'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import { Theme } from '@material-ui/core'


interface AuthorsLinksListProps {
  authors: Entity[]
}

const useStyles = makeStyles((theme: Theme) => ({
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.primary.light,
      textDecoration: 'underline',
    }
  }
}))

const AuthorsLinksList: React.FC<AuthorsLinksListProps> = (props) => {
  const classes = useStyles()
  let authors = props.authors.map((author, index) => {
    return <Link to='/' className={classes.link}>{author.name}</Link>
  })
  const separators = authors.map((author, index) => {
    return index === authors.length - 1 ? '' : ', '
  })
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
