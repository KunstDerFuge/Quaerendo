import * as React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'

export function HeaderAppBar() {
  return (
    <AppBar position='static'>
      <Toolbar variant='dense'>
        <Typography variant='h6'>
          Test
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
