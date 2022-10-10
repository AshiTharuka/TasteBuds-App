import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useSelector} from "react-redux";



const Navbar = () => {

const quantity = useSelector(state=>state.cart.quantity);

const count = useSelector(state => state.counter.quantity);


  const { user } = useContext(AuthContext);
  

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Taste<b>Buds</b></span>
        </Link>

        
          

        
        {user ? user.username : (
          <div className="navItems">
            <button className="navButton">Register</button>
            <button className="navButton">Login</button>
            </div>
             )   }


             
            <div className="navItems">
            <Link to="/cart">
        <button className="navButton"
           
           style={{ width: "2.5rem", height: "2.5rem", position: "relative",borderRadius : "5rem" }}
           variant="outline-primary"
           
         >
           <svg
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 576 512"
             fill="currentColor"
           >
             <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
           </svg>

           <div
             className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
             style={{
               color: "white",
               width: "1.3rem",
               height: "1.3rem",
               position: "absolute",
               bottom: 0,
               right: 0,
               transform: "translate(25%, 25%)",
               backgroundColor : "#FF6347",
               borderRadius : "15px",
             }}
           >
             {quantity}
             
           </div>
           </button>
           </Link>
           <button className="navButton"
           
           style={{ width: "2.5rem", height: "2.5rem", position: "relative" , borderRadius : "5rem"}}
           variant="outline-primary"
           
         >
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
           <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
           </svg>

           <div
             className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
             style={{
               color: "white",
               width: "1.3rem",
               height: "1.3rem",
               position: "absolute",
               bottom: 0,
               right: 0,
               transform: "translate(25%, 25%)",
               backgroundColor : "#FF6347",
               borderRadius : "15px",
             }}
           >
             {count}
             
           </div>
           </button>
        </div>
          
         
       
        

        
        

      </div>
    </div>
  );
};

export default Navbar;

