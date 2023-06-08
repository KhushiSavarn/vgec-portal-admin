import React from "react";
import CustomTable from "../../../../component/common/Custom-Table";

const UserPost = () => {
  return (
    <div className="mt-5 mx-3">
      <CustomTable
        // dataSource={data.slice(inventoryDisplay, inventoryDisplay + 10)}
        dataSource={[]}
        title={"User Post List"}
        name="USERS_POST"
      />
    </div>
  );
};

export default UserPost;
