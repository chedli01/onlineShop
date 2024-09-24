import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell ,faUser} from "@fortawesome/free-solid-svg-icons";

export default function AdminHeader() {
  return (
    <div className="w-1/5 h-full bg-gray-900">
      <ul className="w-full h-full flex flex-col justify-between items-center">
        <li className="w-full h-1/6 text-4xl text-white flex justify-center items-center">
          OverAll
        </li>
        <li className="w-full h-1/6 text-4xl text-white flex justify-center items-center">
          DataBase Management
        </li>
        <li className="w-full h-1/6 text-4xl text-white flex justify-center items-center">
          Reviews
        </li>
        <li className="w-full h-1/6 text-4xl text-white flex justify-center items-center">
          Analysis
        </li>
        <li className="w-full h-1/6 text-4xl text-white flex justify-center items-center">
          <FontAwesomeIcon icon={faBell} />
        </li>
        <li className="w-full h-1/6 text-4xl text-white flex justify-center items-center">
        <FontAwesomeIcon icon={faUser} />
        </li>
      </ul>
    </div>
  );
}
