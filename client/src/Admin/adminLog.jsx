import axios from "axios"
import { useNavigate } from "react-router-dom";



export default function AdminLog(){
    const navigate=useNavigate();
    const handleLogin=async (event)=>{
        axios.post("http://localhost:3000/adminlog").then(res=>window.location.href=res.data.url);

    
    }
    
    return(
        <button onClick={handleLogin}>Login with google</button>
    )
}