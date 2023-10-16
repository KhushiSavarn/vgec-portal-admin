import React, { useEffect, useState } from "react";
import { Button, Col, Pagination, Popconfirm, Result, Row } from "antd";
import moment from "moment";
import PropTypes from "prop-types";
// import PageHeader from "../../../../component/common/page-Header";
import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  EyeOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
} from "@ant-design/icons";
import useHttp from "../../hooks/use-http";
import CONSTANTS from "../../util/constant/CONSTANTS";
import ModalFormCreator from "./ModalFormCreator";
import CRUDTable from "./CRUD-Table";
// import CustomTable from "../../../../component/common/Custom-Table";
// import CONSTANTS from "../../../../util/constant/CONSTANTS";
// import useHttp from "../../../../hooks/use-http";
// import ModalFormCreator from "../../../../component/common/ModalFormCreator";
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

const CRUDComponent = (props) => {
  const { GET, CREATE, UPDATE, DELETE } = props;
  const [data, setData] = useState([]);
  const [Allfilter, setAllFilter] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    total: 0,
  });
  const [createOpen, setCreateOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(null);
  const [formData, setFormData] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const API = useHttp();

  useEffect(() => {
    let QuaryParams = {
      limit: pagination.pageSize,
      page: pagination.current,
    };
    if (GET?.extraQuery) {
      QuaryParams = { ...QuaryParams, ...GET?.extraQuery };
    }
    if (Allfilter?.sort) {
      QuaryParams = { ...QuaryParams, ...Allfilter?.sort };
    }
    if (Allfilter?.filter) {
      Allfilter?.filter?.map((el) => {
        QuaryParams = {
          ...QuaryParams,
          [`autogenerate-mul-array-$${el[0]}$`]: el[1],
        };
      });
    }
    GET &&
      GET?.API &&
      API.sendRequest(
        GET?.API,
        (res) => {
          setPagination((prevPagination) => ({
            ...prevPagination,
            total: res?.data?.count,
          }));
          let ResultData = res?.data?.rows?.map((el, i) => {
            const SingleRow = {
              ...el,
              key: el.id,
              no: (pagination.current - 1) * pagination.pageSize + i + 1,
            };
            if (DELETE && DELETE?.API) {
              SingleRow.deleteTableRow = {
                id: el.id,
                key: el.id,
                onClick: (key) => {
                  // console.log(res, "asb");
                  const DeleteAPITableRow = { ...DELETE?.API };
                  DeleteAPITableRow.endpoint = `${DeleteAPITableRow.endpoint}${key}`;
                  API.sendRequest(
                    DeleteAPITableRow,
                    (res) => {
                      // console.log(res);
                      setData((prev) =>
                        prev.filter((item) => item.key !== key)
                      );
                    },
                    "",
                    DELETE?.message
                  );
                },
              };
            }
            if (UPDATE && UPDATE?.API && UPDATE?.modalFields) {
              SingleRow.editTableRow = {
                id: el.id,
                key: el.id,
                onClick: () => {
                  setUpdateOpen({ ...SingleRow });
                  setFormData({ ...SingleRow });
                },
              };
            }
            return { ...SingleRow };
          });
          if (GET?.DataModifier) {
            setData(GET?.DataModifier(ResultData));
          } else {
            setData(ResultData);
          }
        },
        QuaryParams
      );
  }, [refresh, pagination.current, pagination.pageSize, Allfilter]);
  //   const CSVData = [];
  //   CSVData[0] = CONSTANTS.TABLE.SETTING_ROUTINE_CHECKUP.map((el) => el.title);
  //   data.map((item, index) => {
  //     CSVData[index + 1] = CONSTANTS.TABLE.SETTING_ROUTINE_CHECKUP.map(
  //       (el) => item[el.dataIndex]
  //     );
  //     return 0;
  //   });

  const onCreate = (value, clear) => {
    if (CREATE && CREATE?.API && CREATE?.modalFields) {
      let payload = payloadGenerator(
        value,
        CREATE?.modalFields,
        CREATE?.isFormData
      );

      if (CREATE?.payloadModifier) {
        payload = CREATE?.payloadModifier(payload);
      }

      API.sendRequest(
        CREATE?.API,
        () => {
          setRefresh((prev) => !prev);
          clear();
        },
        payload,
        CREATE?.message
      );
    }
  };
  const onUpdate = (value, clear) => {
    if (UPDATE && UPDATE?.API && UPDATE?.modalFields) {
      let payload = payloadGenerator(
        value,
        UPDATE?.modalFields,
        UPDATE?.isFormData
      );

      if (UPDATE?.payloadModifier) {
        payload = UPDATE?.payloadModifier(payload);
      }

      const UpdateAPIEnd = { ...UPDATE?.API };
      UpdateAPIEnd.endpoint = `${UpdateAPIEnd?.endpoint}${updateOpen?.id}`;
      API.sendRequest(
        UpdateAPIEnd,
        () => {
          setUpdateOpen(null);
          setFormData(null);
          setRefresh((prev) => !prev);
          clear();
        },
        payload,
        UPDATE?.message
      );
    }
  };
  useEffect(() => {
    if (
      UPDATE &&
      GET &&
      UPDATE?.API &&
      UPDATE?.modalFields &&
      GET?.column?.length
    ) {
      GET?.column.findIndex((el) => el?.dataIndex === "editTableRow") === -1 &&
        GET?.column?.push({
          title: "Action",
          dataIndex: "editTableRow",
          render: RenderEditButton,
        });
    }
    if (DELETE && GET && DELETE?.API && GET?.column?.length) {
      GET?.column.findIndex((el) => el?.dataIndex === "deleteTableRow") ===
        -1 &&
        GET?.column?.push({
          title: "Action",
          dataIndex: "deleteTableRow",
          render: RenderDeleteButton,
        });
    }
  }, []);
  return (
    <Row className="container-main">
      {CREATE && CREATE?.API && CREATE?.modalFields && (
        <ModalFormCreator
          loading={API.isLoading}
          open={createOpen}
          onCreate={onCreate}
          onCancel={() => {
            setCreateOpen(false);
          }}
          menuFields={CREATE?.modalFields}
          formData={{}}
          name={CREATE?.modaltitle || `Add `}
          SubmitName={"Update"}
        />
      )}
      {UPDATE && UPDATE?.API && UPDATE?.modalFields && (
        <ModalFormCreator
          loading={API.isLoading}
          open={updateOpen !== null}
          onCreate={onUpdate}
          onCancel={() => {
            setUpdateOpen(null);
            setFormData(null);
          }}
          menuFields={UPDATE?.modalFields}
          formData={formData}
          name={UPDATE?.modaltitle || `Edit`}
          SubmitName={"Update "}
        />
      )}
      {CREATE && CREATE?.API && (
        <Row
          style={{
            marginBlock: "15px",
          }}
        >
          <Button
            loading={API.isLoading}
            onClick={() => {
              setCreateOpen(true);
            }}
          >
            Add
          </Button>
        </Row>
      )}
      {GET?.column?.length && (
        <>
          <Col
            span={24}
            style={{
              marginBlock: "15px",
            }}
            className="container-body"
          >
            <CRUDTable
              dataSource={data}
              isLoading={API.isLoading}
              columns={GET?.column}
              //   DeleteSelectedRow
              //   APIendpoint="checkupDelete"
              //   onConfirm={() => {
              //     setRefresh((prev) => !prev);
              //   }}
              setChanges={(v) => {
                setAllFilter(v);
                setPagination((prev) => ({
                  ...prev,
                  current: 1,
                }));
              }}
            />
          </Col>
          <Col
            span={24}
            style={{
              marginBlock: "15px",
            }}
            className="container-body"
          >
            <Pagination
              current={pagination?.current}
              pageSize={pagination?.pageSize}
              total={pagination?.total}
              showSizeChanger
              onChange={(page, pageSize) => {
                setPagination((prev) => ({ ...prev, pageSize, current: page }));
              }}
              className="mt-16"
            />
          </Col>
        </>
      )}
    </Row>
  );
};
CRUDComponent.propTypes = {
  GET: PropTypes.shape({
    API: PropTypes.shape({
      type: PropTypes.string.isRequired,
      endpoint: PropTypes.string.isRequired,
    }).isRequired,
    extraQuery: PropTypes.object,
    DataModifier: PropTypes.func.isRequired,
    column: PropTypes.array.isRequired,
  }),
  CREATE: PropTypes.shape({
    API: PropTypes.shape({
      type: PropTypes.string.isRequired,
      endpoint: PropTypes.string.isRequired,
    }).isRequired,
    payloadModifier: PropTypes.func.isRequired,
    modalFields: PropTypes.array.isRequired,
    modaltitle: PropTypes.string.isRequired,
    isFormData: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
  }),
  UPDATE: PropTypes.shape({
    API: PropTypes.shape({
      type: PropTypes.string.isRequired,
      endpoint: PropTypes.string.isRequired,
    }).isRequired,
    payloadModifier: PropTypes.func.isRequired,
    modalFields: PropTypes.array.isRequired,
    modaltitle: PropTypes.string.isRequired,
    isFormData: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
  }),

  DELETE: PropTypes.shape({
    API: PropTypes.shape({
      type: PropTypes.string.isRequired,
      endpoint: PropTypes.string.isRequired,
    }).isRequired,
    message: PropTypes.string.isRequired,
  }),
  isSearch: PropTypes.bool,
};
export default CRUDComponent;

