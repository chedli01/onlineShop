import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { actualPagination } from "../home";
import ProductOverview from "./productOverview";
import ProductDetails from "./productDetails";

export default function ProductCard({ value }) {
  const [open, setOpen] = useState("closed");
  const store = useContext(actualPagination);
  const navigate = useNavigate();
  return (
    <div
      className={`h-full  border-2 rounded-lg flex flex-col items-center justify-between ${
        value.id == store.expanded
          ? "w-5/6"
          : value.id != store.expanded && store.expanded != 0
          ? "hidden"
          : "w-1/4"
      }`}
    >

      


      <div className="w-full h-5/6 ">{open=="open" ? <ProductDetails value={value}/>:<ProductOverview value={value}/>}</div>
<div className="w-full h-1/5 flex justify-center items-center">
      <button className="w-1/2 h-20 border-2 border-black text-2xl rounded-xl bg-blue-950 text-yellow-500"
        onClick={(event) => {
          if (open == "closed") {
            setOpen("open");
            store.setExpanded(value.id);
          } else {
            setOpen("closed");
            store.setExpanded(0);
          }
        }}
      >
        {open=="open"?"Back To OverView":"View Details"}
      </button></div>
    </div>
  );
}
