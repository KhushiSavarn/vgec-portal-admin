import React, { useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import { useNavigate } from "react-router-dom";
import { Button, Image, Spin } from "antd";
import CustomTable from "./Custom-Table";
import ModalFormCreator from "./ModalFormCreator";
import { apiGenerator } from "../../util/functions";

import profile from "../../asset/image/image 2.png";
import CONSTANTS from "../../util/constant/CONSTANTS";
import moment from "moment";

const PageComponent = ({
  tableTitle = "Data List",
  tableHeaders = "USERS",
  addModalTitle = "Add Modal Title",
  editModalTitle = "Edit Modal Title",
  modalFields = "USERS_MODAL",
  editModalFields = null,
  modalButton = "Add Button Name",
  getAPI = null,
  formData = false,
  addData = false,
  viewData = false,
  viewUrl = null,
  addAPI = null,
  deleteData = false,
  deleteAPI = null,
  blockData = false,
  editAPI = null,
  editData = false,
  acceptRejectData = false,
  checkboxData = false,
  extraResData = "",
  DUMMY_DATA = null,
  params,
  filterparmas = false,
  filterList = [],
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [renderData, setRenderData] = useState([]);
  const [editRenderData, setEditRenderData] = useState(null);
  const api = useHttp();
  const navigate = useNavigate();
  // console.log(editRenderData);
  // console.log(renderData);

  // ADD Data API
  const addTableData = (value) => {
    console.log({ ...value });
    let rawPayload = {};
    const formPayload = new FormData();
    if (formData) {
      CONSTANTS.FORM_FIELD.USERS_MODAL.forEach((ele) => {
        if (ele.type !== "file" && ele.type !== "date") {
          console.log(value[ele.id]);
          formPayload.append(ele.id, value[ele.id]);
        }
        if (ele.type === "file") {
          console.log(value[ele.id][0].originFileObj);
          formPayload.append(ele.id, value[ele.id][0].originFileObj);
        }
        if (ele.type === "date") {
          console.log(moment(value[ele.id].$d).format("YYYY-MM-DD"));
          formPayload.append(
            ele.id,
            moment(value[ele.id].$d).format("YYYY-MM-DD")
          );
        }
      });
    } else {
      rawPayload = value;
    }

    const payload = formData ? formPayload : rawPayload;

    console.log(payload);

    // console.log(payload);
    if (addAPI) {
      const ADD_API_CALL = { ...addAPI };
      api.sendRequest(
        ADD_API_CALL,
        () => {
          setIsModalOpen((prev) => !prev);
          setRefresh((prev) => !prev);
        },
        payload,
        "Add Data Successfully!!!"
      );
    }
  };

  // Delete Data API
  const deleteTableData = (dataId) => {
    // console.log(dataId);
    if (deleteAPI) {
      const DELETE_API_CALL = apiGenerator(deleteAPI, {
        dataId,
      });
      // console.log(DELETE_API_CALL);
      api.sendRequest(
        DELETE_API_CALL,
        () => {
          setRefresh((prev) => !prev);
        },
        {},
        "Delete Data Successfully!!!"
      );
    }
  };

  // Edit Data API
  const editTableData = (value) => {
    const payload = { ...value, isBlocked: editRenderData?.isBlocked };
    const dataId = editRenderData?.id;
    // console.log(payload);
    if (editAPI) {
      const EDIT_API_CALL = apiGenerator(editAPI, {
        dataId,
      });
      // console.log(EDIT_API_CALL);
      api.sendRequest(
        EDIT_API_CALL,
        () => {
          setRefresh((prev) => !prev);
          setEditRenderData(null);
        },
        payload,
        "Edit Data Successfully!!!"
      );
    }
  };

  // Block Data API
  const blockTableData = (dataId = null, checked) => {
    const payload = {
      isBlocked: !checked,
    };

    if (editAPI) {
      const BLOCK_API_CALL = apiGenerator(editAPI, {
        dataId,
      });
      // console.log(BLOCK_API_CALL);
      api.sendRequest(
        BLOCK_API_CALL,
        () => {
          setRefresh((prev) => !prev);
        },
        payload
      );
    }
  };

  // Render Page
  const renderPage = (id) => {
    if (viewUrl) {
      navigate(`${viewUrl}${id}`);
    }
  };

  // Accept Request
  const acceptRequest = (id) => {
    // const payload = {
    //   accept: true,
    //   ClubId: id,
    // };
    // console.log(payload);
    // api.sendRequest(
    //   CONSTANTS.API.acceptOrRejectRequest,
    //   () => {
    //     setRefresh((prev) => !prev);
    //   },
    //   payload,
    //   "Request Accepted"
    // );
  };
  // Reject Request
  const rejectRequest = (id) => {
    // const payload = {
    //   accept: false,
    //   ClubId: id,
    // };
    // console.log(payload);
    // api.sendRequest(
    //   CONSTANTS.API.acceptOrRejectRequest,
    //   () => {
    //     setRefresh((prev) => !prev);
    //   },
    //   payload,
    //   "Request Rejected"
    // );
  };

  // Render Data API
  useEffect(() => {
    if (getAPI) {
      const API_CALL = { ...getAPI };
      if (params) {
      }
      api.sendRequest(API_CALL, (res) => {
        let API_RESPONSE_DATA = res?.data;
        if (extraResData) {
          API_RESPONSE_DATA = API_RESPONSE_DATA[extraResData];
        }
        // console.log(API_RESPONSE_DATA);
        setRenderData(
          API_RESPONSE_DATA?.map((data, index) => {
            let tableData = {
              ...data,
              no: index + 1,
              image: data?.image || profile,
              profilePic: data?.profilePic || profile,
              dob: moment(data?.dob).format("DD MMM ,YYYY"),
              date: moment(data?.date).format("DD MMM ,YYYY"),
            };

            // View Button
            if (viewData) {
              tableData = {
                ...tableData,
                view: {
                  id: data?.id,
                  // checked: !data?.isBlocked,
                  onClick: renderPage,
                },
              };
            }

            //  Block Button required
            if (blockData) {
              tableData = {
                ...tableData,
                toggle: {
                  id: data?.id,
                  checked: data?.isBlocked,
                  onClick: blockTableData,
                },
              };
            }
            //  Checkbox Button required
            if (checkboxData) {
              tableData = {
                ...tableData,
                checkbox: {
                  id: data?.id,
                  checked: !data?.privateAcc,
                  onClick: () => {},
                },
              };
            }

            //  Edit Button required
            if (editData) {
              tableData = {
                ...tableData,
                edit: {
                  id: data?.id,
                  onClick: () => {
                    setEditRenderData(tableData);
                  },
                },
              };
            }

            //  Delete Button required
            if (deleteData) {
              tableData = {
                ...tableData,
                delete: {
                  id: data?.id,
                  onClick: deleteTableData,
                },
              };
            }

            //  Delete Button required
            if (acceptRejectData) {
              tableData = {
                ...tableData,
                action: {
                  id: data?.id,
                  onAccept: acceptRequest,
                  onReject: rejectRequest,
                },
              };
            }

            return tableData;
          })
        );
      });
    }
    setRenderData([]);
  }, [refresh]);
  return (
    <>
      {/* Add Modal */}
      {(addData || formData) && (
        <>
          <Button
            onClick={() => {
              setIsModalOpen((prev) => !prev);
            }}
            className="mt-5"
            type="primary"
          >
            {modalButton}
          </Button>

          <ModalFormCreator
            open={isModalOpen}
            onCreate={addTableData}
            onCancel={() => {
              setIsModalOpen((prev) => !prev);
            }}
            name={addModalTitle}
            menu={modalFields}
          />
        </>
      )}
      {/* Edit Modal */}
      {editData && (
        <ModalFormCreator
          open={editRenderData !== null}
          onCreate={editTableData}
          onCancel={() => {
            setEditRenderData(null);
          }}
          name={editModalTitle}
          menu={editModalFields || modalFields}
          formData={editRenderData}
        />
      )}
      {api.isLoading ? (
        <Spin tip="Loading" size="large">
          <div className="content" />
        </Spin>
      ) : (
        <CustomTable
          // dataSource={data.slice(inventoryDisplay, inventoryDisplay + 10)}
          // dataSource={[]}
          // dataSource={DUMMY_DATA}
          filterparmas={filterparmas}
          filterList={filterList}
          title={tableTitle}
          dataSource={DUMMY_DATA ? DUMMY_DATA : renderData}
          name={tableHeaders}
        />
      )}
    </>
  );
};

export default PageComponent;
