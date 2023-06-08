import React from "react";

const Heading = (props) => {
  return (
    <div>
      <p className="text-2xl font-medium title-head">{props.children}</p>
    </div>
  );
};

export default Heading;
