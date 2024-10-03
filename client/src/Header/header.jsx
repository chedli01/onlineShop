import axios from "axios";
import { useEffect, useState } from "react";
import myImage from "./logopc-removebg-preview.png";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faCartShopping,
  faArrowRight,
  faBell,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import CartElement from "../Cart/cartElement";
export default function Header({ notifs, setNotifs }) {
  const [status, setStatus] = useState("");
  const [cartStatus, setCartStatus] = useState("down");
  const [total, setTotal] = useState(0);
  const [display, setDisplay] = useState("hidden");
  const [user, setUser] = useState("up");
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

  //////////////

  useEffect(() => {
    axios.get("http://localhost:3000/status").then((res) => {
      if (res.data.connected) setStatus("connected");
      else setStatus("not connected");
    });
  }, []);
  ////////////////////
  useEffect(() => {
    axios
      .get("http://localhost:3000/total-cart")
      .then((res) => setTotal(res.data.total));
  });

  return (
    <div
      className={`h-32 flex bg-yellow-400  justify-around   top-0 ${
        cartStatus == "down" ? "w-full" : "w-3/4"
      }`}
    >
      <div
        onClick={() => navigate("/home")}
        className="w-1/4 h-2/3 translate-y-6  bg-cover bg-center"
        style={{ backgroundImage: `url(${myImage})` }}
      ></div>
      <ul className="w-2/3 h-full flex items-center justify-around">
        {/* <li className="text-6xl text-blue-950 font-extrabold">
          <a href="/home">Home</a>
        </li> */}
        <li className="text-6xl text-blue-950 font-extrabold">
          <a href="/aboutus">About us</a>{" "}
        </li>

        <li className="text-6xl text-blue-950 font-extrabold">
          <button onClick={handleClick}>
            {status == "connected" ? "logout" : "login"}
          </button>
        </li>
        <li
          onClick={(event) => {
            if (display == "hidden") setDisplay("flex");
            else {
              setDisplay("hidden");
              setNotifs([]);
            }
          }}
          className="text-6xl text-blue-950 font-extrabold"
        >
          <FontAwesomeIcon icon={faBell} />
          <span>{notifs.length}</span>
          <div
            className={`w-64 fixed z-10 top-32 right-32   bg-yellow-400  ${
              display == "hidden" ? "hidden" : "flex flex-col space-y-2  "
            } `}
          >
            {notifs.map((item, index) => {
              return (
                <h1
                  className="text-lg border-2 border-blue-950 p-1"
                  key={index}
                >
                  {item}
                </h1>
              );
            })}
          </div>
        </li>
        <li
          className="flex flex-col"
          onClick={() => {
            if (user == "up") setUser("down");
            else setUser("up");
          }}
        >
          <FontAwesomeIcon
            className="text-5xl text-blue-950 font-extrabold"
            icon={faUser}
          />
          <div
            className={`${
              user == "down"
                ? "flex flex-col w-64   top-32 absolute right-48 bg-yellow-400 z-10"
                : "hidden"
            }`}
          >
            <a
              href="/profile"
              className="w-full h-20 text-2xl border-2 border-blue-950 flex items-center font-bold p-1 "
            >
              Settings
            </a>
            <a
              className="w-full h-20 text-2xl border-2 border-blue-950 flex items-center font-bold p-1 "
              href=""
              onClick={handleClick}
            >
              Logout
            </a>
          </div>
        </li>
        <li
          onClick={handleCart}
          className="text-5xl text-blue-950 font-extrabold"
        >
          {status == "connected" && cartStatus == "down" ? (
            <>
              <FontAwesomeIcon
                className={`${total == 0 ? "hidden" : ""}`}
                icon={faCartShopping}
              />
              <span className={`-translate-x-4 ${total == 0 ? "hidden" : ""}`}>
                {total}
              </span>
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
