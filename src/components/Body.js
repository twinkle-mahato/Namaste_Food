import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import useOnlineStatus from "../utils/useOnlineStatus";
import { Link } from "react-router";
import { withVeglabel } from "./RestaurantCard";
import UserContext from "../utils/UserContext";
import { useContext } from "react";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurant] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");

  const RestaurantCardVeg = withVeglabel(RestaurantCard);

  // Whenever state variables update, react triggers a reconciliation cycle(re-renders the component)
  //console.log("Body Rendered", listOfRestaurants);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://corsproxy.io/https://namastedev.com/api/v1/listRestaurants"
    );
    const json = await data.json();
    //  console.log(json);

    // optional Chaning
    setListOfRestaurant(
      json?.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
    setFilteredRestaurant(
      json?.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
  };

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false)
    return (
      <h1>
        Looks like you're offline!! Please check your internet connection;
      </h1>
    );

  const { loggedInUser, setUserName } = useContext(UserContext);

  // conditional rendering
  // if (listOfRestaurant.length === 0) {
  //   return <Shimmer />;
  // }

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className=" flex flex-col sm:flex-row sm:flex-wrap md:flex-nowrap items-center justify-center">
        <div className=" search m-4 p-5">
          <input
            type="text"
            className="border border-solid border-black rounded-lg py-1 px-5"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />

          <button
            className="px-4 py-2 ml-2 bg-purple-700 rounded-md text-md text-white cursor-pointer hover:scale-[1.02] hover:shadow-lg"
            onClick={() => {
              // Filter the restaurant Cards and update the ui
              // SearchText
              console.log(searchText);
              // here res represent single info which contains single restaurant properties beacuse we alreday findout each restaurent info
              // single restaurant indicate per info--- { info: { id: 1, name: "KFC", avgRating: 4.1 }, ... }

              const filteredRestaurants = listOfRestaurants?.filter((res) =>
                res?.info?.name
                  ?.toLowerCase()
                  ?.includes(searchText?.toLowerCase())
              );

              setFilteredRestaurant(filteredRestaurants);
            }}
          >
            Search
          </button>
        </div>
        <div
          className="search m-8 px-4 py-2 flex items-center
              bg-purple-700 
              text-white 
              rounded-md
              transition-all 
              duration-200 
              cursor-pointer 
              hover:shadow-md 
              hover:scale-[1.02]"
        >
          <button
            className="rounded-lg text-md"
            onClick={() => {
              //Filter logic here
              const filteredList = listOfRestaurants.filter(
                (res) => res?.info?.avgRating > 4.5
              );
              setFilteredRestaurant(filteredList);
            }}
          >
            Top Rated Resturants
          </button>
        </div>

        <div className="m-4 p-5">
          <label>UserName: </label>
          <input
            className="border border-solid border-black rounded-lg py-1 px-5"
            value={loggedInUser}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
      </div>
      <div
        className="restaurant-container 
     flex flex-wrap justify-center gap-10 p-6"
      >
        {/* display or rendering the restaurant card */}
        {filteredRestaurant.map((restaurant) => (
          <Link
            key={restaurant?.info?.id}
            to={"/restaurants/" + restaurant?.info?.id}
          >
            {
              /* if the restaurant is veg then add a veg lebel to it and render RestaurantCardVeg otherwise render RestaurantCard*/
              restaurant?.info?.veg ? (
                <RestaurantCardVeg resData={restaurant} />
              ) : (
                <RestaurantCard resData={restaurant} />
              )
            }
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
