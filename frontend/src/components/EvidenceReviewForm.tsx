import * as React from 'react'
import { EvidenceRelationship, PatchedEvidenceReview, SourceDegree } from '../openapi-types'
import { Button, Card, CardActions, CardContent, Grid, MenuItem, Select, Theme, Typography } from '@material-ui/core'
import InfoTooltip from './InfoTooltip'
import { makeStyles } from '@material-ui/styles'

interface EvidenceReviewFormProps {
  visible: boolean
  showPreviousForm: () => void
  submitForm: (review: PatchedEvidenceReview) => void
}

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    margin: theme.spacing(2),
    width: '40em',
    maxWidth: '90%'
  },
  maxSpace: {
    flexGrow: 10,
    flexBasis: 'min-content'
  },
  centerItems: {
    display: 'flex',
    alignItems: 'center'
  },
  alignItemsRight: {
    display: 'flex',
    justifyContent: 'end'
  },
  select: {
    top: '0.4em'
  },
  leftMarginButton: {
    marginLeft: 'auto'
  }
}))

const EvidenceReviewForm: React.FC<EvidenceReviewFormProps> = (props) => {
  const classes = useStyles()
  const [evidenceRelationship, setEvidenceRelationship] = React.useState<EvidenceRelationship | 'placeholder'>('placeholder')
  const [trustworthiness, setTrustworthiness] = React.useState<'trustworthy' | 'untrustworthy' | 'placeholder'>('placeholder')
  const [sourceDegree, setSourceDegree] = React.useState<SourceDegree>('ORIGINAL')
  const [comments, setComments] = React.useState<string>('')

  function handleSubmit() {
    props.submitForm({
      deduced_evidence_relationship: evidenceRelationship as EvidenceRelationship,
      deduced_source_degree: sourceDegree,
      is_reliable: trustworthiness === 'trustworthy',
      additional_comments: comments
    })
  }

  return (
    <>
      {
        !props.visible ?
          ''
          :
          <Card className={classes.card} elevation={8}>
            <CardContent>
              <Grid container direction='column' spacing={2}>
                <Grid item>
                  <Typography variant='h5' gutterBottom>Review Evidence</Typography>
                </Grid>
                <Grid item container>
                  <Grid item className={classes.maxSpace}>
                    <Typography component='span'>
                      This piece of evidence&nbsp;
                      <Select
                        className={classes.select}
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
                  </Grid>
                  <Grid item className={classes.centerItems}>
                    <InfoTooltip
                      fieldName='Evidence Relationship'
                      required={false}
                      description={'The relationship of this evidence to the claim. Choose "proves" and "disproves" only with extreme discretion.'} />
                  </Grid>
                  <Grid item container>
                    <Grid item className={classes.maxSpace}>
                      <Typography component='span'>
                        I believe this source is&nbsp;
                        <Select
                          className={classes.select}
                          id='trustworthy'
                          aria-label='trustworthiness'
                          value={trustworthiness}
                          onChange={(e) => setTrustworthiness(e.target.value as 'trustworthy' | 'untrustworthy')}>
                          <MenuItem value='placeholder' disabled><em>(Choose one...)</em></MenuItem>
                          <MenuItem value='trustworthy'><strong>factual</strong>.</MenuItem>
                          <MenuItem value='untrustworthy'><strong>not factual</strong>,&nbsp;
                            <strong>dishonest</strong>,&nbsp;or an&nbsp;<strong>invalid source</strong>.</MenuItem>
                        </Select>
                      </Typography>
                    </Grid>
                    <Grid item className={classes.centerItems}>
                      <InfoTooltip
                        fieldName='Trustworthiness'
                        required={true}
                        description={'Do you believe this source is factual? Be as objective as possible.'} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button id='back' className={classes.leftMarginButton} onClick={() => props.showPreviousForm()}>
                Back
              </Button>
              <Button id='submit' type='submit' onClick={handleSubmit} color='primary'>
                Submit
              </Button>
            </CardActions>
          </Card>
      }
    </>
  )
}

export default EvidenceReviewForm
