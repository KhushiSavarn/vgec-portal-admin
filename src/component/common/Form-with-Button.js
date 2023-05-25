// import { Button, Form } from "antd";
// import React from "react";
// import FormFields from "./FormFields";

// const FormWithButton = ({
//   menu,
//   formData,
//   formFields = [],
//   onCreate,
//   name = "Create",
//   threeField = false,
// }) => {
//   const [form] = Form.useForm();
//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         width: "900px",
//         marginTop: "20px",
//       }}
//     >
//       <FormFields
//         formData={formData}
//         menu={menu}
//         formFields={formFields}
//         form={form}
//         normal={true}
//         threeField={threeField}
//       />
//       <div
//         style={{ width: "100px", display: "flex", justifyContent: "center" }}
//       >
//         <Button
//           onClick={() => {
//             form
//               .validateFields()
//               .then((values) => {
//                 form.resetFields();
//                 onCreate(values);
//               })
//               .catch((info) => {
//                 console.log("Validate Failed:", info);
//               });
//           }}
//           type="primary"
//           ghost
//           block
//         >
//           {name}
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default FormWithButton;
import { Button, Col, Form, Row } from "antd";
import React from "react";
import FormFields from "./FormFields";

const FormWithButton = ({
  menu,
  formData,
  formFields = [],
  onCreate,
  name = "Create",
  threeField = false,
}) => {
  const [form] = Form.useForm();
  return (
    <>
      <Row>
        <Col span={18} className="mt15">
          <Row>
            <FormFields
              formData={formData}
              menu={menu}
              formFields={formFields}
              form={form}
              normal={true}
              threeField={threeField}
            />
          </Row>
        </Col>
        <Col span={6} className="mt35">
          <Button
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
            type="primary"
            ghost
            block
          >
            {name}
          </Button>
        </Col>
      </Row>
      {/* <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "900px",
          marginTop: "20px",
        }}
      >
        <FormFields
          formData={formData}
          menu={menu}
          formFields={formFields}
          form={form}
          normal={true}
          threeField={threeField}
        />
        <div
          style={{ width: "100px", display: "flex", justifyContent: "center" }}
        >
          <Button
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
            type="primary"
            ghost
            block
          >
            {name}
          </Button>
        </div>
      </div> */}
    </>
  );
};

export default FormWithButton;
