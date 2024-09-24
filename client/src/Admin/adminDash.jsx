import AdminContent from "./adminContent";
import AdminHeader from "./adminHeader";

export default function AdminDash(){
    return (
        <div className="w-screen h-screen flex justify-between items-center">
            <AdminHeader />
            <AdminContent/>

        </div>
        
    )
}