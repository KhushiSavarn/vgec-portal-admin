import React, { useEffect, useState } from "react";
import PageHeader from "../../../../component/common/page-Header";
import { Col, Row, Tabs } from "antd";
import ModalFormCreator from "../../../../component/common/ModalFormCreator";
import { GrDocument } from "react-icons/gr";
import { RiFilePaper2Line } from "react-icons/ri";
import EquipmentDetailTab from "./tabs/equipment-detail";
import EquipmentDocumentTab from "./tabs/equipment-document";
import MaintenanceHistoryTab from "./tabs/maintenance-history";
import { useParams } from "react-router-dom";
import TabTitle from "../../../../component/card/Tab-Title";
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import { SlWrench } from "react-icons/sl";
import CONSTANTS from "../../../../util/constant/CONSTANTS";
import useHttp from "../../../../hooks/use-http";
// import moment from "moment";

const EquipmentDetailPage = React.memo(() => {
  // console.log("object");
  const params = useParams();
  const [activeTAb, setActiveTAb] = useState(null);
  const [fullData, setFullData] = useState(null);
  const [openUpload, setOpenUpload] = useState(false);
  const [iventoryDocumentData, setIventoryDocumentData] = useState([]);
  const [equpmentData, setEqupmentData] = useState({});
  const [maintenanceHistoryData, setMaintenanceHistoryData] = useState([]);
  const API = useHttp();
  const CSVData = [];

  if (activeTAb === "Document") {
    if (iventoryDocumentData.length) {
      CSVData[0] = CONSTANTS.TABLE.EMPLOYEE_DOCUMENT.filter(
        (el) => el?.title
      ).map((el) => el.title.toUpperCase());
      iventoryDocumentData.map((item, index) => {
        CSVData[index + 1] = CONSTANTS.TABLE.EMPLOYEE_DOCUMENT.filter(
          (el) => el?.title
        ).map((el) => item[el.dataIndex]);
        return 0;
      });
    }
  }
  if (activeTAb === "History") {
    if (maintenanceHistoryData.length) {
      CSVData[0] = CONSTANTS.TABLE.MAINTENANCE_HISTORY.filter(
        (el) => el?.title
      ).map((el) => el.title.toUpperCase());
      maintenanceHistoryData.map((item, index) => {
        CSVData[index + 1] = CONSTANTS.TABLE.MAINTENANCE_HISTORY.filter(
          (el) => el?.title
        ).map((el) => item[el.dataIndex]);
        return 0;
      });
    }
  }
  const HeadButtons = {
    Equipment: {
      buttons: [],
      name: "Equipment Details",
    },
    Document: {
      buttons: [
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
      name: "Equipment Documents",
    },
    History: {
      buttons: [
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
      name: "Maintenance History",
    },
  };
  const onDocumentUpload = (values) => {
    console.log(values);
    const payload = new FormData();
    payload.append("name", values.name);
    payload.append("number", values.number);
    payload.append("type", values.type);
    payload.append("documents", values.documents[0].originFileObj);
    payload.append("equipmentId", params.id);
    API.sendRequest(
      CONSTANTS.API.uploadEquipmentDocument,
      (res) => {
        console.log(res, "upload doc");
        setIventoryDocumentData((prev) => [
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
  useEffect(() => {
    // console.log(activeTAb);

    setFullData(HeadButtons[activeTAb || "Equipment"]);
  }, [activeTAb]);
  useEffect(() => {
    setFullData(HeadButtons["Equipment"]);
    const APIEquipData = { ...CONSTANTS.API.equipmentById };
    APIEquipData.endpoint = APIEquipData.endpoint.replace(":id", params.id);
    API.sendRequest(APIEquipData, (res) => {
      // console.log(res?.data, "data");
      setEqupmentData(res?.data);
    });

    const APIInvDoc = { ...CONSTANTS.API.documentEquipment };
    APIInvDoc.endpoint = APIInvDoc.endpoint.replace(":id", params.id);
    API.sendRequest(APIInvDoc, (res) => {
      setIventoryDocumentData(
        res?.data?.rows.map((el, i) => ({
          ...el,
          no: i + 1,
          key: el.id,
          id: el.id,
        }))
      );
    });

    const APIEmpTimeoff = { ...CONSTANTS.API.maintenance };
    API.sendRequest(APIEmpTimeoff, (res) => {
      // console.log(res);
      setMaintenanceHistoryData(
        res?.data?.rows?.map((el, i) => ({
          ...el,
          no: i + 1,
          key: el.id,
          // duration: moment
          //   .duration(new Date(el.to) - new Date(el.from))
          //   .asDays(),
          // leavetype: el.leaveTypeId,
        }))
      );
    });
    API.sendRequest(CONSTANTS.API.getallvendors, (res) => {
      CONSTANTS.FORM_FIELD.NEW_EQUIPMENT_FORM[1].item[1].option =
        res?.data?.rows?.map((el) => ({
          Label: el.name,
          value: el.id,
          id: el.id,
        }));
    });
    API.sendRequest(CONSTANTS.API.equipmentcategory, (res) => {
      CONSTANTS.FORM_FIELD.NEW_EQUIPMENT_FORM[1].item[0].option =
        res?.data?.rows?.map((el) => ({
          id: el.id,
          value: el.id,
          Label: el.category,
        }));
    });
    API.sendRequest(CONSTANTS.API.getAllClients, (res) => {
      CONSTANTS.FORM_FIELD.NEW_EQUIPMENT_FORM[7].item[1].option =
        res?.data?.rows?.map((el) => ({
          id: el.name,
          value: el.name,
          Label: el.name,
        }));
    });
  }, []);

  return (
    <Row className="container-main">
      <PageHeader details={params.id} data={fullData} />
      <ModalFormCreator
        open={openUpload}
        onCreate={onDocumentUpload}
        onCancel={() => {
          setOpenUpload(false);
        }}
        name=" EQUIPMENT DOCUMent Upload"
        menu="DOCUMENT_EQUIPMENT_UPLOAD"
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
          defaultActiveKey={activeTAb || "Equipment"}
          onTabClick={(e) => {
            setFullData(HeadButtons[e]);
            setActiveTAb(e);
          }}
          items={[
            {
              id: "Equipment",
              label: (
                <TabTitle
                  icon={<RiFilePaper2Line />}
                  name={
                    <>
                      Equipment<br></br>Details
                    </>
                  }
                />
              ),
              key: "Equipment",
              children: <EquipmentDetailTab InventoryData={equpmentData} />,
            },
            {
              id: "Document",
              label: (
                <TabTitle
                  icon={<GrDocument />}
                  name={
                    <>
                      Equipment<br></br>Document
                    </>
                  }
                />
              ),
              key: "Document",
              children: (
                <EquipmentDocumentTab
                  IventoryDocumentData={iventoryDocumentData}
                  setIventoryDocumentData={setIventoryDocumentData}
                />
              ),
            },
            {
              id: "History",
              key: "History",
              label: (
                <TabTitle
                  icon={<SlWrench style={{ transform: "rotate(-90deg)" }} />}
                  name={
                    <>
                      Maintenance<br></br>History
                    </>
                  }
                />
              ),
              children: (
                <MaintenanceHistoryTab HistoryData={maintenanceHistoryData} />
              ),
            },
          ]}
        />
      </Col>
    </Row>
  );
});

export default EquipmentDetailPage;
