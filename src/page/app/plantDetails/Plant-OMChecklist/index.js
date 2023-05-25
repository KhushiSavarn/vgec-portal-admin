import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import PageHeader from "../../../../component/common/page-Header";
import { DownloadOutlined } from "@ant-design/icons";
import CustomTable from "../../../../component/common/Custom-Table";
import CONSTANTS from "../../../../util/constant/CONSTANTS";
import useHttp from "../../../../hooks/use-http";
import ModalFormCreator from "../../../../component/common/ModalFormCreator";
const PlantOMChecklist = () => {
  const [data, setData] = useState([]);
  const [openRoutine, setOpenRoutine] = useState(false);
  const [formData, setFormData] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const API = useHttp();
  const onAddRoutine = (value) => {
    console.log(value);
    if (!formData) {
      API.sendRequest(
        CONSTANTS.API.checkupgetAdd,
        (res) => {
          // setData((prev) => [
          //   ...prev,
          //   {
          //     ...res?.data,
          //     key: res?.data.id,
          //     no: prev.length ? prev[prev.length - 1].no + 1 : 1,
          //   },
          // ]);
        },
        value
      );
    } else {
      const UpdateClient = CONSTANTS.API.checkupUpdate;
      UpdateClient.endpoint = UpdateClient.endpoint.replace(":id", formData.id);
      API.sendRequest(
        UpdateClient,
        (res) => {
          console.log(res);
          setFormData(null);
        },
        value,
        "Checkup Updated"
      );
    }
    setRefresh((prev) => !prev);

    setOpenRoutine(false);
  };
  useEffect(() => {
    API.sendRequest(CONSTANTS.API.checkupgetAll, (res) => {
      setData(
        res?.data?.rows?.map((el, i) => ({
          ...el,
          key: el.id,
          no: i + 1,
          multButton: {
            Delete: {
              id: el.id,
              key: el.id,
              onClick: (key) => {
                // console.log(res, "asb");
                const deleteClient = CONSTANTS.API.checkupDelete;
                deleteClient.endpoint = deleteClient.endpoint.replace(
                  ":id",
                  key
                );
                API.sendRequest(
                  deleteClient,
                  (res) => {
                    // console.log(res);
                    setData((prev) => prev.filter((item) => item.key !== key));
                  },
                  "",
                  "Client Deleted"
                );
              },
            },
            Edit: {
              key: el.id,
              ...el,
              onClick: (res) => {
                // console.log(a, "edit");
                setFormData(res);
                // setId(res?.id);
                setOpenRoutine(true);
              },
            },
          },
        }))
      );
    });
  }, [refresh]);
  const CSVData = [];
  CSVData[0] = CONSTANTS.TABLE.SETTING_ROUTINE_CHECKUP.map((el) => el.title);
  data.map((item, index) => {
    CSVData[index + 1] = CONSTANTS.TABLE.SETTING_ROUTINE_CHECKUP.map(
      (el) => item[el.dataIndex]
    );
    return 0;
  });
  return (
    <Row className="container-main">
      <PageHeader
        data={{
          buttons: [
            {
              id: 1,
              action: () => {
                console.log("button1");
                setOpenRoutine(true);
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
          name: "  O & M Routine Checkup",
        }}
      />
      <ModalFormCreator
        open={openRoutine}
        onCreate={onAddRoutine}
        onCancel={() => {
          setOpenRoutine(false);
          setFormData(null);
        }}
        menu="SETTING_ROUTINE_CHECKUP"
        formData={formData || {}}
        name={`${formData ? "Edit " : "Add New "} O&M Routine Checkup`}
        SubmitName={formData ? "Update " : "Submit"}
      />
      <Col
        span={24}
        style={{
          marginBlock: "15px",
        }}
        className="container-body"
      >
        <CustomTable dataSource={data} name="SETTING_ROUTINE_CHECKUP" />
      </Col>
    </Row>
  );
};

export default PlantOMChecklist;
