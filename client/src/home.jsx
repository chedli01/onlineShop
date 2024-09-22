import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header/header";
import FilterCard from "./filterBar/filterCard";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductsContainer from "./productsCards/productsContainer";
import NavigationPages from "./productsCards/navigationPages";

import OrderBy from "./filterBar/orderBy";
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
  const [notifs,setNotifs]=useState([])



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


  useEffect(()=>{    
    const eventSource=new EventSource(`http://localhost:3000/notifs`,{withCredentials:true});
    eventSource.onmessage=(event)=>{
      setNotifs((prev)=>[...prev,event.data]);      
      
    }
    

  return  ()=>{
    eventSource.close();
  }

  
  
 
},[])

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

  return (
    <actualPagination.Provider value={store}>
      <cartManagment.Provider value={states}>
        <div className="w-screnn overflow-x-hidden ">
          <Header notifs={notifs} />
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
              {/* {filterBarStatus == "hidden" ? (
                <FontAwesomeIcon
                  onClick={handleShow}
                  className="fixed left-0 top-1/2 h-11 w-10"
                  icon={faArrowRight}
                />
              ) : (
                <FontAwesomeIcon
                  onClick={handleHide}
                  className="fixed left-96 -translate-x-3 top-1/2 h-20 w-10"
                  icon={faArrowLeft}
                />
              )} */}
              <NavigationPages products={products} />
            </div>
          </div>
        </div>
      </cartManagment.Provider>
    </actualPagination.Provider>
  );
}
