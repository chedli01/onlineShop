import axios from "axios";
import Header from "../Header/header";
import { useState, useEffect } from "react";
import Side from "./side";
import Content from "./content";

export default function Profile() {
  axios.defaults.withCredentials = true;
  const [notifs, setNotifs] = useState([]);
  const [page,setPage]=useState("general");
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3000/price-notifs", {
      withCredentials: true,
    });

    eventSource.addEventListener("notif", (event) => {
      setNotifs((prev) => [...prev, event.data]);
    });
    eventSource.addEventListener("update", (event) => {
      // console.log(event.data)

      setCart(JSON.parse(event.data));
    });
    return () => {
      eventSource.close();
    };
  }, []);

  //////////////////////
  useEffect(() => {
    const eventSource = new EventSource(`http://localhost:3000/notifs`, {
      withCredentials: true,
    });
    eventSource.onmessage = (event) => {
      setNotifs((prev) => [...prev, event.data]);
    };

    return () => {
      eventSource.close();
    };
  }, []);
  // // //////////////////
  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3000/cart-notifs", {
      withCredentials: true,
    });

    // eventSource.addEventListener("update", (event) => {
    //   if (cart.length != 0 && cart.length > JSON.parse(event.data).length) {
    //     setCart(JSON.parse(event.data));
    //   }
    // });

    eventSource.addEventListener("notif", (event) => {
      setNotifs((prev) => [...prev, event.data]);
    });

    return () => {
      eventSource.close();
    };
  }, []);
  //////////////////////////////////////
  useEffect(() => {
    axios.get("http://localhost:3000/status").then((res) => {
      if (res.data.connected == false) {
        navigate("/login");
        window.location.reload();
      } else {
        setName(res.data.name);
        setEmail(res.data.email)
      }
    });
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col  items-center ">
      <Header notifs={notifs} setNotifs={setNotifs} />
      
      <div className="w-full h-5/6 flex">
        <Side  setPage={setPage}/>
        <Content name={name} email={email} page={page} />

          

      </div>
    </div>
  );
}
