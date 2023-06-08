import React, { useEffect, useState } from "react";
import { Button, Card, Col, Image, Row, Spin } from "antd";
import { useParams } from "react-router-dom";
import { apiGenerator } from "../../../util/functions";
import CONSTANTS from "../../../util/constant/CONSTANTS";
import useHttp from "../../../hooks/use-http";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import imageSrc from "../../../asset/image/image 2.png";
import pan from "../../../asset/image/no image.png";
import dayjs from "dayjs";

const RequestAboutInfo = () => {
  const [info, SetInfo] = useState({});
  const { id } = useParams();
  const api = useHttp();

  console.log(info);

  useEffect(() => {
    const INFO_API = apiGenerator(CONSTANTS.API.getOneClubRequest, {
      requestId: id,
    });
    api.sendRequest(INFO_API, (res) => {
      console.log(res?.data?.club);
      SetInfo({
        DOB:
          dayjs(res?.data?.club?.ownerDOB).format("MMM DD, YYYY") ||
          "Nov 12, 2003",
        mobile: res?.data?.club?.mobile || "0987654321",
        name: res?.data?.club?.name || "Indigo XP",
        bio: res?.data?.club?.bio || "Bio of Club",
        ownerName: res?.data?.club?.ownerName || "John Deo",
        email: res?.data?.club?.email || "test@gmail.com",
        website: res?.data?.club?.website || "bash.com",
        type: res?.data?.club?.type || "A00EE45",
        pinCode: res?.data?.club?.pinCode || "123456",
        address: res?.data?.club?.address || "surat",
        landMark: res?.data?.club?.landMark || "landMark",
        GST: res?.data?.club?.GST || "123456",
        PAN: res?.data?.club?.PAN || "A00EE45",
        bancAccHolderName: res?.data?.club?.bancAccHolderName || "John",
        bancAccNo: res?.data?.club?.bancAccNo || "123456789",
        bancBranch: res?.data?.club?.bancBranch || "Bhestan",
        IFSC: res?.data?.club?.IFSC || "AAAA00000000",
        image: res?.data?.club?.image || imageSrc,
        aadhaarFile: res?.data?.club?.aadhaarFile || pan,
        panFile: res?.data?.club?.panFile || pan,
      });
    });
  }, []);

  return (
    <>
      {api.isLoading ? (
        <Spin className="mt-16" tip="Loading" size="large">
          <div className="content" />
        </Spin>
      ) : (
        <div>
          <div className="my-5">
            <Row gutter={[16, 16]}>
              <Col span={14} xs={24} sm={24} md={24} lg={7} xl={7}>
                <Card className="h-40">
                  <div>
                    <div className="flex ml-5 mt-3">
                      <Image
                        width={80}
                        height={80}
                        className="rounded-full"
                        preview={false}
                        src={info?.image}
                        alt="Images is Not Availabel"
                      />
                      <p className="font-bold mt-7 px-3 text-2xl">
                        {info?.name}
                      </p>
                    </div>
                  </div>
                </Card>
              </Col>
              <Col span={16}>
                <div className="float-right mt-20">
                  <Button type="primary" danger className="mx-3">
                    <CloseOutlined /> Reject
                  </Button>
                  <Button>
                    <CheckOutlined />
                    Approve
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
          <div>
            <Card>
              <Row>
                <Col span={16}>
                  <p className="font-bold text-2xl">About Info</p>
                  <div className="mt-3 flex ml-5">
                    <p className="font-semibold text-slate-400 text-base">
                      Name
                    </p>
                    <p className="font-bold text-base">
                      &nbsp;: {info?.ownerName}
                    </p>
                  </div>
                  <div className="flex ml-5">
                    <p className="font-semibold text-slate-400 text-base">
                      Bio
                    </p>
                    <p className="font-bold text-base">&nbsp;: {info?.bio}</p>
                  </div>
                  <div className="flex ml-5">
                    <p className="font-semibold text-slate-400 text-base">
                      Date of birth
                    </p>
                    <p className="font-bold text-base">&nbsp;: {info?.DOB}</p>
                  </div>
                  <div className="flex ml-5">
                    <p className="font-semibold text-slate-400 text-base">
                      Mobile Number
                    </p>
                    <p className="font-bold text-base">
                      &nbsp;: {info?.mobile}
                    </p>
                  </div>

                  <div className="flex ml-5">
                    <p className="font-semibold text-slate-400 text-base">
                      Email
                    </p>
                    <p className="font-bold text-base">&nbsp;: {info?.email}</p>
                  </div>
                  <div className="flex ml-5">
                    <p className="font-semibold text-slate-400 text-base">
                      Website
                    </p>
                    <p className="font-bold text-base">
                      &nbsp;: {info?.website}
                    </p>
                  </div>
                  <div className="flex ml-5">
                    <p className="font-semibold text-slate-400 text-base">
                      Type
                    </p>
                    <p className="font-bold text-base">&nbsp;: {info?.type}</p>
                  </div>
                  <div className="flex ml-5">
                    <p className="font-semibold text-slate-400 text-base">
                      Address
                    </p>
                    <p className="font-bold text-base">
                      &nbsp;: {info?.address}
                    </p>
                  </div>
                  <div className="flex ml-5">
                    <p className="font-semibold text-slate-400 text-base">
                      Pin Code
                    </p>
                    <p className="font-bold text-base">
                      &nbsp;: {info?.pinCode}
                    </p>
                  </div>
                  <div className="flex ml-5">
                    <p className="font-semibold text-slate-400 text-base">
                      Landmark
                    </p>
                    <p className="font-bold text-base">
                      &nbsp;: {info?.landMark}
                    </p>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="flex ml-5">
                    <p className="font-semibold text-slate-400 text-base">
                      GST Number
                    </p>
                    <p className="font-bold text-base">&nbsp;: {info?.GST}</p>
                  </div>
                  <div className="flex ml-5">
                    <p className="font-semibold text-slate-400 text-base">
                      Pan Number
                    </p>
                    <p className="font-bold text-base">&nbsp;: {info?.PAN}</p>
                  </div>
                  <div className="flex ml-5">
                    <p className="font-semibold text-slate-400 text-base">
                      Bank account holder Name
                    </p>
                    <p className="font-bold text-base">
                      &nbsp;: {info?.bancAccHolderName}
                    </p>
                  </div>
                  <div className="flex ml-5">
                    <p className="font-semibold text-slate-400 text-base">
                      Branch bank Account
                    </p>
                    <p className="font-bold text-base">
                      &nbsp;: {info?.bancBranch}
                    </p>
                  </div>
                  <div className="flex ml-5">
                    <p className="font-semibold text-slate-400 text-base">
                      IFSC Code
                    </p>
                    <p className="font-bold text-base">&nbsp;: {info?.IFSC}</p>
                  </div>
                </Col>
              </Row>
              <Row className="mt-5">
                <Col span={8}>
                  <h2 className="font-bold">Pan Card</h2>
                  <Image
                    src={info?.panFile}
                    width={300}
                    height={200}
                    className="rounded-2xl"
                  />
                </Col>
                <Col span={5}>
                  <h2 className="font-bold">Aadhar Card</h2>
                  <Image
                    src={info?.aadhaarFile}
                    width={300}
                    height={200}
                    className="rounded-2xl"
                  />
                </Col>
              </Row>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default RequestAboutInfo;
