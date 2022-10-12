import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import {
  faCartShopping,
  faAdd,
  faMinus,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

import { addProduct } from "../../redux/cartRedux.jsx";

import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState, useEffect } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { incrementByAmount } from "../../redux/wishlist";

import { useLocation } from "react-router-dom";

const BASE_URL = "http://localhost:8800/api/";
const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `ManooAbhillash ${TOKEN}` },
});

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;
const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Reserve = ({ setOpen, restaurantId, foodId }) => {
  const [selectedFoods, setselectedFoods] = useState([]);
  const { data, loading, error } = useFetch(`/restaurants/food/${restaurantId}`);

  const { dates } = useContext(SearchContext);
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();
  const _id = location.pathname.split("/")[2];
  const [product,   setData] = useState([]);
  const value = useState();
  const [quantity, setQuantity] = useState(1);
  const [disable, setDisable] = useState(false);

  //const [color, setColor] = useState("");
  //const [size, setSize] = useState("");
  const dispatch = useDispatch();

  const getAllProducts = async () => {
    const { data } = await axios.get("http://localhost:8800/api/foods");
    let products = data.map((product) => {
      return {
        id: product._id,
        photos: product.photos,
        title: product.title,
        desc: product.desc,
        price: product.price,
        foodNumbers: product.foodNumbers,

        timestamps: product.timestamps,
      };
    });
    setData(products);
    //console.log(response.data);
  };
  const [price, setPrice] = useState(product.price);
 

  useEffect(() => {
    console.log(data)
    getAllProducts(); //runs once
  }, []);

  // const TOKEN =
  //   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
  //     .accessToken || "";

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const alldates = getDatesInRange(dates[0]);
  {
    /*}.startDate, dates[0].endDate);*/
  }

  const isAvailable = (foodNumbers) => {
    const isFound = foodNumbers.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setselectedFoods(
      checked
        ? [...selectedFoods, value]
        : selectedFoods.filter((item) => item !== value)
    );
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedFoods.map((foodId) => {
          const res = axios.put(`/foods/availability/${foodId}`, {
            dates: alldates,
          });
          return res.data;
        })
      );
      setOpen(false);
      navigate("/");
    } catch (err) {}
  };

  const handleClickButton = (index) => {
    dispatch(addProduct({ product:data, quantity, price:price,index:index}));
    //dispatch(addProduct({ product:data, quantity, price }));
   
    console.log("Reserve")

    console.log(index)
   
  };
 
  const handleClickList = () => {
    if (quantity <= 1) {
      dispatch(incrementByAmount(quantity));
      setIsActive((current) => !current);
    }
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your foods:</span>
        {data.map((product,index) => (
          <div className="rItem" key={product._id}>
            <div className="rItemInfo">
              <div className="rTitle">{product.title}</div>
              <div className="rDesc">{product.desc}</div>

              <div className="rPrice">Rs {product.price}.00</div>
            </div>

            <div className="rItemInfo">
              <AddContainer>
                <AmountContainer>
                 
                  {/*<faRemove onClick={() => handleQuantity("dec")} />*/}
                  
                  
                  {/*<faAdd onClick={() => handleQuantity("inc")} />*/}
                </AmountContainer>
                <button className="cart" onClick={() =>handleClickButton(index)}>
                  <FontAwesomeIcon icon={faCartShopping} />
                </button>
                <button
                  className="wishlist" disabled={disable}
                  style={{
                    backgroundColor: isActive ? "salmon" : "",
                    color: isActive ? "white" : "",
                  }}
                  onClick= {() => 
                    {handleClickList(); 
                      setDisable(true);}}
                >
                  <FontAwesomeIcon icon={faHeart} />
                </button>
              </AddContainer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reserve;
