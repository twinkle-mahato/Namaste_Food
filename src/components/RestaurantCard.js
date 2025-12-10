import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;

  const {
    cloudinaryImageId,
    name,
    cuisines,
    avgRatingString,
    costForTwo,
    sla,
  } = resData?.info;

  return (
    <div className="m-4 p-4 w-[260px] rounded-2xl font-serif bg-gray hover:shadow-xl/30 hover:scale-[1.02] transition-all duration-200 shadow-lg border border-gray-300">
      <img
        className="res-logo rounded-lg h-[200px] w-[250px] object-cover"
        alt="restaurant-logo"
        src={CDN_URL + cloudinaryImageId}
      />
      <h3 className=" font-bold py-4 text-lg">{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{avgRatingString}⭐</h4>
      <h4>{costForTwo}</h4>
      <h4>{sla?.slaString}</h4>
    </div>
  );
};

// Higher order component

// input - restaurantCard => RestaurantCrad veg as   an output

 export const withVeglabel = (RestaurantCard) => {
  // component which return RestaurantCard as a input
  return (props) => {
    return (
      <div>
        <label className="absolute bg-emerald-400 text-white m-3 px-4 py-2 rounded-md z-50">Veg</label>
        <RestaurantCard {...props} />
      </div>
    );
  }; 
};

export default RestaurantCard;
