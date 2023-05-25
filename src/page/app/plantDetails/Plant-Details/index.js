import { Col, Row, notification } from "antd";
import React, { useEffect, useState } from "react";
import CustomTable from "../../../../component/common/Custom-Table";
import CustomButton from "../../../../component/common/Custom-Buttons";
import "../../../../asset/css/setting.css";
import FormFields from "../../../../component/common/FormFields";
import { useForm } from "antd/es/form/Form";
import CONSTANTS from "../../../../util/constant/CONSTANTS";
import useHttp from "../../../../hooks/use-http";
import ModalFormCreator from "../../../../component/common/ModalFormCreator";
const PlantDetailsPage = () => {
  const [plantDocuments, setPlantDocuments] = useState([]);
  const [openUpload, setOpenUpload] = useState(false);
  const [openClient, setOpenClient] = useState(false);
  const [openPasswordChange, setOpenPasswordChange] = useState(false);
  const [clients, setClients] = useState([]);
  const [userData, setUserData] = useState([]);
  const [formData, setFormData] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [id, setId] = useState(null);
  const API = useHttp();
  const handleDelete = (key) => {
    console.log(key, "id");
    const DeletAPI = { ...CONSTANTS.API.plantdocumentDelete };
    DeletAPI.endpoint = DeletAPI.endpoint.replace(":id", key);
    API.sendRequest(
      DeletAPI,
      (res) => {
        console.log("object Delete", res);
        setPlantDocuments((prev) => prev.filter((item) => item.key !== key));
      },
      "",
      "Deleted Document Successfully"
    );
  };
  const onDocumentUpload = (values) => {
    console.log(values);
    const payload = new FormData();
    payload.append("name", values.name);
    payload.append("number", values.number);
    payload.append("type", values.type);
    payload.append("documents", values.documents[0].originFileObj);
    API.sendRequest(
      CONSTANTS.API.plantdocumentUpload,
      (res) => {
        console.log(res, "upload doc");
        setPlantDocuments((prev) => [
          ...prev,
          {
            ...res?.data,
            no: prev?.length ? prev[prev.length - 1].no + 1 : 1,
            key: res?.data?.id,
            id: res?.data?.id,
            multButton: {
              Delete: {
                id: res?.data?.id,
                key: res?.data?.id,
                onClick: handleDelete,
              },
              View: res?.data?.documents[0],
              Download: res?.data?.documents[0],
            },
          },
        ]);
      },
      payload,
      "Document Uploaded"
    );
    console.log("object Document");

    setOpenUpload(false);
  };
  const onClient = (values) => {
    // console.log(values);
    if (!formData) {
      API.sendRequest(
        CONSTANTS.API.createClient,
        (res) => {
          setClients((prev) => [
            ...prev,
            {
              ...res?.data,
              no: prev?.length ? prev[prev.length - 1].no + 1 : 1,
              key: res?.data?.id,
              id: res?.data?.id,
            },
          ]);
        },
        values,
        "Client Added"
      );
    } else {
      const UpdateClient = CONSTANTS.API.updateClient;
      UpdateClient.endpoint = UpdateClient.endpoint.replace(":id", id);
      API.sendRequest(
        UpdateClient,
        (res) => {
          console.log(res);
          setFormData(null);
          setRefresh((prev) => !prev);
        },
        values,
        "Client Updated"
      );
    }
    setOpenClient(false);
  };
  useEffect(() => {
    // const APIEquipData = { ...CONSTANTS.API.equipmentById };
    // APIEquipData.endpoint = APIEquipData.endpoint.replace(":id", params.id);
    // API.sendRequest(APIEquipData, (res) => {
    //   console.log(res?.data, "data");
    //   setEqupmentData(res?.data);
    // });

    // const PlantDoc = { ... };
    // PlantDoc.endpoint = PlantDoc.endpoint.replace(":id", params.id);
    API.sendRequest(CONSTANTS.API.plantdocument, (res) => {
      setPlantDocuments(
        res?.data?.rows.map((el, i) => ({
          ...el,
          no: i + 1,
          key: el.id,
          id: el.id,
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
    });

    API.sendRequest(CONSTANTS.API.getAllClients, (res) => {
      console.log(res);
      setClients(
        res?.data?.rows?.map((el, i) => ({
          ...el,
          no: i + 1,
          key: el.id,
          multButton: {
            Delete: {
              id: el.id,
              key: el.id,
              onClick: (key) => {
                // console.log(res, "asb");
                const deleteClient = CONSTANTS.API.deleteClient;
                deleteClient.endpoint = deleteClient.endpoint.replace(
                  ":id",
                  key
                );
                API.sendRequest(
                  deleteClient,
                  (res) => {
                    // console.log(res);
                    setClients((prev) =>
                      prev.filter((item) => item.key !== key)
                    );
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
                setId(res?.id);
                setOpenClient(true);
              },
            },
          },
        }))
      );
    });

    // setUserData(CONSTANTS.GETMe);
  }, [refresh]);
  useEffect(() => {
    API.sendRequest(CONSTANTS.API.getMe, (res) => {
      setUserData(res?.data);
    });
  }, []);
  const [form] = useForm();
  const onPasswordChange = (value) => {
    console.log(value);
    if (value.newPassword === value.conpassword) {
      delete value.conpassword;
      API.sendRequest(
        CONSTANTS.API.updatePassword,
        (res) => {
          console.log(res);
          setOpenPasswordChange(false);
        },
        value,
        "Password Updated"
      );
    } else {
      notification.error({
        message: "password and confirm password doesnt match",
      });
    }
  };
  return (
    <>
      <div className="px45 py25 mt20">
        <Col span={24} className="pt15">
          <Row className="mb30">
            <Col span={24} className="dashboard-headers mb15">
              <Row className="pb20">
                <p className="dashboard-head capitlize">Plant details</p>
              </Row>
              <Col span={24} className="dashboard-main-frame pl15 pr15 pt15">
                <Row className="mb30">
                  <Col span={24}>
                    <Row>
                      <p className="setting-tb-header pt10 pb15 capitlize">
                        Plant details
                      </p>
                    </Row>
                    <Row>
                      <p>
                        Use this page to update your contact information and
                        change your password.
                      </p>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col span={24} className="mb30">
                    {/* <CustomTable /> */}
                    <FormFields
                      formData={userData}
                      form={form}
                      // disabled
                      menu="SETTING_PLANT_DETAIL"
                      formFields={[]}
                      threeField
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={24} className="">
                    {[
                      {
                        id: 1,
                        action: () => {
                          console.log("button1");
                          form
                            .validateFields()
                            .then((values) => {
                              // form.resetFields();
                              API.sendRequest(
                                CONSTANTS.API.updatePlant,
                                () => {},
                                values,
                                "Profile Update Successfully"
                              );
                            })
                            .catch((info) => {
                              console.log("Validate Failed:", info);
                            });
                        },
                        name: "Save Changes",
                        type: "normal",
                      },
                      {
                        id: 2,
                        action: () => {
                          // console.log("button1");
                          setOpenPasswordChange(true);
                        },
                        name: "Password",
                        type: "normal",
                      },
                    ]?.map((button) => (
                      <CustomButton key={button.id} {...button} />
                    ))}
                  </Col>
                </Row>
              </Col>
            </Col>
          </Row>
        </Col>
        <ModalFormCreator
          open={openPasswordChange}
          onCreate={onPasswordChange}
          onCancel={() => {
            setOpenPasswordChange(false);
          }}
          name="Change PAssword"
          menu="SETTING_PLANT_PASSWORD"
        />
        {/* <Row className="container-main"> */}
        <ModalFormCreator
          open={openUpload}
          onCreate={onDocumentUpload}
          onCancel={() => {
            setOpenUpload(false);
          }}
          name=" NEw plant Document Upload"
          menu="DOCUMENT_EQUIPMENT_UPLOAD"
        />
        <Col span={24} className="dashboard-main-frame px15 py15 mt20">
          <Row className="mb30">
            <Col span={24} className="setting-tb-header">
              <Row>
                <p className="setting-tb-header pt10 pb15 capitlize">
                  Plant Document
                </p>
              </Row>
              <Row>
                {[
                  {
                    id: 1,
                    action: () => {
                      // console.log("button1");
                      setOpenUpload(true);
                    },
                    name: "New",
                    type: "normal",
                  },
                ]?.map((button) => (
                  <CustomButton key={button.id} {...button} />
                ))}
              </Row>
            </Col>
          </Row>
          <CustomTable name="PLANT_DOCUMENT" dataSource={plantDocuments} />
        </Col>
        {console.log(formData)}
        <ModalFormCreator
          open={openClient}
          onCreate={onClient}
          onCancel={() => {
            setOpenClient(false);
            setFormData((prev) => null);
          }}
          formData={formData || {}}
          name={`${formData ? "Edit " : "Add New "} Client`}
          menu="NEW_CLIENT"
          SubmitName={formData ? "Update " : "Submit"}
        />
        <Col span={24} className="dashboard-main-frame px15 py15 mt20">
          <Row className="mb30">
            <Col span={24} className="setting-tb-header">
              <Row>
                <p className="setting-tb-header pt10 pb15 capitlize">CLIENTS</p>
              </Row>
              <Row>
                {[
                  {
                    id: 1,
                    action: () => {
                      console.log("button1");
                      setOpenClient(true);
                    },
                    name: "New Client",
                    type: "normal",
                  },
                ]?.map((button) => (
                  <CustomButton key={button.id} {...button} />
                ))}
              </Row>
            </Col>
          </Row>
          <CustomTable name="SETTING_NEW_CLIENT" dataSource={clients} />
        </Col>
      </div>
    </>
  );
};

export default PlantDetailsPage;
