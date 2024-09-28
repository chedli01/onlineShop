import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header/header";
import FilterCard from "./filterBar/filterCard";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductsContainer from "./productsCards/productsContainer";
import NavigationPages from "./productsCards/navigationPages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faComment, faL} from "@fortawesome/free-solid-svg-icons";

import OrderBy from "./filterBar/orderBy";
import Chat from "./chat";
export const actualPagination = createContext();
export const cartManagment = createContext();
export default function Home() {
  axios.defaults.withCredentials = true;

  const [name, setName] = useState("");

  const [max, setMax] = useState(9);
  const [fproducts, setFProducts] = useState([]);

  const [expanded, setExpanded] = useState(0);
  const [cart, setCart] = useState([]);

  const [sortValue, setSortValue] = useState("");
  const [products, setProducts] = useState([]);

  const [fCategory, setFCategory] = useState("");
  const [fMinPrice, setFMinPrice] = useState(5000);
  const [fMaxPrice, setFMaxPrice] = useState(5000);
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState("closed");
  const [scroll, setScroll] = useState(0);
  const [detailed, setDetailed] = useState(false);
  const [notifs, setNotifs] = useState([]);
  const [chat,setChat]=useState(false)

  const stack = {
    setFMaxPrice,
    setFCategory,
    setFMinPrice,
    setSearchValue,
    fCategory,
    fMaxPrice,
    fMinPrice,
    searchValue,
  };
  ///////////////////////////////
  useEffect(()=>{
    const eventSource=new EventSource("http://localhost:3000/price-notifs",{withCredentials: true});

    eventSource.addEventListener("notif",(event)=>{
      setNotifs((prev)=>[...prev,event.data])

    });
    eventSource.addEventListener("update",(event)=>{
      // console.log(event.data)

      setCart(JSON.parse(event.data))
    })
    return () => {
      eventSource.close();
    };

  },[])













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

    eventSource.addEventListener("update", (event) => {
      if (cart.length != 0 && cart.length > JSON.parse(event.data).length) {
        setCart(JSON.parse(event.data));
      }
    });

    eventSource.addEventListener("notif", (event) => {
      setNotifs((prev) => [...prev, event.data]);
    });

    return () => {
      eventSource.close();
    };
  }, [cart]);

  /////////////////////////
  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/list-products?sort=${sortValue}&category=${fCategory}&minPrice=${fMinPrice}&maxPrice=${fMaxPrice}&search=${searchValue}`
      )
      .then((res) => setProducts(res.data));
  }, [sortValue, fCategory, fMaxPrice, fMinPrice, searchValue]);

  useEffect(() => {
    axios.get("http://localhost:3000/cart").then((res) => {
      setCart(res.data);
    });
  }, []);

  const store = {
    max,
    setMax,
    fproducts,
    setFProducts,
    expanded,
    setExpanded,
    cart,
    setCart,
    open,
    setOpen,
    scroll,
    setScroll,

    detailed,
    setDetailed,
  };
  const states = { cart, setCart };
  const navigate = useNavigate();
  const [filterBarStatus, setFilterBarStatus] = useState("shown");

  const handleShow = (event) => {
    setFilterBarStatus("shown");
  };
  const handleHide = (event) => {
    setFilterBarStatus("hidden");
  };
  useEffect(() => {
    axios.get("http://localhost:3000/status").then((res) => {
      if (res.data.connected == false) {
        navigate("/login");
        window.location.reload();
      } else {
        setName(res.data.name);
      }
    });
  }, []);
  //////////////////////////////













  /////////////////////////////////

  

  return (
    <actualPagination.Provider value={store}>
      <cartManagment.Provider value={states}>
        <div className="w-screnn overflow-x-hidden ">
          <Header setNotifs={setNotifs} notifs={notifs} />
          <div className="w-screen h-full flex flex-1  ">
            <FilterCard value={filterBarStatus} filter={stack} />

            <div
              className={`h-full flex flex-col   relative  ${
                filterBarStatus == "hidden" ? "w-full" : "w-5/6"
              }`}
            >
              <OrderBy
                setSortValue={setSortValue}
                open={open}
                setDetailed={setDetailed}
              />

              <ProductsContainer products={products}></ProductsContainer>
              <NavigationPages products={products} />
            </div>
          </div>
          <div className="w-1/5 h-5/6 fixed left-2 bottom-0 ">
          <Chat chat={chat} />
          <FontAwesomeIcon onClick={()=>{if(!chat) setChat(true);else setChat(false)}} className="text-4xl" icon={faComment}  />
      
          </div>
        </div>
       
        
      </cartManagment.Provider>
    </actualPagination.Provider>
  );
}

// const [ws,setWs]=useState(null)
// const [msg,setMsg]=useState("");
// const [recieved,setRecieved]=useState([]);
// const [sent,setSent]=useState([])
// useEffect(()=>{
//   const socket= new WebSocket(`ws://localhost:3000`);
//   setWs(socket)
//   socket.onopen = () => {
//     console.log('WebSocket connection established');
// };
//   socket.onmessage=(event)=>{
//     const { senderId, content } = JSON.parse(event.data);
//     console.log(event.data)
//     if(senderId=="chedli.masmoudi01@gmail.com"){
//       setRecieved((prev)=>[...prev,content])

//     }
//     else{

//       setSent((prev)=>[...prev,content])
//     }
  
//   }

// },[])


    {/* <input type="text" onChange={(event)=>setMsg(event.target.value)} />
          <button onClick={()=>{if(ws && msg.trim()) { const mesg = {sender:"chedli.masmoudi97@gmail.com", target:"chedli.masmoudi01@gmail.com",content: msg }; // Always target admin from client side
      ws.send(JSON.stringify(mesg));setSent(msg)}}}>send</button>
          <h1>Sent : {sent}</h1>
          <h1>Recieved : {recieved}</h1> */}