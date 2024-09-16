import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrash,faSquareMinus } from "@fortawesome/free-solid-svg-icons";

export default function CartItem({ value }) {
  axios.defaults.withCredentials = true;
  const handleMinus = (event) => {
    axios
      .post("http://localhost:3000/delete-from-cart", { id: value.id })
      .then((res) => window.location.reload());
  };

  const handlePlus=(event)=>{
    axios.post("http://localhost:3000/add-quantity",{id:value.id}).then((res) => window.location.reload());

  }
  const handleDelete=(event)=>{
    axios.post("http://localhost:3000/delete-item",{id:value.id}).then((res) => window.location.reload());
  }
  return (
    <div className="w-full h-32 flex items-center justify-between relative  border-black border-2 border-l-0 border-r-0 p-2 hover:shadow-lg hover:shadow-blue-950 hover:bg-gray-500">
      
      <FontAwesomeIcon onClick={handleDelete} className="absolute top-0 left-0 text-4xl text-red-600" icon={faSquareMinus} />

      <h1 className="text-2xl">{value.name}</h1>
      <h1 className="text-2xl">{value.price} TND</h1>
      <h1 className="text-2xl">x{value.quantity}</h1>
      <FontAwesomeIcon
        className="text-2xl border-2 border-black rounded-full p-1 bg-gray-500"
        icon={faPlus}
        onClick={handlePlus}
      />
      <FontAwesomeIcon
        className="text-2xl border-2 border-black rounded-full p-1 bg-gray-500"
        icon={faMinus}
        onClick={handleMinus}
      />
      {/* <button onClick={handleClick} className="w-24 h-10 bg-yellow-500 rounded-md text-blue-950 text-xl font-bold p-2">Remove</button> */}
    </div>
  );
}
