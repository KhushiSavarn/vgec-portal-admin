import React from "react";

const UserLayout = (props) => {
  return (
    <>
      <div />
      <main>
        <h1>UserLayout</h1>
        <div>{props.children}</div>
      </main>
    </>
  );
};

export default UserLayout;
