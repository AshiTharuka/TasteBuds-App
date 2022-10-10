import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import { ShoppingCartProvider } from "../../context/ShoppingCartContext.tsx";
import "./home.css";

const Home = () => {
  return (
    <ShoppingCartProvider>
    <div>
      
      <Navbar />
      <Header/>
      <div className="homeContainer">
        <Featured/>
        <h1 className="homeTitle">Browse by shops</h1>
        <PropertyList/>
        <h1 className="homeTitle">Most favorite</h1>
        <FeaturedProperties/>
        <MailList/>
        <Footer/>
        
      </div>
      
    </div>
    </ShoppingCartProvider>
  );
};

export default Home;
