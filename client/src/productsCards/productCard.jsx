import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { actualPagination } from "../home";
import ProductOverview from "./productOverview";
import ProductDetails from "./productDetails";

export default function ProductCard({ value }) {
  const store = useContext(actualPagination);

  useEffect(()=>{
    if(store.open=="closed"){
      window.scrollTo(0,store.scroll);
    }
    if(store.open=="open"){
      window.scrollTo(0,0)
    }
  },[store.open])
  const navigate = useNavigate();
  return (
    <div
      className={`h-[650px]   mb-11 border-2 rounded-lg flex flex-col items-center justify-between ${
        value.id == store.expanded
          ? "w-5/6"
          : value.id != store.expanded && store.expanded != 0
          ? "hidden"
          : "w-1/4"
      }`}
    >
      <div className="w-full h-5/6 ">
        {store.open == "open" ? (
          <ProductDetails value={value} />
        ) : (
          <ProductOverview value={value} />
        )}
      </div>
      <div className="w-full h-1/5 flex justify-center items-center">
        <button
          className="w-1/2 h-10 border-2 border-black text-2xl rounded-xl bg-blue-950 text-yellow-500"
          onClick={async (event) => {
            if (store.open == "closed") {
              store.setScroll(window.scrollY)

              // setScroll(window.scrollY)

              store.setOpen("open");
              store.setExpanded(value.id);
            } else {
              store.setOpen("closed");

              store.setExpanded(0);
            }
          }}
        >
          {store.open == "open" ? "Back To OverView" : "View Details"}
        </button>
      </div>
    </div>
  );
}
