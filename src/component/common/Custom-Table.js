import React, { useEffect, useState } from "react";
import { Button, Card, Col, Input, Pagination, Row, Select, Table, TreeSelect } from "antd";
import CONSTANTS from "../../util/constant/CONSTANTS";
import { CSVLink } from "react-csv";
import Search from "antd/es/transfer/search";
import Heading from "./Heading";
import { Option } from "antd/es/mentions";
import useHttp from "../../hooks/use-http";
import CustomSearchBar from "./Custom-search";

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
  const [renderData, setRenderData] = useState([]);
  const api = useHttp();

  // console.log(dataSource?.length);

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
  const filterData = renderData?.filter(
    (ele) =>
      userInput.trim() === "" ||
      JSON.stringify(ele)?.toLowerCase()?.includes(userInput)
  );

  const searchHandler = (e) => {
    // console.log(e.target.value.toLowerCase());
    setUserInput(e.target.value.toLowerCase());
  };

  // const dataBaseSearchHandler = (e) => {
  //   const payload = {
  //     keyword: e.target.value.toLowerCase(),
  //   };

  //   api.sendRequest(, () => { }, payload);

  // };

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
  CSVData[0] = CONSTANTS.TABLE[name]?.map((el) => el.title);
  renderData?.map((item, index) => {
    CSVData[index + 1] = CONSTANTS.TABLE[name]?.map((el) => item[el.dataIndex]);
    return 0;
  });
  useEffect(() => {
    if (dataSource.length !== 0) {
      setRenderData(dataSource);
    }
  }, []);

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
            <Col span={16} lg={16} xl={16} xxl={17}>
              <div className="w-1/2">
                <Search placeholder="Search" onChange={searchHandler} />
              </div>
            </Col>
            {filterparmas && (
              <Col span={4} lg={4} xl={4} xxl={3}>
                <div className="">
                  <TreeSelect
                    
                    style={{
                      width: "100%",
                    }}
                    dropdownStyle={{
                      maxHeight: 400,
                      overflow: "auto",
                    }}
                    placeholder="Please an Option"
                    allowClear
                    treeDefaultExpandAll
                    onChange={()=>{}}
                    treeData={filterList}
                  />
                </div>
              </Col>
            )}
            <Col
              span={filterparmas ? 4 : 8}
              lg={filterparmas ? 4 : 8}
              xl={filterparmas ? 4 : 8}
              xxl={filterparmas ? 4 : 7}
            >
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

          <Table
            rowClassName={`rows-custom ${extraclass}`}
            pagination={false}
            // rowSelection={{
            //   type: "checkbox",
            //   ...rowSelection,
            // }}
            scroll={{x:800,y:1300}}
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
