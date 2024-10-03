import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
import { MDBInput, MDBCheckbox, MDBBtn, MDBTextArea } from "mdb-react-ui-kit";
import axios from "axios";
export default function Contact() {
  const [access, setAccess] = useState("true");
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const email = query.get("email");
  const [subject,setSubject]=useState("");
  const [text,setText]=useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setAccess(localStorage.getItem("access"));
  }, []);

  useEffect(() => {
    if (access == "false") {
      navigate("/admindash");
    }
  }, [access]);
  return (
    <div className="w-screen h-screen  flex items-center justify-center  bg-zinc-500">
      <div className="w-1/3 h-2/3 flex flex-col justify-around items-center">
        <form onSubmit={(event)=>{event.preventDefault();axios.post("http://localhost:3000/contact",{
            email:email,
            subject:subject,
            text:text}).then(res=>navigate("/admindash"))
        }} 
            className="w-full h-full flex flex-col justify-around items-center ">
          <MDBInput
            type="email"
            id="form4Example2"
            wrapperClass="mb-4"
            placeholder="Email address"
            className="border border-black w-96"
            value={email}
          />
          <MDBInput
            id="form4Example1"
            wrapperClass="mb-4"
            placeholder="Subject"
            className="border border-black w-96"
            onChange={(event)=>setSubject(event.target.value)}
          />
          <MDBTextArea
            wrapperClass="mb-4"
            textarea
            id="form4Example3"
            rows={4}
            placeholder="Message"
            className="border border-black w-96"
            onChange={(event)=>setText(event.target.value)}

          />

          <button type="submit" className=" w-1/2 h-10 bg-blue-700 text-white text-lg" >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
