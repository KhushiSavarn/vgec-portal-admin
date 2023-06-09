import { Navigate } from "react-router-dom";
import Error from "../page/error";
import UnAuthorize from "../page/unAuthorize";
import LogIn from "../page/user/login";
import Registration from "../page/user/Registration";
import AppLayout from "../component/layout/AppLayout";
import Dashboard from "../page/app/dashboard";
import { appRoot } from "./constant/CONSTANTS";
import ForgetPassword from "../page/user/Registration/forgetPass";
import Users from "../page/app/users";
import UserDetail from "../page/app/users/user-detail";

export const ROUTES = {
  FORGOT_PASSWORD: "/forgot-password",
  DASHBOARD: "/dashboard",
  USERS: "/users",
  USERS_DETAIL: "/users/:id",
  CLUBS: "/clubs",
  REQUEST: "/request",
  CLUB_REQUEST: "/request/:id",
  BOUNCERS: "/bouncers",
  VALETS: "/valets",
  FEED: "/feed",
  EVENTS: "/events",
  SETTING: "/setting",
  INVENTORY: "/inventory",
  INVENTORY_DETAILS: "/details",
  INVENTORY_MOVEHISTORY: "/movehistory",
  INVENTORY_EQUIPMENT: "/equipment",
  INVENTORY_EQUIPMENT_DETAILS: "/equipment/:eid/:id",
  INVENTORY_TRANSFER: "/transfer",
  INVENTORY_PURCHASE: "/purchase",
  EXPENSES: "/expenses",
  EXPENSES_DETAIL: "/detail",
  EXPENSES_VEHICAL: "/vehical",
  MAINTENANCE: "/maintenance",
  EMPLOYEE: "/employee",
  EMPLOYEE_DETAILS: "/employee/:eid/:id",
  LOGBOOK: "/logBook",
  LOGBOOK_LOG: "/log",
  LOGBOOK_ABTMETER: "/ABTMeter",
  LOGBOOK_CLEANLOG: "/cleaningLog",
  PLANTDETAILS: "/plantDetails",
  PLANTDETAILS_DETAILS: "/details",
  PLANTDETAILS_OMChecklist: "/OMChecklist",
  PLANTDETAILS_SETTING: "/setting",
};

const LOGIN_ROUTES = [
  // {
  //   path: "/",
  //   element: <SidePage />,
  //   errorElement: <Error />,
  //   children: [
  //     {
  //       index: true,
  //       element: <LogIn />,
  //     },
  //     {
  //       path: "registration",
  //       element: <Registration />,
  //     },
  //   ],
  // },
  {
    index: true,
    element: <LogIn />,
  },
  {
    path: "registration",
    element: <Registration />,
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    element: <ForgetPassword />,
    errorElement: <Error />,
  },
];

