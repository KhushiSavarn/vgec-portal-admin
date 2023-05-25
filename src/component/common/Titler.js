import Title from "antd/es/typography/Title";
import { Typography } from "antd";
import React from "react";
const { Text } = Typography;

const Titler = (props) => {
  return (
    <>
      <Title level={4} className="heading">
        {props.big}
      </Title>
      <Text className="sub-heading" type="secondary" strong={true}>
        {props.small}
      </Text>
    </>
  );
};

export default Titler;
