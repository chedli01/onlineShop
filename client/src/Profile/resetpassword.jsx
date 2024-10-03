import axios from "axios"
import { useState,useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function ResetPassword(){
    const token=useParams()
    const navigate=useNavigate();
    const [password,setPassword]=useState("")
    const handleSubmit=(event)=>{
        event.preventDefault();
        axios.post(`http://localhost:3000/reset-password/${token.token}`,{newPassword:password});
        axios.get("http://localhost:3000/logout").then(res=>useNavigate("/login"))

    }
    useEffect(() => {
        axios.get("http://localhost:3000/status").then((res) => {
          if (res.data.connected == false) {
            navigate("/login");
            window.location.reload();
          } 
        });
      }, []);
    return(
        <div className="w-screen h-screen  flex justify-center items-center">
            <form className="w-1/3 h-2/3 bg-zinc-500 rounded-lg flex flex-col justify-around items-center" onSubmit={handleSubmit}>
                 
                
                <label className="text-3xl">New Password</label>
                <input className="w-1/2 h-10 rounded-lg" type="password" onChange={(event)=>setPassword(event.target.value)}/>
                <label className="text-3xl" htmlFor="">Confirm New Password</label>
                <input className="w-1/2 h-10 rounded-lg" type="password"/>
                <button className="w-20 h-10 bg-blue-600 text-white rounded-lg" type="submit">Confirm</button>

            </form>

        </div>
        
    )
}