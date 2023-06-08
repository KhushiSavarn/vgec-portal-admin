import React, { useState } from "react";
import { Button, Card, Col, Input, Row } from "antd";
import PageHeader from "../../../component/common/page-Header";
import CustomTable from "../../../component/common/Custom-Table";
import Label from "../../../component/common/Label";
import { useNavigate } from "react-router-dom";
import ModalFormCreator from "../../../component/common/ModalFormCreator";
import Heading from "../../../component/common/Heading";

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const userDetail = (id) => {
    navigate(`/app/users/${id}`);
  };

  const adduserData = () => {};

  const DUMMY_DATA = [
    {
      no: 1,
      name: "Ujjwal Patel",
      profilePic:
        "https://images.unsplash.com/photo-1600293121920-1a56768346e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      mobile: 9924007088,
      code: 123446,
      user: "Ujjwla08",
      date: "08 July 2002",
      toggle: {
        checked: true,
        id: 1,
        onClick: () => {},
      },
      view: {
        id: 1,
        onClick: userDetail,
      },
      account: {
        checked: true,
        id: 1,
        onClick: () => {},
      },
      delete: {
        id: 2,
        onClick: () => {},
      },
    },
    {
      no: 2,
      name: "Ujjwal Patel",
      profilePic: "",
      mobile: 9924007088,
      code: 123446,
      user: "Ujjwla08",
      date: "18 July 2002",
      view: {
        id: 2,
        onClick: userDetail,
      },
      toggle: {
        checked: false,
        id: 2,
        onClick: () => {},
      },
      account: {
        checked: true,
        id: 2,
        onClick: () => {},
      },
      delete: {
        id: 2,
        onClick: () => {},
      },
    },
  ];
  return (
    <>
      <Button
        onClick={() => {
          setIsModalOpen((prev) => !prev);
        }}
        className=" mt-5 w-28"
        type="primary"
      >
        Add User
      </Button>
      <ModalFormCreator
        open={isModalOpen}
        onCreate={adduserData}
        onCancel={() => {
          setIsModalOpen((prev) => !prev);
        }}
        name="Add New User"
        menu="USERS_MODAL"
      />

      <CustomTable
        // dataSource={data.slice(inventoryDisplay, inventoryDisplay + 10)}
        dataSource={DUMMY_DATA}
        title="Users List"
        name="USERS"
        Other={{
          onRow: (row) => ({
            onClick: () => {
              // console.log("Row", row);
              // setFormIventoryData({ ...row });
              // setOpenEditRow(true);
            },
          }),
        }}
      />
    </>
  );
};

export default Users;
