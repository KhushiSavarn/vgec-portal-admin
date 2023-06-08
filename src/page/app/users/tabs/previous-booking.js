import React from "react";
import CustomTable from "../../../../component/common/Custom-Table";

const PreviousBooking = () => {
  return (
    <div className="mt-5 mx-3">
      <CustomTable
        // dataSource={data.slice(inventoryDisplay, inventoryDisplay + 10)}
        dataSource={[]}
        title={"Booking List"}
        name="USERS_BOOKING"
      />
    </div>
  );
};

export default PreviousBooking;
