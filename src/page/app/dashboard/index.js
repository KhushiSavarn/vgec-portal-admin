import { Card, Col, DatePicker, Row } from "antd";
import React, { useEffect, useState } from "react";
// import HeadDashboard from "../../../component/card/Head-Dashboard";
import Logo from "../../../asset/image/image-Dashboard.png";
// import PlantOverviewCard from "../../../component/card/Plant-Overview-Card";
// import ClientOverviewCard from "../../../component/card/Client-Overview-Card";
// import TaskCard from "../../../component/card/Task-Card";
import CONSTANTS from "../../../util/constant/CONSTANTS";
import useHttp from "../../../hooks/use-http";
import dayjs from "dayjs";
const Dashboard = () => {
  const Me = CONSTANTS.GETMe;
  const [clients, setClients] = useState([]);
  const API = useHttp();
  const { RangePicker } = DatePicker;

  // useEffect(() => {
  //   API.sendRequest(CONSTANTS.API.getAllClients, (res) => {
  //     console.log(res?.rows);
  //     setClients(
  //       res?.data?.rows?.map((el) => ({
  //         ...el,
  //         value: el.plantCapacity,
  //         // name: "Anupam Rasayan",
  //         // value: 1.2,
  //         image: Logo,
  //       }))
  //     );
  //   });
  // }, []);
  return (
    // <div className="px50 py30">
    //   <Row>
    //     <p className="heading-dashboard">Dashboard</p>
    //   </Row>
    //   <hr className="mt25 mb25" style={{ border: "1px solid #E4E8F0" }}></hr>
    //   <div className="dashboard-main-dashboard">
    //     {/* <HeadDashboard /> */}
    //     <hr className="mt25 mb25" style={{ border: "1px solid #E4E8F0" }}></hr>
    //     <Row gutter={[16, 16]}>
    //       <Col span={16} md={16} xxl={18} xl={16}>
    //         <Row className="gutter-box pr25 pb25 pt10 mb30">
    //           <Row>
    //             <div className="an-32 light-text">
    //               <span>Plant Overview </span>
    //             </div>
    //           </Row>
    //           <Col span={24}>
    //             <hr
    //               className="mt10 mb25"
    //               style={{
    //                 border: "1px solid #E4E8F0",
    //                 width: "100% !important",
    //               }}
    //             ></hr>
    //           </Col>
    //           <Col span={24}>
    //             <Row gutter={[16, 16]}>
    //               {[
    //                 { name: "Total Rows", value: Me?.rows },
    //                 { name: "Total Inverter", value: Me?.inverter },
    //                 { name: "Total Zone", value: Me?.zone },
    //                 { name: "Total Area", value: Me?.area },
    //               ].map((el, i) =>
    //                 // <PlantOverviewCard {...el} key={i} />
    //                 console.log(el, i)
    //               )}
    //             </Row>
    //           </Col>
    //         </Row>
    //         <Row className="gutter-box pr25 pb25 pt10">
    //           <Row>
    //             <div className="an-14 regular-text gray--text lh-32 pb10">
    //               <span>Clients</span>
    //             </div>
    //           </Row>
    //           <Col span={24}>
    //             <Row gutter={[16, 16]}>
    //               {clients.map((el) =>
    //                 // <ClientOverviewCard {...el} key={el.id} />
    //                 console.log(el)
    //               )}
    //             </Row>
    //           </Col>
    //         </Row>
    //       </Col>
    //       <Col span={8} md={8} xxl={6} xl={8}>
    //         <Row className="gutter-box pr25 pb25 pt10 mb30">
    //           <Row>
    //             <div className="an-32 light-text">
    //               <span>On Going Task </span>
    //             </div>
    //           </Row>
    //           <Col span={24}>
    //             <hr
    //               className="mt10 mb25"
    //               style={{
    //                 border: "1px solid #E4E8F0",
    //                 width: "100% !important",
    //               }}
    //             ></hr>
    //           </Col>
    //           <Row gutter={[16, 16]}>
    //             {[
    //               {
    //                 Due: "DUE TODAY",
    //                 Priority: "HIGH",
    //                 Text: "Plant 1 Data not coming",
    //                 desc: {
    //                   main: "Inverter",
    //                   sub: "fault",
    //                 },
    //               },
    //               {
    //                 Due: "DUE TODAY",
    //                 Priority: "HIGH",
    //                 Text: "Plant 2 Data not coming",
    //                 desc: {
    //                   main: "Inverter",
    //                   sub: "fault",
    //                 },
    //               },
    //               {
    //                 Due: "DUE TODAY",
    //                 Priority: "LOW",
    //                 Text: "Plant 3 Data not coming",
    //                 desc: {
    //                   main: "Inverter",
    //                   sub: "fault",
    //                 },
    //               },
    //               {
    //                 Due: "DUE TODAY",
    //                 Priority: "MEDIUM",
    //                 Text: "Plant 4 Data not coming",
    //                 desc: {
    //                   main: "Inverter",
    //                   sub: "fault",
    //                 },
    //               },
    //             ].map((el, i) =>
    //               // <TaskCard {...el} key={i} />
    //               console.log(el, i)
    //             )}
    //           </Row>
    //         </Row>
    //       </Col>
    //     </Row>
    //   </div>
    // </div>
    <div className="px50 py30">
      <div className="my-5">
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Card>
              <p className="font-medium pb-5">Date Range</p>
              <RangePicker
                className="w-3/4"
                onChange={(e) => {
                  console.log(e);
                  console.log(dayjs().format("DD/MM/YYYY"));
                }}
              />
            </Card>
          </Col>
        </Row>
      </div>

      <Row gutter={[16, 16]}>
        <Col span={8} xs={24} sm={12} md={8} lg={8} xl={8}>
          <Card size="small" className="p-5">
            <div>
              <p className="font-semibold text-lg text-slate-400">Total User</p>
              <p className="text-xl font-medium">12</p>
            </div>
          </Card>
        </Col>
        <Col span={8} xs={24} sm={12} md={8} lg={8} xl={8}>
          <Card size="small" className="p-5">
            <div>
              <p className="font-semibold text-lg text-slate-400">Total Club</p>
              <p className="text-xl font-medium">12</p>
            </div>
          </Card>
        </Col>
        <Col span={8} xs={24} sm={12} md={8} lg={8} xl={8}>
          <Card size="small" className="p-5">
            <div>
              <p className="font-semibold text-lg text-slate-400">
                Total Bouncer
              </p>
              <p className="text-xl font-medium">150</p>
            </div>
          </Card>
        </Col>
        <Col span={8} xs={24} sm={12} md={8} lg={8} xl={8}>
          <Card size="small" className="p-5">
            <div>
              <p className="font-semibold text-lg text-slate-400">
                Total Valet
              </p>
              <p className="text-xl font-medium">150</p>
            </div>
          </Card>
        </Col>
        <Col span={8} xs={24} sm={12} md={8} lg={8} xl={8}>
          <Card size="small" className="p-5">
            <div>
              <p className="font-semibold text-lg text-slate-400">
                Total Event
              </p>
              <p className="text-xl font-medium">15</p>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
