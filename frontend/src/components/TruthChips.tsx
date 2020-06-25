import * as React from 'react'
import { TruthJudgement } from '../openapi-types'
import { Chip, Theme, Tooltip } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import VerifiedUserRoundedIcon from '@material-ui/icons/VerifiedUserRounded'
import GroupIcon from '@material-ui/icons/Group'

interface TruthChipsProps {
  community_consensus: TruthJudgement
  expert_consensus: TruthJudgement
  size?: 'medium' | 'small'
}

interface TruthChipProps {
  consensus: TruthJudgement
  expert: boolean
  size?: 'medium' | 'small'
}

function getColorFromConsensus(consensus: TruthJudgement) {
  switch (consensus) {
    case 'TRUE':
      return '#006'
    case 'LIKELY_TRUE':
      return '#060'
    case 'LIKELY_FALSE':
      return '#4b3100'
    case 'FALSE':
      return '#600'
    case 'SPLIT':
      return '#333'
  }
}

const useStyles = makeStyles((theme: Theme) => ({
  chip: (props: TruthChipProps) => ({
    marginRight: theme.spacing(1),
    backgroundColor: getColorFromConsensus(props.consensus),
    fontSize: props.size === 'medium' ? '1em' : undefined,
    color: '#fff',
    textTransform: 'capitalize'
  }),
  icon: {
    color: '#fff'
  }
}))

const TruthChip: React.FC<TruthChipProps> = (props) => {
  const classes = useStyles(props)
  if (!props.consensus) {
    return (
      <div />
    )
  }
  const consensus = props.consensus.toLowerCase()
  let summary = props.expert ? 'Our experts ' : 'Our community contributors '
  let icon = props.expert ? <VerifiedUserRoundedIcon className={classes.icon} /> :
    <GroupIcon className={classes.icon} />
  switch (props.consensus) {
    case 'TRUE':
      summary += 'have deemed this claim true.'
      break
    case 'LIKELY_TRUE':
      summary += 'have deemed that this claim is likely true.'
      break
    case 'SPLIT':
      summary += 'are split on the truthfulness of this claim.'
      break
    case 'LIKELY_FALSE':
      summary += 'have deemed that this claim is likely false.'
      break
    case 'FALSE':
      summary += 'have deemed this claim false.'
      break
  }
  return (
    <Tooltip title={summary}>
      <Chip
        className={classes.chip}
        label={consensus}
        aria-label={summary}
        icon={icon}
        size={props.size ? props.size : 'small'}
      />
    </Tooltip>
  )
}

const TruthChips: React.FC<TruthChipsProps> = (props) => {
  // Has two chips: If expert consensus differs from community consensus, display both
  if (!props.community_consensus && !props.expert_consensus) {
    return (<div />)
  }
  const hasTwoChips = (props.expert_consensus && props.community_consensus) && (props.community_consensus !== props.expert_consensus)
  const useSingleExpertIcon = ((props.expert_consensus && props.community_consensus) && !hasTwoChips) || (!!props.expert_consensus)
  const singleChipRelation = props.expert_consensus ? props.expert_consensus : props.community_consensus
  return (
    <>
      {
        hasTwoChips ?
          <span>
            <TruthChip consensus={props.expert_consensus} expert={true} size={props.size} />
            <TruthChip consensus={props.community_consensus} expert={false} size={props.size} />
          </span>
          :
          <TruthChip consensus={singleChipRelation} expert={useSingleExpertIcon} size={props.size} />
      }
    </>
  )
}

export default TruthChips
