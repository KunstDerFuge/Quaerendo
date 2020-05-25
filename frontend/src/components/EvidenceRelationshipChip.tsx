import * as React from 'react'
import { EvidenceRelationshipEnum } from '../openapi-types'
import { Chip, Theme, Tooltip } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

interface EvidenceRelationshipChipProps {
  relationship: EvidenceRelationshipEnum
}

function getColorFromRelationship(relationship: EvidenceRelationshipEnum) {
  switch (relationship) {
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
  const relationship = props.relationship.toLowerCase()
  let summary = 'This piece of evidence '
  switch (props.relationship) {
    case 'UNRELATED':
      summary += 'is unrelated.'
      break
    case 'INCONCLUSIVE':
      summary += 'is inconclusive with respect to the claim.'
      break
    default:
      summary += relationship + ' the claim.'

  }
  return (
    <Tooltip title={summary}>
      <Chip
        className={classes.chip}
        label={relationship}
        aria-label={summary}
        size='small'
      />
    </Tooltip>
  )
}

export default EvidenceRelationshipChip
