import { useState } from "react";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import "./AddEmployee.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import img from "../assets/hr-connect-logo.png";

export interface IAddEmployeeProps {}
interface User {
  first_name: string;
  last_name: string;
  email: string;
  designation: string;
}

export default function AddEmployee(props: IAddEmployeeProps) {
  const [email, setemail] = useState<string>("");
  const [fn, setfn] = useState<string>("");
  const [des, setdes] = useState<string>("");
  const [ln, setln] = useState<string>("");
  const navigate = useNavigate();

  function handleClick() {
    navigate("/");
  }
  function save() {}
  return (
    <>
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

      <div className="container">
        <IconButton onClick={handleClick}>
          <ArrowBackIcon />
          BACK
        </IconButton>

        <label htmlFor="uname">
          <b>Firstname</b>
        </label>
        <input
          type="text"
          className="tet1"
          placeholder="Firstname"
          name="uname"
          onChange={(e) => setfn(e.target.value)}
          required
        />

        <label htmlFor="psw">
          <b>Lastname</b>
        </label>
        <input
          type="text"
          className="tet1"
          placeholder="Lastname"
          name="psw"
          onChange={(e) => setln(e.target.value)}
          required
        />

        <label htmlFor="Email">
          <b>Email</b>
        </label>
        <input
          type="email"
          className="email1"
          placeholder="Email"
          name="Email"
          onChange={(e) => setemail(e.target.value)}
          required
        />

        <label htmlFor="designation">
          <b>Designation</b>
        </label>
        <input
          type="email"
          className="email1"
          placeholder="Designation"
          name="designation"
          onChange={(e) => setdes(e.target.value)}
          required
        />

        <button type="submit" onClick={save}>
          Save info
        </button>
      </div>
    </>
  );
}
