import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Nav from 'react-bootstrap/Nav';
export default function NavBar({setTable}){
    return(
        <Nav className="w-full h-10 bg-zinc-700 flex justify-between" defaultActiveKey="/home" as="ul">
        <Nav.Item onClick={(event)=>setTable("users")} className="text-xl" as="li">
          <Nav.Link >Users</Nav.Link>
        </Nav.Item>
        <Nav.Item onClick={(event)=>setTable("products")} className="text-xl" as="li">
          <Nav.Link >Products</Nav.Link>
        </Nav.Item>
        <Nav.Item onClick={(event)=>setTable("orders")} className="text-xl" as="li">
          <Nav.Link >Orders</Nav.Link>
        </Nav.Item>
      </Nav>
    )
}