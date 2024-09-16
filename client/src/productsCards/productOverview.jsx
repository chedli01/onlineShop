import { useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductOverview({value}) {
    
  return (
    <div className="w-full h-full  flex flex-col items-center justify-between" >
    <div
        className="w-full h-2/3 bg-cover bg-center "
        style={{ backgroundImage: `url(${value.imageUrl})` }}
      ></div>
      <h1 className="text-4xl">{value.name}</h1>
      <h1 className="text-4xl">{value.price} TND</h1>
    </div>



  )
    
}
