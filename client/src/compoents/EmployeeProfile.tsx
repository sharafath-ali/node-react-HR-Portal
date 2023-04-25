import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./EmployeeProfile.css";
import img from "../assets/hr-connect-logo.png";
import profile1 from "../assets/profile1.jpg";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import FolderSharedRoundedIcon from "@mui/icons-material/FolderSharedRounded";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Loader from "../LoaderComponent/loader";
export interface IEmployeeProfileProps {}

export default function EmployeeProfile(props: IEmployeeProfileProps) {
  const [data, setdata] = useState<any>();
  const [edit, setEdit] = useState<boolean>(true);
  const [email, setemail] = useState<string>("");
  const [first_name, setfirst_name] = useState<string>("");
  const [designation, setdesignation] = useState<string>("");
  const [last_name, setlast_name] = useState<string>("");
  const [Id, setId] = useState<number>();
  const navigate = useNavigate();
  const [loading, setloading] = useState<any>(true); //loader

  //modal state
  const [show, setShow] = useState(false);
  let { id } = useParams();
  //modal state end and fn start
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //modal fn end

  function Documentview() {
    return navigate(`/ViewDocuments/${id}`);
  }
  function Update() {
    setEdit(false);
  }

  //Save
  async function Save(e: any) {
    e.preventDefault();
    const updateEmploy = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      designation: designation,
    };

    try {
      const url = `http://localhost:5000/get/Update/${id}`;
      await axios
        .put(url, updateEmploy, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => console.log(response));
      return window.location.reload();
    } catch (error) {
      console.log(error);
    }
    navigate(`ViewProfile/${Id}`);
  }
  //save end

  async function Delete() {
    try {
      await axios.delete(`http://localhost:5000/get/employ/${id}`);
      navigate(`/`);
      setShow(false);
    } catch (error) {
      console.error("Error deleting while deleting:", error);
    }
  }
  //fetching
  useEffect(() => {
    const GetDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/get/getbyid/${id}`
        );
        setdata(response.data);
        setfirst_name(response.data.first_name);
        setemail(response.data.email);
        setdesignation(response.data.designation);
        setlast_name(response.data.last_name);
        setId(response.data.Id);
        setloading(false);
      } catch (error) {
        console.error(error);
      }
    };

    GetDetails();
  }, []);

  return (
    <div>
      <Navbar className="MainNavbar" expand="lg">
        <Container className="NavContainer" fluid>
          <img className="NavLogo" src={img} onClick={() => navigate("/")} />
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
      {edit ? (
        <div>
          {loading ? (
            <Loader />
          ) : (
            <div className="container">
              <div className="row d-flex justify-content-center">
                <div className="col-md-8 col-sm-12 col-lg-6 ">
                  {/* Profile detail */}
                  <div className="profile-detail pt-4 mb-5 text-center ">
                    {/* profile pic */}
                    <div className="d-flex justify-content-center pt-5">
                      <div className="profile-pic  bg-success">
                        <img className="" src={`${data?.Image_url}`}></img>
                      </div>
                    </div>
                    {/* end profile pic */}
                    <h3 className="mt-4">
                      {data?.first_name} {data?.last_name}
                    </h3>
                    <h6>({data?.designation})</h6>
                    <h6>{data?.email}</h6>
                    <div className="content ">
                      <p className="mt-4">
                        Skills:React.js JavaScript Redux or other state
                        management libraries React Router UI/UX design
                        principles Testing with Jest and Enzyme Web development
                        tools (e.g., Git, npm, yarn, Webpack) Performance
                        optimization Problem-solving Collaboration and teamwork
                        Continuous learning mindset
                      </p>
                      <div className="d-flex justify-content-around mt-5">
                        <button
                          className="button-icons color-pink"
                          onClick={handleShow}
                        >
                          {" "}
                          <DeleteRoundedIcon className="icon" />{" "}
                        </button>
                        <button
                          className="button-icons color-green"
                          onClick={Update}
                        >
                          {" "}
                          <EditRoundedIcon className="icon" />{" "}
                        </button>
                        <button
                          className="button-icons color-blue"
                          onClick={Documentview}
                        >
                          {" "}
                          <FolderSharedRoundedIcon className="icon" />{" "}
                        </button>
                        <Modal
                          show={show}
                          onHide={handleClose}
                          animation={true}
                          centered={true}
                        >
                          <Modal.Header closeButton>
                            <Modal.Title>Alert!!...</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            Do You want to Delete this Employee details
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                              Back
                            </Button>
                            <Button variant="primary" onClick={Delete}>
                              Delete the Employee
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </div>
                    </div>
                  </div>
                  {/* end profile details */}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="container">
          <h1 className="form-head-text text-center m-5">
            Update Employee Details
          </h1>
          <form>
            <div className="form-group">
              <input
                type="text"
                className="form-control my-4"
                id="name"
                value={first_name}
                placeholder="Enter FirstName"
                onChange={(e) => setfirst_name(e.target.value)}
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control my-4"
                id="email"
                value={last_name}
                placeholder="Enter LastName"
                onChange={(e) => setlast_name(e.target.value)}
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                className="form-control my-4"
                id="email"
                value={email}
                placeholder="Enter Email"
                onChange={(e) => setemail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control my-4"
                value={designation}
                id="email"
                placeholder="Enter Designation"
                onChange={(e) => setdesignation(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary  my-4 aligh-right"
              onClick={(e) => {
                Save(e);
              }}
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
