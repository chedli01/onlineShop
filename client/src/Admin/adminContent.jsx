import 'bootstrap/dist/css/bootstrap.min.css';
import Tables from './Tables/tables';
import Reviews from './reviews';
import Analytics from './analytics';
import { useState,useEffect } from 'react';

export default function AdminContent({page}){
  const [ws,setWs]=useState(null)
  const [msg,setMsg]=useState("");
  const [recieved,setRecieved]=useState([]);
  const [sent,setSent]=useState([]);
  const [target,setTarget]=useState("");


  useEffect(()=>{
    const socket= new WebSocket(`ws://localhost:3000`);
    setWs(socket)
    socket.onopen = () => {
      console.log('WebSocket connection established');

  };
    socket.onmessage=async(event)=>{
        const result=await JSON.parse(event.data);
        console.log("tarfet",result.sender);
        console.log("worked")
        setTarget(result.sender)
        setRecieved((prev)=>[...prev,result.msg]);

    }
    return ()=>{
        socket.close();
    }

  },[])
    return(
        <div className='w-5/6 h-full bg-zinc-500'>
            <input type="text" onChange={(event)=>setMsg(event.target.value)} />
          <button onClick={()=>{if(ws && msg.trim()) { ws.send(JSON.stringify({target:target,msg:msg}));setSent(msg)}}}>send</button>
          <h1>Sent : {sent}</h1>
          <h1>Recieved : {recieved}</h1>
            <Tables active={page.activePage}/>
            <Reviews active={page.activePage} />
            <Analytics  active={page.activePage}/>

        </div>
    )
}