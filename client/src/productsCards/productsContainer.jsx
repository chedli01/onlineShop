import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ProductCard from "./productCard";
import { actualPagination, cartManagment } from "../home";

export default function ProductsContainer({products}) {
  const store = useContext(actualPagination);
  axios.defaults.withCredentials = true;
  return (
    <div className="w-full mt-4 flex flex-wrap items-center justify-around space-x-2 overflow-x-hidden">
      {products.map((item, index) => {
        if (store.max - 9 <= index && index < store.max)
          return <ProductCard value={item} key={index} />;
      })}
    </div>
  );
}
