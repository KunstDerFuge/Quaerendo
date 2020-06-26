import * as React from 'react'
import { Topic, useApiTopicsCreate, useApiTopicsList } from '../../openapi-types'
import { Autocomplete } from '@material-ui/lab'
import { Button, TextField, Theme } from '@material-ui/core'
import PlaylistAddRoundedIcon from '@material-ui/icons/PlaylistAddRounded'
import { makeStyles } from '@material-ui/styles'

interface TopicSelectionInputProps {
}

const useStyles = makeStyles((theme: Theme) => ({
  addTopicButton: {
    marginBottom: theme.spacing(2)
  }
}))

const TopicSelectionInput: React.FC<TopicSelectionInputProps> = (props) => {
  const classes = useStyles()
  const {data: topics, loading, refetch: reloadTopics} = useApiTopicsList({})
  const {mutate: createTopic} = useApiTopicsCreate({})
  const [textValue, setTextValue] = React.useState<string>('')
  const [selectedTopics, setSelectedTopics] = React.useState<Topic[]>([])

  function handleAddTopic() {
    createTopic({
      name: textValue
    }).then((newTopic) => {
      console.log('Created topic ' + newTopic.name)
      reloadTopics().then(() => {
        setTextValue('')
        let newSelectedTopics: Topic[] = JSON.parse(JSON.stringify(selectedTopics))
        newSelectedTopics.push(newTopic)
        setSelectedTopics(newSelectedTopics)
      })
    })
  }

  return (
    <>
      {
        !loading && textValue !== '' &&
        <Button
          variant='contained'
          color='secondary'
          startIcon={<PlaylistAddRoundedIcon />}
          onClick={handleAddTopic}
          className={classes.addTopicButton}
        >
          Create topic "{textValue}"
        </Button>
      }
      <Autocomplete
        id='topics'
        options={loading ? [] : topics}
        filterOptions={options => options.filter((option) => !selectedTopics.includes(option))}
        getOptionLabel={(option: Topic) => option.name}
        value={selectedTopics}
        loading={loading}
        getOptionSelected={(checkTopic: Topic) => selectedTopics.map((selectedTopic) => selectedTopic.name).includes(checkTopic.name)}
        onChange={(e, newValues, reason) => {
          switch (reason) {
            case 'select-option':
              setSelectedTopics(newValues as Topic[])
              setTextValue('')
              break

            case 'clear':
              setSelectedTopics([])
              setTextValue('')
              break

            case 'remove-option':
              setSelectedTopics(newValues as Topic[])
              setTextValue('')
              break

          }
        }}
        multiple
        renderInput={(params) => (
          <TextField {...params} value={textValue} onChange={(event) => setTextValue(event.target.value)}
                     variant='outlined' label='Topics' placeholder='Add Topics...' />
        )}
      />
    </>
  )
}

export default TopicSelectionInput
