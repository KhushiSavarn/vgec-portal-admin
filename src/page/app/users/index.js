import React from "react";
import PageComponent from "../../../component/common/Page-Component";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();

  const userDetail = (id) => {
    navigate(`/app/users/${id}`);
  };
  const filterList = [
    {
      id: 1,
      label: "Private Account",
      value: "private account",
    },
    {
      id: 2,
      label: "Age Range",
      value: "age",
    },
    {
      id: 3,
      label: "Gender",
      value: "gender",
    },
  ];

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
      checkbox: {
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
      checkbox: {
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
      <PageComponent
        tableHeaders="USERS"
        tableTitle="Users List"
        // getAPI={CONSTANTS.API.getUsers}
        DUMMY_DATA={DUMMY_DATA}
        extraResData="users"
        addData
        modalButton="Add New User"
        addModalTitle="Add New User"
        modalFields="USERS_MODAL"
        viewData
        viewUrl="/app/users/"
        blockData
        // editAPI={CONSTANTS.API.editUser}
        deleteData
        // deleteAPI={CONSTANTS.API.deleteUsers}
        checkboxData
        formData
        filterparmas
        filterList={filterList}
      />
    </>
  );
};

export default Users;
