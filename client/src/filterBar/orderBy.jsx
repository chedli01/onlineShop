

export default function OrderBy({setSortValue}) {

    const handleChange = (event) => {
        setSortValue(event.target.value);
      };
    

  return (
    <div className="w-5/6 h-1/6 flex items-center ml-4 ">
    <select className="w-1/4 h-1/3 border-2 border-black rounded-lg text-xl bg-blue-950 text-yellow-500"  id="sort" onChange={handleChange}>
      <option className="text-xl" value="">Sort Product By</option>
      <option value="price_asc">Price: Low to High</option>
      <option value="price_desc">Price: High to Low</option>
      <option value="name_asc">Name: A to Z</option>
      <option value="name_desc">Name: Z to A</option>
    </select>
  </div>
    
  );
}
