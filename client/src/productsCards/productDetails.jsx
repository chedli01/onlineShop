import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { actualPagination, cartManagment } from "../home";
import Alert from "../alert";

export default function ProductDetails({ value }) {
  const [quantity, setQuantity] = useState(0);
  axios.defaults.withCredentials = true;
  const store = useContext(actualPagination);
  const states = useContext(cartManagment);
  const [quantityInStock, setQuantityInStock] = useState(0);
  const [alertState, setAlertState] = useState("none");
  const [alertMsg, setAlertMsg] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/quantityInStock/${value.id}`)
      .then((res) => setQuantityInStock(res.data.quantity));
  }, []);

  const handleClick = (event) => {
    if (quantityInStock < quantity) {
      setAlertMsg(`Only ${quantityInStock} Product Found In Stock`);

      setAlertState("exist");
    } else if (isNaN(quantity)) {
      setAlertMsg("Please Enter A Valid Number ");
      setAlertState("exist");
    } else {
      axios
        .post("http://localhost:3000/add-to-cart", {
          quantity: quantity,
          name: value.name,
          price: value.price,
          id: value.id,
          image: value.imageUrl,
        })
        .then((res) => {
          const result = states.cart.find((item) => item.id == value.id);
          if (result) {
            const updatedData = states.cart.map((item) => {
              if (item.id == value.id)
                return {
                  ...item,
                  quantity: parseInt(item.quantity) + parseInt(quantity),
                };
              return item;
            });
            states.setCart(updatedData);
          } else {
            states.setCart((prev) => [
              ...prev,
              {
                quantity: quantity,
                name: value.name,
                price: value.price,
                id: value.id,
                image: value.imageUrl,
              },
            ]);
          }

          window.location.reload();
        });
    }
  };

  return (
    <div className={` ${store.detailed==false?"h-full w-full":"h-96 w-5/6 border-2 border-black rounded-xl mt-2"}   flex relative`}>
      <div
        className={`w-full h-full  absolute top-0 left-0 z-10 ${
          alertState == "none" ? "hidden" : "flex items-center justify-center"
        }`}
      >
        <Alert close={setAlertState} message={alertMsg} />
      </div>

      <div
        className={`w-1/3 h-full ${store.detailed==true?"rounded-xl":""} bg-cover bg-center border-r-2 border-r-black ${
          alertState == "none" ? "opacity-100" : "opacity-10"
        }`}
        style={{ backgroundImage: `url(${value.imageUrl})` }}
      ></div>
      <div
        className={`w-1/3 h-full  flex flex-col items-center justify-around p-4 border-r-2 border-r-black  ${
          alertState == "none" ? "opacity-100" : "opacity-10"
        }`}
      >
        <h1 className="text-4xl font-extrabold">{value.name}</h1>
        <h2 className="text-lg">{value.description}</h2>
      </div>
      <div
        className={`w-1/3 h-full flex flex-col items-center justify-around ${
          alertState == "none" ? "opacity-100" : "opacity-10"
        }`}
      >
        <h1 className="text-4xl text-red-600">{value.price} TND</h1>
        <div className="w-3/4 h-fit flex items-center justify-around">
          <label className="text-xl font-semibold ">Quantity:</label>
          <input
            onChange={(event) => {
              setQuantity(event.target.value);
            }}
            className="w-10 h-10 border-black border-2 rounded-lg"
            type="text"
          />
        </div>
        <button
          onClick={handleClick}
          className="w-3/4 h-10 bg-green-500 text-white rounded-lg"
        >
          Add To Shopping-Cart
        </button>
      </div>
    </div>
  );
}
