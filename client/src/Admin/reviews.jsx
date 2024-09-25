export default function Reviews({active}){
    return(
        <div className={`w-full h-full ${active=="reviews"?"flex justify-between items-center":"hidden"} overflow-hidden `}>
        <h1>reviews</h1>
        
        </div>
    )
}