import "./SingleFood.scss";
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
  const { data, loading, error } = useFetch(`/foods/${id}`);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [foodData, setFoodData] = useState({
    id: id,
    title: '',
    desc: '',
    price: '',
  });

  useEffect(() => {
    setFoodData({
      title: data.title,
      desc: data.desc,
      price: data.price,
    })
  }, [data]);


  const handleUpdate = async () => {
    console.log(foodData);

    const res = await axios.put(`/foods/${id}`, foodData);

    if (res.status === 200) {
      handleClose();
      alert("Updated Successfully");
    }
  };

  const handleFoodDataChange = (e) => {
    const eventTarget = e.target;
    const targetValue = eventTarget.value;
    const targetName = eventTarget.name;

    setFoodData({
      ...foodData,
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
        Edit Food
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{foodData.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
               <div className="detailItem">
                  <span className="itemKey">Title:</span>
                  <input type="text" className="form-control" name="title" value={foodData.title} onChange={handleFoodDataChange} />
                  </div><br></br>
                  <div className="detailItem">
                  <span className="itemKey">Description:</span>  
                  <textarea className="form-control" name="desc" id="exampleFormControlTextarea1" rows="3" value={foodData.desc} onChange={handleFoodDataChange}></textarea>   
                </div>
                  <div className="detailItem">
                  <span className="itemKey">Price:</span>
                  <input type="text" className="form-control" name="price" value={foodData.price} onChange={handleFoodDataChange} />
                </div><br></br>                
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary"  onClick={() => handleUpdate()}>
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
                <h1 className="itemTitle">{foodData.title}</h1>
                <div className="detailItem">
                  <span className="itemKey">Description:</span>
                  <span className="itemValue">{foodData.desc}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Price:</span>
                  <span className="itemValue" style={{color: "red"}}>{foodData.price}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
          </div>
        </div>
        <div className="bottom">
        <h1 className="title"></h1>
        </div>
      </div>
    </div>
  );
};

export default Single;
