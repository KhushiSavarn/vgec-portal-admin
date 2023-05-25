import React, { useEffect, useState } from "react";
import useHttp from "../../../../../hooks/use-http";
import CONSTANTS from "../../../../../util/constant/CONSTANTS";
import CustomTable from "../../../../../component/common/Custom-Table";

const EquipmentDocumentTab = React.memo(
  ({ IventoryDocumentData, setIventoryDocumentData }) => {
    const [dataSource, setDataSource] = useState([]);
    const API = useHttp();
    const handleDelete = (key) => {
      console.log(key, "id");
      const DeletAPI = { ...CONSTANTS.API.deleteEquipmentDocument };
      DeletAPI.endpoint = DeletAPI.endpoint.replace(":id", key);
      API.sendRequest(
        DeletAPI,
        (res) => {
          console.log("object Delete", res);
          setDataSource((prev) => prev.filter((item) => item.key !== key));
          setIventoryDocumentData((prev) =>
            prev.filter((item) => item.key !== key)
          );
        },
        "",
        "Deleted Document Successfully"
      );
    };
    useEffect(() => {
      // console.log(IventoryDocumentData);
      setDataSource(
        IventoryDocumentData?.map((el) => ({
          ...el,
          multButton: {
            Delete: {
              id: el.id,
              key: el.id,
              onClick: handleDelete,
            },
            View: el.documents[0],
            Download: el.documents[0],
          },
        }))
      );
    }, [IventoryDocumentData]);
    return (
      <>
        <CustomTable dataSource={dataSource} name="EMPLOYEE_DOCUMENT" />
      </>
    );
  }
);

export default EquipmentDocumentTab;
