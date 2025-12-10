import { Link } from "react-router";
import { LOGO_URL } from "../utils/constants";
import { useContext, useState } from "react";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Login");

  const onlineStatus = useOnlineStatus();

  const { loggedInUser } = useContext(UserContext);
  console.log(loggedInUser);

  return (
    <div className=" flex justify-between bg-purple-50 shadow-lg py-3 px-4 relative">
      {/* logo */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <img
          className=" w-20 lg:h-20 rounded-full object-cover"
          alt="logo"
          src={LOGO_URL}
        />
      </div>

      <div className="flex">
        <ul className="flex items-center gap-4 flex-wrap text-sm md:text-base font-serif">
          <li className="px-4 hover:text-purple-700">
            Online Status: {onlineStatus ? "🟢" : "🔴"}
          </li>

          <li className="px-4 hover:text-purple-700">
            <Link to="/">Home</Link>
          </li>
          <li className="px-4 hover:text-purple-700">
            <Link to="/about">About Us</Link>
          </li>
          <li className="px-4 hover:text-purple-700">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="px-4 hover:text-purple-700">
            <Link to="/grocery">Grocery</Link>
          </li>
          <li className="px-4 hover:text-purple-700">Cart</li>
          <button
            className="  
                px-5 py-2 
              bg-purple-700 
              text-white 
              rounded-md 
              transition-all 
              duration-200 
              cursor-pointer 
              hover:shadow-lg
              hover:scale-[1.02]"
            onClick={() => {
              btnNameReact === "Login"
                ? setBtnNameReact("Logout")
                : setBtnNameReact("Login");
            }}
          >
            {btnNameReact}
          </button>

          <li className="px-4 font-bold">{loggedInUser}</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
