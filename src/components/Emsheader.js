import React from 'react'
import { Navbar,Container } from 'react-bootstrap'

function Emsheader() {
  return (
    <Navbar data-bs-theme="dark" className="bg-primary">
        <Container>
          <Navbar.Brand href="/">
          <i class="fa-solid fa-layer-group fa-spin"></i>
           <span className='fw-bolder ms-2'> Employee Management</span>
          </Navbar.Brand>
        </Container>
      </Navbar>
  )
}

export default Emsheader