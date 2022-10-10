import React from "react";
import Footer from "../../components/footer/Footer";
import {
  faCartShopping,
  faAdd,
  faMinus,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StripeCheckout from "react-stripe-checkout";
import useFetch from "../../hooks/useFetch";
import { useLocation } from "react-router-dom";
//import { userRequest } from "../requestMethods";

import axios from "axios";




const KEY = process.env.REACT_APP_STRIPE;
const Wrapper = styled.div`
  padding: 20px;
  
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
 
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
 
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
 
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;





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
  header: { token: `Bearer ${TOKEN}` },
});

const  Cart =(foodId) => {
  const { data, loading, error } = useFetch(`api/foods/${foodId}`);
  
  const cart = useSelector((state) => state.cart);
  
  const [stripeToken, setStripeToken] = useState(null);
  const history = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [product,   setData] = useState([]);
  // console.log(" in cart")
  //   console.log(product)
  const location = useLocation();
const id = location.pathname.split("/")[2];
let navigate = useNavigate();


  const onToken = (token) => {
    setStripeToken(token);
  };


  console.log(stripeToken)
  const getProduct = async () => {
    try {
      const res = await publicRequest.get("foods/:id/" + id);
      setData(res.data);
    } catch {}
   
  };
  const [price, setPrice] = useState(product.price);
  
  
console.log(product.price)
 


  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: 500,
        });
        history.push("/success", {
          stripeData: res.data,
          products: cart, });
      } catch {}
    };
    stripeToken && makeRequest();
   
   
  
    
  }, [stripeToken, cart.total, history]);

 


  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  
  };

  const GoHome = ()=>{
    navigate("/");
}

  return(
    
    <div>
       
       <Navbar />
      
      <div className="homeContainer">

      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton onClick={GoHome}>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
          
            {cart.product.map((product) => (
              
              <Product>
                <ProductDetail>
                 
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                     
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                  
                    
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                  <button className="add" onClick={() => handleQuantity("inc")}>
                    <FontAwesomeIcon icon={faAdd} />
                  </button>
                    <ProductAmount>{quantity}</ProductAmount>
                    <button
                    className="remove"
                    onClick={() => handleQuantity("dec")}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  </ProductAmountContainer>
                  <ProductPrice>
                    Rs {product.price * quantity}.00
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>Rs {cart.total*quantity}.00</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>Rs 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>Rs -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>Rs {cart.total*quantity}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="Tase Buds"
              //image="https://avatars.githubusercontent.com/u/1486366?v=4"
              image= "https://i.pinimg.com/originals/a9/45/c7/a945c76e7335188d7ddd176961a1f6ed.png"
              billingAddress
              shippingAddress
              description={`Your total is Rs${cart.total*quantity}.00`}
              amount={cart.total*quantity * 100}
              token={onToken}
              stripeKey={KEY}
            >
              
              <Button >CHECKOUT NOW</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
        
        <MailList/>
        <Footer/>
        
    </div>
    </div>
  );
};
export default Cart;