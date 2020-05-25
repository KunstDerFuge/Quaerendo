import * as React from 'react'
import { EvidenceRelationshipEnum } from '../openapi-types'
import { Chip, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

interface EvidenceRelationshipChipProps {
  relationship: EvidenceRelationshipEnum
}

function getColorFromRelationship(relationship: EvidenceRelationshipEnum) {
  switch(relationship) {
    case 'PROVES':
      return '#00f'
    case 'SUPPORTS':
      return '#070'
    case 'DISPUTES':
      return '#611'
    case 'DISPROVES':
      return '#800'
    case 'INCONCLUSIVE':
      return '#000'
    case 'UNRELATED':
      return '#444'
  }
}

const useStyles = makeStyles((theme: Theme) => ({
  chip: (props: EvidenceRelationshipChipProps) => ({
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(-1),
    backgroundColor: getColorFromRelationship(props.relationship),
    color: '#fff',
    textTransform: 'capitalize'
  })
}))

const EvidenceRelationshipChip: React.FC<EvidenceRelationshipChipProps> = (props) => {
  const classes = useStyles(props)
  return (
    <Chip
      className={classes.chip}
      label={props.relationship.toLowerCase()}
      size='small'
    />
  )
}

export default EvidenceRelationshipChip
