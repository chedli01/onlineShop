import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ProductCard from "./productCard";
import { actualPagination, cartManagment } from "../home";
import ProductDetails from "./productDetails";

export default function ProductsContainer({products}) {
  const store = useContext(actualPagination);
  axios.defaults.withCredentials = true;
  return (
    <div className={`${store.detailed==false?"flex flex-wrap items-center justify-around space-x-2 overflow-x-hidden":"flex flex-col justify-around items-center space-y-4"} w-full  mt-4 `} >
      {
      store.detailed==false?
      products.map((item, index) => {
        if (store.max - 9 <= index && index < store.max)
          return <ProductCard value={item} key={index} />;
      }):
      products.map((item,index)=>{
        if (store.max - 9 <= index && index < store.max)
          return <ProductDetails value={item} key={index} />;
        
      })
      }
    </div>
  );
}
