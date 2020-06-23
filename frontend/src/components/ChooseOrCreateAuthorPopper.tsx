import * as React from 'react'
import {
  Card,
  CardContent,
  Chip,
  Fade,
  Link,
  ListItemText,
  MenuItem,
  MenuList,
  Popper,
  Theme,
  Typography
} from '@material-ui/core'
import { Entity } from '../openapi-types'
import { makeStyles } from '@material-ui/styles'
import { useGet, useMutate } from 'restful-react'
import { Skeleton } from '@material-ui/lab'

interface ChooseOrCreateAuthorPopperProps {
  unconfirmedAuthors: string[]
  setUnconfirmedAuthors: (authors: string[]) => void
  confirmAuthor: (author: Entity) => void
  handleDelete: (name: string) => void
  error: boolean
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'start',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: theme.spacing(0.5)
  },
  chip: {
    margin: theme.spacing(0.5)
  },
  popper: {
    zIndex: 10,
    width: '20em'
  },
  suggestionList: {
    maxHeight: '12em',
    overflowY: 'auto'
  }
}))

const ChooseOrCreateAuthorPopper: React.FC<ChooseOrCreateAuthorPopperProps> = (props) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [name, setName] = React.useState<string>()
  const [open, setOpen] = React.useState(false)
  const [options, setOptions] = React.useState([])

  const {data, loading} = useGet({
    path: 'api/authors/match/',
    queryParams: {name: name},
    resolve: data => {
      setOptions(data)
    }
  })

  const handleClickUnconfirmedChip = (selectedName: string) => (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
    setOpen((prev) => name !== selectedName || !prev)
    // @ts-ignore
    setName(selectedName)
  }

  const {mutate: createAuthor} = useMutate({
    verb: 'POST',
    path: '/api/entities/'
  })

  const handleDelete = (selectedName: string) => {
    if (selectedName === name) {
      setOpen(false)
      setAnchorEl(null)
    }
    props.handleDelete(selectedName)
  }

  const handleSelectOption = (author: Entity) => {
    props.handleDelete(name)
    props.confirmAuthor(author)
    setAnchorEl(null)
    setOpen(false)
  }

  return (
    <>
      <Popper open={open} anchorEl={anchorEl} placement='top' transition className={classes.popper}>
        {({TransitionProps}) => (
          <Fade {...TransitionProps} timeout={350}>
            <Card>
              <CardContent>
                {
                  loading ?
                    <Skeleton />
                    :
                    options.length > 0 ?
                      <>
                        <Typography variant='caption'>
                          Select a match from the list below
                        </Typography>
                        <MenuList className={classes.suggestionList}>
                          {
                            options.map((option: Entity, index) => (
                              <MenuItem key={index} onClick={() => handleSelectOption(option)}>
                                <ListItemText primary={option.name} secondary={option.short_bio} />
                              </MenuItem>
                            ))
                          }
                        </MenuList>
                        <Typography variant='caption'>
                          Or,&nbsp;
                          <Link onClick={() => createAuthor({
                            name: name
                          }).then((author: Entity) => {
                            handleDelete(name)
                            props.confirmAuthor(author)
                          })
                          }>
                            click here
                          </Link>
                          &nbsp;to create a new entry for "{name}".
                        </Typography>
                      </>
                      :
                      <Typography variant='caption'>
                        Author "{name}" is not known. Double check the spelling, or&nbsp;
                        <Link onClick={() => createAuthor({
                          name: name
                        }).then((author: Entity) => {
                          handleDelete(name)
                          props.confirmAuthor(author)
                        })
                        }>
                          click here
                        </Link>
                        &nbsp;to add a new entry for this author.
                      </Typography>
                }
              </CardContent>
            </Card>
          </Fade>
        )}
      </Popper>
      <ul className={classes.root}>
        {
          props.unconfirmedAuthors.map((name, index) => {
            return (
              <li key={index}>
                <Chip label={name}
                      onClick={handleClickUnconfirmedChip(name)}
                      onDelete={() => handleDelete(name)} />
              </li>
            )
          })
        }
      </ul>
      {
        props.error &&
        <Typography variant='caption' color='error'>
          Confirm or delete all unconfirmed authors to continue. Click on an author name to see options.
        </Typography>
      }
    </>
  )
}

export default ChooseOrCreateAuthorPopper
