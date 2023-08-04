import React, { useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import { Button, Card, Col, DatePicker, Image, Row, Spin } from "antd";
import CustomTable from "./Custom-Table";
import ModalFormCreator from "./ModalFormCreator";
import { apiGenerator } from "../../util/functions";

import profile from "../../asset/image/image 2.png";
import CONSTANTS from "../../util/constant/CONSTANTS";
import moment from "moment";
import dayjs from "dayjs";
import Heading from "./Heading";
import CustomSearchBar from "./Custom-search";

const PageComponent = ({
  tableTitle = "Data List",
  tableHeaders = "USERS",
  addModalTitle = "Add Modal Title",
  editModalTitle = "Edit Modal Title",
  modalFields = "USERS_MODAL",
  editModalFields = null,
  modalButton = "Add Button Name",
  getAPI = null,
  getData = (res) => res,
  formData = false,
  addData = false,
  viewData = false,
  viewFunction = (res) => res,
  addAPI = null,
  deleteData = false,
  deleteAPI = null,
  blockData = false,
  editAPI = null,
  editData = false,
  editformData = false,
  acceptRejectData = false,
  acceptRejectAPI = null,
  checkboxData = false,
  dateTime = false,
  extraResData = "",
  DUMMY_DATA = null,
  filterparmas = false,
  filterList = [],
  defaultFilterOption = null,
  searchfilter = false,
  isSearch = false,
  searchAPI = null,
  datefilter = false,
  extraParams = "",
  payloadExtra = {},
  extraEndPointData = "",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [renderData, setRenderData] = useState([]);
  // const [filterData, setFilterData] = useState([])
  const [editRenderData, setEditRenderData] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [dates, setDates] = useState({
    startDate: null,
    endDate: null,
  });
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalRecords, setTotalRecords] = useState(null);
  const [selectedOption, setSelectedOption] = useState(filterList[0]?.value);

  const api = useHttp();

  // console.log(totalRecords);
  const { RangePicker } = DatePicker;

  // ADD Data API
  const addTableData = (value) => {
    console.log({ ...value });
    let rawPayload = {};
    const formPayload = new FormData();
    if (formData) {
      CONSTANTS.FORM_FIELD[modalFields].forEach((ele) => {
        // console.log(ele.id);
        if (
          ele.type !== "file" &&
          ele.type !== "date" &&
          ele.type !== "multifield" &&
          ele.type !== "extraMultiSingle"
        ) {
          // console.log(value[ele.id]);
          value[ele.id] && formPayload.append(ele.id, value[ele.id]);
        }
        if (ele.type === "file") {
          // console.log(value[ele.id][0].originFileObj);
          formPayload.append(ele.id, value[ele.id][0].originFileObj);
        }
        if (ele.type === "multifield" || ele.type === "extraMultiSingle") {
          if (ele?.handler) {
            value[ele.id] && formPayload.append(ele.id, ele?.handler(value[ele.id]));
          } else {
            value[ele.id] && formPayload.append(ele.id, JSON.stringify(value[ele.id]));
          }
        }
        if (ele.type === "date") {
          if (dateTime) {
            const dateTimeValue = `${moment(value[ele.id].$d).format(
              "YYYY-MM-DD"
            )} ${moment(value[ele.id].$d, "HH:mm:ss")
              .utc()
              .format("HH:mm:ss")}`;
            // console.log(dateTimeValue);
            value[ele.id] &&  formPayload.append(ele.id, dateTimeValue);
          } else {
            value[ele.id] &&  formPayload.append(
              ele.id,
              moment(value[ele.id].$d, "YYYY-MM-DD").utc().format("YYYY-MM-DD")
            );
          }
        }
      });
      Object.entries(payloadExtra).forEach((ele) => {
        formPayload.append(ele[0], ele[1]);
      });
    } else {
      CONSTANTS.FORM_FIELD[modalFields].forEach((ele) => {
        // console.log(ele.id);

        if (ele.type === "option") {
          const OpetionsArr = [];
          for (let i = 1; i <= 10000000; i++) {
            if (ele?.id + i in value) {
              OpetionsArr.push(value[ele?.id + i]);
              delete value[ele?.id + i];
            } else {
              break;
            }
          }

          rawPayload = { ...rawPayload, options: OpetionsArr.toString() };
        }
      });
      rawPayload = { ...value, ...payloadExtra, ...rawPayload };
    }

    const payload = formData ? formPayload : rawPayload;

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
    let rawPayload = {};
    // console.log(value);
    const formPayload = new FormData();
    if (editformData) {
      CONSTANTS.FORM_FIELD[
        editModalFields ? editModalFields : modalFields
      ].forEach((ele) => {
        if (
          ele.type !== "file" &&
          ele.type !== "date" &&
          ele.type !== "number"
        ) {
          // console.log(value[ele.id]);
          value[ele.id] && formPayload.append(ele.id, value[ele.id]);
        }
        if (ele.type === "number") {
          // console.log(value[ele.id]);
          value[ele.id] && formPayload.append(ele.id, +value[ele.id]);
        }
        if (ele.type === "file" && value[ele?.id]) {
          // console.log(value[ele.id][0].originFileObj);
          formPayload.append(ele.id, value[ele?.id][0]?.originFileObj);
        }
        if (ele.type === "date") {
          if (dateTime) {
            const dateTimeValue = `${moment(value[ele.id].$d).format(
              "YYYY-MM-DD"
            )} ${moment(value[ele.id].$d, "HH:mm:ss")
              .utc()
              .format("HH:mm:ss")}`;
            // console.log(dateTimeValue);
            value[ele.id] && formPayload.append(ele.id, dateTimeValue);
          } else {
            value[ele.id] && formPayload.append(
              ele.id,
              moment(value[ele.id].$d).format("YYYY-MM-DD")
            );
          }
        }
      });
    } else {
      CONSTANTS.FORM_FIELD[modalFields].forEach((ele) => {
        // console.log(ele.id);

        if (ele.type === "option") {
          const OpetionsArr = [];
          for (let i = 1; i <= 10000000; i++) {
            if (ele?.id + i in value) {
              OpetionsArr.push(value[ele?.id + i]);
              delete value[ele?.id + i];
            } else {
              break;
            }
          }

          rawPayload = { ...rawPayload, options: OpetionsArr.toString() };
        }
      });
      rawPayload = { ...value, ...payloadExtra, ...rawPayload };
    }

    const payload = editformData ? formPayload : rawPayload;
    // if (blockData) {
    //   payload = { ...payload, isBlocked: editRenderData?.isBlocked };
    // }
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

  // Accept Request
  const acceptRequest = (dataId) => {
    const payload = {
      approve: true,
    };
    // console.log(payload);
    if (acceptRejectAPI) {
      const ACCEPT_API_CALL = apiGenerator(acceptRejectAPI, {
        dataId,
      });
      api.sendRequest(
        ACCEPT_API_CALL,
        () => {
          setRefresh((prev) => !prev);
        },
        payload,
        "Request Accepted Successfully!!!"
      );
    }
  };
  // Reject Request
  const rejectRequest = (dataId) => {
    const payload = {
      approve: false,
    };
    // console.log(payload);
    if (acceptRejectAPI) {
      const REJECT_API_CALL = apiGenerator(acceptRejectAPI, {
        dataId,
      });
      api.sendRequest(
        REJECT_API_CALL,
        () => {
          setRefresh((prev) => !prev);
        },
        payload,
        "Request Rejected Successfully!!!"
      );
    }
  };

  // Date Filter
  const dateFilterFunction = (e) => {
    // console.log(e);
    // console.log(dayjs(e[0]).format("YYYY-MM-DD"));
    // console.log(dayjs(e[1]).format("YYYY-MM-DD"));
    setDates({
      startDate: dayjs(e[0]).format("YYYY-MM-DD"),
      endDate: dayjs(e[1]).format("YYYY-MM-DD"),
    });
  };

  // Add Requried Buttons
  const tableData = (res) => {
    const answer = res?.map((data) => {
      let tableData = {
        ...data,
      };

      // View Button
      if (viewData) {
        tableData = {
          ...tableData,
          view: {
            id: data?.id,
            onClick: viewFunction,
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
      if (editData || editformData) {
        tableData = {
          ...tableData,
          edit: {
            id: data?.id,
            onClick: () => {
              // console.log(tableData, "edit data");
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

      //  Accept Reject Button required
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
    });

    return answer;
  };

  // Render Data API
  useEffect(() => {
    if (getAPI) {
      let API_CALL = { ...getAPI };
      API_CALL.endpoint = API_CALL.endpoint + extraEndPointData
      let datefilter = "";
      if (dates.startDate !== null && dates.endDate !== null) {
        datefilter = `?startDate=${dates.startDate}&endDate=${dates.endDate}`;
      }

      // console.log(API_CALL);
      if (searchKeyword === "") {
        API_CALL.endpoint = API_CALL.endpoint + datefilter;

        if (API_CALL.endpoint.includes("?")) {
          API_CALL.endpoint = `${API_CALL.endpoint}&page=${pageNumber}&limit=${pageSize}`;
        } else {
          API_CALL.endpoint = `${API_CALL.endpoint}?page=${pageNumber}&limit=${pageSize}`;
        }
        // For Selected Filter
        if (selectedOption !== "" && selectedOption !== undefined) {
          API_CALL.endpoint = `${API_CALL.endpoint}&${selectedOption}`;
        }
        API_CALL.endpoint = `${API_CALL.endpoint}${extraParams}`;
        api.sendRequest(API_CALL, (res) => {
          setTotalRecords(res?.data?.count);
          let API_RESPONSE_DATA = res?.data;
          if (extraResData) {
            API_RESPONSE_DATA = API_RESPONSE_DATA[extraResData];
          }

          const RESPONSE = tableData(getData(API_RESPONSE_DATA));
          // console.log(RESPONSE);
          setRenderData(RESPONSE);
        });
      } else {
        api.sendRequest(
          { type: "GET", endpoint: `${searchAPI}${searchKeyword}` },
          (res) => {
            setRenderData(tableData(getData(res?.data[extraResData])));
            // console.log(res?.data?.clubs);
          },
          { keyword: searchKeyword }
        );
      }
    }
    setRenderData([]);
  }, [refresh, searchKeyword, dates, pageNumber, pageSize, selectedOption]);
  return (
    <>
      {/* Date Filter */}

      {(datefilter || searchfilter) && (
        <div className="my-5">
          <Card>
            <Row>
              <Col span={24}>
                <Heading>Filter</Heading>
              </Col>
              {datefilter && (
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <RangePicker
                    className="w-3/4"
                    onChange={dateFilterFunction}
                  />
                </Col>
              )}

              {searchfilter && (
                <Col span={18} className={`${datefilter ? "mt-5" : ""}`}>
                  <div className="w-1/2">
                    <CustomSearchBar
                      endpointAPI={searchAPI}
                      setKeyword={setSearchKeyword}
                      isSearch={isSearch}
                    />
                  </div>
                </Col>
              )}
            </Row>
          </Card>
        </div>
      )}

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
      {(editData || editformData) && (
        <ModalFormCreator
          open={editRenderData !== null}
          onCreate={editTableData}
          onCancel={() => {
            setEditRenderData(null);
          }}
          name={editModalTitle}
          menu={editModalFields || modalFields}
          formData={{ ...editRenderData }}
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
          defaultFilterOption={defaultFilterOption}
          title={tableTitle}
          dataSource={DUMMY_DATA ? DUMMY_DATA : renderData}
          name={tableHeaders}
          totalRecords={totalRecords}
          setPageNumber={setPageNumber}
          pageNumber={pageNumber}
          setSelectedOption={setSelectedOption}
          selectedOption={selectedOption}
          setPageSize={setPageSize}
          pageSize={pageSize}
        />
      )}
    </>
  );
};

export default PageComponent;
