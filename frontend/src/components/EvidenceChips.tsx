import * as React from 'react'
import { Evidence, EvidenceRelationship } from '../openapi-types'
import { Chip, Theme, Tooltip } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import VerifiedUserRoundedIcon from '@material-ui/icons/VerifiedUserRounded'
import DoneRoundedIcon from '@material-ui/icons/DoneRounded'

interface EvidenceRelationshipChipProps {
  relationship: EvidenceRelationship | 'UNDER REVIEW'
  expert: boolean
  community: boolean
}

function getColorFromRelationship(relationship: EvidenceRelationship | 'UNDER REVIEW') {
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
      return '#555'
    case 'SPLIT':
    case 'UNDER REVIEW':
      return '#333'
  }
}

const useStyles = makeStyles((theme: Theme) => ({
  chip: (props: EvidenceRelationshipChipProps) => ({
    marginRight: theme.spacing(1),
    backgroundColor: getColorFromRelationship(props.relationship),
    color: '#fff',
    textTransform: 'capitalize'
  }),
  icon: {
    color: '#fff'
  }
}))

const EvidenceRelationshipChip: React.FC<EvidenceRelationshipChipProps> = (props) => {
  const classes = useStyles(props)
  const relationship = props.relationship.toLowerCase()
  let summary = 'This piece of evidence '
  let icon = null
  if (props.expert) {
    icon = <VerifiedUserRoundedIcon className={classes.icon} />
  } else if (props.community) {
    icon = <DoneRoundedIcon className={classes.icon} />
  }
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
        icon={icon}
        size='small'
      />
    </Tooltip>
  )
}

interface EvidenceChipsProps {
  evidence: Evidence
}

const EvidenceChips: React.FC<EvidenceChipsProps> = (props) => {
  // Has two chips: If expert consensus differs from community consensus, display both
  const hasTwoChips = (props.evidence.num_community_reviews >= 3 && props.evidence.num_expert_reviews > 1) &&
    props.evidence.community_consensus_relationship !== props.evidence.expert_consensus_relationship

  let singleChipRelation: EvidenceRelationship | 'UNDER REVIEW' = 'UNDER REVIEW'
  if (props.evidence.num_expert_reviews >= 1) {
    singleChipRelation = props.evidence.expert_consensus_relationship
  } else if (props.evidence.num_community_reviews >= 3) {
    singleChipRelation = props.evidence.community_consensus_relationship
  }

  return (
    <>
      {
        hasTwoChips ?
          <span>
            <EvidenceRelationshipChip relationship={props.evidence.expert_consensus_relationship}
                                      expert={true} community={false} />
            <EvidenceRelationshipChip relationship={props.evidence.community_consensus_relationship}
                                      expert={false} community={true} />
          </span>
          :
          <EvidenceRelationshipChip relationship={singleChipRelation}
                                    expert={props.evidence.num_expert_reviews >= 1}
                                    community={props.evidence.num_community_reviews >= 3} />
      }
    </>
  )
}

export default EvidenceChips
