import * as React from 'react'
import { FormEvent } from 'react'
import { Button, CardActions, Grid, TextField, Theme, Typography } from '@material-ui/core'
import CardPage from './CardPage'
import CardFormField from './CardFormField'
import { useMutate } from 'restful-react'
import { makeStyles } from '@material-ui/styles'
import { Redirect, useHistory } from 'react-router'
import { useAuth } from './auth'

const useStyles = makeStyles((theme: Theme) => ({
  leftMarginButton: {
    marginLeft: 'auto'
  },
  root: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
}))

interface RegistrationFormErrors {
  username?: string
  email?: string
  password1?: string
  password2?: string
  non_field_errors?: string
}

const RegistrationPage: React.FC<{}> = () => {
  const classes = useStyles()
  const history = useHistory()

  const [username, setUsername] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password1, setPassword1] = React.useState('')
  const [password2, setPassword2] = React.useState('')
  const [formErrors, setFormErrors] = React.useState<RegistrationFormErrors>({})

  const {mutate: post} = useMutate({
    verb: 'POST',
    path: '/rest-auth/registration/'
  })

  // @ts-ignore
  const {setAuthToken, authToken} = useAuth()

  const submitForm = (event: FormEvent) => {
    event.preventDefault()
    post({
      username: username,
      email: email,
      password1: password1,
      password2: password2
    }).then((response) => {
      setAuthToken(response.key)
      history.push('/')
    }).catch((error) => {
      console.log(error)
      setFormErrors(error.data)
    })
  }

  const cardActions = (
    <CardActions>
      <Button className={classes.leftMarginButton} type='submit' onClick={submitForm}>
        Submit
      </Button>
    </CardActions>
  )

  if (authToken) {
    return (
      <Redirect to='/' />
    )
  }

  return (
    <Grid container className={classes.root}>
      <Grid item>
        <form>
          <CardPage title='Register' actions={cardActions} width='30em'>
            <CardFormField fieldName='Username' required={true}>
              <TextField fullWidth label='Username' variant='outlined' value={username}
                         onChange={e => setUsername(e.target.value)} error={formErrors.hasOwnProperty('username')}
                         helperText={formErrors['username']} />
            </CardFormField>
            <CardFormField fieldName='Email' required={true}>
              <TextField fullWidth label='Email Address' variant='outlined' value={email}
                         onChange={e => setEmail(e.target.value)} error={formErrors.hasOwnProperty('email')}
                         helperText={formErrors['email']} />
            </CardFormField>
            <CardFormField fieldName='Password' required={true}>
              <TextField fullWidth label='Password' variant="outlined" value={password1} type='password'
                         onChange={e => setPassword1(e.target.value)} error={formErrors.hasOwnProperty('password1')}
                         helperText={formErrors['password1']} />
            </CardFormField>
            <CardFormField fieldName='Repeat Password' required={true}>
              <TextField fullWidth label='Repeat Password' variant="outlined" value={password2} type='password'
                         onChange={e => setPassword2(e.target.value)} error={formErrors.hasOwnProperty('password2')}
                         helperText={formErrors['password2']} />
            </CardFormField>
            {
              formErrors.hasOwnProperty('non_field_errors') &&
              <Grid item>
                <Typography variant='caption' color='error'>
                  {formErrors.non_field_errors}
                </Typography>
              </Grid>
            }
          </CardPage>
        </form>
      </Grid>
    </Grid>
  )
}

export default RegistrationPage
