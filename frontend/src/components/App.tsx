import * as React from 'react'
import { useEffect } from 'react'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import MainTheme from './MainTheme'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { AuthContext } from './auth'
import AppContent from './AppContent'

const App: React.FC<{}> = () => {

  const existingToken = localStorage.getItem('token')
  const [authToken, setAuthToken] = React.useState(existingToken)

  useEffect(() => console.log(authToken), [authToken])

  const setToken = (token: string | null) => {
    localStorage.setItem('token', token)
    setAuthToken(token)
  }

  return (
    <ThemeProvider theme={MainTheme}>
      <AuthContext.Provider value={{authToken, setAuthToken: setToken}}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <AppContent />
        </MuiPickersUtilsProvider>
      </AuthContext.Provider>
    </ThemeProvider>
  )
}

export default App
