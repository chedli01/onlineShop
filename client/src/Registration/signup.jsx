import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/register", {
        username: username,
        email: email,
        password: password,
      })
      .then((res) => navigate("/login"))
      .catch((err) => alert(err.response.data.msg));
  };

  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex justify-center items-center "
      style={{
        backgroundImage: `url("https://img.freepik.com/premium-photo/showcase-electronic-items-black-background_893571-15169.jpg")`,
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-1/3 h-2/3  flex flex-col justify-around items-center  border-black border-2 rounded-xl"
      >
        <div className="w-full h-1/4  flex flex-col justify-around items-center">
          <label className="text-4xl text-red-600">UserName</label>
          <input
            onChange={(event) => setUserName(event.target.value)}
            type="text"
            className="w-2/3 h-1/5 rounded-md border-2 border-black"
          />
        </div>
        <div className="w-full h-1/4  flex flex-col justify-around items-center">
          <label className="text-4xl text-red-600">Email</label>
          <input
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            className="w-2/3 h-1/5 rounded-md border-2 border-black"
          />
        </div>
        <div className="w-full h-1/4 flex flex-col justify-around items-center">
          <label className="text-4xl text-red-600">Password</label>
          <input
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            className="w-2/3 h-1/5 rounded-md border-2 border-black"
          />
        </div>
        <button
          type="submit"
          className="w-1/4 h-10 text-2xl text-red-600 border-2 border-black rounded-md"
        >
          Confirm
        </button>
        <p className="text-xl text-red-600">
          Aleready Have An Account ?{" "}
          <a href="/login" className="text-xl text-red-600">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
