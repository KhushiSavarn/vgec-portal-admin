import React from "react";

const Label = (props) => {
  return props.required ? (
    <p className="font-medium reuired-field">{props.children}</p>
  ) : (
    <p className="font-medium title-head">{props.children}</p>
  );
};

export default Label;
