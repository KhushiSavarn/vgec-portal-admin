import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import { Col, Row, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CONSTANTS from "../../../util/constant/CONSTANTS";
import TabTitle from "../../../component/card/Tab-Title";
import PageHeader from "../../../component/common/page-Header";
import ModalFormCreator from "../../../component/common/ModalFormCreator";
import moment from "moment";
import useHttp from "../../../hooks/use-http";
import EmployeeDocument from "./tabs/employee-document";
import EmployeeDetails from "./tabs/employee-detail";
import { GrDocument } from "react-icons/gr";
import EmployeeTimeoff from "./tabs/employee-timeoff";
import { TbCalendarStats } from "react-icons/tb";
import { CgDetailsMore } from "react-icons/cg";

const EmployeeDetail = React.memo(() => {
  const API = useHttp();
  const params = useParams();
  const [openLeave, setOpenLeave] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);
  const [employeeData, setEmployeeData] = useState([]);
  const [employeeDocumentData, setEmployeeDocumentData] = useState([]);
  const [employeeTimeOffData, setEmployeeTimeOffData] = useState([]);
  const [activeTAb, setActiveTAb] = useState(null);
  const [refresh, setRefresh] = useState(true);
  // const [csvDataAll, setCsvDataAll] = useState([]);
  const [fullData, setFullData] = useState(null);
  const onLeave = (values) => {
    const payload = new FormData();
    payload.append("leaveTypeId", values.leaveTypeId);
    payload.append("reason", values.reason);
    if (values?.supportingDocs) {
      payload.append(
        "supportingDocs",
        values?.supportingDocs[0]?.originFileObj
      );
    }
    payload.append("from", moment(values.from.$d).format("YYYY-MM-DD"));
    payload.append("to", moment(values.to.$d).format("YYYY-MM-DD"));
    payload.append("employeeId", params.id);
    delete values.empName;
    API.sendRequest(
      CONSTANTS.API.leaverequest,
      (res) => {
        console.log(res, "leave");
        setRefresh((prev) => !prev);
        setEmployeeTimeOffData((prev) => [
          ...prev,
          {
            ...res.data,
            no: prev.length ? prev[prev.length - 1].no + 1 : 1,
            key: res.data.id,
            duration: moment
              .duration(new Date(res.data.to) - new Date(res.data.from))
              .asDays(),
            leavetype: res.data.leaveTypeId,
            id: res.data.id,
          },
        ]);
      },
      payload,
      "Leave requested"
    );
    setOpenLeave(false);
  };
  const onDocumentUpload = (values) => {
    console.log(values);
    const payload = new FormData();
    payload.append("name", values.name);
    payload.append("number", values.number);
    payload.append("docType", values.docType);
    payload.append("documents", values.documents[0].originFileObj);
    payload.append("employeeId", params.id);
    API.sendRequest(
      CONSTANTS.API.uploadEmployeeDocument,
      (res) => {
        console.log(res, "upload doc");
        setEmployeeDocumentData((prev) => [
          ...prev,
          {
            ...res.data,
            no: prev.length ? prev[prev.length - 1].no + 1 : 1,
            key: res.data.id,
            id: res.data.id,
          },
        ]);
      },
      payload,
      "Document Uploaded"
    );
    console.log("object Document");

    setOpenUpload(false);
  };

  const CommonButton = [
    {
      id: 1,
      action: () => {
        console.log("button1");
      },
      name: "Print ID Card",
      type: "normal",
    },
    {
      id: 2,
      action: () => {
        setOpenLeave(true);
      },
      name: "Leave Request",
      type: "normal",
    },
  ];

  const CSVData = [];

  if (activeTAb === "Document") {
    if (employeeDocumentData.length) {
      CSVData[0] = CONSTANTS.TABLE.EMPLOYEE_DOCUMENT.filter(
        (el) => el?.title
      ).map((el) => el.title.toUpperCase());
      employeeDocumentData.map((item, index) => {
        CSVData[index + 1] = CONSTANTS.TABLE.EMPLOYEE_DOCUMENT.filter(
          (el) => el?.title
        ).map((el) => item[el.dataIndex]);
        return 0;
      });
    }
  }
  if (activeTAb === "Timeoff") {
    if (employeeTimeOffData.length) {
      CSVData[0] = CONSTANTS.TABLE.EMPLOYEE_TIMEOFF.filter(
        (el) => el?.title
      ).map((el) => el.title.toUpperCase());
      employeeTimeOffData.map((item, index) => {
        CSVData[index + 1] = CONSTANTS.TABLE.EMPLOYEE_TIMEOFF.filter(
          (el) => el?.title
        ).map((el) => item[el.dataIndex]);
        return 0;
      });
    }
  }

  const HeadButtons = {
    Details: {
      buttons: [...CommonButton],
      name: "Details",
    },
    Document: {
      buttons: [
        ...CommonButton,
        {
          id: 3,
          action: () => {
            console.log("CSV downloading...");
            console.log("download", CSVData);
          },
          data: CSVData,
          icon: <DownloadOutlined />,
          type: "linkicon",
        },
        {
          id: 4,
          action: () => {
            setOpenUpload(true);
          },
          icon: <UploadOutlined />,
          type: "icon",
        },
      ],
      name: " Documents",
    },
    Timeoff: {
      buttons: [
        ...CommonButton,
        {
          id: 3,
          action: () => {
            console.log("CSV downloading...");
            console.log("download", CSVData);
          },
          data: CSVData,

          icon: <DownloadOutlined />,
          type: "linkicon",
        },
      ],
      name: "Time OFF",
    },
  };

  useEffect(() => {
    console.log(activeTAb);

    setFullData(HeadButtons[activeTAb || "Details"]);
  }, [activeTAb]);
  useEffect(() => {
    setFullData(HeadButtons["Details"]);
    const APIEmpData = { ...CONSTANTS.API.oneEmployee };
    APIEmpData.endpoint = APIEmpData.endpoint.replace(":id", params.eid);
    API.sendRequest(APIEmpData, (res) => {
      setEmployeeData(res.data.rows[0]);
    });

    const APIEmpDoc = { ...CONSTANTS.API.documentEmployee };
    APIEmpDoc.endpoint = APIEmpDoc.endpoint.replace(":id", params.eid);
    API.sendRequest(APIEmpDoc, (res) => {
      setEmployeeDocumentData(
        res?.data?.rows.map((el, i) => ({
          ...el,
          no: i + 1,
          key: el.id,
          id: el.id,
        }))
      );
    });
    const APIEmpTimeoff = { ...CONSTANTS.API.TimeoffEmployee };
    APIEmpTimeoff.endpoint = APIEmpTimeoff.endpoint.replace(":id", params.eid);
    API.sendRequest(APIEmpTimeoff, (res) => {
      setEmployeeTimeOffData(
        res.data.rows.map((el, i) => ({
          ...el,
          no: i + 1,
          key: el.id,
          duration: moment
            .duration(new Date(el.to) - new Date(el.from))
            .asDays(),
          leavetype: el.leaveTypeId,
          status: {
            id: el.id,
            value: el.status,
            onChange: (res) => {
              console.log(res, "click happend", el.id);
              const updateLeaveAPI = {
                ...CONSTANTS.API.leaverequestUpdate,
              };
              updateLeaveAPI.endpoint = updateLeaveAPI.endpoint.replace(
                ":id",
                el.id
              );
              API.sendRequest(
                updateLeaveAPI,
                (res) => {
                  console.log(res);
                },
                { status: res },
                "status updated"
              );
            },
          },
        }))
      );
    });
  }, [refresh]);
  useEffect(() => {
    //table data set option
    API.sendRequest(CONSTANTS.API.employmenttype, (res) => {
      CONSTANTS.FORM_FIELD.EMPLOYEE_NEW_MODAL[6].item[1].option =
        res?.data?.rows?.map((el) => ({
          id: el.id,
          value: el.id,
          Label: el.type,
        }));
    });
    API.sendRequest(CONSTANTS.API.shifts, (res) => {
      CONSTANTS.FORM_FIELD.EMPLOYEE_NEW_MODAL[5].item[0].option =
        res?.data?.rows?.map((el) => ({
          id: el.id,
          value: el.id,
          Label: el.shift,
        }));
    });
    API.sendRequest(CONSTANTS.API.getAllManagers, (res) => {
      CONSTANTS.FORM_FIELD.EMPLOYEE_NEW_MODAL[3].item[1].option =
        res?.data?.rows?.map((el) => ({
          id: el.id,
          value: el.id,
          Label: el.name,
        }));
    });
    API.sendRequest(CONSTANTS.API.getAlldepartment, (res) => {
      CONSTANTS.FORM_FIELD.EMPLOYEE_NEW_MODAL[2].item[0].option =
        res?.data?.rows?.map((el) => ({
          id: el.id,
          value: el.id,
          Label: el.name,
        }));
    });
  }, []);
  return (
    <Row className="container-main">
      <PageHeader details={params.id} data={fullData} />
      <ModalFormCreator
        open={openLeave}
        onCreate={onLeave}
        onCancel={() => {
          setOpenLeave(false);
        }}
        formData={{ name: employeeData?.name }}
        name="New leave request form"
        menu="EMPLOYEE_LEAVE_REQUEST"
      />
      <ModalFormCreator
        open={openUpload}
        onCreate={onDocumentUpload}
        onCancel={() => {
          setOpenUpload(false);
        }}
        name="DOCUMent Upload"
        menu="DOCUMENT_UPLOAD"
      />
      <Col
        span={24}
        className="dashboard-main-frame"
        style={{ marginTop: "15px" }}
      >
        <Tabs
          tabBarStyle={{
            border: "1px solid #bfc5d2",
            display: "flex",
            height: "50px",
            margin: "0px",
          }}
          // activeKey={activeTAb || "Details"}
          defaultActiveKey={activeTAb || "Details"}
          onTabClick={(e) => {
            setFullData(HeadButtons[e]);
            setActiveTAb(e);
          }}
          items={[
            {
              id: "Details",
              label: <TabTitle icon={<CgDetailsMore />} name="Details" />,
              key: "Details",
              children: <EmployeeDetails EmployeeData={employeeData} />,
            },
            {
              id: "Document",
              label: (
                <TabTitle
                  icon={<GrDocument />}
                  name={
                    <>
                      {employeeDocumentData.length} <br></br>Document
                    </>
                  }
                />
              ),
              key: "Document",
              children: (
                <EmployeeDocument
                  EmployeeDocumentData={employeeDocumentData}
                  setEmployeeDocumentData={setEmployeeDocumentData}
                  // setCsvData={setCsvDataAll}
                />
              ),
            },
            {
              id: "Timeoff",
              key: "Timeoff",
              label: <TabTitle icon={<TbCalendarStats />} name="Time Off" />,
              children: (
                <EmployeeTimeoff
                  // setCsvData={setCsvDataAll}
                  EmployeeTimeOffData={employeeTimeOffData}
                  setRefresh={setRefresh}
                />
              ),
            },
          ]}
        />
      </Col>
    </Row>
  );
});

export default EmployeeDetail;
