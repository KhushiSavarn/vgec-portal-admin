import React from "react";
// import "../../asset/css/card.css";
import defaultImage from "../../asset/image/Inventory.png";
import { Col, Image, Row } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
const InventoryCard = ({ image, warrantyExp, name, model, vendor, id }) => {
  function getFormatedStringFromDays(numberOfDays) {
    const years = Math.floor(numberOfDays / 365);
    const months = Math.floor((numberOfDays % 365) / 30);
    const days = Math.floor((numberOfDays % 365) % 30);

    return years > 0
      ? years + " years"
      : months > 0
      ? months + " months"
      : days + " days";
  }
  return (
    <div className="invCard-main">
      <Link to={`${model}/${id}`}>
        <Row>
          <Col span={8} className="invCard-image">
            <Image className="invCard-e-image" preview={false} src={image} />
          </Col>
          <Col span={16} className="invCard-detail invCard-e-detail">
            <p className="invCard-e-name">{name}</p>
            <p className="invCard-e-details">{model}</p>
            <p className="invCard-e-details">
              {warrantyExp}
              ---
              {getFormatedStringFromDays(
                Math.round(
                  moment.duration(new Date(warrantyExp) - moment()).asDays()
                )
              )}
              {/* -{moment.duration(new Date(warrantyExp) - moment()).asDays()} */}
            </p>
            <p className="invCard-e-details">{vendor.businessName}</p>
          </Col>
        </Row>
      </Link>
    </div>
  );
};

export default InventoryCard;
InventoryCard.defaultProps = {
  image: defaultImage,
  name: "Inverter",
  model: "AB1253TC69",
  vendor: {
    businessName: "Anupam Rasayan",
  },
  warrantyExp: "2024-04-27",
};
