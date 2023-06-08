import React from "react";
import CustomTable from "../../../../component/common/Custom-Table";

const Chat = () => {
  return (
    <div className="mt-5 mx-3">
      <CustomTable
        // dataSource={data.slice(inventoryDisplay, inventoryDisplay + 10)}
        dataSource={[]}
        title={"Chat History"}
        name="USERS_CHAT_HISTORY"
      />
    </div>
  );
};

export default Chat;
