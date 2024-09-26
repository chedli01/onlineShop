import axios from "axios"
import React, { useState,useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
}
from 'mdb-react-ui-kit';





export default function AdminLog(){
  axios.defaults.withCredentials=true;
    const navigate=useNavigate();
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");

    const handleOAuth2Login=(event)=>{
        axios.post("http://localhost:3000/adminlog",{},{withCredentials:true}).then((res)=>{
          window.location.href=res.data.url});
       


    
    }
    const handleLogin=(event)=>{
      axios.post("http://localhost:3000/adminlogEmailAndPass",{username:username,password:password}).then((res)=>{
        if(res.data){
          navigate("/admindash")

        }
        else{
          alert("bad credantials")
        }

      })

    }
    
    useEffect(()=>{
      axios.get("http://localhost:3000/adminStatus").then((res)=>{
          if(res.data==true){
              navigate("/admindash")

          }
      })
      
  },[])
    
    return(
        <MDBContainer className="w-screen h-screen bg-zinc-600" fluid>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">Please enter your login and password!</p>

              <MDBInput onChange={(event)=>setUsername(event.target.value)} wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Username' id='formControlLg' type='text' size="lg"/>
              <MDBInput onChange={(event)=>setPassword(event.target.value)} wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password' id='formControlLg' type='password' size="lg"/>

              <p className="small mb-3 pb-lg-2"><a class="text-white-50" href="#!">Forgot password?</a></p>
              <MDBBtn onClick={handleLogin}  className='mx-2 px-5 border text-white' color='white' size='lg'>
                Login
              </MDBBtn>

              <div className='d-flex flex-row mt-3 mb-5'>
                

                <MDBBtn onClick={handleOAuth2Login} tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='google' size="lg"/>
                </MDBBtn>
              </div>

              
            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
    )
}