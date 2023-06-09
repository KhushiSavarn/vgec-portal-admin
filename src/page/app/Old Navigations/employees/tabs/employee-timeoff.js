import React, { useEffect, useState } from "react";
import CustomTable from "../../../../component/common/Custom-Table";
import moment from "moment";
import CONSTANTS from "../../../../util/constant/CONSTANTS";
import useHttp from "../../../../hooks/use-http";
import ModalFormCreator from "../../../../component/common/ModalFormCreator";

const EmployeeTimeoff = ({ EmployeeTimeOffData, setRefresh }) => {
  const [dataSource, setDataSource] = useState([]);
  const [openEditRow, setOpenEditRow] = useState(false);
  const [formIventoryData, setFormIventoryData] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);
  // const [refresh, setRefresh] = useState(true);
  useEffect(() => {
    setDataSource(EmployeeTimeOffData);
  }, [EmployeeTimeOffData]);

  const API = useHttp();
  /***
   *
   * Row click
   */
  const onEditHandler = (value) => {
    // console.log(value, formIventoryData);
    const payload = new FormData();
    payload.append("leaveTypeId", value.leaveTypeId);
    payload.append("reason", value.reason);
    if (value?.supportingDocs) {
      payload.append("supportingDocs", value?.supportingDocs[0]?.originFileObj);
    }
    payload.append("from", moment(value.from.$d).format("YYYY-MM-DD"));
    payload.append("to", moment(value.to.$d).format("YYYY-MM-DD"));
    // payload.append("employeeId", params.id);
    delete value.empName;
    const updateInventoryAPI = { ...CONSTANTS.API.leaverequestUpdate };
    updateInventoryAPI.endpoint = updateInventoryAPI.endpoint.replace(
      ":id",
      formIventoryData.id
    );
    // console.log(updateInventoryAPI);
    API.sendRequest(
      updateInventoryAPI,
      (res) => {
        console.log(res);
        setOpenEditRow(false);
        setRefresh((prev) => !prev);
      },
      payload
    );
  };

  return (
    <>
      <ModalFormCreator
        open={openEditRow}
        onCreate={onEditHandler}
        onCancel={() => {
          setOpenEditRow(false);
          setIsDisabled(true);
          // setFormIventoryData({});
        }}
        disabled={isDisabled}
        edit
        onEdit={() => {
          console.log("edit click");
          setIsDisabled(false);
        }}
        Delete
        onDelete={() => {
          console.log("Delete Click", formIventoryData);
          const DeleteInventoryAPI = {
            ...CONSTANTS.API.leaverequestDelete,
          };
          DeleteInventoryAPI.endpoint = DeleteInventoryAPI.endpoint.replace(
            ":id",
            formIventoryData.id
          );
          API.sendRequest(
            DeleteInventoryAPI,
            (res) => {
              console.log(res);
              setRefresh((prev) => !prev);
              setOpenEditRow(false);
            },
            "Deleted Successfully"
          );
        }}
        name="EMPLOYEE TIMEOFF DETAILS"
        menu="EMPLOYEE_LEAVE_REQUEST"
        formData={formIventoryData}
      />
      <CustomTable
        dataSource={dataSource}
        name="EMPLOYEE_TIMEOFF"
        extraclass="pointer"
        Other={{
          onRow: (row) => ({
            onClick: () => {
              console.log("Row", row);
              delete row.supportingDocs;
              setFormIventoryData({ ...row.employee, ...row });
              setOpenEditRow(true);
            },
          }),
        }}
      />
    </>
  );
};

export default EmployeeTimeoff;
