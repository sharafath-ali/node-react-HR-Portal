import EmployeeCard from "./EmployeeCard";
import { IEmployee } from "../Type";
import "./Cardsection.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import SearchContext from "../contexts/SearchContext";
import MainNavbar from "./MainNavbar";
import { CircularProgress } from "@mui/material";
import Loader from "../LoaderComponent/loader";
import SearchProvider from "../contexts/SearchContext";
//import { useNavigate } from "react-router-dom";

export interface ICardsectionProps { }
export default function Cardsection(props: ICardsectionProps) {
  const [user, setUser] = useState<any>(null);
  const [loading,setloading]=useState<any>(true);//loader
  // navigate = useNavigate();
  //const {filter ,setfilter}=useContext(SearchContext)
  const getAllEmployee = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const url = "http://localhost:5000/get";
      await axios.get(url, { headers }).then((response) => {
        setUser(response.data);
      });
      setloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllEmployee();
  }, []);

  console.log(user);
 

  useEffect(() => {
    setTimeout(() => {
      
    }, 5000);
  }, []);

  return (
    <>
    <MainNavbar />
    {loading?(<Loader/>):(
    <div className="container cardsdisplay">
      {/*<h1 className="mt-5 fw-bold text-center ">Employees</h1>*/}
      <div className="row mb-5">
        {user?.map(
          (
            user: {
              first_name: string;
              last_name: string;
              email: string;
              designation: string;
              Id: number;
              Image_url: string;
            },
            index: number
          ) => {
            return (
              <EmployeeCard
                keys={index}
                fn={user.first_name}
                ln={user.last_name}
                email={user.email}
                des={user.designation}
                Id={user.Id}
                Image_url={user.Image_url} />
            );
          }
        )}
      </div>
    </div>)}</>
  );
}
