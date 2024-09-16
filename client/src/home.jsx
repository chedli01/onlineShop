import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header/header";
import FilterCard from "./filterBar/filterCard";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductsContainer from "./productsCards/productsContainer";
import NavigationPages from "./productsCards/navigationPages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
export const actualPagination=createContext();
export default function Home() {
  const [name, setName] = useState("");
  
  const [max, setMax] = useState(3);
  const [fproducts,setFProducts]=useState([])
  const [isFiltered,setIsFiltered]=useState(false)
  const [category,setCategory]=useState("")

  const [expanded,setExpanded]=useState(0);
  
  const store={max,setMax,isFiltered,setIsFiltered,fproducts,setFProducts,category,setCategory,expanded,setExpanded};
  const navigate = useNavigate();
  const [filterBarStatus, setFilterBarStatus] = useState("shown");
  axios.defaults.withCredentials = true;
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
    <div className="w-screnn h-screen ">
      <Header />
      <div className="w-screen h-5/6 flex ">
        <FilterCard value={filterBarStatus} />
        <div
          className={`h-full flex flex-col items-center  ${
            filterBarStatus == "hidden" ? "w-full" : "w-5/6"
          }`}
        >
          <ProductsContainer />
          {filterBarStatus == "hidden" ? (
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
          )}
          <NavigationPages />
        </div>
      </div>
    </div>
    </actualPagination.Provider>
  );
}
