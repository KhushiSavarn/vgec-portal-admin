// import React from "react";
// import { Button, Form, Modal, Popconfirm } from "antd";
// import FormFields from "./FormFields";

// const ModalFormCreator = ({
//   open,
//   onCreate,
//   onCancel,
//   name = "",
//   formData = {},
//   menuFields,
//   disabled = false,
//   edit,
//   SubmitName = "Submit",
//   onEdit = () => {},
//   Delete,
//   onDelete = () => {},
//   formFields = [],
//   children,
// }) => {
//   const [form] = Form.useForm();
//   const footer = {
//     footer: [
//       edit && (
//         <Button
//           key="edit"
//           style={{
//             borderRadius: "4px",
//             height: "40px",
//             width: "200px",
//           }}
//           ghost
//           type="primary"
//           onClick={onEdit}
//         >
//           Edit
//         </Button>
//       ),
//       Delete && (
//         <Popconfirm
//           onConfirm={onDelete}
//           key="deleteConfirm"
//           title={`Delete ${name.toLowerCase()}`}
//           description={`Are you sure to delete ${name.toLowerCase()}`}
//         >
//           <Button
//             key="delete"
//             style={{
//               borderRadius: "4px",
//               height: "40px",
//               width: "200px",
//             }}
//             ghost
//             type="primary"
//             danger
//             // onClick={onDelete}
//           >
//             Delete
//           </Button>
//         </Popconfirm>
//       ),
//       <Button
//         key="submit"
//         style={{
//           // background: "#2E5BFF",
//           borderRadius: "4px",
//           height: "40px",
//           width: "200px",
//         }}
//         type="primary"
//         onClick={() => {
//           form
//             .validateFields()
//             .then((values) => {
//               form.resetFields();
//               onCreate(values);
//             })
//             .catch((info) => {
//               console.log("Validate Failed:", info);
//             });
//         }}
//       >
//         {SubmitName}
//       </Button>,
//     ],
//   };
//   return (
//     <Modal
//       open={open}
//       title={<p className="text-2xl mb-10 text-slate-500">{name}</p>}
//       okText="Submit"
//       width={700}
//       {...footer}
//       cancelButtonProps={{ style: { display: "none" } }}
//       className="form-modal-title"
//       onCancel={onCancel}
//       onOk={() => {
//         form
//           .validateFields()
//           .then((values) => {
//             form.resetFields();
//             onCreate(values);
//           })
//           .catch((info) => {
//             console.log("Validate Failed:", info);
//           });
//       }}
//     >
//       <FormFields
//         formData={formData}
//         menuFields={menuFields}
//         formFields={formFields}
//         form={form}
//         disabled={disabled}
//       />
//       {children}
//     </Modal>
//   );
// };

// export default ModalFormCreator;
// ModalFormCreator.defaultProps = {
//   open: false,
//   onCreate: () => {},
//   onCancel: () => {},
//   name: "",
//   formData: {},
//   menu: "",
//   edit: false,
//   onEdit: () => {},
//   formFields: [],
// };
import React, { useState } from "react";
import { Button, Form, Modal, Popconfirm } from "antd";
import FormFields from "./FormFields";
import CONSTANTS from "../../util/constant/CONSTANTS";

const ModalFormCreator = ({
  open,
  onCreate,
  Submit = true,
  onCancel,
  name = "",
  DeleteTitle,
  formData = {},
  menuFields,
  disabled = false,
  edit,
  changedFields = {},
  onChangedFields = () => {},
  SubmitName = "Submit",
  onEdit = () => {},
  Delete,
  disableSubmit = true,
  onDelete = () => {},
  formFields = [],
  children,
  inbuilt = true,
  loading = false,
}) => {
  const [defaultData, setDefaultData] = useState(null);
  // const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  let fieldChangeData = {};

  const handleEdit = () => {
    if (CONSTANTS.USER_ROLE) {
      return;
    }
    onEdit();
  };

  const handleDelete = () => {
    if (CONSTANTS.USER_ROLE) {
      return;
    }
    onDelete();
  };

  const handleFormSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        setDefaultData(values);
        Object.keys(fieldChangeData).forEach((key) => {
          if (formData[key] !== fieldChangeData[key]) {
            changedFields[key] = fieldChangeData[key];
          }
        });
        onCreate(values, () => {
          setDefaultData(null);
        });
        onChangedFields(changedFields);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleModalCancel = () => {
    setDefaultData(null);
    form.resetFields();
    onCancel();
  };

  const footer = {
    footer: [
      edit && (
        <Button
          key="edit"
          style={{
            borderRadius: "4px",
            height: "40px",
            width: "200px",
          }}
          disabled={CONSTANTS.USER_ROLE}
          ghost
          type="primary"
          onClick={handleEdit}
        >
          Edit
        </Button>
      ),
      Delete && (
        <Popconfirm
          onConfirm={handleDelete}
          key="deleteConfirm"
          disabled={CONSTANTS.USER_ROLE}
          title={`Delete ${DeleteTitle || name.toLowerCase()}`}
          description={`Are you sure to delete ${
            DeleteTitle || name.toLowerCase()
          }`}
        >
          <Button
            key="delete"
            style={{
              borderRadius: "4px",
              height: "40px",
              width: "200px",
            }}
            ghost
            type="primary"
            danger
          >
            Delete
          </Button>
        </Popconfirm>
      ),
      Submit && (
        <Button
          key="submit"
          disabled={CONSTANTS.USER_ROLE && disableSubmit}
          style={{
            borderRadius: "4px",
            height: "40px",
            width: "200px",
          }}
          type="primary"
          onClick={handleFormSubmit}
          loading={loading}
        >
          {SubmitName}
        </Button>
      ),
    ],
  };

  return (
    <Modal
      open={open}
      title={<p className="form-modal-head mb25">{name}</p>}
      okText="Submit"
      width={1000}
      {...footer}
      cancelButtonProps={{ style: { display: "none" } }}
      className="form-modal-title"
      onCancel={handleModalCancel}
      onOk={handleFormSubmit}
    >
      {inbuilt && (
        <FormFields
          formData={defaultData || formData}
          menuFields={menuFields}
          formFields={formFields}
          form={form}
          disabled={disabled}
          changedFields={fieldChangeData}
        />
      )}
      {children}
    </Modal>
  );
};

export default ModalFormCreator;

ModalFormCreator.defaultProps = {
  open: false,
  onCreate: () => {},
  onCancel: () => {},
  name: "",
  formData: {},
  menuFields: [],
  edit: false,
  onEdit: () => {},
  formFields: [],
};
