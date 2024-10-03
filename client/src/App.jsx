import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home";
import Signup from "./Registration/signup";
import Login from "./Login/login";
import axios from "axios";
import AboutUs from "./aboutus";
import ProductDetails from "./productsCards/productOverview";
import CheckoutPage from "./Checkout/CheckoutPage";
import AdminDash from "./Admin/adminDash";
import AdminLog from "./Admin/Login/adminLog";
import Contact from "./Admin/Contact/contact";
import Tables from "./Admin/Tables/tables";
import Analytics from "./Admin/analytics";
import ChatPage from "./Admin/chatPage";


function App() {
  axios.defaults.withCredentials=true;
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/aboutus" element={<AboutUs/>}/>
        <Route path="/checkout" element={<CheckoutPage />}/>
        <Route path="/admindash" element={<AdminDash/>}/>
        <Route path="/adminlogin" element={<AdminLog/>}/>
        <Route path="/admindash/tables/contactuser" element={<Contact/>}/>
        <Route path="/admindash/tables" element={<Tables/>}/>
        <Route path="/admindash/analytics" element={<Analytics/>}/>
        <Route path="/admindash/chat" element={<ChatPage/>}/>

      </Routes>
    </Router>
  );
}

export default App;