const ALL_ROUTES = [
  ...LOGIN_ROUTES,

  {
    path: `${appRoot}`,
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={`${appRoot}${ROUTES.DASHBOARD}`} />,
      },
      {
        path: `${appRoot}${ROUTES.DASHBOARD}`,
        element: <Dashboard />,
      },
      {
        path: `${appRoot}${ROUTES.USERS}`,
        element: <Users />,
      },
      // {
      //   path: `${appRoot}${ROUTES.CLUBS}`,
      //   element: <Clubs />,
      // },
      {
        path: `${appRoot}${ROUTES.USERS_DETAIL}`,
        element: <UserDetail />,
      },
      // {
      //   path: `${appRoot}${ROUTES.REQUEST}`,
      //   element: <Request />,
      // },
      // {
      //   path: `${appRoot}${ROUTES.CLUB_REQUEST}`,
      //   element: <RequestAboutInfo />,
      // },
      // {
      //   path: `${appRoot}${ROUTES.BOUNCERS}`,
      //   element: <Bouncers />,
      // },
      // {
      //   path: `${appRoot}${ROUTES.VALETS}`,
      //   element: <Valets />,
      // },
      // {
      //   path: `${appRoot}${ROUTES.FEED}`,
      //   element: <Feed />,
      // },
      // {
      //   path: `${appRoot}${ROUTES.EVENTS}`,
      //   element: <Events />,
      // },
      // {
      //   path: `${appRoot}${ROUTES.SETTING}`,
      //   element: <Setting />,
      // },
      // {
      //   path: `${appRoot}${ROUTES.INVENTORY}`,
      //   element: (
      //     <Navigate
      //       to={`${appRoot}${ROUTES.INVENTORY}${ROUTES.INVENTORY_DETAILS}`}
      //     />
      //   ),
      // },
      // {
      //   path: `${appRoot}${ROUTES.INVENTORY}${ROUTES.INVENTORY_DETAILS}`,
      //   element: <Inventory />,
      // },
      // {
      //   path: `${appRoot}${ROUTES.INVENTORY}${ROUTES.INVENTORY_MOVEHISTORY}`,
      //   element: <MoveHistory />,
      // },
      // {
      //   path: `${appRoot}${ROUTES.INVENTORY}${ROUTES.INVENTORY_EQUIPMENT}`,
      //   element: <Equipment />,
      // },
      // {
      //   path: `${appRoot}${ROUTES.INVENTORY}${ROUTES.INVENTORY_EQUIPMENT_DETAILS}`,
      //   element: <EquipmentDetailPage />,
      // },
      // {
      //   path: `${appRoot}${ROUTES.INVENTORY}${ROUTES.INVENTORY_TRANSFER}`,
      //   element: <Transfer />,
      // },
      // {
      //   path: `${appRoot}${ROUTES.INVENTORY}${ROUTES.INVENTORY_PURCHASE}`,
      //   element: <PurchaseRequest />,
      // },
      //   {
      //     path: `${appRoot}${ROUTES.EXPENSES}`,
      //     element: <Expenses />,
      //   },
      //   {
      //     path: `${appRoot}${ROUTES.EXPENSES}`,
      //     element: (
      //       <Navigate to={appRoot + ROUTES.EXPENSES + ROUTES.EXPENSES_DETAIL} />
      //     ),
      //   },
      //   {
      //     path: `${appRoot}${ROUTES.EXPENSES}${ROUTES.EXPENSES_DETAIL}`,
      //     element: <ExpanseDetails />,
      //   },
      //   {
      //     path: `${appRoot}${ROUTES.EXPENSES}${ROUTES.EXPENSES_VEHICAL}`,
      //     element: <VehicalExpanse />,
      //   },
      //   {
      //     path: `${appRoot}${ROUTES.MAINTENANCE}`,
      //     element: <Maintenance />,
      //   },
      //   {
      //     path: `${appRoot}${ROUTES.EMPLOYEE}`,
      //     element: <Employee />,
      //   },
      //   {
      //     path: `${appRoot}${ROUTES.EMPLOYEE_DETAILS}`,
      //     element: <EmployeeDetail />,
      //   },
      //   {
      //     path: `${appRoot}${ROUTES.LOGBOOK}`,
      //     element: (
      //       <Navigate to={appRoot + ROUTES.LOGBOOK + ROUTES.LOGBOOK_LOG} />
      //     ),
      //   },
      //   {
      //     path: `${appRoot}${ROUTES.LOGBOOK}${ROUTES.LOGBOOK_LOG}`,
      //     element: <LogBookLog />,
      //   },
      //   {
      //     path: `${appRoot}${ROUTES.LOGBOOK}${ROUTES.LOGBOOK_ABTMETER}`,
      //     element: <LogBookABTMeter />,
      //   },
      //   {
      //     path: `${appRoot}${ROUTES.LOGBOOK}${ROUTES.LOGBOOK_CLEANLOG}`,
      //     element: <LogBookCleanLog />,
      //   },
      //   {
      //     path: `${appRoot}${ROUTES.PLANTDETAILS}`,
      //     element: (
      //       <Navigate
      //         to={appRoot + ROUTES.PLANTDETAILS + ROUTES.PLANTDETAILS_DETAILS}
      //       />
      //     ),
      //   },
      //   {
      //     path: `${appRoot}${ROUTES.PLANTDETAILS}${ROUTES.PLANTDETAILS_DETAILS}`,
      //     element: <PlantDetailsPage />,
      //   },
      //   {
      //     path: `${appRoot}${ROUTES.PLANTDETAILS}${ROUTES.PLANTDETAILS_OMChecklist}`,
      //     element: <PlantOMChecklist />,
      //   },
      //   {
      //     path: `${appRoot}${ROUTES.PLANTDETAILS}${ROUTES.PLANTDETAILS_SETTING}`,
      //     element: <PlantSetting />,
      //   },
    ],
  },
  {
    path: "/error",
    element: <Error />,
  },
  {
    path: "/unAuthorize",
    element: <UnAuthorize />,
  },
];

export default ALL_ROUTES;
