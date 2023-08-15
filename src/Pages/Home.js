import React, { useContext, useEffect, useState } from 'react'
import { Button, Form,Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Hometable from '../components/Hometable'
import Emsspinner from '../components/Emsspinner'
import { deleteContext, editContext, registerContext } from '../components/ContextShare'
import { deleteEmployee, getallemployees } from '../services/allApis'

function Home() {

  const  {editData,setEditData}= useContext(editContext)
  const {deleteData,setDaleteData} = useContext(deleteContext)
  const [search,setSearch]= useState("")
  // console.log(search);
  const  {registerData,setRegisterData} =useContext(registerContext)
  const navigate = useNavigate()
  const [showSpin,setShowSPin] = useState(true)
  const adduser = ()=>{
    navigate("/register")
  }

  useEffect(()=>{
    getallusers()
    setTimeout(() => {
      setShowSPin(false)
    }, 2000);
  },[search])

  const [users,setusers] = useState([])

  const getallusers = async ()=>{
    const result = await getallemployees(search)
    setusers(result.data);
  }
  // delete user
  const removeEmployee = async (id)=>{
    const response = await deleteEmployee(id)
    console.log(response);
    if(response.status===200){
      setDaleteData(response.data)
      getallusers()
    }else{
      console.log("Error:",response);
    }
  }



  return (
<>
  {
    registerData? <Alert variant="success" onClose={() => setRegisterData("")} dismissible>
    {registerData.fname.toUpperCase()} Successfully registered!!!
  </Alert> :""
  }
   {
    deleteData? <Alert variant="danger" onClose={() => setDaleteData("")} dismissible>
    {deleteData.fname.toUpperCase()} Successfully removed!!!
  </Alert> :""
  }

  {
    editData?<Alert variant="warning" onClose={() => setEditData("")} dismissible>
    {editData.fname.toUpperCase()} Successfully Updated!!!
  </Alert> :"" 
  
  }
      <div className='container mt-5'>
        <div style={{marginTop:"150px"}} className="main-div ">
          <div className="search-add  d-flex justify-content-between">
              <div className="search col-md-4">
                <Form className='d-flex'>
                <Form.Control type="text" placeholder="Seach Employee Name Here!"  className='me-2'
                onChange={e=>setSearch(e.target.value)}
                />
                <Button className='btn btn-success'>
                <i class="fa-solid fa-magnifying-glass fa-beat"></i>
                </Button>
                </Form>
              </div>
              <div className="add-btn">
              <Button onClick={adduser} className='btn btn-info'>
              <i class="fa-solid fa-user-plus fa-fade"></i> Add
                </Button>
              </div>
          </div>
          <div className="table-div mt-5">
            {
              showSpin?
              <Emsspinner/>:
            <Hometable displayData={users} removeEmployee={removeEmployee}/>
            }
          </div>
        </div>
  
      </div>
      
</>
  )
}

export default Home