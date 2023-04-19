import EmployeeCard from "./EmployeeCard";
import { IEmployee } from "../Type";
import "./EmployeeCard.css";
import { useEffect, useState } from "react";
import axios from "axios";
//import { useNavigate } from "react-router-dom";

export interface ICardsectionProps { }

export default function Cardsection(props: ICardsectionProps) {
  const [user, setUser] = useState<any>(null);
  // navigate = useNavigate();

  const getAllEmployee = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const url = "http://localhost:5000/get";
      await axios.get(url, { headers }).then((response) => {
        setUser(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllEmployee();
  }, []);

  console.log(user);
  const handleClick = (id: string) => {
    // navigate(`/profile/${id}`);
  };

  return (
    <div className="container cardsdisplay">
      <h1 className="mt-5 fw-bold">Employees</h1>
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
                Image_url={user.Image_url}
              />
            );
          }
        )}
      </div>
    </div>
  );
}
