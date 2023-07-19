import Eye from "../../asset/image/eye.png";
import { Button, Image, Input, Popconfirm, Select, Switch } from "antd";
import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  EyeOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
} from "@ant-design/icons";
import logo from "../../asset/logos/icon.svg";
import moment from "moment/moment";

const alphanumericSort = (a, b, value) => {
  if (isNaN(parseInt(a[value]))) {
    return a[value]?.localeCompare(b[value]);
  }
  return a[value] - b[value];
};

const RenderActionButtons = (value) => {
  let ButtonsArray = [];
  if (value?.Delete) {
    ButtonsArray.push(RenderDeleteButton(value.Delete));
  }
  if (value?.Edit) {
    ButtonsArray.push(RenderEditButton(value.Edit));
  }
  if (value?.View) {
    ButtonsArray.push(RenderViewButton(value.View));
  }
  if (value?.Download) {
    ButtonsArray.push(RenderDownloadButton(value.Download));
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        // paddingRight: "5px",
      }}
    >
      {ButtonsArray?.map((el, i) => (
        <div key={i}>{el}</div>
      ))}
    </div>
  );
};

// Delete Button
const RenderDeleteButton = (value) => {
  const { id, onClick } = value;
  return (
    <Popconfirm title="Sure to delete?" onConfirm={() => onClick(id)}>
      <Button type="primary">
        {value?.name ? value?.name : <DeleteOutlined />}
      </Button>
      {/* <Button type="primary">{value?.name}</Button> */}
    </Popconfirm>
  );
};

// Delete button without confimation model
const RenderDeleteWithoutConfirmation = (value) => {
  return (
    <Popconfirm
      title="Sure to delete?"
      open={false}
      onOpenChange={() => value?.onClick(value.key)}
      onConfirm={() => value?.onClick(value.key)}
    >
      {value?.name ? (
        value?.name
      ) : (
        <DeleteOutlined style={{ color: "black" }} />
      )}
    </Popconfirm>
  );
};
// Download Button
const RenderDownloadButton = (value) => {
  return (
    <DownloadOutlined
      onClick={() => {
        window.open(value, "Download");
      }}
    />
  );
};

// Edit Button
const RenderEditButton = (value) => {
  const { id, onClick } = value;
  return (
    <Button
      type="primary"
      onClick={() => {
        onClick(id);
      }}
    >
      <EditOutlined />
    </Button>
  );
};

// View Image Button
const RenderViewImageButton = (value) => {
  return (
    <Image
      width={20}
      src={Eye}
      className="pointer"
      preview={{
        mask: false,
        src: value,
      }}
    />
  );
};

// Render Accept and Reject Button
const RenderAcceptRejectButton = (value) => {
  const { id, onAccept, onReject } = value;

  return (
    <div>
      <Popconfirm
        placement="top"
        title={"Are you sure to Accept this request?"}
        // description={description}
        onConfirm={() => {
          onAccept(id);
        }}
        okText="Yes"
        cancelText="No"
      >
        <Button style={{ backgroundColor: "#52c41a" }}>
          <CheckCircleTwoTone twoToneColor="#52c41a" />
        </Button>
      </Popconfirm>
      <Popconfirm
        placement="top"
        title={"Are you sure to Reject this request?"}
        // description={description}
        onConfirm={() => {
          onReject(id);
        }}
        okText="Yes"
        cancelText="No"
      >
        <Button className="ml-2 bg-red-600">
          <CloseCircleTwoTone twoToneColor="#dc2626" />
        </Button>
      </Popconfirm>
    </div>
  );
};

// Render View Button
const RenderViewButton = (value) => {
  const { id, onClick } = value;
  return (
    <Button
      onClick={() => {
        onClick(id);
      }}
      type="primary"
    >
      <EyeOutlined
        onClick={() => {
          onClick(id);
        }}
      />
    </Button>
  );
};

// Render Images
const ImageRanders = (value) => {
  let imageSrc = value;
  if (!imageSrc) {
    imageSrc = logo;
  }
  return (
    <div>
      <Image
        width={50}
        height={50}
        className="rounded-full object-cover"
        src={imageSrc}
        alt={value}
      />
    </div>
  );
};

// Toggle Button
const RenderToggleButton = (value) => {
  const { checked, id, onClick } = value;
  return (
    <div>
      <Switch
        onChange={() => {
          onClick(id, checked);
        }}
        checked={!checked}
      />
    </div>
  );
};

// Checkbox render
const RenderCheckbox = (value) => {
  const { checked, id, onClick } = value;
  return (
    <div>
      <Input
        type="checkbox"
        checked={!checked}
        onChange={() => {
          onClick(id, checked);
        }}
      />
    </div>
  );
};

export const loginRoot = "/";
export const appRoot = "/app";
// export const ROUTES = {
//   FORGOT_PASSWORD: "/forgot-password",
//   DASHBOARD: "/dashboard",
//   INVENTORY: "/inventory",
//   INVENTORY_DETAILS: "/details",
//   INVENTORY_MOVEHISTORY: "/movehistory",
//   INVENTORY_EQUIPMENT: "/equipment",
//   INVENTORY_EQUIPMENT_DETAILS: "/equipment/:eid/:id",
//   INVENTORY_TRANSFER: "/transfer",
//   INVENTORY_PURCHASE: "/purchase",
//   EXPENSES: "/expenses",
//   EXPENSES_DETAIL: "/detail",
//   EXPENSES_VEHICAL: "/vehical",
//   MAINTENANCE: "/maintenance",
//   EMPLOYEE: "/employee",
//   EMPLOYEE_DETAILS: "/employee/:eid/:id",
//   LOGBOOK: "/logBook",
//   LOGBOOK_LOG: "/log",
//   LOGBOOK_ABTMETER: "/ABTMeter",
//   LOGBOOK_CLEANLOG: "/cleaningLog",
//   PLANTDETAILS: "/plantDetails",
//   PLANTDETAILS_DETAILS: "/details",
//   PLANTDETAILS_OMChecklist: "/OMChecklist",
//   PLANTDETAILS_SETTING: "/setting",
// };

