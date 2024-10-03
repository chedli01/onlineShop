import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

export default function Content({ page, name, email }) {
  const [orders, setOrders] = useState(0);
  const [sent, setSent] = useState(false);
  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [data,setData]=useState([]);
  ////////////////////////////////////////
  const columns = [
    {
      name: "OrderID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Products IDs",
      selector: (row) =>
        row.productIds.map((item) => {
          return `[${item}]`;
        }),
    },
  
    {
      name: "Products Quantity",
      selector: (row) =>
        row.productQuantity.map((item) => {
          return `[${item}]`;
        }),
    },
    {
      name: "Order Date",
      selector: (row) => row.orderDate,
    },
    {
      name: "Order Status",
      selector: (row) => row.orderStatus,
      cell: (row, index) => row.orderStatus
    
    }
  ];
  //////////////////////////////////////
  useEffect(()=>{
     axios.get(`http://localhost:3000/orderbyuser`).then(res=>setData(res.data))
  },[])




  ////////////////////////////////
  const handleClick = () => {
    const formData = new FormData();
    formData.append("image", file);
    axios
      .post("http://localhost:3000/uploadImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setImageURL(res.data.imageUrl);
        // console.log(res.data)
      });
  };
  useEffect(() => {
    axios.get("http://localhost:3000/getImage").then((res) => {
      const db = res.data;
      const full = "http://localhost:3000/" + db;
      setImageURL(full);
    });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3000/total-orders")
      .then((res) => setOrders(res.data));
  }, []);
  return (
    <div className="w-5/6 h-full flex justify-center  ">
      <div
        className={`${
          page == "general"
            ? "flex flex-col justify-around items-center w-5/6 h-full "
            : "hidden"
        }`}
      >
        <div
          style={{ backgroundImage: `url(${imageURL})` }}
          className="w-1/5 h-1/3 border-2  border-black rounded-full flex bg-cover bg-center "
        ></div>
        <input
          onChange={(event) => setFile(event.target.files[0])}
          type="file"
          accept="image/*"
        />
        <button onClick={handleClick}>Confirm</button>
        <div className="w-1/2 h-1/3  ">
          <div className="w-full h-1/3 flex items-center justify-around">
            <label className="text-xl">username:</label>
            <input
              value={name}
              className="w-2/3 h-1/2 rounded-md"
              type="text"
            />
          </div>
          <div className="w-full h-1/3 flex items-center justify-around">
            <label className="text-xl">Email</label>
            <input
              defaultValue={email}
              className="w-2/3 h-1/2 rounded-md"
              type="text"
            />
          </div>
          <div className="w-full h-1/3 flex items-center justify-around">
            <h1 className="text-xl">Number Of Orders : {orders}</h1>
          </div>
        </div>
      </div>
      <div
        className={`${
          page == "security"
            ? "flex flex-col items-center justify-center space-y-4  w-5/6 h-full "
            : "hidden"
        }`}
      >
        <h1 className="text-4xl">Password</h1>
        <input className="w-1/2 h-10   rounded-lg border " type="password" />
        <button
          className="w-32 h-10 bg-blue-700 text-white rounded-lg"
          onClick={() => {
            axios
              .post("http://localhost:3000/request-reset-password")
              .then((res) => setSent(true));
          }}
        >
          Reset Password
        </button>
        <span className={`${sent ? "flex text-red-600 text-lg" : "hidden"}`}>
          check Your email
        </span>
      </div>
      <div
        className={`${
          page == "records" ? "flex flex-col justify-around items-center w-5/6 h-full" : "hidden"
        }`}
      >
        <DataTable
          className="w-full"
          columns={columns}
          data={data}
          pagination
          selectableRowsHighlight
          highlightOnHover
        />
      </div>
    </div>
  );
}
