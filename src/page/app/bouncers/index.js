import React from "react";
import PageComponent from "../../../component/common/Page-Component";

const Bouncers = () => {
  return (
    <div>
      <PageComponent
        tableHeaders="USERS"
        tableTitle="Bouncers List"
        addData
        addModalTitle="Add New Bouncer"
        modalButton="Add New Bouncer"
        modalFields="USERS_MODAL"
      />
    </div>
  );
};

export default Bouncers;
