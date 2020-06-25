import * as React from 'react'
import { Grid, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import InfoTooltip from '../InfoTooltip'
import { ReactElement } from 'react'

interface CardFormFieldProps {
  fieldName: string
  required: boolean
  description?: string | ReactElement
}

const useStyles = makeStyles((theme: Theme) => ({
  maxSpace: {
    flexGrow: 10,
    flexBasis: 'min-content'
  },
  centerItems: {
    display: 'flex',
    alignItems: 'center'
  }
}))

const CardFormField: React.FC<CardFormFieldProps> = (props) => {
  const classes = useStyles()
  return (
    <Grid item container>
      {
        props.description ?
          <>
            <Grid item className={classes.maxSpace}>
              {props.children}
            </Grid>
            <Grid item className={classes.centerItems}>
              <InfoTooltip
                fieldName={props.fieldName}
                required={props.required}
                description={props.description} />
            </Grid>
          </>
          :
          props.children
      }
    </Grid>
  )
}

export default CardFormField
