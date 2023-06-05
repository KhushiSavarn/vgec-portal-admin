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
  TimePicker,
  Upload,
} from "antd";
import Label from "./Label";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import CONSTANTS from "../../util/constant/CONSTANTS";
import dayjs from "dayjs";
import moment from "moment";
const FormFields = ({
  changedFields = {},
  formData = {},
  menu,
  formFields = [],
  form,
  disabled = false,
  normal = false,
  threeField = false,
}) => {
  const AllFieldsData =
    formFields && Array.isArray(formFields) && formFields.length > 0
      ? formFields
      : CONSTANTS.FORM_FIELD[menu];
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
        return (
          <Form.Item
            name={data.name}
            id={data.id}
            className="form"
            initialValue={
              data?.defaultValue ? dayjs(data?.defaultValue) : dayjs(new Date())
            }
            rules={[
              {
                type: "object",
                required: data?.required,
                message: "Please select date!",
              },
              data.rule && data.rule,
            ]}
          >
            <DatePicker
              showTime={data?.showTime}
              disabled={data?.disabled && formData[data?.name]}
              // disabledDate={(current) => current.isAfter(moment())}
              placeholder={data.placeholder ? data.placeholder : ""}
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
        );
      case "time":
        return (
          <Form.Item
            name={data.name}
            id={data.id}
            className="form"
            initialValue={
              data?.defaultValue
                ? dayjs(moment(data?.defaultValue))
                : dayjs(moment())
            }
            rules={[
              {
                type: "object",
                required: data?.required,
                message: "Please select date!",
              },
              data.rule && data.rule,
            ]}
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
        return (
          <Form.Item
            name={data.name}
            id={data.id}
            className="form"
            rules={[
              {
                type: "text",
                required: data?.required,
                message: "Please input date!",
              },
              data.rule && data.rule,
            ]}
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
        return (
          <>
            <Form.Item
              name={data.name}
              id={data.id}
              className="form"
              initialValue={data?.defaultValue}
              hasFeedback
              rules={[
                {
                  required: data?.required,
                  message: "Please select Valid " + data.Label,
                },
              ]}
            >
              <Select
                disabled={data?.disabled && formData[data?.name]}
                showSearch
                placeholder={data.placeholder ? data.placeholder : ""}
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
          <Form.Item className="form">
            <Form.Item
              name={data.id}
              className="form"
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
            className="form"
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
            className="form"
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
            className="form"
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
                  console.log(value);
                  if (value && value && /.{10,}$/.exec(value)) {
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
            />
          </Form.Item>
        );
      case "checkbox":
        return (
          <Form.Item
            name={data.name}
            className="form"
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
            className="form"
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
            className="form"
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
            className="form"
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
      Fields.filter(
        (el) => el?.type === "file" || el?.type === "dragupload"
      ).forEach((el) => {
        delete formData[el.name];
      });
      form.setFieldsValue(formData);
    }
  }, [form, formData, AllFieldsData]);
  if (threeField) {
    return (
      <Form
        form={form}
        disabled={disabled}
        name="form_in_modal"
        scrollToFirstError
        onFieldsChange={(value) => {
          changedFields[value[0].name] = value[0].value;
          // console.log(changedFields, "changed");
        }}
      >
        {AllFieldsData.map((data) => {
          if (!data.item) {
            return (
              <Row align={"middle"} key={data.id}>
                <Label required={data.required}>{data.Label}</Label>
                <Col span={4}></Col>
                <Col span={24}>{getInputFormate(data)}</Col>
              </Row>
            );
          } else {
            return (
              <Row key={data.id}>
                <Col span={8}>
                  <Row align={"middle"}>
                    <Label required={data.item[0].required}>
                      {data.item[0].Label}
                    </Label>
                    <Col span={4}></Col>
                    <Col span={20}>{getInputFormate(data.item[0])}</Col>
                    <Col span={4}></Col>
                  </Row>
                </Col>
                <Col span={8}>
                  {data.item[1] && (
                    <Row align={"middle"}>
                      <Label required={data.item[1].required}>
                        {data.item[1].Label}
                      </Label>
                      <Col span={4}></Col>
                      <Col span={20}>{getInputFormate(data.item[1])}</Col>
                    </Row>
                  )}
                </Col>
                <Col span={8}>
                  {data.item[2] && (
                    <Row align={"middle"}>
                      <Label required={data.item[2].required}>
                        {data.item[2].Label}
                      </Label>
                      <Col span={4}></Col>
                      <Col span={20}>{getInputFormate(data.item[2])}</Col>
                    </Row>
                  )}
                </Col>
              </Row>
            );
          }
        })}
      </Form>
    );
  }
  if (normal) {
    return (
      <Form
        form={form}
        disabled={disabled}
        name="form_in_modal"
        scrollToFirstError
        style={{ width: "100%", paddingInline: "20px" }}
      >
        <Row justify="space-between">
          {AllFieldsData.map((data) => {
            if (!data.item) {
              return (
                <Col key={data.id} span={data.width ? data.width : 8}>
                  <Label required={data.required}>{data.Label}</Label>
                  <Row align={"middle"} key={data.id}>
                    <Col span={24}>{getInputFormate(data)}</Col>
                  </Row>
                </Col>
              );
            } else {
              return null;
            }
          })}
        </Row>
      </Form>
    );
  }

  return (
    <Form
      form={form}
      disabled={disabled}
      name="form_in_modal"
      scrollToFirstError
      onFieldsChange={(value) => {
        changedFields[value[0].name] = value[0].value;
        // console.log(changedFields, "changed");
      }}
    >
      {AllFieldsData.map((data) => {
        if (!data.item) {
          return (
            <Row align={"middle"} key={data.id}>
              <Col span={4}>
                <Label required={data.required}>{data.Label}</Label>
              </Col>
              <Col span={20}>{getInputFormate(data)}</Col>
            </Row>
          );
        } else {
          return (
            <Row key={data.id}>
              <Col span={12}>
                <Row align={"middle"}>
                  <Col span={8}>
                    <Label required={data.item[0].required}>
                      {data.item[0].Label}
                    </Label>
                  </Col>
                  <Col span={12}>{getInputFormate(data.item[0])}</Col>
                  <Col span={4}></Col>
                </Row>
              </Col>
              <Col span={12}>
                {data.item[1] && (
                  <Row align={"middle"}>
                    <Col span={4}></Col>
                    <Col span={8}>
                      <Label required={data.item[1].required}>
                        {data.item[1].Label}
                      </Label>
                    </Col>
                    <Col span={12}>{getInputFormate(data.item[1])}</Col>
                  </Row>
                )}
              </Col>
            </Row>
          );
        }
      })}
    </Form>
  );
};

export default FormFields;
