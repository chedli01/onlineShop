import Chat from "../chat";
import Sidebar from "./adminHeader";

export default function ChatPage(){

    return(

        <div className="w-screen h-screen  flex items-center space-x-6">
            <Sidebar/>
            <div className="w-5/6 h-full flex items-center justify-center">
              <Chat chat={true}/>

            </div>




        </div>


    )

}