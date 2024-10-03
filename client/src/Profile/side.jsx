export default function Side({page,setPage}){
    return(
        <div className="w-1/5 h-full  border-r-2 border-r-black">
            <ul>
                <li onClick={()=>setPage("general")} className="text-3xl w-full h-20 text-black font-bold hover:bg-zinc-300 p-4">General Informations</li>
                <li onClick={()=>setPage("security")} className="text-3xl text-black font-bold hover:bg-zinc-300 p-4">Security</li>
                <li onClick={()=>setPage("records")} className="text-3xl text-black font-bold hover:bg-zinc-300 p-4">Records</li>
            </ul>
            

        </div>
    )
}