import "./SingleUser.scss";
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
  const { data, loading, error } = useFetch(`/users/${id}`);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [userData, setUserData] = useState({
    id: id,
    username: '',
    email: '',
    country: '',
    city: '',
    phone: '',
  });

  useEffect(() => {
    setUserData({
      username: data.username,
      email: data.email,
      country: data.country,
      city: data.city,
      phone: data.phone,
    })
  }, [data]);

  const handleUpdate = async () => {
    console.log(userData);

    const res = await axios.put(`/users/${id}`, userData);

    if (res.status === 200) {
      handleClose();
      alert("Updated Successfully");
    }
  };

  const handleUserDataChange = (e) => {
    const eventTarget = e.target;
    const targetValue = eventTarget.value;
    const targetName = eventTarget.name;

    setUserData({
      ...userData,
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
        Edit User
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{data.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
               <div className="detailItem">
                  <span className="itemKey">User Name:</span>
                  <input type="text" className="form-control"  name="username" value={userData.username} onChange={handleUserDataChange}  />
                  </div><br></br>
                  <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <input type="text" className="form-control" name="email" value={userData.email} onChange={handleUserDataChange}  />
                  </div><br></br>
                  <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <input type="text" className="form-control" name="country" value={userData.country} onChange={handleUserDataChange} />
                  </div><br></br>
                  <div className="detailItem">
                  <span className="itemKey">City:</span>
                  <input type="text" className="form-control"  name="city" value={userData.city} onChange={handleUserDataChange} />
                  </div><br></br>
                  <div className="detailItem">
                  <span className="itemKey">Phone:</span>  
                  <input type="text" className="form-control" name="phone" value={userData.phone} onChange={handleUserDataChange} />      
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
                src={data.img}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{userData.username}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue" style={{color: "red"}}>{userData.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">{userData.country}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">City:</span>
                  <span className="itemValue">{userData.city}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">phone:</span>  
                  <span className="itemValue">{userData.phone}</span>
                 
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
