import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import PageHeader from "../../../../component/common/page-Header";
import { DownloadOutlined } from "@ant-design/icons";
import moment from "moment";
import CustomTable from "../../../../component/common/Custom-Table";
import CONSTANTS from "../../../../util/constant/CONSTANTS";
import useHttp from "../../../../hooks/use-http";
const MoveHistory = () => {
  const [data, setData] = useState([]);
  const [moveDisplay, setMoveDisplay] = useState(0);
  const API = useHttp();
  useEffect(() => {
    API.sendRequest(CONSTANTS.API.movehistory, (res) => {
      setData(
        res?.data?.map((el, i) => ({
          ...el,
          key: i + el?.product,
        }))
      );
    });
    setMoveDisplay(0);
  }, []);
  const CSVData = [];
  CSVData[0] = CONSTANTS.TABLE.MOVE_HISTORY.map((el) => el.title);
  data.map((item, index) => {
    CSVData[index + 1] = CONSTANTS.TABLE.MOVE_HISTORY.map(
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
                console.log("button3");
                console.log("download", CSVData);
              },
              icon: <DownloadOutlined />,
              data: CSVData,
              type: "linkicon",
            },
          ],
          name: "Move History",
        }}
        search={{
          action: {
            left: () => {
              if (moveDisplay > 0) {
                setMoveDisplay((prev) => prev - 10);
              }
            },
            right: () => {
              if (moveDisplay + 10 < data.length) {
                setMoveDisplay((prev) => prev + 10);
              }
            },
          },
          page: {
            start: moveDisplay + 1,
            end:
              moveDisplay + 10 < data.length ? moveDisplay + 10 : data.length,
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
        <CustomTable
          dataSource={data.slice(moveDisplay, moveDisplay + 10)}
          name="MOVE_HISTORY"
        />
      </Col>
    </Row>
  );
};

export default MoveHistory;
