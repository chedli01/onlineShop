import DataTable from "react-data-table-component";
import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TextField, Button } from '@mui/material';
import axios from "axios";

export default function OrderContent({basicData}){
    const [editIndex, setEditIndex] = useState(null);
    const [editedRow, setEditedRow] = useState({});


  

    const columns = [
        {
          name: "OrderID",
          selector: (row) => row.id,
          sortable: true,
        },
        {
          name: "Products IDs",
          selector: (row) => row.productIds.map((item)=>{return `[${item}]`}),
        },
        {
          name: "User Email",
          selector: (row) => row.userEmail,
        },
        {
          name: "Products Quantity",
          selector: (row) => row.productQuantity.map((item)=>{return `[${item}]`}),
        },
        {
            name: "Order Date",
            selector: (row) => row.orderDate,
          },
          {
            name: "Order Status",
            selector: (row) => row.orderStatus ,
            cell: (row, index) => (
                editIndex === row.id ? (
                  <TextField name="field1" value={editedRow.orderStatus || ''} onChange={(event)=>{setEditedRow({...editedRow,orderStatus:event.target.value})}} />
                ) : (
                  row.orderStatus
                )
              )
            
          },

        {
          name: "Action",
          cell: (row) => (
            <div>
              <button
                className="btn btn-primary"
                onClick={() =>{setEditIndex(row.id);setEditedRow(row)} }
              >
                Edit
              </button>
              <button className="btn btn-primary ml-2" onClick={()=>{axios.post(`http://localhost:3000/editOrder/${row.id}`,{status:editedRow.orderStatus}).then(res=>window.location.reload())}}>Save</button>
            </div>
          ),
        },
      ];
    return(
        <DataTable
      className="w-full"
      columns={columns}
      data={basicData}
      pagination
      selectableRowsHighlight
      highlightOnHover
    />
    

    )
}