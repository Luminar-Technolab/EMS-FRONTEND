import React,{useState,useEffect, useContext} from "react";
import { Button, Card, Form, Row } from "react-bootstrap";
import Select from "react-select";
import Emsspinner from "../components/Emsspinner";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { register } from "../services/allApis";
import { useNavigate } from 'react-router-dom';
import { registerContext } from "../components/ContextShare";

function Register() {

  const {registerData,setRegisterData} =useContext(registerContext)

  const navigate = useNavigate()

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

  // console.log(preview);

  useEffect(()=>{
    if(image){
      setPreview(URL.createObjectURL(image))
    }
    setTimeout(() => {
      setShowSPin(false)
    }, 2000);
  },[image])
  
  const handleRegister = async (e)=>{
    e.preventDefault()
    const {fname,lname,email,mobile,gender,location} = normalInput
    if(!fname || !lname || !email || !mobile || !gender || !status || !image || !location){
      toast.error("Please fill the form completely")
    }else{
      // toast.success("Successfully fill the form")
      //body
      const data = new FormData()
      data.append("user_profile",image)
      data.append("fname",fname)
      data.append("lname",lname)
      data.append("email",email)
      data.append("mobile",mobile)
      data.append("gender",gender)
      data.append("location",location)
      data.append("status",status)
      //header
      const headerConfig = {
        "Content-Type":"multipart/form-data"
      }
      //make an api call to service to register data
      const response = await register(data,headerConfig)
      console.log(response);
      if(response.status===200){
        //reset all form inputs
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
      setRegisterData(response.data)
      //navigate to home page
      navigate('/')
      }else{
        if(response.data){
          toast.error(response.data)
        }
        
      }
    }
  }

  return (
    <>
     { 
     showSpin? <div style={{marginTop:'200px'}}><Emsspinner/></div>:
     <div className="d-flex justify-content-center mt-5">
        <div className="container">
          <h2 className="text-center mt-3">Register Employee Details</h2>
          <Card className="shadow mt-5 p-3">
            <div className="text-center mb-3">
              <img
                width={"100px"}
                height={"100px"}
                className="rounded-circle p-1 border"
                src={preview?preview:"https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png"}
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
                    onChange={setUserInputs}
                  />
                  <Form.Check
                    type="radio"
                    label={"Female"}
                    name="gender"
                    value={"Female"}
                    aria-label="radio 2"
                    onChange={setUserInputs}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicstatus"
                >
                  <Form.Label>Select Employee Status</Form.Label>
                  <Select options={options} onChange={setStatusValue}></Select>
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicprofile"
                >
                  <Form.Label>Choose Profile Image</Form.Label>
                  <Form.Control type="file" name="user_profile" onChange={setProfile}/>
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
                  <Button onClick={handleRegister} className="mt-3 w-100" variant="info">
                    Register
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
  );
}

export default Register;
