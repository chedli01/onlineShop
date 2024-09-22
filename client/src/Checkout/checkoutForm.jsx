import axios from "axios";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm({ total,products }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [adress, setAdress] = useState("");
  const [orderID,setOrderID]= useState(0);
  const navigate=useNavigate();


  useEffect(()=>{
    axios.get("http://localhost:3000/listOrders").then((res)=>{
      setOrderID(res.data[res.data.length-1].id+1)
      
    })

  },[])


  const handleSubmit = (event) => {
    event.preventDefault();
    products.map((item)=>{
      axios.post(`http://localhost:3000/minusStock/${item.id}`,{quantity:item.quantity});

    })
    

    axios.post("http://localhost:3000/sendemail", {

      name:name,
      phone:phone,
      adress:adress,
      total:total,
      date:new Date().toDateString(),
      orderID: orderID,
      email: email,
      subject: "verifying checkout",
      text:"Dear Client, This is an invoice of your pursaches on our site. Thank you for visiting us",
    }).then(res=>navigate("/home"));
    
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-3/4 h-3/4  border-black border-2 rounded-lg flex flex-col items-center justify-around"
    >
      <label className="text-4xl">Name</label>
      <input
        onChange={(event) => setName(event.target.value)}
        type="text"
        className="w-3/4 h-10 rounded-xl border-2 border-black"
      />
      <label className="text-4xl">Email</label>
      <input
        onChange={(event) => setEmail(event.target.value)}
        type="email"
        className="w-3/4 h-10 rounded-xl border-2 border-black"
      />
      <label className="text-4xl">Phone Number</label>
      <input
        onChange={(event) => setPhone(event.target.value)}
        type="text"
        className="w-3/4 h-10 rounded-xl border-2 border-black"
      />
      <label className="text-4xl">Shipping Adress</label>
      <input
        onChange={(event) => setAdress(event.target.value)}
        type="text"
        className="w-3/4 h-10 rounded-xl border-2 border-black"
      />
      <button
        type="submit"
        className="w-1/2 h-10 rounded-lg bg-blue-950 text-yellow-600 font-bold text-xl"
      >
        Confirm
      </button>
    </form>
  );
}
