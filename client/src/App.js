import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Restaurant from "./pages/restaurant/Restaurant";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Cart from "./pages/Cart/cart";
import Success from "./pages/Orders/success.jsx";
import Orders from "./pages/Orders/order.jsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/success" element={<Success/>}/>
        <Route path="/orders" element={<Orders/>}/>
        <Route path="/restaurants" element={<List/>}/>
        <Route path="/restaurants/:id" element={<Restaurant/>}/>
        <Route path="/login" element={<Login/>}/>  
      </Routes>
    </BrowserRouter>
  );
}

export default App;
