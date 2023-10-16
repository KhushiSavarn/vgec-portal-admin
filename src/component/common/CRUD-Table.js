import { Popconfirm, Row, Table, notification } from "antd";
import React, { useState } from "react";
import { MdOutlineDeleteSweep } from "react-icons/md";
import useHttp from "../../hooks/use-http";
import CONSTANTS from "../../util/constant/CONSTANTS";

const CRUDTable = (props) => {
  const {
    dataSource,
    Other = {},
    onChange,
    extraclass,
    isLoading = false,
    APIendpoint,
    DeleteSelectedRow = false,
    onConfirm = (value) => {
      console.log(value);
    },
    scrollAutoOff = false,
    scroll,
    setChanges = () => {},
    columns = [],
  } = props;
  const API = useHttp();
  const [selectedRows, setSelectedRows] = useState([]);
  const rowSelection = {
    onChange: DeleteSelectedRow
      ? (selectedRowKeys, selectedRows) => {
          setSelectedRows(selectedRowKeys);
        }
      : onChange,
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };
  return (
    <>
      {selectedRows.length && DeleteSelectedRow ? (
        <Row className="mb20">
          <Popconfirm
            title="Sure to delete selected rows in bulk?"
            onConfirm={() => {
              const rows = [...selectedRows];
              rows?.forEach((el, i) => {
                if (CONSTANTS?.API[APIendpoint]) {
                  const DeleteAPIBulk = { ...CONSTANTS?.API[APIendpoint] };
                  DeleteAPIBulk.endpoint = DeleteAPIBulk?.endpoint?.replace(
                    ":id",
                    el
                  );
                  API.sendRequest(DeleteAPIBulk, () => {
                    if (rows?.length - 1 === i) {
                      onConfirm(rows);
                      setSelectedRows([]);
                      notification.success({
                        message: "All deleted successfully",
                      });
                    }
                  });
                }
              });
            }}
          >
            {
              <MdOutlineDeleteSweep
                style={{ color: "black" }}
                fontSize={35}
                className="ml20 cursor-pointer"
              />
            }
          </Popconfirm>
        </Row>
      ) : (
        ""
      )}
      <div>
        <Table
          rowClassName={`rows-custom ${extraclass}`}
          loading={isLoading}
          pagination={false}
          onChange={(page, filter, sort) => {
            const newFilter = [];
            for (const property in filter) {
              if (filter[property]) {
                newFilter.push([property, filter[property]]);
              }
            }
            const NewSort = {
              sort: sort?.field,
              sortBy:
                sort?.order === "ascend"
                  ? "ASC"
                  : sort?.order === "descend"
                  ? "DESC"
                  : null,
            };
            const NewChanges = {};
            if (NewSort.sortBy && NewSort?.sort !== "no") {
              NewChanges.sort = NewSort;
            }
            if (newFilter.length) {
              NewChanges.filter = newFilter;
            }
            setChanges(NewChanges);
          }}
          // scroll={
          //   !scrollAutoOff
          //     ? {
          //         x: "80vw",
          //         y: "60vh",
          //       }
          //     : scroll
          //     ? scroll
          //     : {}
          // }
          scroll={
            scroll ? scroll : !scrollAutoOff ? { x: "80vw", y: "60vh" } : {}
          }
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          dataSource={dataSource}
          columns={columns}
          {...Other}
        />
      </div>
    </>
  );
};
CRUDTable.defaultProps = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
};
export default CRUDTable;
