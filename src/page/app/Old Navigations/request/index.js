import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useHttp from "../../../hooks/use-http";
import CustomTable from "../../../component/common/Custom-Table";
import CONSTANTS from "../../../util/constant/CONSTANTS";
import profile from "../../../asset/image/image 2.png";
import { Spin } from "antd";
import { apiGenerator } from "../../../util/functions";

const Request = () => {
  const [club, setClub] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const api = useHttp();

  // console.log(club);
  const clubRequest = (id) => {
    navigate(`/app/request/${id}`);
  };

  // Accept Request
  const acceptRequest = (id) => {
    const payload = {
      accept: true,
      ClubId: id,
    };
    console.log(payload);
    api.sendRequest(
      CONSTANTS.API.acceptOrRejectRequest,
      () => {
        setRefresh((prev) => !prev);
      },
      payload,
      "Request Accepted"
    );
  };

  // Reject Request
  const rejectRequest = (id) => {
    const payload = {
      accept: false,
      ClubId: id,
    };
    console.log(payload);
    api.sendRequest(
      CONSTANTS.API.acceptOrRejectRequest,
      () => {
        setRefresh((prev) => !prev);
      },
      payload,
      "Request Rejected"
    );
  };

  // Get All Club Request
  useEffect(() => {
    const CLUB_REQUEST_API = apiGenerator(
      CONSTANTS.API.getClubRequest,
      {},
      `?kycStatus=${-1}`
    );
    api.sendRequest(CLUB_REQUEST_API, (res) => {
      setClub(
        res?.data?.clubs?.map((data, index) => {
          return {
            ...data,
            no: index + 1,
            ownerName: data?.ownerName || "John Deo",
            name: data?.name || "Indigo XP",
            GST: data?.GST || "123456",
            image: data?.image || profile,
            view: {
              id: data?.id,
              onClick: clubRequest,
            },

            action: {
              id: data?.id,
              onAccept: acceptRequest,
              onReject: rejectRequest,
            },
          };
        })
      );
    });
  }, [refresh]);
  return (
    <>
      {api.isLoading ? (
        <Spin className="mt-16" tip="Loading" size="large">
          <div className="content" />
        </Spin>
      ) : (
        <>
          <CustomTable
            title={"Request List"}
            dataSource={club}
            name="REQUEST"
          />
        </>
      )}
    </>
  );
};

export default Request;
