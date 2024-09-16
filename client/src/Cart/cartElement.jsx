import { useEffect, useState } from "react";
import CartItem from "./cartItem";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function CartElement({ cartStatus }) {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [cartState, setCartState] = useState("empty");
  const navigate = useNavigate();
  const handleCheckout = (event) => {
    navigate("/checkout");
  };
  const handleClear=(event)=>{
    axios.get("http://localhost:3000/clear-cart").then(res=>window.location.reload())
  }
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get("http://localhost:3000/cart").then((res) => {
      if(res.data.length>0){setCartState("full")}
      else {setCartState("empty")}
      setProducts(res.data);
    });
  }, []);

  useEffect(() => {
    setTotal(
      products.reduce((acc, curr) => {
        return acc + curr.price * curr.quantity;
      }, 0)
    );
  });

  return (
    <div
      className={`h-screen w-1/4 bottom-0 fixed right-0 border-l-black border-l-2 bg-white ${
        cartStatus == "up"
          ? "flex flex-col justify-around items-center z-10"
          : "hidden"
      }`}
    >
      {products.map((item, index) => {
        return <CartItem key={index} value={item} />;
      })}
      <div className="w-full h-1/6 flex flex-col justify-between items-center">
        <h1 className="text-4xl text-red-500">Total : {total} TND </h1>
        <button
          onClick={handleCheckout}
          className="w-2/3 p-2 h-1/3 bg-blue-950 text-xl text-yellow-500 rounded-lg flex justify-center items-center"
        >
          Proceed To Checkout
        </button>
        <button 
          onClick={handleClear}
          className={`w-2/3 p-2 h-1/3 bg-blue-950 text-xl text-yellow-500 rounded-lg ${cartState=="empty"?"hidden":"flex justify-center items-center"}`}
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}
