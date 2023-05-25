import React from "react";

const Label = (props) => {
  return props.required ? (
    <p className="title-head reuired-field">{props.children}</p>
  ) : (
    <p className="title-head">{props.children}</p>
  );
};

export default Label;
