import React, { useState,useEffect } from "react";
export default function Chat({chat}){
    const [sentMsg,setSentMsg]=useState([]);
    const [recievedMsg,setRecievedMsg]=useState(["hi admin"]);
    const [ws,setWs]=useState(null);
    const [msg,setMsg]=useState("");
    const [target,setTarget]=useState("");
  
    useEffect(()=>{
      const socket=new WebSocket("ws://localhost:3000");
      setWs(socket);
  
      socket.onopen=()=>{
        console.log("connection established")
      }
  
      socket.onmessage=async(event)=>{
        const result=await JSON.parse(event.data);
        setTarget(result.sender)
        setRecievedMsg((prev)=>[...prev,result.msg]);
      }
      return ()=>{socket.close()}
  
     
    },[])
    
    return(
        <div className={`w-full h-5/6 ${chat==true?"flex border border-black  z-10 relative":"hidden"}`}>
            <div className="w-1/2 h-5/6  flex flex-col">
             {recievedMsg.map((item,index)=>{
                return <h1 key={index}>{item}</h1>
             })}

            </div>
            <div className="w-1/2 h-5/6">
            {sentMsg.map((item,index)=>{
                return <h1 key={index}>{item}</h1>
             })}


            </div>
            <input onChange={(event)=>setMsg(event.target.value)} className="w-full h-10 absolute bottom-0" type="text" />
            <button onClick={()=>{
                if(ws && msg.trim()){
                    setSentMsg((prev)=>[...prev,msg]);
                    ws.send(JSON.stringify({target:target,msg:msg}));
                   
                }

            }} className="w-10 h-10 absolute bottom-0 right-0">Send</button>


            



        </div>
    )
}