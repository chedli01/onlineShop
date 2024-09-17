import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ProductCard from "./productCard";
import { actualPagination, cartManagment } from "../home";

export default function ProductsContainer({products}) {
  const store = useContext(actualPagination);
  axios.defaults.withCredentials = true;
  return (
    <div className="w-full h-5/6 mt-4 flex flex-wrap items-center justify-around">
      {products.map((item, index) => {
        if (store.max - 3 <= index && index < store.max)
          return <ProductCard value={item} key={index} />;
      })}
    </div>
  );
}
