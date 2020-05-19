import React, { useState } from 'react'
import { render } from 'react-dom'
import axios from 'axios'

function App () {
  const [data, setData] = useState(null)

  if (!data) {
    axios.get('/api/claims/')
      .then(res => {
        console.log(res.data)
        setData(res.data)
      })
  }

  return (
    <div>
      {
        data !== null ?
          data.map((claim, index) => {
            return (
              <div key={index}>{claim.claim_text}</div>
            )
          })
          :
          ''
      }
    </div>
  )
}

export default App

const container = document.getElementById('app')
render(<App />, container)
