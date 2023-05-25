import React, { useEffect, useState } from "react";
import CustomTable from "../../../../component/common/Custom-Table";
import CustomButton from "../../../../component/common/Custom-Buttons";
import { Col, Row } from "antd";
import useHttp from "../../../../hooks/use-http";
import CONSTANTS from "../../../../util/constant/CONSTANTS";
import ModalFormCreator from "../../../../component/common/ModalFormCreator";
const PlantSetting = () => {
  const API = useHttp();
  const [equipmentCategory, setEquipmentCategory] = useState([]);
  const [inventoryCategory, setInventoryCategory] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [categoryAdd, setCategoryAdd] = useState(null);
  const [newVendor, setNewVendor] = useState(false);
  const [formData, setFormData] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const onNewVendorHandler = (value) => {
    // console.log(value, "Object");
    if (formData) {
      const updatevendorAPI = CONSTANTS.API.updatevendor;
      updatevendorAPI.endpoint = updatevendorAPI.endpoint.replace(
        ":id",
        formData.id
      );
      API.sendRequest(
        updatevendorAPI,
        (res) => {
          // console.log(res);
          setRefresh((prev) => !prev);
          setNewVendor(false);

          setFormData(null);
        },
        value
      );
      return;
    }
    API.sendRequest(
      CONSTANTS.API.createvendor,
      (res) => {
        console.log(res);
        setVendors((prev) => [
          ...prev,
          {
            ...res?.data,
            key: res?.data?.id,
            no: prev.length ? prev[prev.length - 1].no + 1 : 1,
          },
        ]);
      },
      value
    );
    setNewVendor(false);
  };
  const onCreate = (value) => {
    if (categoryAdd?.inventory) {
      if (categoryAdd?.edit) {
        const UpdateAPIEqp = {
          ...CONSTANTS.API.updateinventoryProductCategory,
        };
        UpdateAPIEqp.endpoint = UpdateAPIEqp.endpoint.replace(
          ":id",
          formData.id
        );
        API.sendRequest(
          UpdateAPIEqp,
          (res) => {
            console.log(res);
            setRefresh((prev) => !prev);
            setCategoryAdd(null);
            setFormData(null);
          },
          value
        );
        return;
      }
      API.sendRequest(
        CONSTANTS.API.addequipmentProductCategory,
        (res) => {
          setEquipmentCategory((prev) => [
            ...prev,
            {
              ...res?.data,
              key: res?.data.id,
              no: prev.length ? prev[prev.length - 1].no + 1 : 1,
              multButton: {
                Delete: {
                  id: res?.data.id,
                  key: res?.data.id,
                  onClick: handleDeleteEquipment,
                },
                Edit: {
                  ...res?.data,
                  key: res?.data.id,
                  onClick: (res) => {
                    console.log(res, "edit");
                  },
                },
              },
            },
          ]);
        },
        value
      );
    } else {
      if (categoryAdd?.edit) {
        const UpdateAPIInv = {
          ...CONSTANTS.API.updateequipmentProductCategory,
        };
        UpdateAPIInv.endpoint = UpdateAPIInv.endpoint.replace(
          ":id",
          formData.id
        );
        API.sendRequest(
          UpdateAPIInv,
          (res) => {
            console.log(res);
            setRefresh((prev) => !prev);
            setCategoryAdd(null);
            setFormData(null);
          },
          value
        );
        return;
      }
      API.sendRequest(
        CONSTANTS.API.addinventoryProductCategory,
        (res) => {
          setInventoryCategory((prev) => [
            ...prev,
            {
              ...res?.data,
              key: res?.data.id,
              no: prev.length ? prev[prev.length - 1].no + 1 : 1,
              multButton: {
                Delete: {
                  id: res?.data.id,
                  key: res?.data.id,
                  onClick: handleDeleteInventory,
                },
                Edit: {
                  ...res?.data,
                  key: res?.data.id,
                  onClick: (res) => {
                    console.log(res, "edit");
                  },
                },
              },
            },
          ]);
        },
        value
      );
    }
    setCategoryAdd(null);
    setFormData(null);
  };
  const handleDeleteInventory = (key) => {
    const DeletAPIInv = { ...CONSTANTS.API.deleteinventoryProductCategory };
    DeletAPIInv.endpoint = DeletAPIInv.endpoint.replace(":id", key);
    API.sendRequest(
      DeletAPIInv,
      (res) => {
        console.log("object Delete", res);
        setInventoryCategory((prev) => prev.filter((item) => item.key !== key));
      },
      "",
      "Deleted Inventory category Successfully"
    );
  };
  const handleDeleteEquipment = (key) => {
    const DeletAPIEqp = {
      ...CONSTANTS.API.deleteequipmentProductCategory,
    };
    DeletAPIEqp.endpoint = DeletAPIEqp.endpoint.replace(":id", key);
    API.sendRequest(
      DeletAPIEqp,
      (res) => {
        console.log("object Delete", res);
        setEquipmentCategory((prev) => prev.filter((item) => item.key !== key));
      },
      "",
      "Deleted Equipment category Successfully"
    );
  };
  useEffect(() => {
    API.sendRequest(CONSTANTS.API.equipmentProductCategory, (res) => {
      setEquipmentCategory(
        res?.data?.rows?.map((el, i) => ({
          ...el,
          key: el.id,
          no: i + 1,
          multButton: {
            Delete: {
              id: el.id,
              key: el.id,
              onClick: handleDeleteEquipment,
            },
            Edit: {
              ...el,
              key: el.id,
              onClick: (res) => {
                console.log(res, "edit");
                setFormData(res);
                setCategoryAdd({ inventory: false, edit: true });
              },
            },
          },
        }))
      );
    });
    API.sendRequest(CONSTANTS.API.inventoryProductCategory, (res) => {
      setInventoryCategory(
        res?.data?.rows?.map((el, i) => ({
          ...el,
          key: el.id,
          no: i + 1,
          multButton: {
            Delete: {
              id: el.id,
              key: el.id,
              onClick: handleDeleteInventory,
            },
            Edit: {
              ...el,
              key: el.id,
              onClick: (res) => {
                console.log(res, "edit");
                setFormData(res);
                setCategoryAdd({ inventory: true, edit: true });
              },
            },
          },
        }))
      );
    });
    API.sendRequest(CONSTANTS.API.getallvendors, (res) => {
      setVendors(
        res?.data?.rows?.map((el, i) => ({
          ...el,
          key: el.id,
          no: i + 1,
          multButton: {
            Delete: {
              id: el.id,
              key: el.id,
              onClick: (key) => {
                const DeletVendorAPI = { ...CONSTANTS.API.deletevendor };
                DeletVendorAPI.endpoint = DeletVendorAPI.endpoint.replace(
                  ":id",
                  key
                );
                API.sendRequest(
                  DeletVendorAPI,
                  (res) => {
                    // console.log("object Delete", res);
                    setVendors((prev) =>
                      prev.filter((item) => item.key !== key)
                    );
                  },
                  "",
                  "Deleted vendor Successfully"
                );
              },
            },
            Edit: {
              ...el,
              key: el.id,
              onClick: (res) => {
                console.log(res, "edit");
                setFormData(res);
                // setCategoryAdd({ inventory: true, edit: true });
                setNewVendor(true);
              },
            },
          },
        }))
      );
    });
  }, [refresh]);
  // console.log(formData, "sdtfyguioc");
  return (
    <>
      <div className="px45 py25 mt20">
        <Col span={24} className="pt15">
          <Row className="mb10">
            <Col span={24} className="dashboard-headers ">
              <Row className="pb20">
                <p className="dashboard-head capitlize">Setting</p>
              </Row>
            </Col>
          </Row>
        </Col>
        <ModalFormCreator
          open={categoryAdd !== null}
          onCreate={onCreate}
          onCancel={() => {
            console.log("object");
            setCategoryAdd(null);
            setFormData(null);
          }}
          name={`${categoryAdd?.edit ? "Edit " : "Add New "} ${
            categoryAdd?.inventory ? "Inventory" : "Equipment"
          } Category`}
          formData={formData || {}}
          menu="SETTING_CATEGORY_FORM"
          SubmitName={categoryAdd?.edit ? "Update " : "Submit"}
        />
        <Col span={24} className="dashboard-main-frame px15 py15 pt15">
          <Row className="mb10">
            <Col span={24} className="setting-tb-header">
              <Row>
                <p className="setting-tb-header pt10 pb15 capitlize">
                  INVENTORY PRODUCT CATEGORIES
                </p>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span={24} className="mb10">
              <CustomTable
                name="SETTING_CATEGORY_TABLE"
                dataSource={inventoryCategory}
              />
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              {[
                {
                  id: 1,
                  action: () => {
                    setCategoryAdd({ inventory: false });
                  },
                  name: "Add New Equipment Category",
                  type: "normal",
                },
              ]?.map((button) => (
                <CustomButton
                  key={button.id}
                  {...button}
                  ButtonDefault={{ block: true, ghost: true }}
                />
              ))}
            </Col>
          </Row>
        </Col>
        <Col span={24} className="dashboard-main-frame px15 py15 mt20">
          <Row className="mb10">
            <Col span={24} className="setting-tb-header">
              <Row>
                <p className="setting-tb-header pt10 pb15 capitlize">
                  EQUIPMENT CATEGORIES
                </p>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span={24} className="mb10">
              <CustomTable
                name="SETTING_CATEGORY_TABLE"
                dataSource={equipmentCategory}
              />
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              {[
                {
                  id: 1,
                  action: () => {
                    console.log("button1");
                    setCategoryAdd({ inventory: true });
                  },
                  name: "Add New Inventory Category",
                  type: "normal",
                },
              ]?.map((button) => (
                <CustomButton
                  key={button.id}
                  {...button}
                  ButtonDefault={{ block: true, ghost: true }}
                />
              ))}
            </Col>
          </Row>
        </Col>
        <ModalFormCreator
          open={newVendor}
          onCreate={onNewVendorHandler}
          onCancel={() => {
            setNewVendor(false);
            setFormData(null);
          }}
          formData={formData || {}}
          name={`${formData ? "Edit" : "New"} vendor ${
            !formData ? " REGISTRATION form" : ""
          }`}
          SubmitName={formData ? "Update " : "Submit"}
          menu="NEW_VENDOR_REGISTRATION"
        />
        <Col span={24} className="dashboard-main-frame px15 py15 mt20">
          <Row className="mb30">
            <Col span={24} className="setting-tb-header">
              <Row>
                <p className="setting-tb-header pt10 pb15 capitlize">VENDORS</p>
              </Row>
              <Row>
                {[
                  {
                    id: 1,
                    action: () => {
                      // console.log("button1");
                      setNewVendor(true);
                    },
                    name: "New Vendor",
                    type: "normal",
                  },
                ]?.map((button) => (
                  <CustomButton key={button.id} {...button} />
                ))}
              </Row>
            </Col>
          </Row>
          <CustomTable name="SETTING_VENDOR" dataSource={vendors} />
        </Col>
      </div>
    </>
  );
};

export default PlantSetting;
