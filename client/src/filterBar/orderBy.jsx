

export default function OrderBy({setSortValue}) {

    const handleChange = (event) => {
        setSortValue(event.target.value);
      };
    

  return (
    <div>
    <select id="sort" onChange={handleChange}>
      <option value="">Sort Product By</option>
      <option value="price_asc">Price: Low to High</option>
      <option value="price_desc">Price: High to Low</option>
      <option value="name_asc">Name: A to Z</option>
      <option value="name_desc">Name: Z to A</option>
    </select>
  </div>
    
  );
}
