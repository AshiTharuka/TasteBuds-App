import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "/restaurants/countByCity?cities=Kaduwela,Colombo,Kandy"
  );

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://media.istockphoto.com/photos/table-top-view-of-spicy-food-picture-id1316145932?b=1&k=20&m=1316145932&s=170667a&w=0&h=feyrNSTglzksHoEDSsnrG47UoY_XX4PtayUPpSMunQI="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Foods</h1>
              <h2>{data[0]} Items</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://c4.wallpaperflare.com/wallpaper/385/811/595/juice-drink-non-alcoholic-beverage-health-shake-wallpaper-preview.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Beverages</h1>
              <h2>{data[1]} Items</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://st3.depositphotos.com/1177973/13508/i/600/depositphotos_135087650-stock-photo-tasty-burger-with-snacks.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Snaks</h1>
              <h2>{data[2]} Items</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
