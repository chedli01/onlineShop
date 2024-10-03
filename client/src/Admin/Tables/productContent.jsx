import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { TextField} from '@mui/material';
import axios from "axios";


export default function ProductContent({ basicData,filter }) {
  const [editIndex,setEditIndex]=useState(-1);
  const [newPrice,setNewPrice]=useState(0);
  const [newQuantity,setNewQuantity]=useState(-1);

  const columns = [
    {
      name: "Product Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Product Category",
      selector: (row) => row.category,
    },
    {
      name: "Product Quantity",
      selector: (row) => row.quantity,
      cell: (row)=>(
        editIndex==row.id?
        (<TextField defaultValue={row.quantity} onChange={(event)=>setNewQuantity(event.target.value)} />):
        (row.quantity)
      )
    },
    {
      name: "Product Price",
      selector: (row) => row.price,
      cell: (row)=>(
        editIndex==row.id?

        (<TextField defaultValue={row.price} onChange={(event)=>{setNewPrice(event.target.value)}} />):

        (row.price)
      



      )
        
        
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <button
            className="btn btn-primary"
            onClick={() => setEditIndex(row.id)}
          >
            Edit
          </button>
          <button className="btn btn-primary ml-2" onClick={()=>{
            if(newQuantity==-1)
            axios.post(`http://localhost:3000/editProductPrice/${row.id}`,{newPrice:newPrice}).then(res=>window.location.reload())
            else{
              if(newPrice==0){axios.post(`http://localhost:3000/editProductQuantity/${row.id}`,{newQuantity:newQuantity}).then(res=>window.location.reload())}
              else{
                axios.post(`http://localhost:3000/editProductPrice/${row.id}`,{newPrice:newPrice});
                axios.post(`http://localhost:3000/editProductQuantity/${row.id}`,{newQuantity:newQuantity}).then(res=>window.location.reload())
                
              }
            }
          }}>Save</button>
          <button  className="btn btn-primary ml-2" onClick={(event)=>{
            axios.delete(`http://localhost:3000/deleteProduct/${row.id}`).then(res=>window.location.reload())
          }}>Delete</button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
    <div className="w-full h-1/6 flex items-center justify-around  ">
          <input
          type="text"
          placeholder="Search here"
          className="w-1/3 form-control"
          value={filter.search}
          onChange={(e) => filter.setSearch(e.target.value)}
        />
          <select
        onChange={(event) => filter.setFCategory(event.target.value)}
        class="form-select"
        className="w-1/3 h-10 border rounded-lg "
        aria-label="Default0 select example"
      >
        <option value="">Category</option>
        <option value="Laptops">Laptops</option>
        <option value="Smartphones">Smartphones</option>

        <option value="Tablets">Tablets</option>

        <option value="Televisions">Televisions</option>
      </select>
        </div>
    <DataTable
      className="w-full"
      columns={columns}
      data={basicData}
      pagination
      selectableRowsHighlight
      highlightOnHover
    /></div>
  );
}
