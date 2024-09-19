export default function Alert({message,close}){
    const handleClick=(event)=>{
        close("none")

    }
    return(
        <div className="w-1/2 h-1/2 flex flex-col items-center justify-center space-y-8  border-2 border-white rounded-lg  ">
            <h1 className="text-4xl text-red-600 ">{message}</h1>

            <button className="w-1/6 h-10 bg-blue-900 text-xl text-white" onClick={handleClick}>OK</button>



        </div>
    )
}