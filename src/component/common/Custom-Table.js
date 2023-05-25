import { Table } from "antd";
import React from "react";
import CONSTANTS from "../../util/constant/CONSTANTS";

const CustomTable = ({
  name,
  dataSource,
  onChange,
  Other = {},
  extraclass,
}) => {
  const rowSelection = {
    onChange: onChange,
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };
  return (
    <Table
      rowClassName={`rows-custom ${extraclass}`}
      pagination={false}
      rowSelection={{
        type: "checkbox",
        ...rowSelection,
      }}
      {...Other}
      dataSource={dataSource}
      columns={CONSTANTS.TABLE[name]}
    />
  );
};
CustomTable.defaultProps = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
};
export default CustomTable;
