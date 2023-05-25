import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import PageHeader from "../../../../component/common/page-Header";
import { DownloadOutlined } from "@ant-design/icons";
import InventoryCard from "../../../../component/card/InventoryCard";
import ModalFormCreator from "../../../../component/common/ModalFormCreator";
import useHttp from "../../../../hooks/use-http";
import CONSTANTS from "../../../../util/constant/CONSTANTS";
const Equipment = () => {
  const [open, setOpen] = useState(false);
  const API = useHttp();
  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    API.sendRequest(
      CONSTANTS.API.equipment,
      (res) => {
        console.log(res, "add");
      },
      values
    );
    setOpen(false);
  };
  const [inventoryDataArr, setInventoryDataArr] = useState([]);
  const [inventoryDisplay, setInventoryDisplay] = useState(0);
  useEffect(() => {
    API.sendRequest(CONSTANTS.API.AllEquipment, (res) => {
      console.log(res?.data?.rows);
      setInventoryDataArr(
        res?.data?.rows.map((el) => (
          <Col key={el.id}>
            <InventoryCard {...el} />
          </Col>
        ))
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
      <PageHeader
        data={{
          buttons: [
            {
              id: 1,
              action: () => {
                console.log("button1");
                setOpen(true);
              },
              name: "New",
            },
            {
              id: 2,
              action: () => {
                console.log("button3");
              },
              icon: <DownloadOutlined />,
              type: "icon",
            },
          ],
          name: "Equipment",
        }}
        search={{
          action: {
            left: () => {
              if (inventoryDisplay > 0) {
                setInventoryDisplay((prev) => prev - 9);
              }
            },
            right: () => {
              if (inventoryDisplay + 9 < inventoryDataArr.length) {
                setInventoryDisplay((prev) => prev + 9);
              }
            },
          },
          page: {
            start: inventoryDataArr.length
              ? inventoryDisplay + 1
              : inventoryDataArr.length,
            end:
              inventoryDisplay + 9 < inventoryDataArr.length
                ? inventoryDisplay + 9
                : inventoryDataArr.length,
            total: inventoryDataArr.length,
          },
        }}
      />
      <ModalFormCreator
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
        name="New EQUIPMENT FORM"
        menu="NEW_EQUIPMENT_FORM"
      />
      <Col span={24} className="container-body">
        <Row
          justify="center"
          gutter={[36, 32]}
          style={{ marginBlock: "15px", justifyContent: "start" }}
        >
          {inventoryDataArr.slice(inventoryDisplay, inventoryDisplay + 9)}
        </Row>
      </Col>
    </Row>
  );
};

export default Equipment;
