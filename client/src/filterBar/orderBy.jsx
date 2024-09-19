import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBars,faTh } from "@fortawesome/free-solid-svg-icons";

export default function OrderBy({setSortValue,open,setDetailed}) {

    const handleChange = (event) => {
        setSortValue(event.target.value);
      };
    

  return (
    <div className={`${open=="open"?"hidden":"w-5/6 h-1/6 flex items-center justify-start space-x-20 ml-4  mt-4"}`}>
    <select className="w-1/4 h-1/3 border-2 border-black rounded-lg text-xl bg-blue-950 text-yellow-500 ml-10"  id="sort" onChange={handleChange}>
      <option className="text-xl" value="">Sort Product By</option>
      <option value="price_asc">Price: Low to High</option>
      <option value="price_desc">Price: High to Low</option>
      <option value="name_asc">Name: A to Z</option>
      <option value="name_desc">Name: Z to A</option>
    </select>
    <FontAwesomeIcon onClick={(event)=>{setDetailed(false)}} className="text-3xl" icon={faTh} />
    <FontAwesomeIcon onClick={(event)=>{setDetailed(true)}}  className="text-3xl" icon={faBars} />
    
  </div>
    
  );
}
