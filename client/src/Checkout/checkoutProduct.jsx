import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrash,faSquareMinus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";


export default function CheckoutProduct({ value }) {
    const handleDelete=(event)=>{
       axios.post("http://localhost:3000/delete-item",{id:value.id}).then((res) => window.location.reload());
      }
  return (
    <div className="w-full relative h-40 flex items-center justify-between border-black border-2 rounded-lg  bg-yellow-400">
      <div
        className="w-1/4 h-full  bg-center bg-cover "
        style={{ backgroundImage: `url(${value.image})` }}
      ></div>
      <h1 className="text-4xl text-blue-950 font-bold">{value.name}</h1>
      <h1 className="text-4xl  text-blue-950 font-bold">{value.price} TND</h1>
      <h1 className="text-4xl  text-blue-950 font-bold">x{value.quantity}</h1>
      <FontAwesomeIcon
        onClick={handleDelete}
        className="absolute top-0 left-0 text-4xl text-red-600"
        icon={faSquareMinus}
      />
    </div>
  );
}
