import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "./EmployeeCard.css";

interface IEmployeeCardProps {
  keys: number;
  fn: string;
  ln: string;
  email: string;
  des: string;
  Id: number;
  Image_url: string;
}

export default function EmployeeCard({
  fn,
  ln,
  email,
  des,
  Id,
  Image_url,
  keys,
}: IEmployeeCardProps) {
  const [test, setTest] = useState("");

  useEffect(() => {
    setTest("");
    // Use setTimeout to simulate image loading delay
    setTimeout(() => {
      setTest(Image_url);
    }, 1000);
  }, [Image_url]);

  console.log("first", test);

  //if (!test) {
  // return (<> Loading..</>);
  //}

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mt-5 col-xl-3">
      <Card
        className="emp-card rounded-5 card-shadow"
        style={{ width: "100%" }}
      >
        <Card.Img
          className="rounded-5 p-2 card-img-top"
          variant="top"
          src={Image_url}
        />
        <Card.Body>
          <Card.Title className="text-left fs-6 fw-bold">
            {fn} {ln}
          </Card.Title>
          <Card.Text className="text-left font-size-sm pt-4">
            Designation &nbsp; : &nbsp; {des}
          </Card.Text>
          <Card.Text className="text-left font-size-sm pb-3">
            Email address &nbsp; : &nbsp; {email}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
