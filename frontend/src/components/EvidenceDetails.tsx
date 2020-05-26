import * as React from 'react'
import { ClaimWithEvidence, Evidence } from '../openapi-types'
import { useGet } from 'restful-react'

interface EvidenceDetailProps {
  id: number
}

const EvidenceDetails: React.FC<EvidenceDetailProps> = (props) => {
  const {data} = useGet({
    path: '/api/evidence/' + props.id
  })
  let evidence: Evidence = undefined
  if (data) {
    evidence = data
  }
  return (
    <>
      {
        evidence ?
          evidence.description
          :
          'Loading'
      }
    </>
  )
}

export default EvidenceDetails
