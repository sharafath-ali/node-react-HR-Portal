import React, { useState } from 'react'
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import img from "../assets/hr-connect-logo.png";
import {  useNavigate, useParams } from "react-router-dom";
import axios from 'axios';


export interface IUploadProps {
}

export default function Upload (props: IUploadProps) {
  const Navigate=useNavigate()
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  let {id} = useParams();
  
  const handleImageChange = (e:any) => {
    const file = e.target.files && e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
    }
  }

  const handleFileUpload = async () => {
 
    if (!selectedImage) return;
    const formData = new FormData();
    formData.append("image", selectedImage);
  
    try {
      const response = await axios.put(
        `http://localhost:5000/get/imageupload/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log(response);
  
      
    } catch (error) {
      console.log(error);
    }
    Navigate('/')
  };

  return (
    <div>
       <div className="parent-container">
      <Navbar className="MainNavbar" expand="lg">
        <Container className="NavContainer" fluid>
          <img className="NavLogo" src={img} />
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </div>
      <div className="container">
        <h1 className="form-head-text text-center m-5">Upload Employee Image</h1>
        <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Image Upload</h5>
            </div>
            <div className="card-body">
              <div>
                <div className="f">
                  <label htmlFor="imageUpload">Select an image:</label>
                  <input type="file" className="form-control-file" id="imageUpload" accept="image/*" onChange={(e)=>handleImageChange(e)} />
                </div>
                <div className="f">
                  {selectedImage &&
                    <img src={selectedImage} alt="Selected Image" className="img-fluid" style={{ maxHeight: '300px' }} />
                  }
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleFileUpload}>Upload</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
  );
}