const CONSTANTS = {
  BASE_URL: "http://20.244.39.211/api/v1",
  GETMe: null,
  TABLE: {
    USERS: [
      {
        title: "NO.",
        dataIndex: "no",
        sorter: (a, b) => alphanumericSort(a, b, "no"),
      },
      {
        title: "View",
        dataIndex: "view",
        render: RenderViewButton,
        // sorter: (a, b) => alphanumericSort(a, b, "no"),
      },
      {
        title: "Profile",
        dataIndex: "profilePic",
        render: ImageRanders,
        // sorter: (a, b) => alphanumericSort(a, b, "no"),
      },
      {
        title: "Name",
        dataIndex: "name",
        sorter: (a, b) => alphanumericSort(a, b, "no"),
      },
      {
        title: "Mobile No.",
        dataIndex: "mobile",
        sorter: (a, b) => alphanumericSort(a, b, "no"),
      },
      {
        title: "Referral Code",
        dataIndex: "myReferralCode",
        sorter: (a, b) => alphanumericSort(a, b, "no"),
      },
      {
        title: "Username",
        dataIndex: "userName",
        sorter: (a, b) => alphanumericSort(a, b, "no"),
      },
      {
        title: "Date of birth",
        dataIndex: "dob",
        sorter: (a, b) => alphanumericSort(a, b, "no"),
      },
      {
        title: "Private account",
        dataIndex: "checkbox",
        render: RenderCheckbox,
        // sorter: (a, b) => alphanumericSort(a, b, "no"),
      },
      // {
      //   title: "Block User",
      //   dataIndex: "toggle",
      //   render: RenderDeleteButton,
      //   // sorter: (a, b) => alphanumericSort(a, b, "no"),
      // },
      {
        title: "Block User",
        dataIndex: "toggle",
        render: RenderToggleButton,
        // sorter: (a, b) => alphanumericSort(a, b, "no"),
      },

      { title: "Action", dataIndex: "delete", render: RenderDeleteButton },
    ],
    USERS_BOOKING: [
      {
        title: "NO.",
        dataIndex: "no",
        sorter: (a, b) => alphanumericSort(a, b, "no"),
      },
      ,
      {
        title: "Image",
        dataIndex: "profilePic",
        render: ImageRanders,
        // sorter: (a, b) => alphanumericSort(a, b, "no"),
      },
      {
        title: "Club Name",
        dataIndex: "club",
        sorter: (a, b) => alphanumericSort(a, b, "no"),
      },
      {
        title: "Event Name",
        dataIndex: "event",
        sorter: (a, b) => alphanumericSort(a, b, "no"),
      },
      {
        title: "Date & Time",
        dataIndex: "date",
        sorter: (a, b) => alphanumericSort(a, b, "no"),
      },
      {
        title: "Entries",
        dataIndex: "entries",
        sorter: (a, b) => alphanumericSort(a, b, "no"),
      },
      {
        title: "Total Amount",
        dataIndex: "total",
        sorter: (a, b) => alphanumericSort(a, b, "no"),
      },
      {
        title: "Address",
        dataIndex: "address",
        sorter: (a, b) => alphanumericSort(a, b, "no"),
      },
      {
        title: "Invoice",
        dataIndex: "invoice",
        render: RenderDownloadButton,
      },
    ],
    USERS_CAR_VALET: [
      {
        title: "NO.",
        dataIndex: "no",
        sorter: (a, b) => alphanumericSort(a, b, "no"),
      },
      ,
      {
        title: "Image",
        dataIndex: "profilePic",
        render: ImageRanders,
        // sorter: (a, b) => alphanumericSort(a, b, "no"),
      },
      {
        title: "Car Company",
        dataIndex: "company",
        sorter: (a, b) => alphanumericSort(a, b, "no"),
      },
      {
        title: "Car Model",
        dataIndex: "model",
        sorter: (a, b) => alphanumericSort(a, b, "no"),
      },
      {
        title: "Car Number",
        dataIndex: "number",
        sorter: (a, b) => alphanumericSort(a, b, "no"),
      },
    ],
    USERS_CHAT_HISTORY: [
      {
        title: "NO.",
        dataIndex: "no",
        sorter: (a, b) => alphanumericSort(a, b, "no"),
      },

      {
        title: "Image",
        dataIndex: "profilePic",
        render: ImageRanders,
        // sorter: (a, b) => alphanumericSort(a, b, "no"),
      },
      {
        title: "Name",
        dataIndex: "name",
        sorter: (a, b) => alphanumericSort(a, b, "no"),
      },

      {
        title: "Date & Time",
        dataIndex: "date",
        sorter: (a, b) => alphanumericSort(a, b, "no"),
      },
      {
        title: "Chat View",
        dataIndex: "view",
        render: RenderViewButton,
        // sorter: (a, b) => alphanumericSort(a, b, "no"),
      },
    ],
    USERS_POST: [
      {
        title: "NO.",
        dataIndex: "no",
        sorter: (a, b) => alphanumericSort(a, b, "no"),
      },

      {
        title: "Image",
        dataIndex: "profilePic",
        render: ImageRanders,
        // sorter: (a, b) => alphanumericSort(a, b, "no"),
      },

      {
        title: "Date & Time",
        dataIndex: "date",
        sorter: (a, b) => alphanumericSort(a, b, "no"),
      },
      {
        title: "Likes",
        dataIndex: "likes",
        sorter: (a, b) => alphanumericSort(a, b, "no"),
      },
      {
        title: "Comment",
        dataIndex: "comment",
        sorter: (a, b) => alphanumericSort(a, b, "no"),
      },
      {
        title: "Caption",
        dataIndex: "caption",
        sorter: (a, b) => alphanumericSort(a, b, "no"),
      },
      {
        title: "Action",
        dataIndex: "delete",
        render: RenderDeleteButton,
        // sorter: (a, b) => alphanumericSort(a, b, "no"),
      },
    ],

    REQUEST: [
      {
        title: "NO.",
        dataIndex: "no",
        sorter: (a, b) => alphanumericSort(a, b, "no"),
      },
      {
        title: "View",
        dataIndex: "view",
        render: RenderViewButton,
        // sorter: (a, b) => alphanumericSort(a, b, "no"),
      },
      {
        title: "Image",
        dataIndex: "image",
        render: ImageRanders,
        // sorter: (a, b) => alphanumericSort(a, b, "no"),
      },
      ,
      {
        title: "Club Name",
        dataIndex: "name",
        sorter: (a, b) => alphanumericSort(a, b, "no"),
      },
      {
        title: "Owner Name",
        dataIndex: "ownerName",
        sorter: (a, b) => alphanumericSort(a, b, "no"),
      },
      {
        title: "Mobile",
        dataIndex: "mobile",
        sorter: (a, b) => alphanumericSort(a, b, "no"),
      },
      {
        title: "Action",
        dataIndex: "action",
        render: RenderAcceptRejectButton,
      },
      // {
      //   title: "",
      //   dataIndex: "reject",
      //   render: RenderRejectButton,
      // },
    ],

    EMPLOYEE_DOCUMENT: [
      {
        title: "SR NO.",
        dataIndex: "no",
        sorter: (a, b) => alphanumericSort(a, b, "no"),
      },
      {
        title: "dOCUMENT NAME",
        dataIndex: "name",
        sorter: (a, b) => alphanumericSort(a, b, "name"),
      },
      {
        title: "DOCUMENT number",
        dataIndex: "number",
        sorter: (a, b) => alphanumericSort(a, b, "number"),
      },
      {
        title: "DOCUMENT type",
        dataIndex: "type",
        sorter: (a, b) => alphanumericSort(a, b, "type"),
      },
      // {
      //   dataIndex: "preview",
      //   render: RenderViewButton,
      // },
      // {
      //   dataIndex: "delete",
      //   render: RenderDeleteButton,
      // },
      { dataIndex: "multButton", render: RenderActionButtons },
    ],
    SUPPLY_OUT_INVENTORY_TABLE_INNER: [
      {
        title: "Product",
        dataIndex: "productName",
        sorter: (a, b) => alphanumericSort(a, b, "productName"),
      },
      {
        title: "Qty",
        dataIndex: "quantity",
        sorter: (a, b) => alphanumericSort(a, b, "quantity"),
      },
      {
        title: "Unit of Measure",
        dataIndex: "unit",
        sorter: (a, b) => alphanumericSort(a, b, "unit"),
      },
      {
        dataIndex: "delete",
        render: RenderDeleteWithoutConfirmation,
      },
      // {
      //   render: (_, record) => randorMthor(_, record, handleDelete),
      // },
    ],
    EMPLOYEE_TIMEOFF: [
      {
        title: "SR NO.",
        dataIndex: "no",
        sorter: (a, b) => alphanumericSort(a, b, "no"),
        // render: (text) => <a>{text}</a>,
      },
      {
        title: "LEAVE TYPE",
        dataIndex: "leavetype",
        sorter: (a, b) => alphanumericSort(a, b, "leavetype"),
        render: (typeID) => {
          if (typeID === 3) {
            return <>Periods Leave</>;
          }
          if (typeID === 2) {
            return <>Sick Leave</>;
          }
          return <>DONE</>;
        },
      },
      {
        title: "LEAVE DATE",
        dataIndex: "from",
        sorter: (a, b) => moment(a.from).subtract(moment(b.from)),
      },
      {
        title: "REPORTING DATE",
        dataIndex: "to",
        sorter: (a, b) => moment(a.to).subtract(moment(b.to)),
      },
      {
        title: "DURATION",
        dataIndex: "duration",
        sorter: (a, b) => alphanumericSort(a, b, "duration"),
      },
      {
        title: "STATUS",
        dataIndex: "status",
        sorter: (a, b) => alphanumericSort(a, b, "status"),
        render: (status) => {
          return (
            <Select
              style={{ width: "100%" }}
              defaultValue={status?.value}
              onChange={(e) => status?.onChange(e)}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Select.Option key={"Active"}>Active </Select.Option>
              <Select.Option key={"Pending"}>Pending </Select.Option>
              <Select.Option key={"Rejected"}>Rejected</Select.Option>
            </Select>
          );
        },
      },
    ],
    INVENTORY: [
      {
        title: "Product",
        dataIndex: "productName",
        sorter: (a, b) => alphanumericSort(a, b, "productName"),
      },
      {
        title: "Qty",
        dataIndex: "quantity",
        sorter: (a, b) => alphanumericSort(a, b, "quantity"),
      },
      {
        title: "Category",
        dataIndex: "category",
        sorter: (a, b) => alphanumericSort(a, b, "category"),
      },
      {
        title: "Unit",
        dataIndex: "unit",
        sorter: (a, b) => alphanumericSort(a, b, "unit"),
      },
      {
        title: "Cost",
        dataIndex: "cost",
        sorter: (a, b) => alphanumericSort(a, b, "cost"),
      },
      {
        title: "type",
        dataIndex: "type",
        sorter: (a, b) => alphanumericSort(a, b, "type"),
      },
      {
        title: "serial Number",
        dataIndex: "trackingId",
        sorter: (a, b) => alphanumericSort(a, b, "trackingId"),
      },
    ],
    PURCHASE_REQUESTS: [
      {
        title: "Product Name",
        dataIndex: "product",
        sorter: (a, b) => alphanumericSort(a, b, "product"),
      },
      {
        title: "QTY",
        dataIndex: "quantity",
        sorter: (a, b) => alphanumericSort(a, b, "quantity"),
      },
      {
        title: "UOM",
        dataIndex: "prn",
        sorter: (a, b) => alphanumericSort(a, b, "prn"),
      },
      {
        title: "date",
        dataIndex: "date",
        sorter: (a, b) => moment(a.date).subtract(moment(b.date)),
      },
      {
        title: "status",
        dataIndex: "status",
        sorter: (a, b) => alphanumericSort(a, b, "status"),
        render: (status) => {
          return (
            <Select
              style={{ width: "100%" }}
              defaultValue={status.value}
              onChange={(e) => status?.onChange(e)}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Select.Option key={"Pending"}>PENDING</Select.Option>
              <Select.Option key={"Delivered"}>Delivered</Select.Option>
              <Select.Option key={"Declined"}>Declined</Select.Option>
              <Select.Option key={"Approved"}>Approved</Select.Option>
            </Select>
          );
        },
      },
    ],
    TRANSFER: [
      {
        title: "Products",
        dataIndex: "product",
        sorter: (a, b) => alphanumericSort(a, b, "product"),
      },
      {
        title: "Qty",
        dataIndex: "quantity",
        sorter: (a, b) => alphanumericSort(a, b, "quantity"),
      },
      {
        title: "date",
        dataIndex: "date",
        sorter: (a, b) => moment(a.date).subtract(moment(b.date)),
      },
      {
        title: "Serial No.",
        dataIndex: "srNumber",
        sorter: (a, b) => alphanumericSort(a, b, "srNumber"),
      },
      {
        title: "Usage Type",
        dataIndex: "type",
        sorter: (a, b) => alphanumericSort(a, b, "type"),
      },
      {
        title: "receiever's name",
        dataIndex: "receiver",
        sorter: (a, b) => alphanumericSort(a, b, "receiver"),
      },
    ],
    MOVE_HISTORY: [
      {
        title: "Products",
        dataIndex: "product",
        sorter: (a, b) => alphanumericSort(a, b, "product"),
      },
      {
        title: "Qty",
        dataIndex: "quantity",
        sorter: (a, b) => alphanumericSort(a, b, "quantity"),
      },
      {
        title: "Category",
        dataIndex: "category",
        sorter: (a, b) => alphanumericSort(a, b, "category"),
      },
      {
        title: "date",
        dataIndex: "date",
        sorter: (a, b) => moment(a.date).subtract(moment(b.date)),
      },
      {
        title: "type",
        dataIndex: "type",
        sorter: (a, b) => alphanumericSort(a, b, "type"),
      },
      {
        title: "receiever's name",
        dataIndex: "receiver",
        sorter: (a, b) => alphanumericSort(a, b, "receiver"),
      },
    ],
    MAINTENANCE_HISTORY: [
      {
        title: "TITLE",
        dataIndex: "title",
        sorter: (a, b) => alphanumericSort(a, b, "title"),
      },
      {
        title: "STATUS",
        dataIndex: "status",
        sorter: (a, b) => alphanumericSort(a, b, "status"),
      },
      {
        title: "prioritiy",
        dataIndex: "prioriti",
        sorter: (a, b) => alphanumericSort(a, b, "prioriti"),
      },
      {
        title: "DATE",
        dataIndex: "date",
        sorter: (a, b) => moment(a.date).subtract(moment(b.date)),
      },
      {
        title: "ASSIGNEE",
        dataIndex: "assignedId",
        sorter: (a, b) => alphanumericSort(a, b, "assignedId"),
      },
      {
        title: "MAINTANANCE TYPE",
        dataIndex: "comeToKnow",
        sorter: (a, b) => alphanumericSort(a, b, "comeToKnow"),
      },
      {
        title: "DURATION",
        dataIndex: "duration",
        sorter: (a, b) => alphanumericSort(a, b, "duration"),
      },
      {
        title: "createdBy",
        dataIndex: "createdBy",
        sorter: (a, b) => alphanumericSort(a, b, "createdBy"),
      },
    ],
    PLANT_DOCUMENT: [
      {
        title: "Documents #",
        dataIndex: "no",
        sorter: (a, b) => alphanumericSort(a, b, "no"),
      },
      {
        title: "DOCUMENT NAME",
        dataIndex: "name",
        sorter: (a, b) => alphanumericSort(a, b, "name"),
      },
      // {
      //   title: "DOCUMENT number",
      //   dataIndex: "number",
      // },
      {
        title: "DOCUMENT type",
        dataIndex: "type",
        sorter: (a, b) => alphanumericSort(a, b, "type"),
      },
      { dataIndex: "multButton", render: RenderActionButtons },
    ],
    SETTING_NEW_CLIENT: [
      {
        title: "SN No.",
        dataIndex: "no",
        sorter: (a, b) => alphanumericSort(a, b, "no"),
      },
      {
        title: "Client NAME",
        dataIndex: "name",
        sorter: (a, b) => alphanumericSort(a, b, "name"),
      },
      {
        title: "Plant Capacity",
        dataIndex: "plantCapacity",
        sorter: (a, b) => alphanumericSort(a, b, "plantCapacity"),
      },
      { dataIndex: "multButton", render: RenderActionButtons },
    ],
    SETTING_CATEGORY_TABLE: [
      {
        title: "SN No.",
        dataIndex: "no",
        sorter: (a, b) => alphanumericSort(a, b, "no"),
      },
      {
        title: "Category NAME",
        dataIndex: "category",
        sorter: (a, b) => alphanumericSort(a, b, "category"),
      },
      // {
      //   dataIndex: "delete",
      //   render: RenderDeleteButton,
      // },
      { dataIndex: "multButton", render: RenderActionButtons },
    ],
    SETTING_VENDOR: [
      {
        title: "SN No.",
        dataIndex: "no",
        sorter: (a, b) => alphanumericSort(a, b, "no"),
      },
      {
        title: "Vendor name",
        dataIndex: "name",
        sorter: (a, b) => alphanumericSort(a, b, "name"),
      },
      {
        title: "Bussiness Name",
        dataIndex: "businessName",
        sorter: (a, b) => alphanumericSort(a, b, "businessName"),
      },
      {
        title: "Contact number",
        dataIndex: "mobile",
        sorter: (a, b) => alphanumericSort(a, b, "mobile"),
      },
      {
        title: "Email Address",
        dataIndex: "email",
        sorter: (a, b) => alphanumericSort(a, b, "email"),
      },
      { dataIndex: "multButton", render: RenderActionButtons },
    ],
    SETTING_ROUTINE_CHECKUP: [
      {
        title: "Ctegory",
        dataIndex: "category",
        sorter: (a, b) => alphanumericSort(a, b, "category"),
      },
      {
        title: "sub Ctegory",
        dataIndex: "subCategory",
        sorter: (a, b) => alphanumericSort(a, b, "subCategory"),
      },
      {
        title: "activities",
        dataIndex: "activities",
        sorter: (a, b) => alphanumericSort(a, b, "activities"),
      },
      {
        title: "frequency",
        dataIndex: "frequency",
        sorter: (a, b) => alphanumericSort(a, b, "frequency"),
      },
      {
        title: "priority",
        dataIndex: "priority",
        sorter: (a, b) => alphanumericSort(a, b, "priority"),
      },
      { dataIndex: "multButton", render: RenderActionButtons },
    ],
    EVENT_LOG_TABLE: [
      {
        title: "event Details",
        dataIndex: "event",
        sorter: (a, b) => alphanumericSort(a, b, "event"),
      },
      {
        title: "event Type",
        dataIndex: "type",
        sorter: (a, b) => alphanumericSort(a, b, "type"),
      },
      {
        title: "from",
        dataIndex: "from",
        sorter: (a, b) => moment(a.from).subtract(moment(b.from)),
      },
      {
        title: "to",
        dataIndex: "to",
        sorter: (a, b) => moment(a.to).subtract(moment(b.to)),
      },
      {
        title: "attended By",
        dataIndex: "name",
        sorter: (a, b) => alphanumericSort(a, b, "name"),
      },
      {
        title: "status",
        dataIndex: "status",
        sorter: (a, b) => alphanumericSort(a, b, "status"),
        render: (status) => {
          return (
            <Select
              style={{ width: "100%" }}
              defaultValue={status.value}
              onChange={(e) => status?.onChange(e)}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Select.Option key={"Pending"}>PENDING</Select.Option>
              <Select.Option key={"Completed"}>COMPLETED</Select.Option>
            </Select>
          );
        },
      },
    ],
    ABT_TABLE: [
      {
        title: "event Details",
        dataIndex: "abtNo",
        sorter: (a, b) => alphanumericSort(a, b, "abtNo"),
      },
      {
        title: "date",
        dataIndex: "date",
        sorter: (a, b) => moment(a.date).subtract(moment(b.date)),
      },
      {
        title: "import",
        dataIndex: "import",
        sorter: (a, b) => alphanumericSort(a, b, "import"),
      },
      {
        title: "export",
        dataIndex: "export",
        sorter: (a, b) => alphanumericSort(a, b, "export"),
      },
    ],
    CLEANING_TABLE: [
      {
        title: "zone",
        dataIndex: "zone",
        sorter: (a, b) => alphanumericSort(a, b, "zone"),
      },
      {
        title: "from Row",
        dataIndex: "fromRow",
        sorter: (a, b) => alphanumericSort(a, b, "fromRow"),
      },
      {
        title: "to Row",
        dataIndex: "toRow",
        sorter: (a, b) => alphanumericSort(a, b, "toRow"),
      },
      {
        title: "no. of modules",
        dataIndex: "modules",
        sorter: (a, b) => alphanumericSort(a, b, "modules"),
      },
      {
        title: "no. of rows",
        dataIndex: "rows",
        sorter: (a, b) => alphanumericSort(a, b, "rows"),
      },
      {
        title: "cleaning supervisor",
        dataIndex: "name",
        sorter: (a, b) => alphanumericSort(a, b, "name"),
      },
      {
        title: "total KWP",
        dataIndex: "totalKWP",
        sorter: (a, b) => alphanumericSort(a, b, "totalKWP"),
      },
      {
        title: "start Date",
        dataIndex: "startDate",
        sorter: (a, b) => moment(a.startDate).subtract(moment(b.startDate)),
      },
      {
        title: "end Date",
        dataIndex: "endDate",
        sorter: (a, b) => moment(a.endDate).subtract(moment(b.endDate)),
      },
    ],
    EXPANSE_TABLE: [
      {
        title: "party Name",
        dataIndex: "partyName",
        sorter: (a, b) => alphanumericSort(a, b, "partyName"),
      },
      {
        title: "expanse date",
        dataIndex: "expanseDate",
        sorter: (a, b) => moment(a.expanseDate).subtract(moment(b.expanseDate)),
      },
      {
        title: "Category",
        dataIndex: "category",
        sorter: (a, b) => alphanumericSort(a, b, "category"),
      },
      {
        title: "amount",
        dataIndex: "amount",
        sorter: (a, b) => alphanumericSort(a, b, "amount"),
      },
      {
        title: "payment mode",
        dataIndex: "payment",
        sorter: (a, b) => alphanumericSort(a, b, "payment"),
      },
      {
        title: "paid by",
        dataIndex: "tracking",
        sorter: (a, b) => alphanumericSort(a, b, "tracking"),
      },
      {
        title: "bill refrense",
        dataIndex: "billReference",
        sorter: (a, b) => alphanumericSort(a, b, "billReference"),
      },
      {
        title: "STATUS",
        dataIndex: "status",
        sorter: (a, b) => alphanumericSort(a, b, "status"),
        render: (status) => {
          return (
            <Select
              style={{ width: "100%" }}
              defaultValue={status?.value}
              onChange={(e) => status?.onChange(e)}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Select.Option key={"Submit"}>Submit </Select.Option>
              <Select.Option key={"Approved"}>Approved </Select.Option>
              <Select.Option key={"Paid"}>Paid </Select.Option>
              <Select.Option key={"Rejected"}>Rejected</Select.Option>
            </Select>
          );
        },
      },
      // {
      //   title: "startDate",
      //   dataIndex: "startDate",
      //   sorter: (a, b) => moment(a.date).subtract(moment(b.startDate)),
      // },
      // {
      //   title: "endDate",
      //   dataIndex: "endDate",
      //   sorter: (a, b) => moment(a.date).subtract(moment(b.endDate)),
      // },
    ],
    VEHICAL_EXPANSE_TABLE: [
      {
        title: "vehicle type",
        dataIndex: "vehicle",
        sorter: (a, b) => alphanumericSort(a, b, "vehicle"),
      },
      {
        title: "vehicle number",
        dataIndex: "vehicleNumber",
        sorter: (a, b) => alphanumericSort(a, b, "vehicleNumber"),
      },
      {
        title: "category",
        dataIndex: "category",
        sorter: (a, b) => alphanumericSort(a, b, "category"),
      },
      {
        title: "cost",
        dataIndex: "coast",
        sorter: (a, b) => alphanumericSort(a, b, "coast"),
      },
      {
        title: "odometer reading",
        dataIndex: "odometerReading",
        sorter: (a, b) => alphanumericSort(a, b, "odometerReading"),
      },
      {
        title: "remarks",
        dataIndex: "remark",
        sorter: (a, b) => alphanumericSort(a, b, "remark"),
      },
      // {
      //   title: "total KWP",
      //   dataIndex: "totalKWP",
      //   sorter: (a, b) => alphanumericSort(a, b, "totalKWP"),
      // },
      // {
      //   title: "startDate",
      //   dataIndex: "startDate",
      //   sorter: (a, b) => moment(a.date).subtract(moment(b.startDate)),
      // },
      // {
      //   title: "STATUS",
      //   dataIndex: "status",
      //   sorter: (a, b) => alphanumericSort(a, b, "status"),
      //   render: (status) => {
      //     return (
      //       <Select
      //         style={{ width: "100%" }}
      //         defaultValue={status?.value}
      //         onChange={(e) => status?.onChange(e)}
      //         onClick={(e) => {
      //           e.stopPropagation();
      //         }}
      //       >
      //         <Select.Option key={"Submit"}>Submit </Select.Option>
      //         <Select.Option key={"Approved"}>Approved </Select.Option>
      //         <Select.Option key={"Paid"}>Paid </Select.Option>
      //         <Select.Option key={"Rejected"}>Rejected</Select.Option>
      //       </Select>
      //     );
      //   },
      // },
      {
        title: "date",
        dataIndex: "date",
        sorter: (a, b) => moment(a.date).subtract(moment(b.date)),
      },
    ],
  },
  FORM_FIELD: {
    LOGIN_PAGE_MODAL: [
      {
        no: 1,
        // Label: "User Name",
        name: "name",
        id: "name",
        type: "text",
        placeholder: "User name",
        required: true,
        width: 24,
      },
      {
        no: 1,
        // Label: "Password",
        name: "password",
        width: 24,
        id: "password",
        type: "password",
        placeholder: "Password",
        required: true,
      },
    ],
    USERS_MODAL: [
      {
        no: 1,
        Label: "Name",
        name: "name",
        id: "name",
        type: "text",
        placeholder: "Enter Your Name",
        required: true,
      },

      {
        no: 2,
        Label: "Mobile Number",
        name: "mobile",
        id: "mobile",
        type: "mobile",
        placeholder: "Enter Mobile Number",
        required: true,
        // width: 24,
      },
      {
        no: 3,
        Label: "Username",
        name: "user",
        id: "user",
        type: "text",
        placeholder: "Enter User Name",
        required: true,
      },

      {
        no: 4,
        Label: "Date of Birth",
        name: "date",
        id: "date",
        type: "date",
        placeholder: "Enter Date of Birth",
        required: true,
      },
      {
        no: 5,
        Label: "Profile Picture",
        name: "profilePic",
        id: "profilePic",
        type: "file",
        placeholder: " ",
        required: true,
      },
    ],
    NOTIFICATION_MODAL: [
      {
        no: 1,
        Label: "Notification Title",
        name: "notification",
        id: "notification",
        type: "text",
        placeholder: "Enter Notification Title",
        required: true,
      },

      {
        no: 2,
        Label: "Message",
        name: "message",
        id: "message",
        type: "text",
        placeholder: "Enter Message",
        required: true,
        // width: 24,
      },
    ],
  },

  API: {
    login: {
      type: "POST",
      endpoint: "/admins/login",
    },
    signUp: { type: "POST", endpoint: "/user/signup" },
    getMe: {
      type: "GET",
      endpoint: "/admins/my/profile",
    },
    getClubRequest: {
      type: "GET",
      endpoint: "/admins/clubs",
    },
    getOneClubRequest: {
      type: "GET",
      endpoint: "/admins/clubs/id/:requestId",
    },
    acceptOrRejectRequest: {
      type: "PATCH",
      endpoint: "/admins/clubs/kyc-status",
    },
    getUsers: {
      type: "GET",
      endpoint: "/admins/users/",
    },
    editUser: {
      type: "PATCH",
      endpoint: "/admins/users/block/:dataId",
    },
    deleteUsers: {
      type: "DELETE",
      endpoint: "/admins/users/id/:dataId",
    },
    //   driver: {
    //     type: "GET",
    //     endpoint: "/driver",
    //   },
    //   employee: {
    //     type: "GET",
    //     endpoint: "/employee",
    //   },
    //   oneEmployee: {
    //     type: "GET",
    //     endpoint: "/employee?eId=:id",
    //   },
    //   updatedEmployee: {
    //     type: "PATCH",
    //     endpoint: "/employee/:id",
    //   },
    //   oneEmployeeId: {
    //     type: "GET",
    //     endpoint: "/employee/:id",
    //   },
    //   addEmployee: {
    //     type: "POST",
    //     endpoint: "/employee",
    //   },
    //   documentEmployee: {
    //     type: "GET",
    //     endpoint: "/employeedocument?eId=:id",
    //   },
    //   uploadEmployeeDocument: {
    //     type: "POST",
    //     endpoint: "/employeedocument",
    //   },
    //   deleteEmployeeDocument: {
    //     type: "DELETE",
    //     endpoint: "/employeedocument/:id",
    //   },
    //   leaverequest: {
    //     type: "POST",
    //     endpoint: "/leaverequest",
    //   },
    //   leaverequestUpdate: {
    //     type: "PATCH",
    //     endpoint: "/leaverequest/:id",
    //   },
    //   leaverequestDelete: {
    //     type: "DELETE",
    //     endpoint: "/leaverequest/:id",
    //   },
    //   TimeoffEmployee: {
    //     type: "GET",
    //     endpoint: "/leaverequest?eId=:id",
    //   },
    //   inventory: {
    //     type: "GET",
    //     endpoint: "/inventoryinward",
    //   },
    //   inventoryUpdate: {
    //     type: "PATCH",
    //     endpoint: "/inventoryinward/:id",
    //   },
    //   inventoryDelete: {
    //     type: "DELETE",
    //     endpoint: "/inventoryinward/:id",
    //   },
    //   inventoryCreate: {
    //     type: "POST",
    //     endpoint: "/inventoryinward",
    //   },
    //   inventoryById: {
    //     type: "GET",
    //     endpoint: "/inventoryinward/:id",
    //   },
    //   AllEquipment: {
    //     type: "GET",
    //     endpoint: "/equipment",
    //   },
    //   equipmentById: {
    //     type: "GET",
    //     endpoint: "/equipment/:id",
    //   },
    //   updateequipment: {
    //     type: "PATCH",
    //     endpoint: "/equipment/:id",
    //   },
    //   equipment: {
    //     type: "POST",
    //     endpoint: "/equipment",
    //   },
    //   maintenance: {
    //     type: "GET",
    //     endpoint: "/maintenancerequest",
    //   },
    //   documentEquipment: {
    //     type: "GET",
    //     endpoint: "/equipmentdocument?equipmentId=:id",
    //   },
    //   uploadEquipmentDocument: {
    //     type: "POST",
    //     endpoint: "/equipmentdocument",
    //   },
    //   deleteEquipmentDocument: {
    //     type: "DELETE",
    //     endpoint: "/equipmentdocument/:id",
    //   },
    //   purchaserequesition: {
    //     type: "POST",
    //     endpoint: "/purchaserequesition",
    //   },
    //   purchaserequesitionUpdate: {
    //     type: "PATCH",
    //     endpoint: "/purchaserequesition/:id",
    //   },
    //   purchaserequesitionDelete: {
    //     type: "DELETE",
    //     endpoint: "/purchaserequesition/:id",
    //   },
    //   purchaserequesitiongetAll: {
    //     type: "GET",
    //     endpoint: "/purchaserequesition",
    //   },
    //   eventlogCreate: {
    //     type: "POST",
    //     endpoint: "/eventlog",
    //   },
    //   eventlogUpdate: {
    //     type: "PATCH",
    //     endpoint: "/eventlog/:id",
    //   },
    //   eventlogDelete: {
    //     type: "DELETE",
    //     endpoint: "/eventlog/:id",
    //   },
    //   eventlogAll: {
    //     type: "GET",
    //     endpoint: "/eventlog",
    //   },
    //   cleaningCreate: {
    //     type: "POST",
    //     endpoint: "/cleaning",
    //   },
    //   cleaningUpdate: {
    //     type: "PATCH",
    //     endpoint: "/cleaning/:id",
    //   },
    //   cleaningDelete: {
    //     type: "DELETE",
    //     endpoint: "/cleaning/:id",
    //   },
    //   cleaningAll: {
    //     type: "GET",
    //     endpoint: "/cleaning",
    //   },
    //   expanseCreate: {
    //     type: "POST",
    //     endpoint: "/expanse",
    //   },
    //   expanseUpdate: {
    //     type: "PATCH",
    //     endpoint: "/expanse/:id",
    //   },
    //   expanseDelete: {
    //     type: "DELETE",
    //     endpoint: "/expanse/:id",
    //   },
    //   expanseAll: {
    //     type: "GET",
    //     endpoint: "/expanse",
    //   },
    //   vehicleexpanseCreate: {
    //     type: "POST",
    //     endpoint: "/vehicleexpanse",
    //   },
    //   vehicleexpanseUpdate: {
    //     type: "PATCH",
    //     endpoint: "/vehicleexpanse/:id",
    //   },
    //   vehicleexpanseDelete: {
    //     type: "DELETE",
    //     endpoint: "/vehicleexpanse/:id",
    //   },
    //   vehicleexpanseAll: {
    //     type: "GET",
    //     endpoint: "/vehicleexpanse",
    //   },
    //   abtCreate: {
    //     type: "POST",
    //     endpoint: "/abt",
    //   },
    //   abtUpdate: {
    //     type: "PATCH",
    //     endpoint: "/abt/:id",
    //   },
    //   abtDelete: {
    //     type: "DELETE",
    //     endpoint: "/abt/:id",
    //   },
    //   abtAll: {
    //     type: "GET",
    //     endpoint: "/abt",
    //   },
    //   maintenanceRequests: {
    //     type: "GET",
    //     endpoint: "/maintenancerequest",
    //   },
    //   equipmentcategory: {
    //     type: "GET",
    //     endpoint: "/equipmentcategory",
    //   },
    //   employmenttype: {
    //     type: "GET",
    //     endpoint: "/employmenttype",
    //   },
    //   shifts: {
    //     type: "GET",
    //     endpoint: "/shifts",
    //   },
    //   getAllManagers: {
    //     type: "GET",
    //     endpoint: "/employee",
    //   },
    //   getAlldepartment: {
    //     type: "GET",
    //     endpoint: "/department",
    //   },
    //   plantdocument: {
    //     type: "GET",
    //     endpoint: "/document",
    //   },
    //   plantdocumentDelete: {
    //     type: "DELETE",
    //     endpoint: "/document/:id",
    //   },
    //   plantdocumentUpload: {
    //     type: "POST",
    //     endpoint: "/document",
    //   },
    //   getAllClients: {
    //     type: "GET",
    //     endpoint: "/client",
    //   },
    //   createClient: {
    //     type: "POST",
    //     endpoint: "/client",
    //   },
    //   updateClient: {
    //     type: "PATCH",
    //     endpoint: "/client/:id",
    //   },
    //   deleteClient: {
    //     type: "DELETE",
    //     endpoint: "/client/:id",
    //   },
    //   productCategory: {
    //     type: "GET",
    //     endpoint: "/productcategory",
    //   },
    //   getAllproduct: {
    //     type: "GET",
    //     endpoint: "/product",
    //   },
    //   createProduct: {
    //     type: "POST",
    //     endpoint: "/product",
    //   },
    //   createInventoryoutword: {
    //     type: "POST",
    //     endpoint: "/inventoryoutward",
    //   },
    //   TransferInventory: {
    //     type: "GET",
    //     endpoint: "/inventoryoutward/transfers",
    //   },
    //   TransferUpdate: {
    //     type: "PATCH",
    //     endpoint: "/inventoryoutward/:id",
    //   },
    //   TransferDelete: {
    //     type: "DELETE",
    //     endpoint: "/inventoryoutward/:id",
    //   },
    //   inventoryProductCategory: {
    //     type: "GET",
    //     endpoint: "/productcategory",
    //   },
    //   equipmentProductCategory: {
    //     type: "GET",
    //     endpoint: "/equipmentcategory",
    //   },
    //   addinventoryProductCategory: {
    //     type: "POST",
    //     endpoint: "/productcategory",
    //   },
    //   deleteinventoryProductCategory: {
    //     type: "DELETE",
    //     endpoint: "/productcategory/:id",
    //   },
    //   updateinventoryProductCategory: {
    //     type: "PATCH",
    //     endpoint: "/productcategory/:id",
    //   },
    //   addequipmentProductCategory: {
    //     type: "POST",
    //     endpoint: "/equipmentcategory",
    //   },
    //   deleteequipmentProductCategory: {
    //     type: "DELETE",
    //     endpoint: "/equipmentcategory/:id",
    //   },
    //   updateequipmentProductCategory: {
    //     type: "PATCH",
    //     endpoint: "/equipmentcategory/:id",
    //   },
    //   getallvendors: {
    //     type: "GET",
    //     endpoint: "/vendor",
    //   },
    //   createvendor: {
    //     type: "POST",
    //     endpoint: "/vendor",
    //   },
    //   deletevendor: {
    //     type: "DELETE",
    //     endpoint: "/vendor/:id",
    //   },
    //   updatevendor: {
    //     type: "PATCH",
    //     endpoint: "/vendor/:id",
    //   },
    //   checkupgetAll: {
    //     type: "GET",
    //     endpoint: "/checkup",
    //   },
    //   checkupgetAdd: {
    //     type: "POST",
    //     endpoint: "/checkup",
    //   },
    //   checkupDelete: {
    //     type: "DELETE",
    //     endpoint: "/checkup/:id",
    //   },
    //   checkupUpdate: {
    //     type: "PATCH",
    //     endpoint: "/checkup/:id",
    //   },
    //   updatePlant: {
    //     type: "PATCH",
    //     endpoint: "/user/updateplant",
    //   },
    //   updatePassword: {
    //     type: "PATCH",
    //     endpoint: "/user/password",
    //   },
    //   movehistory: {
    //     type: "GET",
    //     endpoint: "/inventoryoutward/moves",
    //   },
  },

  TAB_MENU: {
    USER: [
      {
        no: 1,
        Label: "About Info",
        name: "about",
        id: "about",
      },
      {
        no: 2,
        Label: "Previous Bookings",
        name: "booking",
        id: "booking",
      },
      {
        no: 3,
        Label: "Car valet",
        name: "valet",
        id: "valet",
      },
      {
        no: 4,
        Label: "Chat History",
        name: "chat",
        id: "chat",
      },
      {
        no: 5,
        Label: "User Post",
        name: "post",
        id: "post",
      },
    ],
  },
};
export default CONSTANTS;
