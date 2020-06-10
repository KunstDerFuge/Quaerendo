import * as React from 'react'
import { useAuth } from './auth'
import { Redirect } from 'react-router'

const ReviewPage: React.FC<{}> = () => {

  // @ts-ignore
  const {authToken} = useAuth()
  if (!authToken) {
    return <Redirect to='/login' />
  }

  return (
    <></>
  )
}

export default ReviewPage
