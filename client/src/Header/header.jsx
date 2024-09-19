import axios from "axios";
import { useEffect, useState } from "react";
import myImage from "./logopc-removebg-preview.png";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faCartShopping,faArrowRight } from "@fortawesome/free-solid-svg-icons";
import CartElement from "../Cart/cartElement";
export default function Header() {
  const [status, setStatus] = useState("");
  const [cartStatus, setCartStatus] = useState("down");
  const [total,setTotal]=useState(0)
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  /////////////////////
  const handleClick = (event) => {
    if (status == "connected") {
      axios
        .get("http://localhost:3000/logout")
        .then((res) => window.location.reload());
    } else {
      navigate("/login");
    }
  };
  ////////////////
  const handleCart = (event) => {
    if (cartStatus == "down") setCartStatus("up");
    else setCartStatus("down");
  };
  ///////////////

  useEffect(() => {
    axios.get("http://localhost:3000/status").then((res) => {
      if (res.data.connected) setStatus("connected");
      else setStatus("not connected");
    });
  }, []);
  ////////////////////
  useEffect(()=>{
    axios.get("http://localhost:3000/total-cart").then(res=>setTotal(res.data.total))
  })

  return (
    <div
      className={`h-32 flex bg-yellow-400   top-0 ${
        cartStatus == "down" ? "w-full" : "w-3/4"
      }`}
    >
      <div
        className="w-1/3 h-2/3 translate-y-6  bg-cover bg-center"
        style={{ backgroundImage: `url(${myImage})` }}
      ></div>
      <ul className="w-2/3 h-full flex items-center justify-around">
        <li className="text-6xl text-blue-950 font-extrabold">
          <a href="/home">Home</a>
        </li>
        <li className="text-6xl text-blue-950 font-extrabold">
          <a href="/aboutus">About us</a>{" "}
        </li>
        <li className="text-6xl text-blue-950 font-extrabold">
          <button onClick={handleClick}>
            {status == "connected" ? "logout" : "login"}
          </button>
        </li>
        <li
          onClick={handleCart}
          className="text-5xl text-blue-950 font-extrabold"
        >
          {(status == "connected" && cartStatus == "down") ? (
            <>
            <FontAwesomeIcon className={`${total==0?"hidden":""}`} icon={faCartShopping} />
            <span className={`-translate-x-4 ${total==0?"hidden":""}`} >{total}</span>
            </>
            
          ) : (status == "connected" && cartStatus) == "up" ? (
            <FontAwesomeIcon icon={faArrowRight} />
          ) : (
            ""
          )}
        </li>
      </ul>
      <CartElement cartStatus={cartStatus} />
    </div>
  );
}
