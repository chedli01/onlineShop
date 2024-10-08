import axios from "axios";
import { useContext, useState } from "react";
import { actualPagination } from "../home";

import Listen from "../audio";

export default function FilterCard({ value, filter,chat }) {
  const [search, setSearch] = useState("");
  const [transcript,setTranscript]=useState("");

  const store = useContext(actualPagination);
  // const handleSearch=(event)=>{
  //   filter.setSearchValue(search)
  //   // axios.post("http://localhost:3000/search",{searchValue:searchValue}).then(res=>{window.location.reload();})

  // }
  return (
    <div
      className={`w-1/5 h-fit space-y-12 ml-4 mt-40 ${chat==false?"z-10":""}  border-black border-2 p-4 rounded-lg  ${
        value == "hidden"
          ? "hidden"
          : "flex flex-col items-center justify-around"
      }`}
    >
      <div className="w-full flex items-center justify-center ">
        <input
          className="w-full  h-8 border-black border-2 rounded-md "
          type="text"
          placeholder="search product here"
          onChange={(event) => filter.setSearchValue(event.target.value)}
          value={filter.searchValue}
        />
        <Listen transcript={filter} />
      </div>

      <select
        onChange={(event) => filter.setFCategory(event.target.value)}
        class="form-select"
        aria-label="Default select example"
      >
        <option value="">Category</option>
        <option value="Laptops">Laptops</option>
        <option value="Smartphones">Smartphones</option>

        <option value="Tablets">Tablets</option>

        <option value="Televisions">Televisions</option>
      </select>
      <div className="w-full flex flex-col items-center ">
        <label htmlFor="customRange1" class="form-label">
          Min Price
        </label>
        <input
          type="range"
          class="form-range"
          min="0"
          max="10000"
          id="customRange1"
          value={filter.fMinPrice}
          onChange={(event) => {
            filter.setFMinPrice(event.target.value);
          }}
        />
        <span>{filter.fMinPrice} TND</span>
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
          value={filter.fMaxPrice}
          onChange={(event) => {
            filter.setFMaxPrice(event.target.value);
          }}
        />
        <span>{filter.fMaxPrice} TND</span>
      </div>
    </div>
  );
}
