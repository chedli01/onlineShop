import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home";
import Signup from "./Registration/signup";
import Login from "./Login/login";
import axios from "axios";
import AboutUs from "./aboutus";
import ProductDetails from "./productsCards/productOverview";
import CheckoutPage from "./Checkout/CheckoutPage";


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
      </Routes>
    </Router>
  );
}

export default App;
