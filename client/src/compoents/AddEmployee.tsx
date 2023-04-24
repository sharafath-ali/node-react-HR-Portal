import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./AddEmployee.css";
import img from "../assets/hr-connect-logo.png";
import img1 from "../assets/hr-employee-img.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export interface IAppProps {
}

export default function App (props: IAppProps) {
  const [email, setemail] = useState<string>("");
  const [first_name, setfirst_name] = useState<string>("");
  const [designation, setdesignation] = useState<string>("");
  const [last_name, setlast_name] = useState<string>("");

  const navigate=useNavigate()
  
  function Home() {
    navigate("/");  //function for navigating to home 
  }

  async function save(e:any) {
    e.preventDefault()
    const newEmployee = {
      first_name:first_name,
      last_name:last_name,
      email: email,
      designation:designation
      };
   
    try {
      const response = await axios.post(
        "http://localhost:5000/get/add",
        newEmployee
      );
      console.log(`responce ${response.data?.id}`);
      navigate(`/Upload/${response.data?.id}`);
      console.log(`responce ${response}`);
    } catch (error) {
      console.error(error);
    }
    
  }
  
  return (
    <div className="parent-container">
      <Navbar className="MainNavbar" expand="lg">
        <Container className="NavContainer" fluid>
          <img className="NavLogo" src={img}  onClick={Home}/>
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

      <div className="content-container-fluid h-100 container">
        <div className="row h-100">
          <div className="col-md-6 left-half">
            <img src={img1} alt="Image" className="img-fluid left-image" />
          </div>
          <div className="col-md-6 right-half ">
            <h1 className="form-head-text text-center">New Employee</h1>
            <form>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control my-4"
                  id="name"
                  placeholder="Enter FirstName"
                  onChange={(e) => setfirst_name(e.target.value)}
                />
              </div>

              

              <div className="form-group">
                <input
                  type="text"
                  className="form-control my-4"
                  id="email"
                  placeholder="Enter LastName"
                  onChange={(e) => setlast_name(e.target.value)}
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  className="form-control my-4"
                  id="email"
                  placeholder="Enter Email"
                  onChange={(e) => setemail(e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <input
                  type="text"
                  className="form-control my-4"
                  id="email"
                  placeholder="Enter Designation"
                  onChange={(e) => setdesignation(e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <input
                  type="text"
                  className="form-control my-4"
                  id="name"
                  placeholder="Enter Skills"
                  onChange={(e) => setfirst_name(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary  my-4 aligh-right" onClick={(e)=>{save(e)}}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

