import React, { useEffect, useState } from "react";
import { Col, Row, notification } from "antd";
import PageHeader from "../../../../component/common/page-Header";
import { DownloadOutlined } from "@ant-design/icons";
import CustomTable from "../../../../component/common/Custom-Table";
import CONSTANTS from "../../../../util/constant/CONSTANTS";
import useHttp from "../../../../hooks/use-http";
import ModalFormCreator from "../../../../component/common/ModalFormCreator";
import moment from "moment";
// import CustomButton from "../../../../component/common/Custom-Buttons";
import FormWithButton from "../../../../component/common/Form-with-Button";

const Transfer = () => {
  const [data, setData] = useState([]);
  const [transferDisplay, setTransferDisplay] = useState(0);
  const [onTransfer, setOnTransfer] = useState(false);
  const [dataInventory, setDataInventory] = useState([]);
  // const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [options, setOptions] = useState([]);
  const [optionData, setOptionData] = useState([]);
  const [openEditRow, setOpenEditRow] = useState(false);
  const [formIventoryData, setFormIventoryData] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);

  const API = useHttp();
  const handleDelete = (key) => {
    console.log(key);
    setDataInventory((prev) => prev.filter((item) => item.key !== key));
    setOptions((prev) => {
      const item = optionData.find((el) => el.id === key);
      return [
        {
          ...item,
          ...item.productCategory,
          id: item.id,
          value: item.id,
          Label: item.productName,
        },
        ...prev,
      ];
    });
  };
  const onInventoryTransfer = (value) => {
    // console.log(dataInventory);
    value.date = moment(value.date.$d).format("YYYY-MM-DD");
    value.products = dataInventory.map((el) => ({
      id: el.id,
      quantity: el.quantity,
    }));
    // console.log(value);
    API.sendRequest(
      CONSTANTS.API.createInventoryoutword,
      (res) => {
        // console.log(res);
        setRefresh((prev) => !prev);
      },
      value,
      "Invetory outworded successfully"
    );
    setOnTransfer(false);
  };
  useEffect(() => {
    API.sendRequest(CONSTANTS.API.TransferInventory, (res) => {
      // console.log(res);
      setData(
        res?.data?.map((el, i) => ({
          ...el,
          ...el.inventoryInward,
          key: i,
        }))
      );
    });
    setTransferDisplay(0);
  }, [refresh]);
  useEffect(() => {
    API.sendRequest(CONSTANTS.API.inventory, (res) => {
      // console.log(res, "inventory");
      setOptionData(
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
          Label: el.productName,
        }))
      );
    });

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
      CONSTANTS.FORM_FIELD.TRANSFER_FORM_TABLE[0].item[0].option =
        res?.data?.rows?.map((el) => ({
          id: el.name,
          value: el.name,
          Label: el.name,
        }));
    });
  }, []);
  CONSTANTS.FORM_FIELD.SUPPLY_OUT_INVENTORY_INNER[0].option = options;
  const CSVData = [];
  CSVData[0] = CONSTANTS.TABLE.TRANSFER.map((el) => el.title);
  data.map((item, index) => {
    CSVData[index + 1] = CONSTANTS.TABLE.TRANSFER.map(
      (el) => item[el.dataIndex]
    );
    return 0;
  });
  // console.log(options, "option");
  /***
   *
   * Row click
   */
  const onEditHandler = (value) => {
    // console.log(value, formIventoryData);
    value.date = moment(value.date.$d).format("YYYY-MM-DD");
    const updateInventoryAPI = { ...CONSTANTS.API.TransferUpdate };
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

  return (
    <Row className="container-main">
      <ModalFormCreator
        open={onTransfer}
        onCreate={onInventoryTransfer}
        onCancel={() => {
          setOnTransfer(false);
          setDataInventory([]);
        }}
        name="INVENTORY TRANSFER FORM"
        menu="SUPPLY_OUT_INVENTORY"
      >
        <CustomTable
          dataSource={dataInventory}
          name="SUPPLY_OUT_INVENTORY_TABLE_INNER"
          // onChange={(selectedRowKeys, selectedRows) => {
          //   setProducts(selectedRows);
          // }}
        />
        <FormWithButton
          menu={"SUPPLY_OUT_INVENTORY_INNER"}
          name="Add"
          onCreate={(element) => {
            // console.log(element);
            // console.log(optionData);
            const el = optionData.find((e) => e.id === element.productName);
            // console.log(el);
            if (element.quantity > el?.quantity || !element?.quantity) {
              notification.error({
                message: `enter ${
                  !element.quantity ? "valid " : "less"
                }  quantity `,
              });
              return;
            }
            // console.log(el);

            setOptions((prev) =>
              prev.filter((ele) => ele.id !== element.productName)
            );
            setDataInventory((prev) => [
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
          name: "Transfer",
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
              ...CONSTANTS.API.TransferDelete,
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
          name="TRANSFER DETAILS"
          menu="TRANSFER_FORM_TABLE"
          formData={formIventoryData}
        />
        <CustomTable
          dataSource={data.slice(transferDisplay, transferDisplay + 10)}
          name="TRANSFER"
          extraclass="pointer"
          Other={{
            onRow: (row) => ({
              onClick: () => {
                console.log("Row", row);
                // delete row.supportingDocs;
                setFormIventoryData({ ...row.employee, ...row });
                setOpenEditRow(true);
              },
            }),
          }}
        />
      </Col>
    </Row>
  );
};

export default Transfer;
