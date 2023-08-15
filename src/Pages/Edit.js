import React,{useState,useEffect, useContext} from "react";
import { Button, Card, Form, Row } from "react-bootstrap";
import Select from "react-select";
import Emsspinner from "../components/Emsspinner";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editEmployee, viewEmployee } from "../services/allApis";
import { useNavigate, useParams } from 'react-router-dom';
import { editContext } from "../components/ContextShare";
import { BASE_URL } from "../services/base_url";

function Edit() {

  const {editData,setEditData} = useContext(editContext)
  const navigate = useNavigate()

  const {id}= useParams()

  const [existImg,setExistImg]= useState("")

  const getEmployeeDetails = async ()=>{
    let {data} = await viewEmployee(id)
    setNormalInput(data);
    setStatus(data.status)
    setExistImg(data.profile)
  }

  useEffect(()=>{
    getEmployeeDetails()
  },[id])

  //state hold all normal user inputs
  const [normalInput,setNormalInput] = useState({
    fname:"",
    lname:"",
    email:"",
    mobile:"",
    gender:"",
    location:""
  })
    //to update state of normalInput
    const setUserInputs = (e)=>{
      const {name,value} = e.target
      setNormalInput({...normalInput, [name]: value})
    }
  // console.log(normalInput);

  //state to hold status
  const [status,setStatus]= useState("")

  const setStatusValue = (e) =>{
    setStatus(e.value);
  }

  // console.log(status);
  
  //state to hold image
  const [image,setImage] = useState("")

  const setProfile = (e) => {
    setImage(e.target.files[0]);
  }

  // console.log(image);

  //state to hold preview image
  const [preview,setPreview] = useState("")

  const [showSpin,setShowSPin] = useState(true)

  const options = [
    { value: "Active", label: "Active" },
    { value: "InActive", label: "InActive" },
  ];

  const handleUpdate = async (e)=>{
    e.preventDefault()
    const {fname,lname,email,mobile,gender,location} = normalInput
    if(!fname || !lname || !email || !mobile || !gender || !status  || !location){
      toast.error("Please fill the form completely")
    }else{
      // toast.success("Successfully fill the form")
      //body
      const data = new FormData()
      image?data.append("user_profile",image):data.append("user_profile",existImg)
      data.append("fname",fname)
      data.append("lname",lname)
      data.append("email",email)
      data.append("mobile",mobile)
      data.append("gender",gender)
      data.append("location",location)
      data.append("status",status)
      //header
      if(image){
       var  headerConfig = {
          "Content-Type":"multipart/form-data"
        }
      }else{
       var  headerConfig = ""
      }
      
      // make an api call to service to edit data
      const response = await editEmployee(id,data,headerConfig)
      console.log(response);
      if(response.status===200){
        //resest all state
        setNormalInput({...normalInput,
          fname:"",
          lname:"",
          email:"",
          mobile:"",
          gender:"",
          location:""
      })
      setStatus("")
      setImage("")

      //share server response to home page via context api
      setEditData(response.data)

      //navigate to home page
      navigate('/')
      }else{
        if(response.data){
          toast.error(response.data)
        }
        
      }
    }
  }

 
  useEffect(()=>{
    if(image){
      setExistImg("")
      setPreview(URL.createObjectURL(image))
    }
    setTimeout(() => {
      setShowSPin(false)
    }, 2000);
  },[image])



  return (
    <>
    { 
    showSpin? <div style={{marginTop:'200px'}}><Emsspinner/></div>:
    <div className="d-flex justify-content-center mt-5">
       <div className="container">
         <h2 className="text-center mt-3">Update Employee Details</h2>
         <Card className="shadow mt-5 p-3">
            <div className="text-center mb-3">
              <img
                width={"100px"}
                height={"100px"}
                className="rounded-circle p-1 border"
                src={preview?preview:`${BASE_URL}/uploads/${existImg}`}
                alt="profile"
              />
            </div>
            <Form>
              <Row>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicfname"
                >
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fname"
                    placeholder="First Name"
                    value={normalInput.fname}
                    onChange={setUserInputs}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasiclname"
                >
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lname"
                    placeholder="Last Name"
                    value={normalInput.lname}
                    onChange={setUserInputs}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicemail"
                >
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={normalInput.email}
                    onChange={setUserInputs}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicmobile"
                >
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="mobile"
                    placeholder="Mobile Number"
                    value={normalInput.mobile}
                    onChange={setUserInputs}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicgender"
                >
                  <Form.Label>Select Gender</Form.Label>
                  <Form.Check
                    type="radio"
                    label={"Male"}
                    name="gender"
                    value={"Male"}
                    aria-label="radio 1"
                    checked={normalInput.gender==="Male"?true:false}
                    onChange={setUserInputs}
                  />
                  <Form.Check
                    type="radio"
                    label={"Female"}
                    name="gender"
                    value={"Female"}
                    aria-label="radio 2"
                    checked={normalInput.gender==="Female"?true:false}
                    onChange={setUserInputs}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicstatus"
                >
                  <Form.Label>Select Employee Status</Form.Label>
                  <Select options={options}
                  placeholder={status}
                  onChange={setStatusValue}></Select>
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicprofile"
                >
                  <Form.Label>Choose Profile Image</Form.Label>
                  <Form.Control type="file" name="user_profile" 
                  onChange={setProfile}/>
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasiclocation"
                >
                  <Form.Label>Employee Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    placeholder="Employee Location"
                    value={normalInput.location}
                    onChange={setUserInputs}
                  />
                </Form.Group>
                <div className="text-center">
                  <Button onClick={handleUpdate} className="mt-3 w-100" variant="info">
                    Update
                  </Button>
                </div>
              </Row>
            </Form>
          </Card>
       </div>
     </div>
     }
            <ToastContainer />
   </>
  )
}

export default Edit