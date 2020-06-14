import * as React from 'react'
import { FormEvent } from 'react'
import { EvidenceRelationship, PatchedEvidenceReview, SourceDegree } from '../openapi-types'
import { Button, CardActions, Link, MenuItem, Select, TextField, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import CardPage from './CardPage'
import CardFormField from './CardFormField'

interface EvidenceReviewFormProps {
  visible: boolean
  showPreviousForm: () => void
  submitForm: (event: FormEvent, review: PatchedEvidenceReview) => void
}

const useStyles = makeStyles((theme: Theme) => ({
  centerItems: {
    display: 'flex',
    alignItems: 'center'
  },
  alignItemsRight: {
    display: 'flex',
    justifyContent: 'end'
  },
  leftMarginButton: {
    marginLeft: 'auto'
  }
}))

const EvidenceReviewForm: React.FC<EvidenceReviewFormProps> = (props) => {
  const classes = useStyles()
  const [evidenceRelationship, setEvidenceRelationship] = React.useState<EvidenceRelationship | 'placeholder'>('placeholder')
  const [trustworthiness, setTrustworthiness] = React.useState<'trustworthy' | 'untrustworthy' | 'placeholder'>('placeholder')
  const [sourceDegree, setSourceDegree] = React.useState<SourceDegree | 'placeholder'>('placeholder')
  const [comments, setComments] = React.useState<string>('')

  function handleSubmit(event: FormEvent) {
    props.submitForm(event, {
      deduced_evidence_relationship: evidenceRelationship as EvidenceRelationship,
      deduced_source_degree: sourceDegree as SourceDegree,
      is_reliable: trustworthiness === 'trustworthy',
      additional_comments: comments
    })
  }

  const cardActions = (
    <CardActions>
      <Button id='back' className={classes.leftMarginButton} onClick={() => props.showPreviousForm()}>
        Back
      </Button>
      <Button id='submit' type='submit' onClick={handleSubmit} color='primary'>
        Submit
      </Button>
    </CardActions>
  )

  return (
    <>
      {
        !props.visible ?
          ''
          :
          <form onSubmit={handleSubmit}>
            <CardPage title='Review Evidence' actions={cardActions}>
              <CardFormField fieldName='Evidence Relationship' required={false}
                             description={'The relationship of this evidence to the claim. Choose "proves" and "disproves" only with extreme discretion.'}>
                <Typography component='span' className={classes.centerItems}>
                  This piece of evidence&nbsp;
                  <Select
                    id='evidence-relationship'
                    aria-label='evidence relationship'
                    value={evidenceRelationship}
                    onChange={(e) => setEvidenceRelationship(e.target.value as EvidenceRelationship | 'placeholder')}>
                    <MenuItem value='placeholder' disabled><em>(Choose one...)</em></MenuItem>
                    <MenuItem value='PROVES'><strong>proves</strong>&nbsp;the claim.</MenuItem>
                    <MenuItem value='SUPPORTS'><strong>supports</strong>&nbsp;the claim.</MenuItem>
                    <MenuItem value='UNRELATED'>is&nbsp;<strong>unrelated</strong>&nbsp;to the claim.</MenuItem>
                    <MenuItem value='DISPUTES'><strong>disputes</strong>&nbsp;the claim.</MenuItem>
                    <MenuItem value='DISPROVES'><strong>disproves</strong>&nbsp;the claim.</MenuItem>
                    <MenuItem value='INCONCLUSIVE'>is&nbsp;<strong>inconclusive</strong>.</MenuItem>
                  </Select>
                </Typography>
              </CardFormField>
              <CardFormField fieldName='Source Degree' required={false} description={
                <>
                  <p>
                    {'Is this a primary, secondary, or tertiary source? See definitions at '}
                    <Link
                      href={'https://en.wikipedia.org/wiki/Wikipedia:No_original_research#Primary,_secondary_and_tertiary_sources'}
                      target='_blank'>
                      Wikipedia
                    </Link>.
                  </p>
                  <p>
                    Note that, unlike Wikipedia, original research is allowed here when used appropriately.
                  </p>
                </>
              }>
                <Typography component='span' className={classes.centerItems}>
                  The source of this evidence is&nbsp;
                  <Select
                    id='source-degree'
                    aria-label='source degree'
                    value={sourceDegree}
                    onChange={(e) => setSourceDegree(e.target.value as SourceDegree | 'placeholder')}>
                    <MenuItem value='placeholder' disabled><em>(Choose one...)</em></MenuItem>
                    <MenuItem value='PRIMARY'>a&nbsp;<strong>primary</strong>&nbsp;source.</MenuItem>
                    <MenuItem value='SECONDARY'>a&nbsp;<strong>secondary</strong>&nbsp;source.</MenuItem>
                    <MenuItem value='TERTIARY'>a&nbsp;<strong>tertiary</strong>&nbsp;source.</MenuItem>
                    <MenuItem value='ORIGINAL'><strong>original research</strong>&nbsp;by the user who submitted
                      it.</MenuItem>
                  </Select>
                </Typography>
              </CardFormField>
              <CardFormField fieldName='Trustworthiness' required={true}
                             description={'Do you believe this source is factual? Be as objective as possible.'}>
                <Typography component='span' className={classes.centerItems}>
                  I believe this source is&nbsp;
                  <Select
                    id='trustworthy'
                    aria-label='trustworthiness'
                    value={trustworthiness}
                    onChange={(e) => setTrustworthiness(e.target.value as 'trustworthy' | 'untrustworthy')}>
                    <MenuItem value='placeholder' disabled><em>(Choose one...)</em></MenuItem>
                    <MenuItem value='trustworthy'><strong>factual</strong>.</MenuItem>
                    <MenuItem value='untrustworthy'><strong>not factual</strong>,&nbsp;
                      <strong>misleading</strong>,&nbsp;or an&nbsp;<strong>invalid source</strong>.</MenuItem>
                  </Select>
                </Typography>
              </CardFormField>
              <CardFormField fieldName='Additional Comments' required={false}
                             description={'Any additional comments you have on this piece of evidence. These will be public and may not be anonymous.'}>
                <TextField
                  id='additional-comments' fullWidth label='Additional Comments' multiline variant='outlined'
                  rows={4} rowsMax={8} aria-label='additional comments' value={comments}
                  onChange={(e) => setComments(e.target.value)} />
              </CardFormField>
            </CardPage>
          </form>
      }
    </>
  )
}

export default EvidenceReviewForm
