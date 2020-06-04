import * as React from 'react'
import { Entity } from '../openapi-types'
import { Chip, Link, TextField, Theme, Typography } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { Mutate } from 'restful-react'
import { makeStyles } from '@material-ui/styles'


interface AuthorsSelectInputProps {
  unconfirmedAuthors: string[]
  setUnconfirmedAuthors: (authors: string[]) => void
  confirmedAuthors: Entity[]
  setConfirmedAuthors: (authors: Entity[]) => void
}

const useStyles = makeStyles((theme: Theme) => ({
  whiteText: {
    color: '#fff'
  }
}))

const AuthorsSelectInput: React.FC<AuthorsSelectInputProps> = (props) => {
  const classes = useStyles()
  return (
    <>
      <Autocomplete
        multiple
        id='authors'
        options={[]}
        // @ts-ignore (newValues can be string[] or string)
        value={props.confirmedAuthors}
        onChange={(e, newValues, reason) => {
          switch (reason) {
            case 'create-option':
              const newAuthor = newValues.filter((value) => typeof value === 'string')
              // @ts-ignore (newValues can be string[] or string)
              const newUnconfirmedAuthors: string[] = props.unconfirmedAuthors.concat(newAuthor)
            props.setUnconfirmedAuthors(newUnconfirmedAuthors)
            break

            case 'remove-option':
            // @ts-ignore (newValues can be string[] or string)
            props.setConfirmedAuthors(newValues as Entity[])
          }
        }}
        freeSolo
        // @ts-ignore (newValues can be string[] or string)
        renderTags={(value: Entity[], getTagProps) =>
          value.map((option: Entity, index) => (
            <Chip id={option.id.toString()} label={option.name} {...getTagProps({index})} color='primary' className={classes.whiteText} />
          ))
        }
        renderInput={(params) => (
          <TextField {...params} variant='outlined' label='Authors' placeholder='Add Authors...' />
        )}
      />
      {
        props.unconfirmedAuthors.length > 0 ?
          <>
          <Typography variant='caption' component='div'>
            {props.unconfirmedAuthors.length} authors unconfirmed
          </Typography>
          <Typography variant='caption'>
            Author '{props.unconfirmedAuthors[0]}' is not known. Double check the spelling, or&nbsp;
            <Mutate verb='POST' path='/api/entities/'>
              {
                mutate => (
                  <Link onClick={() => mutate({
                    name: props.unconfirmedAuthors[0]
                  }).then((author: Entity) => {
                    props.unconfirmedAuthors.length > 1 ?
                      props.setUnconfirmedAuthors(props.unconfirmedAuthors.filter((authorName) => authorName !== author.name))
                      :
                      props.setUnconfirmedAuthors([])
                    props.setConfirmedAuthors(props.confirmedAuthors.concat(author))
                  })
                  }>
                    click here
                  </Link>
                )
              }
            </Mutate>
             &nbsp;to add a new entry for this author.
          </Typography>
            </>
          :
          ''
      }
    </>
  )
}

export default AuthorsSelectInput
