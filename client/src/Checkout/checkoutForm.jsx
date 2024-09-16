import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm({ total }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [adress, setAdress] = useState("");
  const navigate=useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:3000/sendemail", {
      content:"bhar lazrag",
      email: email,
      subject: "verifying checkout",
      text: `name : ${name}     phone: ${phone}     orderDate: ${new Date()}    total to pay : ${total} TND  `,
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
