import { useState } from "react";
import AdminContent from "./adminContent";
import Sidebar from "./adminHeader";
import AdminHeader from "./adminHeader";



export default function AdminDash(){

    const [activePage,setActivePage]=useState("dash");
    const page={activePage,setActivePage}

    return (
        <div className="w-screen h-screen flex items-center">
            <Sidebar page={page} />
            <AdminContent page={page} />

        </div>
        
    )
}