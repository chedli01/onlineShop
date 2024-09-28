import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
export default function Chat({ chat }) {
  const [sentMsg, setSentMsg] = useState([]);
  const [recievedMsg, setRecievedMsg] = useState([]);
  const [msgs, setMsgs] = useState([]);
  const [ws, setWs] = useState(null);
  const [msg, setMsg] = useState("");
  const [target, setTarget] = useState("");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000");
    setWs(socket);

    socket.onopen = () => {
      console.log("connection established");
    };

    socket.onmessage = async (event) => {
      const result = await JSON.parse(event.data);
      setTarget(result.sender);
      setRecievedMsg((prev) => [...prev, result.msg]);
      setMsgs((prev) => [...prev, {msg:result.msg,type:"recieved",date:new Date().toTimeString().replace("GMT+0200 (heure normale d’Europe de l’Est)",'')}]);
    };
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div
      className={`w-full h-5/6 ${
        chat == true
          ? "flex flex-col space-y-4 border border-black bg-zinc-500    z-10 relative"
          : "hidden"
      }`}
    >
      {msgs.map((item)=>{
        if(item.type=="sent"){return(
          <div className="w-full h-fit flex items-center justify-end space-x-4">
            <span>{item.date}</span>
            <h1 className="text-xl w-1/2 bg-blue-600 rounded-lg p-1" >{item.msg}</h1>
            <FontAwesomeIcon className="text-xl rounded-full mr-3" icon={faUser} />
            
            

          </div>
        )}
        else{
          return(
            <div className="w-full h-fit flex items-center justify-start space-x-4">
              <FontAwesomeIcon className="text-xl rounded-full" icon={faUser} />
              <h1 className="text-xl w-1/2 bg-white rounded-lg p-1" >{item.msg}</h1>
              <span>{item.date}</span>


          </div>

          )
        }
        
      })}
      <input
        onChange={(event) => setMsg(event.target.value)}
        value={msg}
        className="w-full h-10 absolute bottom-0 rounded-md"
        type="text"
      />
      <button
        onClick={() => {
          if (ws && msg.trim()) {
            setSentMsg((prev) => [...prev, msg]);
            setMsgs((prev) => [...prev, {msg:msg,type:"sent",date:new Date().toTimeString().replace("GMT+0200 (heure normale d’Europe de l’Est)",'')}]);
            ws.send(JSON.stringify({ target: target, msg: msg }));
            setMsg("");
          }
        }}
        className="w-20 h-10 text-3xl absolute bottom-0 right-0 bg-yellow-400 rounded-lg"
      >
        Send
      </button>
    </div>
  );
}

{
  /* <div className="w-full h-5/6  flex flex-col bg-green-400">
             {recievedMsg.map((item,index)=>{
                return( <div className="w-full h-10 flex items-center space-x-2">
                  <FontAwesomeIcon className="text-xl rounded-full" icon={faUser} />
                  <h1 className="bg-white h-fit w-full rounded-lg" key={index}>{item}</h1>
                  <span></span>
                  
                  </div>)
               
             })}

            </div>
            <div className="w-full h-5/6 bg-red-500 ">
            {sentMsg.map((item,index)=>{
                return( <div className="w-full h-10 flex items-center ">
                  
                  <h1 className="bg-white h-fit w-full rounded-lg" key={index}>{item}</h1>
                  <FontAwesomeIcon className="text-xl rounded-full" icon={faUser} />
                  <span></span>
                  </div>)
             })}


            </div> */
}
