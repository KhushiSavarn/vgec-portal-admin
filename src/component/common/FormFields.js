import React, { useEffect } from "react";
import {
  AutoComplete,
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Space,
  Switch,
  TimePicker,
  Upload,
} from "antd";
import Label from "./Label";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import CONSTANTS from "../../util/constant/CONSTANTS";
import dayjs from "dayjs";
import FormList from "antd/es/form/FormList";
import TextEditor from "./Text-Editor";
import Heading from "./Heading";

const FormFields = ({
  changedFields = {},
  formData = {},
  menuFields = [],
  formFields = [],
  form,
  disabled = false,
}) => {
  const AllFieldsData =
    formFields && Array.isArray(formFields) && formFields.length > 0
      ? formFields
      : menuFields;
  const getInputFormate = (data) => {
    const normFile = (e) => {
      // console.log("Upload event:", e);
      if (Array.isArray(e)) {
        return e;
      }
      return e?.fileList;
    };
    switch (data.type) {
      case "date":
        const DateRules = [
          {
            required: data?.required,
            message: "Please select date!",
          },
        ];
        Array.isArray(data?.rule) &&
          data?.rule?.length > 1 &&
          DateRules.push(...data?.rule);
        return (
          <Form.Item
            name={data.name}
            id={data.id}
            className="form "
            // initialValue={
            //   data?.defaultValue ? dayjs(data?.defaultValue) : dayjs(new Date())
            // }
            required={data?.required}
            rules={DateRules}
          >
            <DatePicker
              showTime={data?.showTime ? { format: data?.showTime } : false}
              disabled={data?.disabled && formData[data?.name]}
              format={data?.format}
              // disabledDate={(current) => current.isAfter(moment())}
              placeholder={data.placeholder ? data.placeholder : ""}
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
        );
      case "time":
        const TimeRules = [
          {
            required: data?.required,
            message: "Please select date!",
          },
        ];
        Array.isArray(data?.rule) &&
          data?.rule?.length > 1 &&
          TimeRules.push(...data?.rule);
        return (
          <Form.Item
            name={data?.name}
            id={data?.id}
            className="form "
            // initialValue={
            //   data?.defaultValue
            //     ? dayjs(moment(data?.defaultValue))
            //     : dayjs(moment())
            // }
            rules={TimeRules}
          >
            <TimePicker
              showTime={data?.showTime}
              disabled={data?.disabled && formData[data?.name]}
              // placeholder={data.placeholder ? data.placeholder : ""}
              style={{
                width: "100%",
              }}
              format={data?.format ? data?.format : "HH:mm:ss"}
            />
          </Form.Item>
        );
      case "autocomplete":
        const AutoCompleteRules = [
          {
            type: "text",
            required: data?.required,
            message: "Please input date!",
          },
        ];
        Array.isArray(data?.rule) &&
          data?.rule?.length > 1 &&
          AutoCompleteRules.push(...data?.rule);
        return (
          <Form.Item
            name={data.name}
            id={data.id}
            className="form "
            rules={AutoCompleteRules}
          >
            <AutoComplete
              disabled={data?.disabled && formData[data?.name]}
              options={data?.option}
              filterOption={(inputValue, option) =>
                option?.value
                  ?.toUpperCase()
                  ?.indexOf(inputValue?.toUpperCase()) !== -1
              }
            />
          </Form.Item>
        );
      case "select":
        const SelectRules = [
          {
            required: data?.required,
            message: "Please select Valid " + data.Label,
          },
        ];
        Array.isArray(data?.rule) &&
          data?.rule?.length > 1 &&
          SelectRules.push(...data?.rule);
        return (
          <>
            <Form.Item
              name={data.name}
              id={data.id}
              className="form "
              initialValue={data?.defaultValue}
              hasFeedback
              rules={SelectRules}
            >
              <Select
                disabled={data?.disabled && formData[data?.name]}
                showSearch
                mode={data?.mode}
                placeholder={data.placeholder ? data.placeholder : ""}
                filterOption={(inputValue, option) => {
                  const value = option?.children?.props?.children[0]?.props
                    ?.children
                    ? `${option?.children?.props?.children[0]?.props?.children}`
                    : `${option?.children}`;
                  return value
                    ?.toLowerCase()
                    ?.includes(inputValue?.toLowerCase());
                }}
                allowClear // Allow clearing the selected value
              >
                {data.option &&
                  data.option.length > 0 &&
                  data.option.map((item) => (
                    <Select.Option key={`role_${item.id}`} value={item.value}>
                      {item.Label ? item.Label : item.value}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </>
        );
      case "dragupload":
        return (
          <Form.Item className="form mt-2">
            <Form.Item
              name={data.id}
              className="form "
              valuePropName="fileList"
              getValueFromEvent={normFile}
              noStyle
              rules={[
                {
                  required: data?.required,
                  message: "Please Enter valid " + data.Label,
                },
              ]}
            >
              <Upload.Dragger
                name={data.name}
                id={data.id}
                disabled={data?.disabled && formData[data?.name]}
                beforeUpload={() => {
                  return false;
                }}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload.
                </p>
              </Upload.Dragger>
            </Form.Item>
          </Form.Item>
        );
      case "file":
        return (
          <Form.Item
            name={data.name}
            className="form "
            id={data.id}
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[
              {
                required: data?.required,
                message: "Please Enter valid " + data.Label,
              },
            ]}
          >
            <Upload
              name="logo"
              disabled={data?.disabled && formData[data?.name]}
              listType="picture"
              accept={data?.acceptFormat}
              maxCount={1}
              beforeUpload={() => {
                return false;
              }}
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
        );
      case "number":
        return (
          <Form.Item
            name={data.name}
            className="form "
            rules={[
              {
                required: data?.required,
                message: "Please Enter valid " + data.Label,
              },
              {
                type: data.type,
                message: "Please Enter valid Number",
              },
            ]}
          >
            <InputNumber
              disabled={data?.disabled && formData[data?.name]}
              placeholder={data.placeholder ? data.placeholder : ""}
              controls={false}
              style={{
                width: "100%",
              }}
              value={formData && formData[data.id]}
            />
          </Form.Item>
        );
      case "mobile":
        return (
          <Form.Item
            name={data.name}
            className="form "
            rules={[
              // {
              //   required: data?.required,
              //   message: "Please Enter valid mobile number",
              // },
              {
                type: data.type,
                message: "Please Enter valid Number",
              },
              () => ({
                validator(_, value) {
                  // console.log(value);
                  if (value && /^\d{10}$/.exec(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Please Enter valid mobile number")
                  );
                },
              }),
            ]}
          >
            <InputNumber
              disabled={data?.disabled && formData[data?.name]}
              placeholder={data.placeholder ? data.placeholder : ""}
              controls={false}
              style={{
                width: "100%",
              }}
              value={formData && formData[data.id]}
              pattern="[1-9]{1}[0-9]{9}"
              maxLength={10}
            />
          </Form.Item>
        );
      case "checkbox":
        return (
          <Form.Item
            name={data.name}
            className="form "
            id={data.id}
            required={data?.required}
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox disabled={data?.disabled && formData[data?.name]}>
              {data.Label}
            </Checkbox>
          </Form.Item>
        );
      case "textarea":
        return (
          <Form.Item
            name={data.name}
            className="form "
            rules={[
              {
                required: data?.required,
                message: "Enter Valid " + data.Label,
              },
              data.rule && data.rule,
            ]}
          >
            <Input.TextArea
              disabled={data?.disabled && formData[data?.name]}
              placeholder={data.placeholder ? data.placeholder : ""}
              initialvalues={
                formData && data.type !== "file" ? formData[data.name] : ""
              }
            />
          </Form.Item>
        );
      case "richTextarea":
        return (
          <Form.Item
            name={data.name}
            className="form "
            style={{ height: "250px" }}
            rules={[
              {
                required: data?.required,
                message: "Enter Valid " + data.Label,
              },
              data.rule && data.rule,
            ]}
          >
            <TextEditor />
          </Form.Item>
        );
      case "password":
        const rulePass = [
          {
            required: data?.required,
            message: "Enter Valid " + data.Label,
          },
        ];
        data.rule && rulePass.push(data.rule);
        return (
          <Form.Item
            name={data.name}
            className="form "
            rules={[
              {
                required: data?.required,
                message: "Enter Valid " + data.Label,
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        );
      case "radio":
        return (
          <Form.Item name={data.name} id={data.id} required>
            <Radio.Group disabled={data?.disabled && formData[data?.name]}>
              <Space direction="vertical">
                {data.option.map((el) => (
                  <Radio
                    value={el.value}
                    id={el.id}
                    key={el.id}
                    className="form-modal-title-items"
                  >
                    {el.Label}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          </Form.Item>
        );
      case "switch":
        return (
          <Form.Item id={data?.id} initialValue={false} name={data?.name}>
            <Switch
              className="mt-2"
              disabled={
                data?.disabled &&
                (formData[data?.name] === false ||
                  formData[data?.name] === true)
              }
              defaultChecked={(formData && formData[data.name]) || false}
            />
          </Form.Item>
        );
      case "extraMultiSingle":
        return (
          <FormList
            name={data?.name}
            id={data?.id}
            initialValue={[{}]}
            // initialValue={[
            //   {
            //     title: "t 1",
            //     shortDescription: "sd 1",
            //     description: "d 1",
            //     languageId: 2,
            //   },
            //   {
            //     title: "t 3",
            //     shortDescription: "sd 3",
            //     description: "d 3",
            //     languageId: 3,
            //   },
            //   {
            //     title: "t 4",
            //     shortDescription: "sd 4",
            //     description: "d4",
            //     languageId: 4,
            //   },
            // ]}
            required={data?.required}
          >
            {(fields) => (
              <>
                {fields.map((field, index) => (
                  <>
                    {CONSTANTS.FORM_FIELD[data?.menu].map((dataField) =>
                      getInputFormate({
                        ...dataField,
                        name: [field.name, dataField.name],
                        id: [field.id, dataField.id],
                        key: field.key,
                      })
                    )}
                  </>
                ))}
              </>
            )}
          </FormList>
        );

      case "multifield":
        return (
          <div className="ml-2">
            <FormList
              name={data?.name}
              id={data?.id}
              initialValue={data?.initialValue}
              // initialValue={[
              //   {
              //     title: "t 1",
              //     shortDescription: "sd 1",
              //     description: "d 1",
              //     languageId: 2,
              //   },
              //   {
              //     title: "t 3",
              //     shortDescription: "sd 3",
              //     description: "d 3",
              //     languageId: 3,
              //   },
              //   {
              //     title: "t 4",
              //     shortDescription: "sd 4",
              //     description: "d4",
              //     languageId: 4,
              //   },
              // ]}
              required={data?.required}
            >
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <>
                      <Heading>{data?.menuLabel}</Heading>
                      {CONSTANTS.FORM_FIELD[data?.menu].map((dataField) => (
                        <>
                          <Label required={dataField.required}>
                            {dataField.Label}
                          </Label>
                          {getInputFormate({
                            ...dataField,
                            name: [field.name, dataField.name],
                            id: [field.id, dataField.id],
                            key: field.key,
                          })}
                        </>
                      ))}
                      <Form.Item key={field.key}>
                        <Button onClick={() => remove(field.name)}>
                          {data?.removeName || "Remove Field"}
                        </Button>
                      </Form.Item>
                    </>
                  ))}
                  <Button className="-mt-2" onClick={() => add()}>
                    {data?.addName || "Add Field"}
                  </Button>
                </>
              )}
            </FormList>
          </div>
        );
      default:
        const rule = [
          {
            required: data?.required,
            message: "Please Enter Valid " + data.Label,
          },
          data.type !== "text" && {
            type: data.type,
          },
        ];
        data.rule && rule.push(data.rule);
        return (
          <Form.Item
            name={data.name}
            className="form "
            id={data.id}
            required={data?.required}
            rules={rule}
          >
            <Input
              disabled={data?.disabled && formData[data?.name]}
              placeholder={data.placeholder ? data.placeholder : ""}
              initialvalues={formData && formData[data.name]}
            />
          </Form.Item>
        );
    }
  };

  useEffect(() => {
    if (form) {
      form.resetFields();
      if (Object.keys(formData).length) {
        const Fields = [];
        AllFieldsData.forEach((el) => {
          if (el.item) {
            Fields.push(el.item[0]);
            Fields.push(el.item[1]);
          } else {
            Fields.push(el);
          }
        });

        Fields.filter((el) => el?.type === "number").forEach((el) => {
          formData[el.name] = parseInt(formData[el.name], 10);
        });
        Fields.filter((el) => el?.type === "date").forEach((el) => {
          formData[el.name] = dayjs(formData[el.name]);
        });
        Fields.filter((el) => el?.type === "time").forEach((el) => {
          formData[el.name] = dayjs(formData[el.name], "HH:mm:ss");
        });

        Fields.filter(
          (el) => el?.type === "file" || el?.type === "dragupload"
        ).forEach((el) => {
          delete formData[el.name];
        });
        form.setFieldsValue(formData);
      }
    }
  }, [form, formData, AllFieldsData]);

  return (
    <Form
      form={form}
      disabled={disabled}
      name="form_in_modal"
      scrollToFirstError
      onFieldsChange={(value) => {
        changedFields[value?.[0]?.name] = value[0].value;
        // console.log(changedFields, "changed");
      }}
    >
      <Row justify="center" align="center" gutter={[16, 0]}>
        {AllFieldsData.map((data) => {
          return (
            // <Col
            //   span={data?.width || 24}
            //   style={{ marginTop: "10px", marginBottom: "10px" }}
            // >
            //   <Row>
            //     {data?.labelwidth && (
            //       <Col
            //         span={data?.labelwidth}
            //         style={{
            //           display: "flex",
            //           alignItems: "center",
            //           justifyContent: "flex-start",
            //         }}
            //       >
            //         <Label required={data.required}>{data.Label}</Label>
            //       </Col>
            //     )}
            //     <Col span={24 - +data?.labelwidth}>{getInputFormate(data)}</Col>
            //   </Row>
            // </Col>
            <Col
              span={data?.width || 24}
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              <Row>
                {data?.labelwidth && (
                  <Col
                    span={24}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Label required={data.required}>{data.Label}</Label>
                  </Col>
                )}
                <Col span={24}>{getInputFormate(data)}</Col>
              </Row>
            </Col>
          );
        })}
      </Row>
    </Form>
  );
};

export default FormFields;
