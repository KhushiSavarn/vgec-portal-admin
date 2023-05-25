import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ALL_ROUTES from "./util/Route";
function App() {
  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <SidePage />,
  //     errorElement: <Error />,
  //     children: [
  //       {
  //         index: true,
  //         element: <LogIn />,
  //       },
  //       {
  //         path: "registration",
  //         element: <Registration />,
  //       },
  //     ],
  //   },
  //   {
  //     path: ROUTES.FORGOT_PASSWORD,
  //     element: <ForgetPassword />,
  //     errorElement: <Error />,
  //   },
  //   {
  //     path: `${appRoot}`,
  //     element: <AppLayout />,
  //     children: [
  //       {
  //         index: true,
  //         element: <Navigate to={`${appRoot}${ROUTES.DASHBOARD}`} />,
  //       },
  //       {
  //         path: `${appRoot}${ROUTES.DASHBOARD}`,
  //         element: <Dashboard />,
  //       },
  //       {
  //         path: `${appRoot}${ROUTES.INVENTORY}`,
  //         element: (
  //           <Navigate
  //             to={`${appRoot}${ROUTES.INVENTORY}${ROUTES.INVENTORY_DETAILS}`}
  //           />
  //         ),
  //       },
  //       {
  //         path: `${appRoot}${ROUTES.INVENTORY}${ROUTES.INVENTORY_DETAILS}`,
  //         element: <Inventory />,
  //       },
  //       {
  //         path: `${appRoot}${ROUTES.INVENTORY}${ROUTES.INVENTORY_MOVEHISTORY}`,
  //         element: <MoveHistory />,
  //       },
  //       {
  //         path: `${appRoot}${ROUTES.INVENTORY}${ROUTES.INVENTORY_EQUIPMENT}`,
  //         element: <Equipment />,
  //       },
  //       {
  //         path: `${appRoot}${ROUTES.INVENTORY}${ROUTES.INVENTORY_EQUIPMENT_DETAILS}`,
  //         element: <EquipmentDetailPage />,
  //       },
  //       {
  //         path: `${appRoot}${ROUTES.INVENTORY}${ROUTES.INVENTORY_TRANSFER}`,
  //         element: <Transfer />,
  //       },
  //       {
  //         path: `${appRoot}${ROUTES.INVENTORY}${ROUTES.INVENTORY_PURCHASE}`,
  //         element: <PurchaseRequest />,
  //       },
  //       {
  //         path: `${appRoot}${ROUTES.EXPENSES}`,
  //         element: <Expenses />,
  //       },
  //       {
  //         path: `${appRoot}${ROUTES.EXPENSES}`,
  //         element: (
  //           <Navigate to={appRoot + ROUTES.EXPENSES + ROUTES.EXPENSES_DETAIL} />
  //         ),
  //       },
  //       {
  //         path: `${appRoot}${ROUTES.EXPENSES}${ROUTES.EXPENSES_DETAIL}`,
  //         element: <ExpanseDetails />,
  //       },
  //       {
  //         path: `${appRoot}${ROUTES.EXPENSES}${ROUTES.EXPENSES_VEHICAL}`,
  //         element: <VehicalExpanse />,
  //       },
  //       {
  //         path: `${appRoot}${ROUTES.MAINTENANCE}`,
  //         element: <Maintenance />,
  //       },
  //       {
  //         path: `${appRoot}${ROUTES.EMPLOYEE}`,
  //         element: <Employee />,
  //       },
  //       {
  //         path: `${appRoot}${ROUTES.EMPLOYEE_DETAILS}`,
  //         element: <EmployeeDetail />,
  //       },
  //       {
  //         path: `${appRoot}${ROUTES.LOGBOOK}`,
  //         element: (
  //           <Navigate to={appRoot + ROUTES.LOGBOOK + ROUTES.LOGBOOK_LOG} />
  //         ),
  //       },
  //       {
  //         path: `${appRoot}${ROUTES.LOGBOOK}${ROUTES.LOGBOOK_LOG}`,
  //         element: <LogBookLog />,
  //       },
  //       {
  //         path: `${appRoot}${ROUTES.LOGBOOK}${ROUTES.LOGBOOK_ABTMETER}`,
  //         element: <LogBookABTMeter />,
  //       },
  //       {
  //         path: `${appRoot}${ROUTES.LOGBOOK}${ROUTES.LOGBOOK_CLEANLOG}`,
  //         element: <LogBookCleanLog />,
  //       },
  //       {
  //         path: `${appRoot}${ROUTES.PLANTDETAILS}`,
  //         element: (
  //           <Navigate
  //             to={appRoot + ROUTES.PLANTDETAILS + ROUTES.PLANTDETAILS_DETAILS}
  //           />
  //         ),
  //       },
  //       {
  //         path: `${appRoot}${ROUTES.PLANTDETAILS}${ROUTES.PLANTDETAILS_DETAILS}`,
  //         element: <PlantDetailsPage />,
  //       },
  //       {
  //         path: `${appRoot}${ROUTES.PLANTDETAILS}${ROUTES.PLANTDETAILS_OMChecklist}`,
  //         element: <PlantOMChecklist />,
  //       },
  //       {
  //         path: `${appRoot}${ROUTES.PLANTDETAILS}${ROUTES.PLANTDETAILS_SETTING}`,
  //         element: <PlantSetting />,
  //       },
  //     ],
  //   },
  //   {
  //     path: "/error",
  //     element: <Error />,
  //   },
  //   {
  //     path: "/unAuthorize",
  //     element: <UnAuthorize />,
  //   },
  // ]);

  // console.log(ALL_ROUTES);

  const router = createBrowserRouter(ALL_ROUTES);
  return <RouterProvider router={router} />;
}

export default App;
