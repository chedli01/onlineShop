export default function Analytics({active}){
    return(
        <div className={`w-full h-full ${active=="analytics"?"flex":"hidden"} `}>
            <h1>Analytics</h1>

        </div>
    )
}