import React,{useState,useEffect} from "react";
import { Card } from 'react-bootstrap'
import Emsspinner from "../components/Emsspinner";
import { useParams } from "react-router-dom";
import { viewEmployee } from "../services/allApis";
import { BASE_URL } from "../services/base_url";

function View() {
  const {id} = useParams()
  // console.log(result);
  const [displayData,setdisplaydata] = useState({})
  const viewUser = async ()=>{
    const {data} = await viewEmployee(id)
    setdisplaydata(data)

  }
  console.log(displayData);

  const [showSpin,setShowSPin] = useState(true)
  useEffect(()=>{
    viewUser()
    setTimeout(() => {
      setShowSPin(false)
    }, 2000);
  },[])
  
  return (
    <>
{
  showSpin? <div style={{marginTop:'200px'}}><Emsspinner/></div>:
    <div className="container mt-5">
      <Card className='shadow col-lg-6 mx-auto '>
        <Card.Body>
        <div className="profile d-flex justify-content-center">
            <img
                width={"200px"}
                height={"200px"}
                className="rounded-circle p-1 border"
                src={`${BASE_URL}/uploads/${displayData.profile}`}
                alt="profile"
              />
            </div>
            <div className="text-center mt-3">
              <h3>{displayData.fname} {displayData.lname}</h3>
              <h5> <i class="fa-solid fa-envelope fa-beat"></i> : <span className='fw-bolder ms-1'>{displayData.email}</span> </h5>
              <h5> <i class="fa-solid fa-mobile-screen-button fa-shake"></i> : <span className='fw-bolder ms-1'>{displayData.mobile}</span> </h5>
              <h5> <i class="fa-solid fa-venus-mars fa-fade"></i> : <span className='fw-bolder ms-1'>{displayData.gender}</span> </h5>
              <h5> <i class="fa-solid fa-chart-line fa-beat"></i> : <span className='fw-bolder ms-1'>{displayData.status}</span> </h5>
              <h5> <i class="fa-solid fa-location-dot fa-spin"></i> : <span className='fw-bolder ms-1'>{displayData.location}</span> </h5>
            </div>
        </Card.Body>
      </Card>
    </div>
}

    </>
  )
}

export default View