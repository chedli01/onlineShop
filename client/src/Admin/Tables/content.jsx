import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
export default function Content({ data }) {
  const navigate=useNavigate()
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>UserName</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => {
          return (
            <tr key={index}>
              <td>{item._id}</td>
              <td>{item.username}</td>
              <td>{item.email}</td>
              <td className="flex justify-between items-center">
                <button className="h-10 w-1/4 bg-blue-700 rounded-md text-white ">
                  Edit
                </button>{" "}
                <button className="h-10 w-1/4 bg-blue-700 rounded-md text-white ">
                  Delete{" "}
                </button>
                <button className="h-10 w-1/4 bg-blue-700 rounded-md text-white " onClick={async()=>{
                  await localStorage.setItem('access',true)

                  navigate(`/admindash/tables/contactuser?email=${item.email}`)

                }}>
                  Contact User
                </button>{" "}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
