import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import PageHeader from "../../../../component/common/page-Header";
import { DownloadOutlined } from "@ant-design/icons";
import CustomTable from "../../../../component/common/Custom-Table";
import CONSTANTS from "../../../../util/constant/CONSTANTS";
import useHttp from "../../../../hooks/use-http";
import ModalFormCreator from "../../../../component/common/ModalFormCreator";
import moment from "moment";
const LogBookLog = () => {
  const [data, setData] = useState([]);
  const [transferDisplay, setTransferDisplay] = useState(0);
  const [onTransfer, setOnTransfer] = useState(false);
  const [openEditRow, setOpenEditRow] = useState(false);
  const [formIventoryData, setFormIventoryData] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);
  const [refresh, setRefresh] = useState(true);

  const API = useHttp();
  const onRequestCreate = (value) => {
    console.log(value, "data");
    value.from = moment(value.from.$d).format("YYYY-MM-DD");
    value.to = moment(value.to.$d).format("YYYY-MM-DD");
    setOnTransfer(false);
    API.sendRequest(
      CONSTANTS.API.eventlogCreate,
      (res) => {
        // console.log(res, "purchase");
        setRefresh((prev) => !prev);
      },
      value
    );
  };
  useEffect(() => {
    API.sendRequest(CONSTANTS.API.eventlogAll, (res) => {
      setData(
        res?.data?.rows?.map((el) => ({
          ...el,
          ...el?.employee,
          status: {
            id: el.id,
            value: el.status,
            onChange: (res) => {
              console.log(res, "click happend", el.id);
              const updatePurchaseAPI = {
                ...CONSTANTS.API.eventlogUpdate,
              };
              updatePurchaseAPI.endpoint = updatePurchaseAPI.endpoint.replace(
                ":id",
                el.id
              );
              API.sendRequest(
                updatePurchaseAPI,
                (res) => {
                  console.log(res);
                },
                { status: res },
                "status updated"
              );
            },
          },
          key: el.id,
        }))
      );
    });
  }, [refresh]);
  useEffect(() => {
    API.sendRequest(CONSTANTS.API.employee, (res) => {
      CONSTANTS.FORM_FIELD.EVENT_LOG_FORM[2].item[0].option =
        res?.data?.rows?.map((el) => ({
          id: el.id,
          value: el.id,
          Label: el.name,
        }));
    });
    setTransferDisplay(0);
  }, []);

  /***
   *
   * Row click
   */
  const onEditHandler = (value) => {
    console.log(value, formIventoryData);
    value.from = moment(value.from.$d).format("YYYY-MM-DD");
    value.to = moment(value.to.$d).format("YYYY-MM-DD");
    const updateInventoryAPI = { ...CONSTANTS.API.eventlogUpdate };
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
      value
    );
  };

  const CSVData = [];
  CSVData[0] = CONSTANTS.TABLE.EVENT_LOG_TABLE.map((el) => el.title);
  data.map((item, index) => {
    CSVData[index + 1] = CONSTANTS.TABLE.EVENT_LOG_TABLE.map(
      (el) => item[el.dataIndex]
    );
    return 0;
  });
  return (
    <Row className="container-main">
      <ModalFormCreator
        open={onTransfer}
        onCreate={onRequestCreate}
        onCancel={() => {
          setOnTransfer(false);
        }}
        name="add Event log"
        menu="EVENT_LOG_FORM"
      />
      <PageHeader
        data={{
          buttons: [
            {
              id: 1,
              action: () => {
                console.log("button1");
                setOnTransfer(true);
              },
              name: "New",
            },
            {
              id: 2,
              action: () => {
                console.log("button3");
                console.log("download", CSVData);
              },
              icon: <DownloadOutlined />,
              data: CSVData,
              type: "linkicon",
            },
          ],
          name: " Event Log",
        }}
        search={{
          action: {
            left: () => {
              if (transferDisplay > 0) {
                setTransferDisplay((prev) => prev - 10);
              }
            },
            right: () => {
              if (transferDisplay + 10 < data.length) {
                setTransferDisplay((prev) => prev + 10);
              }
            },
          },
          page: {
            start: transferDisplay + 1,
            end:
              transferDisplay + 10 < data.length
                ? transferDisplay + 10
                : data.length,
            total: data.length,
          },
        }}
      />
      <Col
        span={24}
        style={{
          marginBlock: "15px",
        }}
        className="container-body"
      >
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
              ...CONSTANTS.API.eventlogDelete,
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
          name="edit Event log"
          menu="EVENT_LOG_FORM"
          formData={formIventoryData}
        />
        <CustomTable
          dataSource={data.slice(transferDisplay, transferDisplay + 10)}
          name="EVENT_LOG_TABLE"
          extraclass="pointer"
          Other={{
            onRow: (row) => ({
              onClick: () => {
                console.log("Row", row);
                row.date = moment(row.date, "YYYY/MM/DD");
                setFormIventoryData({ ...row });
                setOpenEditRow(true);
              },
            }),
          }}
        />
      </Col>
    </Row>
  );
};

export default LogBookLog;