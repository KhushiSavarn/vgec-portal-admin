import React from "react";
import { Button, Form, Modal, Popconfirm } from "antd";
import FormFields from "./FormFields";

const ModalFormCreator = ({
  open,
  onCreate,
  onCancel,
  name = "",
  formData = {},
  menu,
  disabled = false,
  edit,
  SubmitName = "Submit",
  onEdit = () => {},
  Delete,
  onDelete = () => {},
  formFields = [],
  children,
}) => {
  const [form] = Form.useForm();
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
          ghost
          type="primary"
          onClick={onEdit}
        >
          Edit
        </Button>
      ),
      Delete && (
        <Popconfirm
          onConfirm={onDelete}
          key="deleteConfirm"
          title={`Delete ${name.toLowerCase()}`}
          description={`Are you sure to delete ${name.toLowerCase()}`}
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
            // onClick={onDelete}
          >
            Delete
          </Button>
        </Popconfirm>
      ),
      <Button
        key="submit"
        style={{
          // background: "#2E5BFF",
          borderRadius: "4px",
          height: "40px",
          width: "200px",
        }}
        type="primary"
        onClick={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        {SubmitName}
      </Button>,
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
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <FormFields
        formData={formData}
        menu={menu}
        formFields={formFields}
        form={form}
        disabled={disabled}
      />
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
  menu: "",
  edit: false,
  onEdit: () => {},
  formFields: [],
};
