import * as React from 'react'
import { Button, CardActions, Grid, TextField, Theme, Typography } from '@material-ui/core'
import CardPage from './CardPage'
import { makeStyles } from '@material-ui/styles'
import CardFormField from './CardFormField'
import { Mutate } from 'restful-react'
import { Redirect, useHistory } from 'react-router'
import { useAuth } from './auth'

interface LoginFormErrors {
  username?: string
  password?: string
  non_field_errors?: string
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  leftMarginButton: {
    marginLeft: 'auto'
  }
}))

const LoginPage: React.FC<{}> = () => {
  const classes = useStyles()
  const history = useHistory()

  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [formErrors, setFormErrors] = React.useState<LoginFormErrors>({})

  // @ts-ignore
  const {setAuthToken, authToken} = useAuth()

  const cardActions = (
    <CardActions>
      <Mutate verb='POST' path='/rest-auth/login/'>
        {
          mutate => (
            <Button className={classes.leftMarginButton} type='submit' onClick={() => mutate({
              username: username,
              password: password
            }).then((response) => {
              console.log(response)
              setAuthToken(response.key)
              history.push('/')
            }).catch((error) => {
              console.log(error)
              error.data && setFormErrors(error.data)
            })
            }>
              Submit
            </Button>
          )
        }
      </Mutate>
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
        <CardPage title='Log in' actions={cardActions} width='20em'>
          <CardFormField fieldName='Username' required={true}>
            <TextField fullWidth label='Username' variant='outlined' value={username}
                       onChange={e => setUsername(e.target.value)} error={formErrors.hasOwnProperty('username')}
                       helperText={formErrors['username']} />
          </CardFormField>
          <CardFormField fieldName='Password' required={true}>
            <TextField fullWidth label='Password' variant="outlined" value={password} type='password'
                       onChange={e => setPassword(e.target.value)} error={formErrors.hasOwnProperty('password')}
                       helperText={formErrors['password']} />
          </CardFormField>
          {
            formErrors.hasOwnProperty('non_field_errors') &&
            <Grid item>
              <Typography variant='caption'>
                {formErrors.non_field_errors}
              </Typography>
            </Grid>
          }
        </CardPage>
      </Grid>
    </Grid>
  )
}

export default LoginPage
