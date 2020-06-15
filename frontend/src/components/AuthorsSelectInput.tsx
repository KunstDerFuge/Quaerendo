import * as React from 'react'
import { Entity } from '../openapi-types'
import { Chip, TextField, Theme, Typography } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { useGet } from 'restful-react'
import { makeStyles } from '@material-ui/styles'
import ChooseOrCreateAuthorPopper from './ChooseOrCreateAuthorPopper'


interface AuthorsSelectInputProps {
  unconfirmedAuthors: string[]
  setUnconfirmedAuthors: (authors: string[]) => void
  confirmedAuthors: Entity[]
  setConfirmedAuthors: (authors: Entity[]) => void
}

const useStyles = makeStyles((theme: Theme) => ({
  chip: {
    margin: '2px',
    color: '#fff'
  }
}))

const AuthorsSelectInput: React.FC<AuthorsSelectInputProps> = (props) => {
  const classes = useStyles()

  const [authorOptions, setAuthorOptions] = React.useState<Entity[]>([])
  const [textValue, setTextValue] = React.useState<string>('')

  const {data, loading} = useGet({
    path: 'api/authors/match/',
    debounce: 200,
    queryParams: {name: textValue},
    resolve: data => {
      setAuthorOptions(data)
    }
  })

  const handleDelete = (selectedName: string) => {
    const nameIndex = props.unconfirmedAuthors.indexOf(selectedName)
    if (nameIndex !== -1) {
      // Deep copy array
      let arrayCopy = JSON.parse(JSON.stringify(props.unconfirmedAuthors))
      arrayCopy.splice(nameIndex, 1)
      props.setUnconfirmedAuthors(arrayCopy)
    }
  }

  const confirmAuthor = (author: Entity) => {
    props.setConfirmedAuthors(props.confirmedAuthors.concat(author))
  }

  return (
    <>
      <Autocomplete
        multiple
        id='authors'
        filterOptions={options => options}
        options={authorOptions}
        getOptionLabel={(option: Entity) => option.name + (option.short_bio ? ' - ' + option.short_bio : '')}
        // @ts-ignore (newValues can be string[] or string)
        value={props.confirmedAuthors}
        onChange={(e, newValues, reason) => {
          switch (reason) {
            case 'select-option':
              props.setConfirmedAuthors(newValues as Entity[])
              break

            case 'create-option':
              const newAuthor = newValues.filter((value) => typeof value === 'string')
              // @ts-ignore (newValues can be string[] or string)
              const newUnconfirmedAuthors: string[] = props.unconfirmedAuthors.concat(newAuthor)
              props.setUnconfirmedAuthors(newUnconfirmedAuthors)
              break

            case 'remove-option':
              // @ts-ignore (newValues can be string[] or string)
              props.setConfirmedAuthors(newValues as Entity[])
              break
          }
        }}
        freeSolo
        // @ts-ignore (newValues can be string[] or string)
        renderTags={(value: Entity[], getTagProps) =>
          value.map((option: Entity, index) => (
            <Chip id={option.id.toString()} className={classes.chip} label={option.name} {...getTagProps({index})}
                  color='primary' />
          ))
        }
        renderInput={(params) => (
          <TextField {...params} value={textValue} onChange={(event) => setTextValue(event.target.value)}
                     variant='outlined' label='Authors' placeholder='Add Authors...' />
        )}
      />
      {
        props.unconfirmedAuthors.length > 0 ?
          <>
            <Typography variant='caption' component='div'>
              {props.unconfirmedAuthors.length} authors unconfirmed
            </Typography>
            <ChooseOrCreateAuthorPopper unconfirmedAuthors={props.unconfirmedAuthors}
                                        setUnconfirmedAuthors={props.setUnconfirmedAuthors}
                                        confirmAuthor={confirmAuthor}
                                        handleDelete={handleDelete} />
          </>
          :
          ''
      }
    </>
  )
}

export default AuthorsSelectInput
