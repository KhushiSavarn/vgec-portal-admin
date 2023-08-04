import React, { useEffect, useState } from "react";
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
  menu,
  formFields = [],
  form,
  disabled = false,
  normal = false,
  threeField = false,
  onlyField = false,
  FieldId,
}) => {
  const [isSwitchDisalbe, setIsSwitchDisalbe] = useState(false);
  const switchHandler = (checked) => {
    console.log(checked);
  };
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
            className="form mt-2"
            // initialValue={
            //   data?.defaultValue ? dayjs(data?.defaultValue) : dayjs(new Date())
            // }
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
              showTime={{ format: data?.showTime }}
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
        return (
          <Form.Item
            name={data.name}
            id={data.id}
            className="form mt-2"
            // initialValue={
            //   data?.defaultValue
            //     ? dayjs(moment(data?.defaultValue))
            //     : dayjs(moment())
            // }
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
            className="form mt-2"
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
              className="form mt-2"
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
                mode={data?.mode}
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
          <Form.Item className="form mt-2">
            <Form.Item
              name={data.id}
              className="form mt-2"
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
            className="form mt-2"
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
            className="form mt-2"
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
            className="form mt-2"
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
            className="form mt-2"
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
            className="form mt-2"
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
            className="form mt-2"
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
            className="form mt-2"
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
          <Row>
            <Col span={12}>
              <Form.Item id={data?.id} name={data?.name} >
                <Switch
                  className="mt-2"
                  defaultChecked={(formData && formData[data.name]) || false}
                  onChange={() => {
                    // setIsSwitchDisalbe((prev) => !prev);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        );
      case "option":
        return (
          <Form.Item
            name={data?.name}
            id={data?.id}
            className="form mt-2"
            rules={[
              {
                required: data?.required,
                message: "Please enter Option!",
              },
              data.rule && data.rule,
            ]}
            initialValue={[
              {
                [data?.name + 1]: "",
                [data?.name + 2]: "",
                [data?.name + 3]: "",
                [data?.name + 4]: "",
                ...formData[data?.name],
              },
            ]}
          >
            <Input.Group name={data?.name} id={data?.id} onChange={console.log}>
              <Form.Item name={data?.name + 1} id={data?.id + 1}>
                <Input
                  style={{ width: "100%", borderRadius: "5pt" }}
                  placeholder="Option 1"
                  className="form mt-2"
                  disabled={data?.disabled && formData[data?.name]}
                />
              </Form.Item>
              <Form.Item name={data?.name + 2} id={data?.id + 2}>
                <Input
                  style={{ width: "100%", borderRadius: "5pt" }}
                  placeholder="Option 2"
                  className="form mt-2"
                  disabled={data?.disabled && formData[data?.name]}
                />
              </Form.Item>
              <Form.Item name={data?.name + 3} id={data?.id + 3}>
                <Input
                  style={{ width: "100%", borderRadius: "5pt" }}
                  placeholder="Option 3"
                  className="form mt-2"
                  disabled={data?.disabled && formData[data?.name]}
                />
              </Form.Item>
              <Form.Item name={data?.name + 4} id={data?.id + 4}>
                <Input
                  style={{ width: "100%", borderRadius: "5pt" }}
                  placeholder="Option 4"
                  className="form mt-2"
                  disabled={data?.disabled && formData[data?.name]}
                />
              </Form.Item>
            </Input.Group>
          </Form.Item>
        );
      case "entryfee":
        return (
          <Row>
            <Col span={2}>
              <Switch
                defaultChecked
                className="mt-2"
                onChange={() => {
                  setIsSwitchDisalbe((prev) => !prev);
                }}
              />
            </Col>
            <Col span={22}>
              <Form.Item
                name={data.name}
                className="form pl-5 mt-1"
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
                  disabled={isSwitchDisalbe}
                  placeholder={data.placeholder ? data.placeholder : ""}
                  controls={false}
                  style={{
                    width: "100%",
                  }}
                  value={(formData && formData[data.id]) || 0}
                />
              </Form.Item>
            </Col>
          </Row>
        );
      case "translation":
        return (
          <>
            <Row gutter={[16, 16]}>
              {data?.field.map((field) => (
                <Col span={`${field.id === "description" ? 24 : 12}`}>
                  {getInputFormate(field)}
                </Col>
              ))}
            </Row>
            <Row gutter={[32, 16]}>
              <Col>
                <Button> + Add New Translation </Button>
              </Col>
              <Col>
                <Button> Remove Translation </Button>
              </Col>
            </Row>
          </>
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
                    {CONSTANTS.FORM_FIELD[data?.menu].map((dataField) =>
                      <>
                        
                        <Label required={dataField.required}>{dataField.Label}</Label>
{            getInputFormate({
                        ...dataField,
                        name: [field.name, dataField.name],
                        id: [field.id, dataField.id],
                        key: field.key,
                        
                      })}
                        </>
                    )}
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
            className="form mt-2"
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
    if (form && !onlyField) {
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
  if (onlyField) {
    return (
      <>
        {AllFieldsData.map((data) => {
          if (!data.item) {
            return (
              <Row align={"middle"} key={data.id}>
                <Col span={4}>
                  <Label required={data.required}>{data.Label}</Label>
                </Col>
                <Col span={20}>
                  {getInputFormate({
                    ...data,
                    id: `${data?.id}-${FieldId}`,
                    name: `${data?.name}-${FieldId}`,
                  })}
                </Col>
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
      </>
    );
  }
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
