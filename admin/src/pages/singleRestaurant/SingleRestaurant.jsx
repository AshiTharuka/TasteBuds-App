import "./SingleRestaurant.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Popup from 'reactjs-popup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from "react-bootstrap";
import React, { useState } from 'react';
import { useEffect } from "react";
import axios from "axios";

const Single = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { data, loading, error } = useFetch(`/restaurants/find/${id}`);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  const [restaurantFoods, setRestaurantFoods] = useState([{
    id: '',
    title: '',
    desc: '',
    photos: '',
    price: '',
    createdAt: '',
  }]);

  const [restaurantData, setRestaurantData] = useState({
    id: id,
    name: '',
    type: '',
    city: '',
    address: '',
    title: '',
    desc: '',
  });


  useEffect(() => {
    setRestaurantData({
      name: data.name,
      type: data.type,
      city: data.city,
      address: data.address,
      title: data.title,
      desc: data.desc,
    })
  }, [data]);

  useEffect(() => {
    fetchRestaurantFood();
  }, []);

  const fetchRestaurantFood = async () => {
    const res = await axios.get(`/restaurants/food/${id}`);

    let foodsArr = [];

    res.data.forEach(item => {
      foodsArr.push({
        id: item._id,
        title: item.title,
        desc: item.desc,
        photos: item.photos,
        price: item.price,
        createdAt: item.createdAt,
      });
    });

    setRestaurantFoods(foodsArr);
  }

  const handleUpdate = async () => {
    console.log(restaurantData);

    const res = await axios.put(`/restaurants/${id}`, restaurantData);

    if (res.status === 200) {
      handleClose();
    }
  };

  const handleResDataChange = (e) => {
    const eventTarget = e.target;
    const targetValue = eventTarget.value;
    const targetName = eventTarget.name;

    setRestaurantData({
      ...restaurantData,
      [targetName]: targetValue
    });
  }

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
          <Button variant="primary" onClick={handleShow}>
        Edit Restaurant
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{data.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
               <div className="detailItem">
                  <span className="itemKey">Name:</span>
                  <input type="text" className="form-control" name="name" value={restaurantData.name} onChange={handleResDataChange} />
                  </div><br></br>
                  <div className="detailItem">
                  <span className="itemKey">Type:</span>
                  <input type="text" className="form-control" style={{color: "red"}} name="type" value={restaurantData.type} onChange={handleResDataChange} />
                  </div><br></br>
                  <div className="detailItem">
                  <span className="itemKey">City:</span>
                  <input type="text" className="form-control" name="city" value={restaurantData.city} onChange={handleResDataChange} />
                </div><br></br>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <input type="text" className="form-control" name="address" value={restaurantData.address} onChange={handleResDataChange} />
                </div><br></br>
                <div className="detailItem">
                  <span className="itemKey">Title:</span>  
                  <input type="text" className="form-control" name="title" value={restaurantData.title} onChange={handleResDataChange} />      
                </div><br></br>
                <div className="detailItem">
                  <span className="itemKey">Description:</span>  
                  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="desc" value={restaurantData.desc} onChange={handleResDataChange}></textarea>   
                </div>
                  
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleUpdate()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> 

            <h1 className="title"></h1>
            <div className="item">
              <img
                src={data.photos}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{restaurantData.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Type:</span>
                  <span className="itemValue" style={{color: "red"}}>{restaurantData.type}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">City:</span>
                  <span className="itemValue">{restaurantData.city}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">{restaurantData.address}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Title:</span>  
                  <span className="itemValue">{restaurantData.title}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
          </div>
        </div>
        <div className="bottom">
        <h1 className="title"></h1>
          <List dataRows={restaurantFoods}/>
        </div>
      </div>
    </div>
  );
};

export default Single;
