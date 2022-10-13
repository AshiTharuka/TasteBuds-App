import "./newFood.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { foodInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewFood = () => {
  const [info, setInfo] = useState({});
  const [files, setFiles] = useState("");
  const [restaurantId, setRestaurantId] = useState(undefined);
  const [foods, setFoods] = useState([]);

  const { data, loading, error } = useFetch("/restaurants");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const list = await Promise.all(
      Object.values(files).map(async (file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dj1kagela/image/upload",
          data
        );

        const { url } = uploadRes.data;
        return url;
      })
    );

    try {
      await axios.post(`/foods/${restaurantId}`, { ...info,photos: list });
    } catch (err) {
      console.log(err);
    }
  };

  console.log(info)
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Food</h1>
        </div>
        <div className="bottom">

        <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>

          <div className="right">
            <form>
            <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>



              {foodInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Choose a Restaurant</label>
                <select
                  id="restaurantId"
                  onChange={(e) => setRestaurantId(e.target.value)}
                >
                  {loading
                    ? "loading"
                    : data &&
                      data.map((restaurant) => (
                        <option key={restaurant._id} value={restaurant._id}>{restaurant.name}</option>
                      ))}
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewFood;
