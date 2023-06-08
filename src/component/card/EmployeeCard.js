import React from "react";
import defaultImage from "../../asset/image/image 2.png";
import { Col, Image, Row } from "antd";
import { Link } from "react-router-dom";
const EmployeeCard = ({
  image,
  name,
  position,
  department,
  workingShift,
  eId,
  id,
}) => {
  return (
    <div className="card-employee">
      <Link to={`${eId}/${id}`}>
        <Row>
          <Col span={9} className="px5 py5">
            <Image
              className="card-e-image px5 py5"
              style={{ objectFit: "cover" }}
              preview={false}
              src={image || defaultImage}
            />
          </Col>
          <Col span={15} className=" card-e-detail">
            <p className="card-e-name">{name}</p>
            <p className="card-e-details">{position}</p>
            <p className="card-e-details">{department.name}</p>
            <p className="card-e-details">{workingShift.shift}</p>
            <p className="card-e-details"> ID : {eId}</p>
          </Col>
        </Row>
      </Link>
    </div>
  );
};

export default EmployeeCard;
EmployeeCard.defaultProps = {
  image: defaultImage,
  name: "John Wick",
  position: "Senior Accountant",
  department: {
    name: "General Department",
  },
  workingShift: {
    shift: "Shift A3",
  },
  eId: 0,
};
