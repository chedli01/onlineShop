import axios from "axios"
import { useContext, useEffect, useState } from "react";
import ProductCard from "./productCard";
import { actualPagination } from "../home";

export default function ProductsContainer(){
    const store=useContext(actualPagination)
    const [products,setProducts]=useState([])
    axios.defaults.withCredentials=true;
    useEffect(()=>{
       
       axios.get("http://localhost:3000/list-products").then(res=>setProducts(res.data))
        
    },[])
    return(
        <div className="w-full h-5/6 mt-4 flex flex-wrap items-center justify-around">
            {products.map((item,index)=>{
                if(store.max-3<=index && index<store.max)
                return <ProductCard value={item} key={index}/>
            })}




        </div>
    )
}