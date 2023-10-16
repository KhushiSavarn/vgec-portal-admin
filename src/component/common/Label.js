import React from "react";

const Label = (props) => {
  return props.required ? (
    <p className="font-medium ">
      {props.children}
      <span
        style={{
          color: "red",
          marginRight: "10px",
        }}
      >
        *
      </span>
    </p>
  ) : (
    <p className="font-medium title-head">{props.children}</p>
  );
};

export default Label;
