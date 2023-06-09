import React, { useEffect, useState } from "react";
import CONSTANTS from "../../../../util/constant/CONSTANTS";
import useHttp from "../../../../hooks/use-http";
import CustomTable from "../../../../component/common/Custom-Table";

const EmployeeDocument = ({
  EmployeeDocumentData,
  setEmployeeDocumentData,
}) => {
  const [dataSource, setDataSource] = useState([]);
  const API = useHttp();
  const handleDelete = (key) => {
    console.log(key, "id");
    const DeletAPI = { ...CONSTANTS.API.deleteEmployeeDocument };
    DeletAPI.endpoint = DeletAPI.endpoint.replace(":id", key);
    API.sendRequest(
      DeletAPI,
      (res) => {
        console.log("object Delete", res);
        setDataSource((prev) => prev.filter((item) => item.key !== key));
        setEmployeeDocumentData((prev) =>
          prev.filter((item) => item.key !== key)
        );
      },
      "",
      "Deleted Document Successfully"
    );
  };
  useEffect(() => {
    console.log(EmployeeDocumentData);
    setDataSource(
      EmployeeDocumentData?.map((el) => ({
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
  }, [EmployeeDocumentData]);

  return (
    <>
      <CustomTable dataSource={dataSource} name="EMPLOYEE_DOCUMENT" />
    </>
  );
};

export default EmployeeDocument;