export const payloadGenerator = (value, fields, isFormData) => {
  let rawPayload = {};
  const formPayload = new FormData();
  if (isFormData) {
    fields?.forEach((ele) => {
      // console.log(ele.id);
      if (
        ele.type !== "file" &&
        ele.type !== "date" &&
        ele.type !== "multifield" &&
        ele.type !== "extraMultiSingle" &&
        ele.type !== "number"
      ) {
        value[ele.id] && formPayload.append(ele.id, value[ele.id]);
      }
      if (ele.type === "file") {
        formPayload.append(ele.id, value[ele.id][0].originFileObj);
      }
      if (ele.type === "multifield" || ele.type === "extraMultiSingle") {
        if (ele?.handler) {
          value[ele.id] &&
            formPayload.append(ele.id, ele?.handler(value[ele.id]));
        } else {
          value[ele.id] &&
            formPayload.append(ele.id, JSON.stringify(value[ele.id]));
        }
      }

      if (ele.type === "number") {
        value[ele.id] && formPayload.append(ele.id, +value[ele.id]);
      }
      if (ele.type === "date") {
        // if (dateTime) {
        const dateTimeValue = `${moment(value[ele.id].$d).format(
          "YYYY-MM-DD"
        )} ${moment(value[ele.id].$d, "HH:mm:ss").utc().format("HH:mm:ss")}`;

        value[ele.id] && formPayload.append(ele.id, dateTimeValue);
      }
    });
  } else {
    fields.forEach((ele) => {
      if (ele?.type === "date") {
        rawPayload = {
          ...rawPayload,
          [ele?.id]: moment(value[ele?.id]?.$d, "YYYY-MM-DD").format(
            "YYYY-MM-DD"
          ),
        };
      }
      if (ele?.type === "time") {
        rawPayload = {
          ...rawPayload,
          [ele?.id]: moment(value[ele?.id]?.$d, "HH:mm:ss").format("HH:mm:ss"),
        };
      }
    });
    rawPayload = { ...value, ...rawPayload };
  }

  return isFormData ? formPayload : rawPayload;
};

/* <PageHeader
  data={{
    buttons: [
      !CONSTANTS.USER_ROLE && {
        id: 1,
        action: () => {
          console.log("button1");
          setOpenRoutine(true);
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
        name: "O & M ",
      },
    ],
    name: "  O & M Routine Checkup",
  }}
  pagination={pagination}
  setPagination={setPagination}
  searchHide
/>; */
