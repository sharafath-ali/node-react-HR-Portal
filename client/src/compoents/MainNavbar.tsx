import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import img from "../assets/hr-connect-logo.png";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import './MainNavbar.css';
import { SearchContext } from "../contexts/SearchContext";
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
export interface IAppProps {
}

export default function App(props: IAppProps) {
  const { filter, setfilter } = useContext(SearchContext);
  const navigate = useNavigate();

  return (
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
          <Button
            className="AddButton round-corner"
            variant="outline-secondary" onClick={() => navigate('/AddEmployee')}
          >
            <AddIcon /> Add
          </Button>
          <Form className="d-flex">
            <div className="round-corner search-container">
              <SearchIcon className="search-icon" />
              <input
                type="search"
                placeholder="Search..."
                className="me-2 seach-bar"
                aria-label="Search"
                value={filter}
                onChange={(e) => setfilter(e.target.value.toLowerCase())}
              />
            </div>
            {/* <Button variant="outline-success"></Button>*/}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
