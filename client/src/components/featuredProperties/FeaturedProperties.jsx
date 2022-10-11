import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";
import {Link} from "react-router-dom";
import {
  faStar,
  
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {createSlice} from "@reduxjs/toolkit";






const FeaturedProperties = () => {
  
  const { data, loading, error } = useFetch("/restaurants");

  return (
    <div className="fp">
      {loading ? (
        "Loading"
      ) : (
        <>
          {data.map((item) => (

            <div className="fpItem" key={item._id}>
              <Link to={`/restaurants/${item._id}`}><img
                src={item.photos[0]}
                alt=""
                className="fpImg"
              /></Link>
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">Starting from Rs {item.cheapestPrice}</span>


              {item.rating && <div className="fpRating">
                <button>{item.rating}</button>
                <span><FontAwesomeIcon icon={faStar} className="headerIcon" />
                <FontAwesomeIcon icon={faStar} className="headerIcon" />
                <FontAwesomeIcon icon={faStar} className="headerIcon" />
                <FontAwesomeIcon icon={faStar} className="headerIcon" />
                </span>
              </div>}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;

