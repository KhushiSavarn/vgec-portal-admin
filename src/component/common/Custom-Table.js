import React, { useState } from "react";
import { Button, Card, Col, Input, Pagination, Row, Select, Table } from "antd";
import CONSTANTS from "../../util/constant/CONSTANTS";
import { CSVLink } from "react-csv";
import Search from "antd/es/transfer/search";
import Heading from "./Heading";
import { Option } from "antd/es/mentions";

const CustomTable = ({
  name,
  title,
  dataSource,
  onChange,
  Other = {},
  extraclass,
  filterparmas = false,
  filterList = [],
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const [userInput, setUserInput] = useState("");

  // Set Number of Pages
  const handleChangePage = (page, pageSize) => {
    // console.log(page);
    // console.log(pageSize);
    // if (pageSize !== 10 && page !== 1) {
    //   setCurrentPage(1);
    //   setCurrentPageSize(pageSize);
    //   // console.log(currentPage);
    // } else {
    // console.log("enter herr");
    setCurrentPage(page);
    setCurrentPageSize(pageSize);
    // }
  };

  // Search Filter
  const filterData = dataSource?.filter(
    (ele) =>
      userInput.trim() === "" ||
      JSON.stringify(ele)?.toLowerCase()?.includes(userInput)
  );

  const searchHandler = (e) => {
    console.log(e.target.value.toLowerCase());
    setUserInput(e.target.value.toLowerCase());
  };

  // Set Number Items per Page
  const paginatedData = filterData?.slice(
    (currentPage - 1) * currentPageSize,
    currentPage * currentPageSize
  );

  const rowSelection = {
    onChange: onChange,
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };

  const CSVData = [];
  CSVData[0] = CONSTANTS?.TABLE[name]?.map((el) => el.title);
  dataSource?.map((item, index) => {
    CSVData[index + 1] = CONSTANTS?.TABLE[name]?.map(
      (el) => item[el.dataIndex]
    );
    return 0;
  });

  return (
    <Row className="my-5">
      <Card className="w-full">
        <Heading>{title}</Heading>
        <Col
          span={24}
          style={{
            marginBlock: "15px",
          }}
          className="container-body"
        >
          <Row className="mb-5">
            <Col span={18}>
              <div className="w-1/2">
                <Search placeholder="Search" onChange={searchHandler} />
              </div>
            </Col>

            <Col span={6}>
              <div className="mr-5">
                <CSVLink data={CSVData}>
                  <Button
                    className="float-right"
                    type="primary"
                    ghost
                    onClick={() => {}}
                    // {...props.ButtonDefault}
                  >
                    Export CSV
                  </Button>
                </CSVLink>
              </div>
            </Col>
          </Row>
          {filterparmas && (
            <Row className="mb-10">
              <Col span={24}>
                <div className="float-right">
                  <Select
                    defaultValue="Select an Option"
                    onChange={(value) => {
                      console.log(value);
                    }}
                    style={{
                      width: 200,
                    }}
                    // options={[
                    //   {
                    //     value: "jack",
                    //     label: "Jack",
                    //   },
                    //   {
                    //     value: "lucy",
                    //     label: "Lucy",
                    //   },
                    // ]}
                  >
                    <Option value={-1}>Select All</Option>
                    {filterList?.map((ele) => {
                      return (
                        <Option key={ele?.id} value={ele?.id}>
                          {ele?.name || ele?.label}
                        </Option>
                      );
                    })}
                  </Select>
                </div>
              </Col>
            </Row>
          )}
          <Table
            rowClassName={`rows-custom ${extraclass}`}
            pagination={false}
            // rowSelection={{
            //   type: "checkbox",
            //   ...rowSelection,
            // }}
            {...Other}
            dataSource={paginatedData}
            columns={CONSTANTS.TABLE[name]}
          />
        </Col>
        <Pagination
          current={currentPage}
          defaultPageSize={currentPageSize}
          total={filterData?.length}
          onChange={handleChangePage}
          className="mt-16"
        />
      </Card>
    </Row>
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
