import React from "react";
import CustomTable from "../../../../component/common/Custom-Table";

const CarValet = () => {
  return (
    <div className="mt-5 mx-3">
      <CustomTable
        // dataSource={data.slice(inventoryDisplay, inventoryDisplay + 10)}
        dataSource={[]}
        title={"Car Valet List"}
        name="USERS_CAR_VALET"
      />
    </div>
  );
};

export default CarValet;
