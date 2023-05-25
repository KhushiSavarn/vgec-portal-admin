import Eye from "../../asset/image/eye.png";
import { Image, Popconfirm, Select } from "antd";
import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
} from "@ant-design/icons";
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

const RenderDeleteButton = (value) => {
  return (
    <Popconfirm
      title="Sure to delete?"
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
const RenderDownloadButton = (value) => {
  return (
    <DownloadOutlined
      style={{ color: "black" }}
      onClick={() => {
        window.open(value, "Download");
      }}
    />
  );
};
const RenderEditButton = (value) => {
  return (
    <EditOutlined
      style={{ color: "black" }}
      onClick={() => {
        value?.onClick(value);
      }}
    />
  );
};

const RenderViewButton = (value) => {
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

export const loginRoot = "/";
export const appRoot = "/app";
export const ROUTES = {
  FORGOT_PASSWORD: "/forgot-password",
  DASHBOARD: "/dashboard",
  INVENTORY: "/inventory",
  INVENTORY_DETAILS: "/details",
  INVENTORY_MOVEHISTORY: "/movehistory",
  INVENTORY_EQUIPMENT: "/equipment",
  INVENTORY_EQUIPMENT_DETAILS: "/equipment/:eid/:id",
  INVENTORY_TRANSFER: "/transfer",
  INVENTORY_PURCHASE: "/purchase",
  EXPENSES: "/expenses",
  EXPENSES_DETAIL: "/detail",
  EXPENSES_VEHICAL: "/vehical",
  MAINTENANCE: "/maintenance",
  EMPLOYEE: "/employee",
  EMPLOYEE_DETAILS: "/employee/:eid/:id",
  LOGBOOK: "/logBook",
  LOGBOOK_LOG: "/log",
  LOGBOOK_ABTMETER: "/ABTMeter",
  LOGBOOK_CLEANLOG: "/cleaningLog",
  PLANTDETAILS: "/plantDetails",
  PLANTDETAILS_DETAILS: "/details",
  PLANTDETAILS_OMChecklist: "/OMChecklist",
  PLANTDETAILS_SETTING: "/setting",
};

const CONSTANTS = {
  BASE_URL: "http://20.244.39.211/api/v1",
  GETMe: null,
  FORM_FIELD: {
    EMPLOYEE_NEW_MODAL: [
      {
        no: 1,
        Label: "Employee name",
        name: "name",

        id: "name",
        type: "text",
        placeholder: "Enter Employee name",
        required: true,
      },
      {
        no: 2,
        id: 2,
        item: [
          {
            no: 2,
            Label: "Employee ID",
            name: "eId",
            id: "eId",
            type: "number",
            required: true,
          },
          {
            no: 3,
            Label: "Position",
            name: "position",
            placeholder: "Enter position",
            id: "position",
            type: "text",
            required: true,
          },
        ],
      },
      {
        no: 3,
        id: 3,
        item: [
          {
            no: 4,
            Label: "Department",
            name: "departmentId",
            placeholder: "Select Department",
            id: "departmentId",
            type: "select",
            required: true,
            option: [
              // {
              //   id: 8,
              //   value: 8,
              //   Label: "Department of Plates",
              // },
              // {
              //   id: 7,
              //   value: 7,
              //   Label: "Department 6",
              // },
              // {
              //   id: 6,
              //   value: 6,
              //   Label: "Department 4",
              // },
              // {
              //   id: 5,
              //   value: 5,
              //   Label: "General Department",
              // },
            ],
          },
          {
            no: 5,
            Label: "Contact",
            name: "mobile",
            id: "mobile",
            type: "number",
            required: true,
          },
        ],
      },
      {
        no: 4,
        id: 4,
        item: [
          {
            no: 6,
            Label: "Email",
            name: "email",
            placeholder: "Enter Email ID",
            id: "email",
            type: "email",
            required: false,
          },
          {
            no: 7,
            Label: "Manager",
            name: "managerId",
            placeholder: "Select the Manager",
            id: "managerId",
            type: "select",
            required: true,
            option: [],
          },
        ],
      },
      {
        no: 5,
        Label: "Address",
        name: "address",
        placeholder: "Enter Your Address",
        id: "address",
        type: "text",
        required: false,
      },
      {
        no: 6,
        id: 6,
        item: [
          {
            no: 10,
            Label: "Working Shift",
            name: "workingShiftId",
            placeholder: "Select the shift",

            id: "workingShiftId",
            type: "select",
            required: true,
            option: [],
          },
        ],
      },
      {
        no: 7,
        id: 7,
        item: [
          {
            no: 11,
            Label: "Aadhar Card",
            name: "aadhar",
            placeholder: "Enter Aadhar Number",

            id: "aadhar",
            type: "number",
            required: false,
          },
          {
            no: 12,
            Label: "Employment Type",
            name: "employmentTypeId",
            placeholder: "Select Employment ",

            id: "employmentTypeId",
            type: "select",
            required: true,
            option: [],
          },
        ],
      },
      {
        no: 8,
        id: 8,
        item: [
          {
            no: 13,
            Label: "Gender",
            name: "gender",

            id: "gender",
            option: [
              {
                id: "F",
                value: "F",
                Label: "F",
              },
              {
                id: "M",
                value: "M",
                Label: "M",
              },
            ],
            placeholder: "Select Gender",
            type: "select",
            required: false,
          },
          {
            no: 14,
            Label: "Access role",
            name: "role",

            placeholder: "Select Access Role ",
            id: "role",
            type: "select",
            required: true,
            option: [
              {
                id: "Admin",
                value: "Admin",
                Label: "Admin",
              },
              {
                id: "User",
                value: "User",
                Label: "User",
              },
              {
                id: "Employee",
                value: "Employee",
                Label: "Employee",
              },
            ],
          },
        ],
      },
    ],
    EMPLOYEE_LEAVE_REQUEST: [
      {
        no: 1,
        Label: "Employee name",
        name: "name",
        id: "name",
        type: "text",
        placeholder: "Enter Employee name",
        required: false,
      },
      {
        no: 2,
        id: 2,
        item: [
          {
            no: 2,
            Label: "Leave Type",
            name: "leaveTypeId",
            id: "leaveTypeId",
            type: "select",
            required: true,
            option: [
              {
                id: 3,
                value: 3,
                Label: "Periods Leave",
                updatedAt: "2023-04-15T08:50:30.321Z",
              },
              {
                id: 2,
                value: 2,
                Label: "Sick Leave",
                updatedAt: "2023-04-15T08:50:20.992Z",
              },
            ],
          },
        ],
      },
      {
        no: 3,
        id: 3,
        item: [
          {
            no: 3,
            Label: "leave date from",
            name: "from",
            id: "from",
            type: "date",
            required: true,
          },
          {
            no: 4,
            Label: "Leave date to",
            name: "to",
            id: "to",
            type: "date",
            required: true,
          },
        ],
      },

      {
        no: 5,
        Label: "reason",
        name: "reason",
        id: "reason",
        type: "text",
        required: false,
      },
      {
        no: 6,
        id: 6,
        item: [
          {
            no: 6,
            Label: "Supporting docs",
            name: "supportingDocs",
            id: "supportingDocs",
            type: "file",
            required: false,
          },
        ],
      },
    ],
    DOCUMENT_UPLOAD: [
      {
        no: 1,
        Label: "Document Name",
        name: "name",
        id: "name",
        type: "text",
        required: false,
      },

      {
        no: 2,
        id: 2,
        item: [
          {
            no: 2,
            Label: "Doc Number",
            name: "number",
            id: "number",
            type: "number",
            required: true,
          },
          {
            no: 3,
            Label: "Document Type",
            name: "docType",
            id: "docType",
            type: "select",
            required: true,
            option: [
              {
                id: "Warrant Document",
                value: "Warrant Document",
                Label: "Warrant Document",
              },
              {
                id: "Manual Book",
                value: "Manual Book",
                Label: "Manual Book",
              },
              {
                id: "ID Card",
                value: "ID Card",
                Label: "ID Card",
              },
              {
                id: "Other",
                value: "Other",
                Label: "Other",
              },
            ],
          },
        ],
      },
      {
        no: 4,
        Label: "Upload Document",
        name: "documents",
        id: "documents",
        type: "dragupload",
        required: false,
      },
    ],
    SUPPLY_IN_INVENTORY: [
      {
        no: 1,
        Label: "Product Name",
        name: "productName",
        id: "productName",
        type: "text",
        required: false,
      },
      {
        no: 2,
        id: 2,
        item: [
          {
            no: 2,
            Label: "Product Type",
            name: "type",
            id: "type",
            type: "select",
            option: [
              {
                id: "Consumable",
                value: "Consumable",
                Label: "Consumable",
              },
              {
                id: "Storable",
                value: "Storable",
                Label: "Storable",
              },
            ],
            required: true,
          },
          {
            no: 3,
            Label: "Unit of Measure",
            name: "unit",
            id: "unit",
            type: "select",
            option: [
              {
                id: "Nos",
                value: "Nos",
                Label: "Nos",
              },
              {
                id: "Cm",
                value: "Cm",
                Label: "Cm",
              },
              {
                id: "Km",
                value: "Km",
                Label: "Km",
              },
              {
                id: "Meter",
                value: "Meter",
                Label: "Meter",
              },
              {
                id: "Inches",
                value: "Inches",
                Label: "Inches",
              },
              {
                id: "Kg",
                value: "Kg",
                Label: "Kg",
              },
              {
                id: "Lot",
                value: "Lot",
                Label: "Lot",
              },
              {
                id: "Gram",
                value: "Gram",
                Label: "Gram",
              },
              {
                id: "Liter",
                value: "Liter",
                Label: "Liter",
              },
            ],
            required: true,
          },
        ],
      },
      {
        no: 4,
        id: 4,
        item: [
          {
            no: 4,
            Label: "Quantity",
            name: "quantity",
            id: "quantity",
            type: "number",
            required: true,
          },
          {
            no: 5,
            Label: "Product Category",
            name: "productCategoryId",
            id: "productCategoryId",
            option: [
              // {
              //   id: "setting",
              //   value: "setting",
              //   Label: "setting",
              // },
            ],
            type: "select",
            required: true,
          },
        ],
      },
      {
        no: 6,
        id: 6,
        item: [
          {
            no: 6,
            Label: "Cost",
            name: "cost",
            id: "cost",
            type: "number",
            required: true,
          },
          {
            no: 7,
            Label: "Tracking",
            name: "tracking",
            id: "tracking",
            type: "radio",
            required: true,
            defaultValue: 3,
            option: [
              {
                id: "Unique serial number",
                value: "Unique serial number",
                Label: "Unique serial number",
              },
              {
                id: "By lots",
                value: "By lots",
                Label: "By lots",
              },
              {
                id: "NA",
                value: "NA",
                Label: "NA",
              },
            ],
          },
        ],
      },
      {
        no: 8,
        id: 8,
        item: [
          {
            no: 8,
            Label: "Tracking Id",
            name: "trackingId",
            id: "trackingId",
            type: "text",
            required: false,
            rule: ({ getFieldValue }) => ({
              validator(_, value) {
                if (getFieldValue("tracking") === "NA" || value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Please enter valid Tracking Id")
                );
              },
            }),
          },
          {
            no: 9,
            Label: "Date",
            name: "date",
            id: "date",
            type: "date",
            required: false,
          },
        ],
      },
    ],
    SUPPLY_OUT_INVENTORY: [
      {
        no: 1,
        id: 1,
        item: [
          {
            Label: "Reciver's Name",
            name: "receiver",
            id: "receiver",
            type: "select",
            required: false,
            option: [],
          },
          {
            no: 2,
            Label: "Date",
            name: "date",
            id: "date",
            type: "date",
            required: false,
          },
        ],
      },
      {
        no: 3,
        id: 3,
        item: [
          {
            no: 3,

            Label: "Select Ticket",
            name: "maintenanceRequestId",
            id: "maintenanceRequestId",
            type: "select",
            required: false,
            option: [],
          },
          {
            no: 4,

            Label: "Usage Type",
            name: "usageType",
            id: "usageType",
            type: "select",
            required: false,
            defaultValue: "Transfer",
            option: [
              {
                id: "Transfer",
                value: "Transfer",
                Label: "Transfer",
              },
              {
                id: "Consumed",
                value: "Consumed",
                Label: "Consumed",
              },
              {
                id: "Replaced",
                value: "Replaced",
                Label: "Replaced",
              },
              {
                id: "Expired/Defective",
                value: "Expired/Defective",
                Label: "Expired/Defective",
              },
            ],
          },
        ],
      },
    ],
    TRANSFER_FORM_TABLE: [
      {
        no: 1,
        id: 1,
        item: [
          {
            Label: "Reciver's Name",
            name: "receiver",
            id: "receiver",
            type: "select",
            required: false,
            option: [],
          },
          {
            no: 2,
            Label: "Date",
            name: "date",
            id: "date",
            type: "date",
            required: false,
          },
        ],
      },
      {
        no: 3,
        id: 3,
        item: [
          {
            no: 3,
            Label: "Quantity",
            name: "quantity",
            id: "quantity",
            type: "number",
            required: true,
          },
          // {
          //   no: 7,
          //   Label: "Serial Number",
          //   name: "srNumber",
          //   id: "srNumber",
          //   type: "text",
          //   required: false,
          // },
        ],
      },
    ],
    SUPPLY_OUT_INVENTORY_INNER: [
      {
        no: 1,
        Label: "Product",
        name: "productName",
        id: "productName",
        type: "select",
        option: [],
        required: true,
        width: 12,
      },
      {
        no: 2,
        Label: "Quantity",
        name: "quantity",
        id: "quantity",
        type: "number",
        required: true,
        width: 6,
      },
    ],
    NEW_EQUIPMENT_FORM: [
      {
        no: 1,
        Label: "name",
        name: "name",
        id: "name",
        type: "text",
        required: true,
      },
      {
        no: 2,
        id: 2,
        item: [
          {
            no: 2,
            Label: "Category",
            name: "equipmentCategoryId",
            id: "equipmentCategoryId",
            type: "select",
            option: [],
            required: true,
          },
          {
            no: 3,
            Label: "Vendor",
            name: "vendorId",
            id: "vendorId",
            type: "select",
            option: [],
            required: true,
          },
        ],
      },
      {
        no: 4,
        id: 4,
        item: [
          {
            no: 4,
            Label: "Used in location",
            name: "location",
            id: "location",
            type: "text",
            required: true,
          },
          {
            no: 5,
            Label: "Model",
            name: "model",
            id: "model",
            type: "text",
            required: true,
          },
        ],
      },
      {
        no: 6,
        Label: "Description",
        name: "description",
        id: "description",
        type: "text",
        required: true,
      },
      {
        no: 7,
        id: 7,
        item: [
          {
            no: 7,
            Label: "Serial Number",
            name: "srNumber",
            id: "srNumber",
            type: "text",
            required: false,
          },
          {
            no: 8,
            Label: "Cost",
            name: "cost",
            id: "cost",
            type: "number",
            required: true,
          },
        ],
      },
      {
        no: 9,
        id: 9,
        item: [
          {
            no: 9,
            Label: "WARRANTY EXPIRATION DATE",
            name: "warrantyExp",
            id: "warrantyExp",
            type: "date",
            required: true,
          },
          {
            no: 10,
            Label: "Preventive maintenance frequency",
            name: "pmFrequency",
            id: "pmFrequency",
            type: "select",
            option: [
              {
                id: "Daily",
                value: "Daily",
                Label: "Daily",
              },
              {
                id: "Weekly",
                value: "Weekly",
                Label: "Weekly",
              },
              {
                id: "Monthly",
                value: "Monthly",
                Label: "Monthly",
              },
              {
                id: "Yearly",
                value: "Yearly",
                Label: "Yearly",
              },
            ],
            required: true,
          },
        ],
      },
      {
        no: 11,
        id: 11,
        item: [
          {
            no: 11,
            Label: "maintenance duration",
            name: "maintananceDuration",
            id: "maintananceDuration",
            type: "text",
            required: true,
          },
          {
            no: 12,
            Label: "date of commisioning",
            name: "doc",
            id: "doc",
            type: "date",
            required: true,
          },
        ],
      },
      {
        no: 13,
        id: 13,
        item: [
          {
            no: 13,
            Label: "date of installation",
            name: "doi",
            id: "doi",
            type: "date",
            required: true,
          },
          {
            no: 14,
            Label: "OWNER NAME",
            name: "owner",
            id: "owner",
            type: "select",
            required: false,
            option: [],
          },
        ],
      },
    ],
    DOCUMENT_EQUIPMENT_UPLOAD: [
      {
        no: 1,
        Label: "Document Name",
        name: "name",
        id: "name",
        type: "text",
        required: false,
      },

      {
        no: 2,
        id: 2,
        item: [
          {
            no: 2,
            Label: "Doc Number",
            name: "number",
            id: "number",
            type: "number",
            required: true,
          },
          {
            no: 3,
            Label: "Document Type",
            name: "type",
            id: "type",
            type: "select",
            required: true,
            option: [
              {
                id: "Warrant Document",
                value: "Warrant Document",
                Label: "Warrant Document",
              },
              {
                id: "Manual Book",
                value: "Manual Book",
                Label: "Manual Book",
              },
              {
                id: "ID Card",
                value: "ID Card",
                Label: "ID Card",
              },
              {
                id: "Other",
                value: "Other",
                Label: "Other",
              },
            ],
          },
        ],
      },
      {
        no: 4,
        Label: "Upload Document",
        name: "documents",
        id: "documents",
        type: "dragupload",
        required: false,
      },
    ],
    PURCHASE_REQUEST_FORM: [
      {
        no: 1,
        Label: "Product Name",
        name: "product",
        id: "product",
        type: "text",
        required: false,
      },
      {
        no: 2,
        id: 2,
        item: [
          {
            no: 2,
            Label: "quantity",
            name: "quantity",
            id: "quantity",
            type: "number",
            required: true,
          },
          {
            no: 3,
            Label: "ticket reference",
            name: "maintenanceRequestId",
            id: "maintenanceRequestId",
            type: "select",
            required: false,
            option: [],
          },
        ],
      },
      {
        no: 4,
        id: 4,
        item: [
          {
            no: 4,
            Label: "Purpose of use",
            name: "purpose",
            id: "purpose",
            type: "text",
            required: true,
          },
          {
            no: 5,
            Label: "PRODUCT CATEGORY",
            name: "equipmentCategoryId",
            id: "equipmentCategoryId",
            type: "select",
            required: true,
            option: [],
          },
        ],
      },
      {
        no: 6,
        id: 6,
        item: [
          {
            no: 6,
            Label: "Product type",
            name: "type",
            id: "type",
            type: "text",
            required: false,
          },
          {
            no: 7,
            Label: "unit of measure",
            name: "unit",
            id: "unit",
            type: "select",
            required: false,
            option: [
              {
                id: "Nos",
                value: "Nos",
                Label: "Nos",
              },
              {
                id: "Cm",
                value: "Cm",
                Label: "Cm",
              },
              {
                id: "Km",
                value: "Km",
                Label: "Km",
              },
              {
                id: "Meter",
                value: "Meter",
                Label: "Meter",
              },
              {
                id: "Inches",
                value: "Inches",
                Label: "Inches",
              },
              {
                id: "Kg",
                value: "Kg",
                Label: "Kg",
              },
              {
                id: "Lot",
                value: "Lot",
                Label: "Lot",
              },
              {
                id: "Gram",
                value: "Gram",
                Label: "Gram",
              },
              {
                id: "Liter",
                value: "Liter",
                Label: "Liter",
              },
            ],
          },
        ],
      },
      {
        no: 8,
        id: 8,
        item: [
          {
            no: 8,
            Label: "Date",
            name: "date",
            id: "date",
            type: "date",
            required: true,
          },
        ],
      },
    ],
    NEW_VENDOR_REGISTRATION: [
      {
        no: 1,
        Label: "Full Name",
        name: "name",
        id: "name",
        type: "text",
        required: true,
      },
      {
        no: 2,
        id: 2,
        item: [
          {
            no: 2,
            Label: "Contact name",
            name: "contactName",
            id: "contactName",
            type: "text",
            required: true,
          },
          {
            no: 3,
            Label: "Bussiness name",
            name: "businessName",
            id: "businessName",
            type: "text",
            required: true,
          },
        ],
      },
      {
        no: 4,
        id: 4,
        item: [
          {
            no: 4,
            Label: "phone number",
            name: "mobile",
            id: "mobile",
            type: "text",
            required: true,
          },
          {
            no: 5,
            Label: "email address",
            name: "email",
            id: "email",
            type: "email",
            required: true,
          },
        ],
      },
      {
        no: 6,
        Label: "Address",
        name: "address1",
        id: "address1",
        type: "text",
        required: false,
      },
      {
        no: 6,
        Label: "",
        name: "address2",
        id: "address2",
        type: "text",
        required: false,
      },
    ],
    SETTING_PLANT_PASSWORD: [
      {
        no: 1,
        id: 1,
        item: [
          {
            no: 1,
            Label: "current password",
            name: "currentPassword",
            id: "currentPassword",
            type: "password",
            required: true,
          },
        ],
      },
      {
        no: 2,
        id: 2,
        item: [
          {
            no: 2,
            Label: "new password",
            name: "newPassword",
            id: "newPassword",
            type: "password",
            required: true,
          },
          {
            no: 3,
            Label: "confirm password",
            name: "conpassword",
            id: "conpassword",
            type: "password",
            required: true,
            rule: ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          },
        ],
      },
    ],
    SETTING_PLANT_DETAIL: [
      {
        no: 1,
        id: 1,
        item: [
          {
            no: 1,
            Label: "Username",
            name: "email",
            id: "email",
            type: "email",
            required: true,
          },
        ],
      },
      {
        no: 3,
        id: 3,
        item: [
          {
            no: 1,
            Label: "SITE Name",
            name: "siteName",
            id: "siteName",
            type: "text",
            required: true,
          },
          {
            no: 2,
            Label: "site location",
            name: "siteLocation",
            id: "siteLocation",
            type: "text",
            required: true,
            option: [],
          },
          {
            no: 3,
            Label: "site land area",
            name: "siteLandArea",
            id: "siteLandArea",
            type: "text",
            required: true,
            option: [],
          },
        ],
      },
      {
        no: 4,
        id: 4,
        item: [
          {
            no: 1,
            Label: "Plant Capacity (KWP)",
            name: "plantCapacity",
            id: "plantCapacity",
            type: "number",
            required: true,
          },
          {
            no: 2,
            Label: "Water avaibility",
            name: "waterAvailability",
            id: "waterAvailability",
            type: "text",
            required: true,
          },
          {
            no: 3,
            Label: "Water condition",
            name: "waterCondition",
            id: "waterCondition",
            type: "text",
            required: true,
          },
        ],
      },
      {
        no: 5,
        id: 5,
        item: [
          // {
          //   no: 1,
          //   Label: "Plant Capacity (KWP)",
          //   name: "capacity",
          //   id: "capacity",
          //   type: "number",
          //   required: true,
          // },
          {
            no: 2,
            Label: "Cleaning Frequency",
            name: "clearFrequency",
            id: "clearFrequency",
            type: "text",
            required: true,
          },
          {
            no: 3,
            Label: "Cleaning method",
            name: "clearMethod",
            id: "clearMethod",
            type: "text",
            required: true,
          },
          {
            no: 1,
            Label: "zone",
            name: "zone",
            id: "zone",
            type: "number",
            required: true,
          },
        ],
      },
      {
        no: 6,
        id: 6,
        item: [
          {
            no: 1,
            Label: "area",
            name: "area",
            id: "area",
            type: "number",
            required: true,
          },
          {
            no: 2,
            Label: "inverter",
            name: "inverter",
            id: "inverter",
            type: "number",
            required: true,
          },
          {
            no: 3,
            Label: "rows",
            name: "rows",
            id: "rows",
            type: "number",
            required: true,
          },
        ],
      },
    ],
    NEW_CLIENT: [
      {
        no: 1,
        Label: "Client Name",
        name: "name",
        id: "name",
        type: "text",
        required: true,
      },
      {
        no: 2,
        Label: "plant Capacity",
        name: "plantCapacity",
        id: "plantCapacity",
        type: "number",
        required: true,
      },
    ],
    SETTING_CATEGORY_FORM: [
      {
        no: 1,
        Label: "category",
        name: "category",
        id: "category",
        type: "text",
        required: true,
      },
    ],
    SETTING_ROUTINE_CHECKUP: [
      {
        no: 1,
        id: 1,
        item: [
          {
            no: 1,
            Label: "Category",
            name: "category",
            id: "category",
            type: "text",
            required: true,
          },
          {
            no: 2,
            Label: "Sub Category",
            name: "subCategory",
            id: "subCategory",
            type: "text",
            required: true,
          },
        ],
      },
      {
        no: 2,
        id: 2,
        item: [
          {
            no: 3,
            Label: "Activities",
            name: "activities",
            id: "activities",
            type: "text",
            required: true,
          },
          {
            no: 4,
            Label: "Frequancy",
            name: "frequency",
            id: "frequency",
            type: "select",
            option: [
              {
                id: "Daily",
                value: "Daily",
                Label: "Daily",
              },
              {
                id: "Weekly",
                value: "Weekly",
                Label: "Weekly",
              },
              {
                id: "Monthly",
                value: "Monthly",
                Label: "Monthly",
              },
              {
                id: "Yearly",
                value: "Yearly",
                Label: "Yearly",
              },
            ],
            required: true,
          },
        ],
      },
      {
        no: 3,
        id: 3,
        item: [
          {
            no: 5,
            Label: "Priority",
            name: "priority",
            id: "priority",
            type: "select",
            option: [
              {
                id: "Low",
                value: "Low",
                Label: "Low",
              },
              {
                id: "Medium",
                value: "Medium",
                Label: "Medium",
              },
              {
                id: "High",
                value: "High",
                Label: "High",
              },
            ],
            required: true,
          },
        ],
      },
    ],
    EVENT_LOG_FORM: [
      {
        no: 1,
        id: 1,
        item: [
          {
            no: 1,
            Label: "Event details",
            name: "event",
            id: "event",
            type: "text",
            required: true,
          },
          {
            no: 2,
            Label: "Event type",
            name: "type",
            id: "type",
            type: "text",
            required: true,
          },
        ],
      },
      {
        no: 2,
        id: 2,
        item: [
          {
            no: 3,
            Label: "From",
            name: "from",
            id: "from",
            type: "date",
            required: true,
          },
          {
            no: 4,
            Label: "to",
            name: "to",
            id: "to",
            type: "date",
            required: true,
          },
        ],
      },
      {
        no: 3,
        id: 3,
        item: [
          {
            no: 5,
            Label: "Attanded by",
            name: "employeeId",
            id: "employeeId",
            type: "select",
            required: true,
            option: [],
          },
          // {
          //   no: 2,
          //   Label: "Sub Category",
          //   name: "subCategory",
          //   id: "subCategory",
          //   type: "text",
          //   required: true,
          // },
        ],
      },
      {
        no: 6,
        Label: "Action taken",
        name: "actionTaken",
        id: "actionTaken",
        type: "text",
        required: false,
      },
      {
        no: 7,
        Label: "Remark",
        name: "remark",
        id: "remark",
        type: "text",
        required: false,
      },
    ],
    ABT_FORM: [
      {
        no: 1,
        id: 1,
        item: [
          {
            no: 1,
            Label: "ABT Number",
            name: "abtNo",
            id: "abtNo",
            type: "text",
            required: true,
          },
          {
            no: 2,
            Label: "date",
            name: "date",
            id: "date",
            type: "date",
            required: true,
          },
        ],
      },
      {
        no: 2,
        id: 2,
        item: [
          {
            no: 2,
            Label: "import",
            name: "import",
            id: "import",
            type: "number",
            required: true,
          },
          {
            no: 4,
            Label: "export",
            name: "export",
            id: "export",
            type: "number",
            required: true,
          },
        ],
      },
    ],
    CLEANING_FORM: [
      {
        no: 1,
        id: 1,
        item: [
          {
            no: 1,
            Label: "zone",
            name: "zone",
            id: "zone",
            type: "text",
            required: true,
          },
          {
            no: 2,
            Label: "supervisor",
            name: "employeeId",
            id: "employeeId",
            type: "select",
            option: [],
            required: true,
          },
        ],
      },
      {
        no: 2,
        id: 2,
        item: [
          {
            no: 3,
            Label: "from Row",
            name: "fromRow",
            id: "fromRow",
            type: "text",
            required: true,
          },
          {
            no: 4,
            Label: "to Row",
            name: "toRow",
            id: "toRow",
            type: "text",
            required: true,
          },
        ],
      },
      {
        no: 3,
        id: 3,
        item: [
          {
            no: 5,
            Label: "modules",
            name: "modules",
            id: "modules",
            type: "text",
            required: true,
          },
          {
            no: 6,
            Label: "rows",
            name: "rows",
            id: "rows",
            type: "text",
            required: true,
          },
        ],
      },
      {
        no: 4,
        id: 4,
        item: [
          {
            no: 7,
            Label: "total KWP",
            name: "totalKWP",
            id: "totalKWP",
            type: "number",
            required: true,
          },
          {
            no: 8,
            Label: "workers",
            name: "workers",
            id: "workers",
            type: "number",
            required: true,
          },
        ],
      },
      {
        no: 5,
        id: 5,
        item: [
          {
            no: 9,
            Label: "start Date",
            name: "startDate",
            id: "startDate",
            type: "date",
            required: true,
          },
          {
            no: 10,
            Label: "end Date",
            name: "endDate",
            id: "endDate",
            type: "date",
            required: true,
          },
        ],
      },
      // {
      //   no: 11,
      //   Label: "Remark",
      //   name: "remark",
      //   id: "remark",
      //   type: "text",
      //   required: false,
      // },
    ],
    EXPANSE_FORM: [
      {
        no: 1,
        Label: "party",
        name: "partyName",
        id: "partyName",
        type: "text",
        required: true,
      },
      {
        no: 2,
        id: 2,
        item: [
          {
            no: 2,
            Label: "expanse Date",
            name: "expanseDate",
            id: "expanseDate",
            type: "date",
            required: true,
          },
          {
            no: 3,
            Label: "category",
            name: "category",
            id: "category",
            type: "select",
            option: [
              {
                id: "Travel",
                value: "Travel",
                Label: "Travel",
              },
              {
                id: "Misc",
                value: "Misc",
                Label: "Misc",
              },
              {
                id: "Fuel",
                value: "Fuel",
                Label: "Fuel",
              },
              {
                id: "Food",
                value: "Food",
                Label: "Food",
              },
              {
                id: "Accomodation",
                value: "Accomodation",
                Label: "Accomodation",
              },
              {
                id: "Office",
                value: "Office",
                Label: "Office",
              },
              {
                id: "Courier",
                value: "Courier",
                Label: "Courier",
              },
            ],
            required: true,
          },
        ],
      },
      {
        no: 3,
        id: 3,
        item: [
          {
            no: 4,
            Label: "amount",
            name: "amount",
            id: "amount",
            type: "number",
            required: true,
          },
          {
            no: 6,
            Label: "payment Mode",
            name: "payment",
            id: "payment",
            type: "select",
            option: [
              // {
              //   id: "Offline",
              //   value: "Offline",
              //   Label: "Offline",
              // },
              // {
              //   id: "Online",
              //   value: "Online",
              //   Label: "Online",
              // },
              {
                id: "Cash",
                value: "Cash",
                Label: "Cash",
              },
              {
                id: "Cheque",
                value: "Cheque",
                Label: "Cheque",
              },
              {
                id: "UPI",
                value: "UPI",
                Label: "UPI",
              },
              {
                id: "Credit/Debit Card",
                value: "Credit/Debit Card",
                Label: "Credit/Debit Card",
              },
            ],
            required: true,
          },
        ],
      },
      {
        no: 7,
        Label: "Remark",
        name: "remark",
        id: "remark",
        type: "text",
        required: false,
      },
      {
        no: 8,
        Label: "description",
        name: "description",
        id: "description",
        type: "text",
        required: false,
      },
      {
        no: 6,
        id: 6,
        item: [
          {
            no: 9,
            Label: "tracking",
            name: "tracking",
            id: "tracking",
            type: "radio",
            option: [
              {
                id: "Employee (to reimburse)",
                value: "Employee",
                Label: "Employee",
              },
              {
                id: "Company",
                value: "Company",
                Label: "Company",
              },
            ],
            required: true,
          },
          {
            no: 10,
            Label: "bill Reference",
            name: "billReference",
            id: "billReference",
            type: "text",
            required: true,
          },
        ],
      },
      {
        no: 5,
        id: 5,
        item: [
          {
            no: 11,
            Label: "Upload recipt",
            name: "receipt",
            id: "receipt",
            type: "file",
            required: false,
          },
        ],
      },
      // {
      //   no: 11,
      //   Label: "Remark",
      //   name: "remark",
      //   id: "remark",
      //   type: "text",
      //   required: false,
      // },
    ],
    VEHICAL_EXPANSE_FORM: [
      {
        no: 1,
        id: 1,
        item: [
          {
            no: 1,
            Label: "vehicle Type",
            name: "vehicle",
            id: "vehicle",
            type: "select",
            option: [
              {
                id: "Car",
                value: "Car",
                Label: "Car",
              },
              {
                id: "Bike",
                value: "Bike",
                Label: "Bike",
              },
            ],
            required: true,
          },
          {
            no: 2,
            Label: "vehicle Number",
            name: "vehicleNumber",
            id: "vehicleNumber",
            type: "text",
            required: true,
          },
        ],
      },
      {
        no: 2,
        id: 2,
        item: [
          {
            no: 3,
            Label: "expanse date",
            name: "date",
            id: "date",
            type: "date",
            required: true,
          },
          {
            no: 4,
            Label: "category",
            name: "category",
            id: "category",
            type: "select",
            option: [
              {
                id: "Fuel",
                value: "Fuel",
                Label: "Fuel",
              },
              {
                id: "Service",
                value: "Service",
                Label: "Service",
              },
              {
                id: "Breakdown",
                value: "Breakdown",
                Label: "Breakdown",
              },
            ],
            required: true,
          },
        ],
      },
      {
        no: 3,
        id: 3,
        item: [
          {
            no: 5,
            Label: "cost",
            name: "coast",
            id: "coast",
            type: "number",
            required: true,
          },
          {
            no: 6,
            Label: "odometer reading",
            name: "odometerReading",
            id: "odometerReading",
            type: "number",
            required: true,
          },
        ],
      },
      {
        no: 7,
        Label: "driver",
        name: "employeeId",
        id: "employeeId",
        type: "select",
        option: [],
        required: false,
      },
      {
        no: 8,
        Label: "Remark",
        name: "remark",
        id: "remark",
        type: "text",
        required: false,
      },
      {
        no: 6,
        id: 6,
        item: [
          {
            no: 7,
            Label: "receipt",
            name: "receipt",
            id: "receipt",
            type: "file",
            required: false,
          },
        ],
      },
    ],
  },
  TABLE: {
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
  API: {
    login: {
      type: "POST",
      endpoint: "/user/login",
    },
    signUp: { type: "POST", endpoint: "/user/signup" },
    getMe: {
      type: "GET",
      endpoint: "/user/getMe",
    },
    driver: {
      type: "GET",
      endpoint: "/driver",
    },
    employee: {
      type: "GET",
      endpoint: "/employee",
    },
    oneEmployee: {
      type: "GET",
      endpoint: "/employee?eId=:id",
    },
    updatedEmployee: {
      type: "PATCH",
      endpoint: "/employee/:id",
    },
    oneEmployeeId: {
      type: "GET",
      endpoint: "/employee/:id",
    },
    addEmployee: {
      type: "POST",
      endpoint: "/employee",
    },
    documentEmployee: {
      type: "GET",
      endpoint: "/employeedocument?eId=:id",
    },
    uploadEmployeeDocument: {
      type: "POST",
      endpoint: "/employeedocument",
    },
    deleteEmployeeDocument: {
      type: "DELETE",
      endpoint: "/employeedocument/:id",
    },
    leaverequest: {
      type: "POST",
      endpoint: "/leaverequest",
    },
    leaverequestUpdate: {
      type: "PATCH",
      endpoint: "/leaverequest/:id",
    },
    leaverequestDelete: {
      type: "DELETE",
      endpoint: "/leaverequest/:id",
    },
    TimeoffEmployee: {
      type: "GET",
      endpoint: "/leaverequest?eId=:id",
    },
    inventory: {
      type: "GET",
      endpoint: "/inventoryinward",
    },
    inventoryUpdate: {
      type: "PATCH",
      endpoint: "/inventoryinward/:id",
    },
    inventoryDelete: {
      type: "DELETE",
      endpoint: "/inventoryinward/:id",
    },
    inventoryCreate: {
      type: "POST",
      endpoint: "/inventoryinward",
    },
    inventoryById: {
      type: "GET",
      endpoint: "/inventoryinward/:id",
    },
    AllEquipment: {
      type: "GET",
      endpoint: "/equipment",
    },
    equipmentById: {
      type: "GET",
      endpoint: "/equipment/:id",
    },
    updateequipment: {
      type: "PATCH",
      endpoint: "/equipment/:id",
    },
    equipment: {
      type: "POST",
      endpoint: "/equipment",
    },
    maintenance: {
      type: "GET",
      endpoint: "/maintenancerequest",
    },
    documentEquipment: {
      type: "GET",
      endpoint: "/equipmentdocument?equipmentId=:id",
    },
    uploadEquipmentDocument: {
      type: "POST",
      endpoint: "/equipmentdocument",
    },
    deleteEquipmentDocument: {
      type: "DELETE",
      endpoint: "/equipmentdocument/:id",
    },
    purchaserequesition: {
      type: "POST",
      endpoint: "/purchaserequesition",
    },
    purchaserequesitionUpdate: {
      type: "PATCH",
      endpoint: "/purchaserequesition/:id",
    },
    purchaserequesitionDelete: {
      type: "DELETE",
      endpoint: "/purchaserequesition/:id",
    },
    purchaserequesitiongetAll: {
      type: "GET",
      endpoint: "/purchaserequesition",
    },
    eventlogCreate: {
      type: "POST",
      endpoint: "/eventlog",
    },
    eventlogUpdate: {
      type: "PATCH",
      endpoint: "/eventlog/:id",
    },
    eventlogDelete: {
      type: "DELETE",
      endpoint: "/eventlog/:id",
    },
    eventlogAll: {
      type: "GET",
      endpoint: "/eventlog",
    },
    cleaningCreate: {
      type: "POST",
      endpoint: "/cleaning",
    },
    cleaningUpdate: {
      type: "PATCH",
      endpoint: "/cleaning/:id",
    },
    cleaningDelete: {
      type: "DELETE",
      endpoint: "/cleaning/:id",
    },
    cleaningAll: {
      type: "GET",
      endpoint: "/cleaning",
    },
    expanseCreate: {
      type: "POST",
      endpoint: "/expanse",
    },
    expanseUpdate: {
      type: "PATCH",
      endpoint: "/expanse/:id",
    },
    expanseDelete: {
      type: "DELETE",
      endpoint: "/expanse/:id",
    },
    expanseAll: {
      type: "GET",
      endpoint: "/expanse",
    },
    vehicleexpanseCreate: {
      type: "POST",
      endpoint: "/vehicleexpanse",
    },
    vehicleexpanseUpdate: {
      type: "PATCH",
      endpoint: "/vehicleexpanse/:id",
    },
    vehicleexpanseDelete: {
      type: "DELETE",
      endpoint: "/vehicleexpanse/:id",
    },
    vehicleexpanseAll: {
      type: "GET",
      endpoint: "/vehicleexpanse",
    },
    abtCreate: {
      type: "POST",
      endpoint: "/abt",
    },
    abtUpdate: {
      type: "PATCH",
      endpoint: "/abt/:id",
    },
    abtDelete: {
      type: "DELETE",
      endpoint: "/abt/:id",
    },
    abtAll: {
      type: "GET",
      endpoint: "/abt",
    },
    maintenanceRequests: {
      type: "GET",
      endpoint: "/maintenancerequest",
    },
    equipmentcategory: {
      type: "GET",
      endpoint: "/equipmentcategory",
    },
    employmenttype: {
      type: "GET",
      endpoint: "/employmenttype",
    },
    shifts: {
      type: "GET",
      endpoint: "/shifts",
    },
    getAllManagers: {
      type: "GET",
      endpoint: "/employee",
    },
    getAlldepartment: {
      type: "GET",
      endpoint: "/department",
    },
    plantdocument: {
      type: "GET",
      endpoint: "/document",
    },
    plantdocumentDelete: {
      type: "DELETE",
      endpoint: "/document/:id",
    },
    plantdocumentUpload: {
      type: "POST",
      endpoint: "/document",
    },
    getAllClients: {
      type: "GET",
      endpoint: "/client",
    },
    createClient: {
      type: "POST",
      endpoint: "/client",
    },
    updateClient: {
      type: "PATCH",
      endpoint: "/client/:id",
    },
    deleteClient: {
      type: "DELETE",
      endpoint: "/client/:id",
    },
    productCategory: {
      type: "GET",
      endpoint: "/productcategory",
    },
    getAllproduct: {
      type: "GET",
      endpoint: "/product",
    },
    createProduct: {
      type: "POST",
      endpoint: "/product",
    },
    createInventoryoutword: {
      type: "POST",
      endpoint: "/inventoryoutward",
    },
    TransferInventory: {
      type: "GET",
      endpoint: "/inventoryoutward/transfers",
    },
    TransferUpdate: {
      type: "PATCH",
      endpoint: "/inventoryoutward/:id",
    },
    TransferDelete: {
      type: "DELETE",
      endpoint: "/inventoryoutward/:id",
    },
    inventoryProductCategory: {
      type: "GET",
      endpoint: "/productcategory",
    },
    equipmentProductCategory: {
      type: "GET",
      endpoint: "/equipmentcategory",
    },
    addinventoryProductCategory: {
      type: "POST",
      endpoint: "/productcategory",
    },
    deleteinventoryProductCategory: {
      type: "DELETE",
      endpoint: "/productcategory/:id",
    },
    updateinventoryProductCategory: {
      type: "PATCH",
      endpoint: "/productcategory/:id",
    },
    addequipmentProductCategory: {
      type: "POST",
      endpoint: "/equipmentcategory",
    },
    deleteequipmentProductCategory: {
      type: "DELETE",
      endpoint: "/equipmentcategory/:id",
    },
    updateequipmentProductCategory: {
      type: "PATCH",
      endpoint: "/equipmentcategory/:id",
    },
    getallvendors: {
      type: "GET",
      endpoint: "/vendor",
    },
    createvendor: {
      type: "POST",
      endpoint: "/vendor",
    },
    deletevendor: {
      type: "DELETE",
      endpoint: "/vendor/:id",
    },
    updatevendor: {
      type: "PATCH",
      endpoint: "/vendor/:id",
    },
    checkupgetAll: {
      type: "GET",
      endpoint: "/checkup",
    },
    checkupgetAdd: {
      type: "POST",
      endpoint: "/checkup",
    },
    checkupDelete: {
      type: "DELETE",
      endpoint: "/checkup/:id",
    },
    checkupUpdate: {
      type: "PATCH",
      endpoint: "/checkup/:id",
    },
    updatePlant: {
      type: "PATCH",
      endpoint: "/user/updateplant",
    },
    updatePassword: {
      type: "PATCH",
      endpoint: "/user/password",
    },
    movehistory: {
      type: "GET",
      endpoint: "/inventoryoutward/moves",
    },
  },
};
export default CONSTANTS;
