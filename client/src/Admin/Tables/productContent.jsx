import React, { useState } from "react";
import DataTable from "react-data-table-component";

export default function ProductContent({ basicData,filter }) {

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
    },
    {
      name: "Product Price",
      selector: (row) => row.price,
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <button
            className="btn btn-primary"
            onClick={() => alert(row.alpha2Code)}
          >
            Edit
          </button>
          <button className="btn btn-primary ml-2">Delete</button>
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
