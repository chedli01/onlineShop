import { useEffect, useState } from "react";
import Header from "../../Header/header";
import AdminContent from "../adminContent";
import AdminHeader from "../adminHeader";
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import NavBar from "./nav";
import Content from "./content";
import axios from "axios";
import ProductContent from "./productContent";
import OrderContent from "./orderContent";
import Sidebar from "../adminHeader";

export default function Tables({ active }) {
  const [table, setTable] = useState("users");
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setFCategory] = useState("");
  const filter = { search, setSearch, category, setFCategory };

  useEffect(() => {
    if (table == "users") {
      axios
        .get("http://localhost:3000/getUsers")
        .then((res) => setUsers(res.data));
    } else if (table == "products") {
      axios
        .get(
          `http://localhost:3000/getProducts?search=${search}&category=${category}`
        )
        .then((res) => {
          setProducts(res.data);
        });
    } else {
      axios
        .get("http://localhost:3000/getOrders")
        .then((res) => setOrders(res.data));
    }
  }, [table, search, category]);

  return (
    <div
      className={`w-screen h-screen flex items-center  relative
      }`}
    >
      <Sidebar />
      <div className="w-5/6 h-full flex flex-col  absolute top-0 right-6 space-y-32">
      <NavBar setTable={setTable} />
      {table == "users" ? (
        <Content data={users} />
      ) : table == "products" ? (
        <ProductContent filter={filter} basicData={products} />
      ) : (
        <OrderContent basicData={orders} />
      )}</div>
    </div>
  );
}
