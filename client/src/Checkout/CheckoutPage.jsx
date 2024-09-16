import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutProduct from "./checkoutProduct";
import CheckoutForm from "./checkoutForm";

export default function CheckoutPage() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get("http://localhost:3000/cart").then((res) => {
      setProducts(res.data);
    });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3000/total-price")
      .then((res) => setTotal(res.data.total));
  }, []);
  useEffect(() => {
    axios.get("http://localhost:3000/status").then((res) => {
      if (res.data.connected == false) {
        navigate("/login");
      }
    });
  }, []);
  useEffect(() => {
    axios.get("http://localhost:3000/checkout").then((res) => {
      if (res.data == false) {
        navigate("/home");
      }
    });
  });
  return (
    <div className="w-screen h-fit flex">
      <div className="w-1/2 h-fit flex flex-col  items-center space-y-4">
        {products.map((item, index) => {
          return <CheckoutProduct key={index} value={item} />;
        })}
        <h1 className="text-3xl text-red-600 font-semibold">
          Total : {total} TND
        </h1>
      </div>
      <div className="w-1/2 h-screen  flex items-center justify-center">
        <CheckoutForm total={total} />
      </div>
    </div>
  );
}
