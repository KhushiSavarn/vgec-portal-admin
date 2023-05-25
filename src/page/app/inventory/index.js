import { Col, Row, notification } from "antd";
import React, { useEffect, useState } from "react";
import PageHeader from "../../../component/common/page-Header";
import ModalFormCreator from "../../../component/common/ModalFormCreator";
import useHttp from "../../../hooks/use-http";
import CONSTANTS from "../../../util/constant/CONSTANTS";
import moment from "moment";
import CustomTable from "../../../component/common/Custom-Table";
import FormWithButton from "../../../component/common/Form-with-Button";

const Inventory = () => {
  const [inventoryDisplay, setInventoryDisplay] = useState(0);
  const [openSupplyIn, setOpenSupplyIn] = useState(false);
  const [openSupplyOut, setOpenSupplyOut] = useState(false);
  const [openRequest, setOpenRequest] = useState(false);
  const [openEditRow, setOpenEditRow] = useState(false);
  const [dataOut, setDataOut] = useState([]);
  const [data, setData] = useState([]);
  const [options, setOptions] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [formIventoryData, setFormIventoryData] = useState({});
  const API = useHttp();
  const handleDelete = (key) => {
    console.log(key);
    setDataOut((prev) => prev.filter((item) => item.key !== key));
    setOptions((prev) => {
      const item = data.find((el) => el.id === key);
      return [
        ...prev,
        {
          ...item,
          ...item.productCategory,
          id: item.id,
          value: item.id,
          Label: item.productName,
        },
      ];
    });
  };
  const onCreate = (value) => {
    // console.log(value, dataOut);
    // console.log(value, "srydfdut");
    value.date = moment(value.date.$d).format("YYYY-MM-DD");
    value.products = dataOut.map((el) => ({
      id: el.id,
      quantity: el.quantity,
    }));
    API.sendRequest(
      CONSTANTS.API.createInventoryoutword,
      (res) => {
        console.log(res);
        setRefresh((prev) => !prev);
      },
      value,
      "Invetory outworded successfully"
    );
    setOpenSupplyOut(false);
  };
  const onRequestCreate = (value) => {
    console.log(value, "data");
    value.date = moment(value.date.$d).format("YYYY-MM-DD");
    setOpenRequest(false);
    API.sendRequest(
      CONSTANTS.API.purchaserequesition,
      (res) => {
        console.log(res, "purchase");
      },
      value
    );
  };
  const onInventoryInward = (value) => {
    console.log(value, "inward");
    value.date = moment(value.date.$d).format("YYYY-MM-DD");
    console.log(value, "inward3");
    API.sendRequest(
      CONSTANTS.API.inventoryCreate,
      (res) => {
        // console.log(res);
        setData((prev) => [
          ...prev,
          { ...res?.data?.productCategory, ...res?.data, key: res?.data?.id },
        ]);
        setOpenSupplyIn(false);
      },
      value,
      "inventory added"
    );
  };
  const onEditHandler = (value) => {
    console.log(value, formIventoryData);
    value.date = moment(value.date.$d).format("YYYY-MM-DD");
    const updateInventoryAPI = { ...CONSTANTS.API.inventoryUpdate };
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

  useEffect(() => {
    API.sendRequest(CONSTANTS.API.inventory, (res) => {
      // console.log(res, "inventory");
      setData(
        res?.data?.rows?.map((el) => ({
          ...el.productCategory,
          ...el,
          key: el?.id,
        }))
      );
      setOptions(
        res?.data?.rows?.map((el) => ({
          ...el,
          ...el.productCategory,
          id: el.id,
          value: el.id,
          Label: (
            <div className="flex-x space-between">
              <p>{el.productName} </p> {el.quantity}
            </div>
          ),
        }))
      );
    });
  }, [refresh]);
  useEffect(() => {
    API.sendRequest(CONSTANTS.API.maintenanceRequests, (res) => {
      //purchase mentanace id
      CONSTANTS.FORM_FIELD.PURCHASE_REQUEST_FORM[1].item[1].option =
        res?.data?.rows?.map((el) => ({
          id: el.id,
          value: el.id,
          Label: el.title,
        }));
      //supply out mentanace id
      CONSTANTS.FORM_FIELD.SUPPLY_OUT_INVENTORY[1].item[0].option =
        res?.data?.rows?.map((el) => ({
          id: el.id,
          value: el.id,
          Label: el.title,
        }));
    });
    API.sendRequest(CONSTANTS.API.getAllClients, (res) => {
      CONSTANTS.FORM_FIELD.SUPPLY_OUT_INVENTORY[0].item[0].option =
        res?.data?.rows?.map((el) => ({
          id: el.name,
          value: el.name,
          Label: el.name,
        }));
    });
    API.sendRequest(CONSTANTS.API.equipmentcategory, (res) => {
      CONSTANTS.FORM_FIELD.PURCHASE_REQUEST_FORM[2].item[1].option =
        res?.data?.rows?.map((el) => ({
          id: el.id,
          value: el.id,
          Label: el.category,
        }));
    });
    API.sendRequest(CONSTANTS.API.productCategory, (res) => {
      CONSTANTS.FORM_FIELD.SUPPLY_IN_INVENTORY[2].item[1].option =
        res?.data?.rows?.map((el) => ({
          id: el.id,
          value: el.id,
          Label: el.category,
        }));
    });
  }, []);
  CONSTANTS.FORM_FIELD.SUPPLY_OUT_INVENTORY_INNER[0].option = options;
  return (
    <Row className="container-main">
      <PageHeader
        data={{
          buttons: [
            {
              id: 1,
              action: () => {
                setOpenSupplyIn(true);
              },
              name: "Supply In",
              type: "normal",
            },
            {
              id: 2,
              action: () => {
                // setOpen(true);
                setOpenSupplyOut(true);
              },
              name: "Supply Out",
              type: "normal",
            },
            {
              id: 3,
              action: () => {
                setOpenRequest(true);
              },
              name: "Request Form",
              type: "normal",
            },
          ],
          name: "",
        }}
        search={{
          action: {
            left: () => {
              if (inventoryDisplay > 0) {
                setInventoryDisplay((prev) => prev - 10);
              }
            },
            right: () => {
              if (inventoryDisplay + 10 < data.length) {
                setInventoryDisplay((prev) => prev + 10);
              }
            },
          },
          page: {
            start: inventoryDisplay + 1,
            end:
              inventoryDisplay + 10 < data.length
                ? inventoryDisplay + 10
                : data.length,
            total: data.length,
          },
        }}
      />
      <ModalFormCreator
        open={openSupplyIn}
        onCreate={onInventoryInward}
        onCancel={() => {
          setOpenSupplyIn(false);
        }}
        name="INVENTORY FORM (INWARD)"
        menu="SUPPLY_IN_INVENTORY"
      />
      <ModalFormCreator
        open={openRequest}
        onCreate={onRequestCreate}
        onCancel={() => {
          setOpenRequest(false);
        }}
        name="PURCHASE requesition form"
        menu="PURCHASE_REQUEST_FORM"
      />
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
          const DeleteInventoryAPI = { ...CONSTANTS.API.inventoryDelete };
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
        name="INVENTORY DETAILS"
        menu="SUPPLY_IN_INVENTORY"
        formData={formIventoryData}
      />
      <ModalFormCreator
        open={openSupplyOut}
        onCreate={onCreate}
        onCancel={() => {
          setOpenSupplyOut(false);
          setDataOut([]);
        }}
        name="INVENTORY FORM (OUTWARD)"
        menu="SUPPLY_OUT_INVENTORY"
      >
        <CustomTable
          dataSource={dataOut}
          name="SUPPLY_OUT_INVENTORY_TABLE_INNER"
        />
        <FormWithButton
          menu={"SUPPLY_OUT_INVENTORY_INNER"}
          name="Add"
          onCreate={(element) => {
            const el = data.find((e) => e.id === element.productName);
            if (element.quantity > el.quantity || !element.quantity) {
              notification.error({
                message: `enter ${
                  !element.quantity ? "valid " : "less"
                }  quantity `,
              });
              return;
            }

            setOptions((prev) => prev.filter((ele) => ele.id !== el.id));
            setDataOut((prev) => [
              ...prev,
              {
                key: el.id,
                ...el,
                quantity: element.quantity,
                delete: {
                  id: el.id,
                  key: el.id,
                  onClick: handleDelete,
                },
              },
            ]);
          }}
        />
      </ModalFormCreator>
      <Col
        span={24}
        style={{
          marginBlock: "15px",
        }}
        className="container-body"
      >
        <CustomTable
          dataSource={data.slice(inventoryDisplay, inventoryDisplay + 10)}
          name="INVENTORY"
          Other={{
            onRow: (row) => ({
              onClick: () => {
                console.log("Row", row);
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

export default Inventory;
