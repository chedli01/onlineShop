import { useEffect, useState } from "react";
import AdminContent from "./adminContent";
import Sidebar from "./adminHeader";
import AdminHeader from "./adminHeader";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";



export default function AdminDash(){
    const navigate=useNavigate()
    axios.defaults.withCredentials=true;

    const [activePage,setActivePage]=useState("dash");
    const page={activePage,setActivePage}




    useEffect(()=>{
        axios.get("http://localhost:3000/adminStatus").then((res)=>{
            if(res.data==false){
                navigate("/adminlogin")

            }
        })
        
    },[])


    return (
        <div className="w-screen h-screen flex items-center">
            <Sidebar page={page} />
            <AdminContent page={page} />

        </div>
        
    )
}