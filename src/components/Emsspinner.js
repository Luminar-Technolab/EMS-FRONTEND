import React from 'react'
import { Spinner } from 'react-bootstrap'

function Emsspinner() {
  return (
    <div className=' mt-5 d-flex justify-content-center align-items-center'>
        <Spinner className='me-2' animation="grow" variant="info" /> 
        <span className='fw-bolder'>Loading...</span>
    </div>
  )
}

export default Emsspinner