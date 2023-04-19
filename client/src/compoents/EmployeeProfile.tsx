import { Link, useParams } from "react-router-dom";
import "./EmployeeProfile.css";
import { useState } from "react";
export interface IEmployeeProfileProps {}

export default function EmployeeProfile(props: IEmployeeProfileProps) {
  const [data, setdata] = useState<any>();
  let { id } = useParams();
  return (
    <>
      <div className="styles.section2">
        <h1>Profile</h1>
        <Link className="button1" to={`/`}>
          Home
        </Link>
        <Link className="button1" to={`/employeedetail/${Number(id)}`}>
          Profile
        </Link>
        <Link className="button1" to={`/Documents/${Number(id)}`}>
          Documents
        </Link>
      </div>
      <div className="employcontainer">
        <div className="image">
          <img src={`${data?.Image_url}`} alt="Employee" />
        </div>
        <h1>
          Name:{" "}
          <span className="space">
            {data?.first_name} {data?.last_name}
          </span>
        </h1>
        <h2>
          Designation: <span className="space">{data?.designation}</span>
        </h2>
        <h2>
          Email: <span className="space">{data?.email}</span>
        </h2>
      </div>
      <p style={{ textAlign: "center" }}>all copyright reserved</p>
    </>
  );
}
