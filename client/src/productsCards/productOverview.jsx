import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useContext } from "react";
import { cartManagment } from "../home";

export default function ProductOverview({ value }) {
  const states=useContext(cartManagment);
  const handleAdd = (event) => {
    axios.post("http://localhost:3000/add-to-cart", {
      quantity: 1,
      name: value.name,
      price: value.price,
      id: value.id,
      image: value.imageUrl,
    }).then(async(res)=>{

      const result=await states.cart.find((item)=>item.id==value.id);
      if(result){
        const updated=await states.cart.map((item)=>{
          if(item.id==value.id){
            return {...item,quantity:parseInt(item.quantity)+1}
          }
          else{
            return item
          }
        })
        states.setCart(updated)

      }
      else{
        states.setCart((prev)=>[...prev,{quantity: 1,
          name: value.name,
          price: value.price,
          id: value.id,
          image: value.imageUrl}])
      }

      window.location.reload();

    });
  };

  return (
    <div className="w-full h-full  flex flex-col items-center justify-between relative">
      <div
        className="w-full h-2/3 bg-cover bg-center "
        style={{ backgroundImage: `url(${value.imageUrl})` }}
      ></div>
      <h1 className="text-4xl">{value.name}</h1>
      <h1 className="text-4xl">{value.price} TND</h1>
      <FontAwesomeIcon
        onClick={handleAdd}
        className=" absolute left-0 top-1 text-3xl"
        icon={faPlus}
      />
    </div>
  );
}
