import { useState ,useRef} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRecordVinyl, faMicrophone } from "@fortawesome/free-solid-svg-icons";

export default function Listen({ transcript }) {

  const [isListening, setIsListening] = useState(false);
  const SpeechRecognition=window.webkitSpeechRecognition
  const recognition=new SpeechRecognition()
  const recognitionRef = useRef(null);


  recognition.lang="en-US";
  recognition.continuous=false;
  recognition.interimResults=false;
  
  recognitionRef.current = recognition;

  const startListening=()=>{
    setIsListening(true);
    recognitionRef.current.start();
    
  }

  const stopListening=()=>{
    if(isListening){
      setIsListening(false);
      recognitionRef.current.stop()

    }}
  recognition.onend=()=>{
    console.log("ended")

  }

  recognition.onresult=async(event)=>{
    const current=await Array.from(event.results).map((result)=>result[0]).map((element)=>element.transcript).join('');
    await transcript.setSearchValue(current);
  }

  recognition.onerror=(event)=>{
    console.error(event.error)
    setIsListening(false)
  }



  return (
    <div className="ml-2">
      {isListening ? (
        <FontAwesomeIcon
          className="text-3xl"
          onClick={stopListening}
          icon={faRecordVinyl}
        />
      ) : (
        <FontAwesomeIcon
          className="text-3xl text-red-700"
          onClick={startListening}
          icon={faMicrophone}
        />
      )}

    </div>
  );
}
