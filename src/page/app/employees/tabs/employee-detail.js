import React, { useEffect, useState } from "react";
import Profile from "../../../../asset/image/42w.png";
import FormFields from "../../../../component/common/FormFields";
import { Avatar, Button, Col, Row, Upload } from "antd";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { useForm } from "antd/es/form/Form";
import { AiOutlineDelete } from "react-icons/ai";
import useHttp from "../../../../hooks/use-http";
import CONSTANTS from "../../../../util/constant/CONSTANTS";
import {
  ArrowLeftOutlined,
  BackwardOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const EmployeeDetails = React.memo(({ EmployeeData }) => {
  const [form] = useForm();
  const [data, setData] = useState({});
  const [fileList, setFileList] = useState([]);
  const [edit, setEdit] = useState(false);
  const API = useHttp();
  // console.log(params);
  useEffect(() => {
    setData(EmployeeData);
  }, [EmployeeData]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  console.log(fileList, "file2");

  const onPreview = async (file) => {
    console.log(file, "file1");
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  return (
    <Col span={24} className="dashboard-main-frame">
      <Row className="dashboard-body">
        <Col span={18}>
          <Row className="mb5 mt5">
            <p className="dashboard-body-title">{EmployeeData?.name}</p>
          </Row>
          <Row style={{ marginTop: "10px" }}>
            <p className="dashboard-body-sub mb5">{EmployeeData?.position}</p>
          </Row>
          <Col span={24} style={{ marginTop: "10px" }}>
            <FormFields
              formData={data}
              form={form}
              // disabled
              menu="EMPLOYEE_NEW_MODAL"
              formFields={[]}
            />
            <Row justify="end">
              <Col span={6}>
                <Button
                  onClick={() => {
                    form
                      .validateFields()
                      .then((values) => {
                        const payload = new FormData();
                        console.log(data.id);
                        delete values.address;
                        Object.keys(values).forEach((el) => {
                          payload.append(el, values[el]);
                        });

                        if (fileList.length) {
                          payload.append("image", fileList[0].originFileObj);
                        }
                        console.log(payload, "form2");
                        const APIpoint = { ...CONSTANTS.API.updatedEmployee };
                        APIpoint.endpoint = APIpoint.endpoint.replace(
                          ":id",
                          data.id
                        );
                        API.sendRequest(
                          APIpoint,
                          (res) => {
                            console.log(res, "updated");
                          },
                          payload,
                          "Update Successfully"
                        );
                      })
                      .catch((info) => {
                        console.log("Validate Failed:", info);
                      });
                  }}
                  type="primary"
                  // ghost
                  block
                >
                  Update
                </Button>
              </Col>
            </Row>
          </Col>
        </Col>
        <Col
          span={6}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {edit || !data?.image ? (
            <>
              <Row className="avtar-upload-parent">
                {/* <Col span={4}></Col>
                <Col span={12}> */}
                <Upload
                  className="avtarUpload-uploader"
                  name="avtarUpload"
                  listType="picture-circle"
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}
                  beforeUpload={() => {
                    return false;
                  }}
                >
                  {fileList.length < 1 && (
                    <div>
                      <PlusOutlined className="flex" />
                      <div
                        style={{
                          marginTop: 8,
                        }}
                      >
                        Upload
                      </div>
                    </div>
                  )}
                </Upload>
                {/* </Col> */}
              </Row>
              <Row>
                <Col span={6}>
                  {fileList.length < 1 && data?.image && (
                    <ArrowLeftOutlined
                      onClick={() => {
                        setEdit(false);
                      }}
                    />
                  )}
                </Col>
              </Row>
            </>
          ) : (
            <Row className="profile-pic-dashboard">
              <Row>
                <Avatar src={data?.image} size={140} />
              </Row>
              <Row className="edit-dashboard">
                <Row
                  justify="center"
                  align="middle"
                  style={{
                    borderRadius: "100%",
                    height: "140px",
                    width: "140px",
                  }}
                >
                  <Col span={8}></Col>
                  <Col span={12}>
                    <MdOutlineModeEditOutline
                      fontSize="25px"
                      color="white"
                      className="pointer"
                      onClick={() => {
                        console.log("got it");
                        setEdit(true);
                      }}
                    />
                  </Col>
                  {/* <Col span={8}>
                    <AiOutlineDelete
                      fontSize="25px"
                      className="pointer"
                      color="white"
                    />
                  </Col> */}
                </Row>
              </Row>
            </Row>
          )}
        </Col>
      </Row>
    </Col>
  );
});

export default EmployeeDetails;
