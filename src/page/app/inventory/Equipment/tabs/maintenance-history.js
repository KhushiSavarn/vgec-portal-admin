import React, { useEffect, useState } from "react";
import CustomTable from "../../../../../component/common/Custom-Table";

const MaintenanceHistoryTab = React.memo(({ HistoryData = [] }) => {
  // console.log("object1");

  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    setDataSource(HistoryData);
  }, [HistoryData]);

  return (
    <>
      <CustomTable dataSource={dataSource} name="MAINTENANCE_HISTORY" />
    </>
  );
});

export default MaintenanceHistoryTab;
