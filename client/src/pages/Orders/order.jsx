import "./order.css";

import { useEffect, useContext, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import axios from "axios";
import Footer from "../../components/footer/Footer";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContext";
import Header from "../../components/header/Header";

const BASE_URL = "http://localhost:8800/api/";
// const TOKEN =
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";

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

const Orders = () => {
 
  const location = useLocation();
  const id = location.pathname.split("/")[1];
  //in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)
  const { data, loading, error } = useFetch(`/${id}`);
  const { user } = useContext(AuthContext);
 
 // const data = useSelector((state) => state.stripeData);
  const cart = useSelector((state) => state.cart);
  
console.log(data);

  const currentUser = useSelector((state) => state.user.currentUser);
  
  const history = useNavigate();
  let navigate = useNavigate();
  const [order,   setOrder] = useState([]);


 
 /*  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          products: cart.product.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        });
        setOrderId(res.data._id);
      } catch {}
    };
    data && createOrder();
  }, [cart, data, currentUser]);  */
//console.log(cart);

const getAllOrders = async () => {
  const { data } = await axios.get("http://localhost:8800/api/orders");
  let orders = data.map((item) => {
    return {
      id: item._id,
      userId: item.userId,
      //photos: item.photos,
      productId: item.products,
      amount: item.amount,
      quantity: item.quantity,
      status: item.status,

      timestamps: item.timestamps,
    };
  });
  setOrder(orders);
  console.log(orders);
};

useEffect(()=>{
  getAllOrders();//runs once
}, []);

//console.log(getAllOrders());

console.log(data);

  const GoHome = ()=>{
    navigate("/");
}



      return (

        <div>
       <Navbar />
      
    <div className="orderContainer">
       {data.map((item) => (
       
        <div className="orderWrapper">
            
            
           
            <div className="orderAddress">
             <table className="orderTable">
             <tr>
              <th> Order ID : </th>
              <td>{item._id}</td></tr>
              <tr>
              <th> Product ID : </th>
              <td>{item.productId}</td></tr>
              <tr>
              <th> Product Name : </th>
              <td>{item.productName}</td>
              </tr>
              <tr>
              <th> Product Quantity : </th>
              <td>{item.quantity}</td></tr>
              <tr>
              <th> Product Amount : </th>
              <td> Rs {item.amount} </td>
              </tr>
              <tr>
              <th> Order Status : </th>
              <td>  {item.status}  </td>
              
              </tr>
              
              
              
              
             
              

              
              

              
              
            
           
           </table>
            </div>
            
            
           
           
           
            <div className="orderDetails">
              <div className="orderDetailsTexts">
                
                
              </div>
              <div>
      

              </div>
            </div>
          </div>
       ))}

<MailList/>
       
       <Footer/>

     </div>
       

        </div>
    
    )
};
export default Orders;