import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import axios from "axios";
import Footer from "../../components/footer/Footer";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";


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



const Success = () => {

  
  const location = useLocation();
  //in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)
  const data = useSelector((state) => state.stripeData);
  const cart = useSelector((state) => state.cart);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);
  
  
  let navigate = useNavigate();

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders/add", {
          userId: currentUser._id,
          products: cart.product.map((product) => ({
            productId: product._id,
            quantity: product._quantity,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        });
        setOrderId(res.data._id);
      } catch {}
    };
    data && createOrder();
  }, [cart, data, currentUser]);

  const GoHome = ()=>{
    navigate("/");
}

  return (
    <div>
       <Navbar />
       <div>
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <button style={{ padding: 10, marginTop: 20 }} onClick={GoHome}>Go to Homepage</button>
    </div>
      <MailList/>
        <Footer/>
    </div>
    </div>
    
  );
};

export default Success;
