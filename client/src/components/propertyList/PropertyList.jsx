import useFetch from "../../hooks/useFetch";
import "./propertyList.css";



const PropertyList = () => {
  const { data, loading, error } = useFetch("/restaurants/countByType");


  
  

  const images = [
    "https://media.istockphoto.com/photos/catering-food-wedding-event-table-picture-id650655146?b=1&k=20&m=650655146&s=170667a&w=0&h=tYzhIriE-IzxUv8coABq_hafpVknNckUZqAdRdz7v5E=",
    "https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?cs=srgb&dl=pexels-chan-walrus-941861.jpg&fm=jpg",
    "https://cdn.dnaindia.com/sites/default/files/styles/full/public/2017/08/22/603317-bakery-products-082217.jpg",
    "https://media-cdn.tripadvisor.com/media/photo-s/1a/b6/52/6d/jaadi-samaga-game-kaema.jpg",
    "https://c0.wallpaperflare.com/preview/1016/1016/983/bar-restaurant-mixology-bartender.jpg",
  ];
  return (
    <div className="pList">
      {loading ? (
        "loading"
      ) : (
        <>
          {data &&
            images.map((img,i) => (
              <div className="pListItem" key={i}>
                <img
                  src={img}
                  alt=""
                  className="pListImg"
                />
                <div className="pListTitles">
                  <h1>{data[i]?.type}</h1>
                  <h2>{data[i]?.count} {data[i]?.type}</h2>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default PropertyList;
