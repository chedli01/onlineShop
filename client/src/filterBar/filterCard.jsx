import axios from "axios";
import { useContext, useState } from "react";
import { actualPagination } from "../home";
import { useNavigate } from "react-router-dom";

export default function FilterCard({ value }) {
  const [maxRange, setMaxRange] = useState(5000);
  const [minRange, setMinRange] = useState(5000);
  const [category,setCategory]=useState("");
  const [searchValue,setSearchValue]=useState("")
  const store=useContext(actualPagination);
  const handleFilter = (event) => {
    axios.post("http://localhost:3000/setFilter",{category:category,minPrice:minRange,maxPrice:maxRange}).then(res=>window.location.reload())

  };
  const handleSearch=(event)=>{
    axios.post("http://localhost:3000/search",{searchValue:searchValue}).then(res=>{window.location.reload();})
  }
  return (
    <div
      className={`w-1/5 h-full  border-r-black border-r-2 ${
        value == "hidden"
          ? "hidden"
          : "flex flex-col items-center justify-around"
      }`}
    >
      <div className="w-full flex flex-col items-center space-y-2">

        <input
          className="w-5/6 h-10 border-black border-2 rounded-md "
          type="text"
          placeholder="search product here"
          onChange={(event)=>setSearchValue(event.target.value)}
        />
        <button onClick={handleSearch} className="bg-yellow-500 text-4xl text-blue-950 font-bold p-2 rounded-lg">Search</button>
      </div>

      <select
        onChange={(event) => setCategory(event.target.value)}
        class="form-select"
        aria-label="Default select example"
      >
        <option>Category</option>
        <option value="Laptops">Laptops</option>
        <option value="Smartphones">Smartphones</option>
      </select>
      <div className="w-full flex flex-col items-center space-y-2">
        <label htmlFor="customRange1" class="form-label">
          Min Price
        </label>
        <input
          type="range"
          class="form-range"
          min="0"
          max="10000"
          id="customRange1"
          defaultValue={minRange}
          onChange={(event) => {
            setMinRange(event.target.value);
          }}
        />
        <span>{minRange} TND</span>
      </div>
      <div className="w-full flex flex-col items-center space-y-2">
        <label htmlFor="customRange2" class="form-label">
          Max Price
        </label>
        <input
          type="range"
          class="form-range"
          min="0"
          max="10000"
          id="customRange2"
          defaultValue={maxRange}
          onChange={(event) => {
            setMaxRange(event.target.value);
          }}
        />
        <span>{maxRange} TND</span>
      </div>
      <button  onClick={handleFilter} className="bg-yellow-500 text-4xl text-blue-950 font-bold p-2 rounded-lg">
        Filter
      </button>
    </div>
  );
}
