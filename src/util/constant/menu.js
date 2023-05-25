import { AiOutlineDashboard } from "react-icons/ai";
import { BsBoxSeam } from "react-icons/bs";
import { BiTransfer } from "react-icons/bi";
import { AiOutlineHistory } from "react-icons/ai";
import { SlWrench } from "react-icons/sl";
import { VscRequestChanges } from "react-icons/vsc";
const data = [
  {
    id: "dashboard",
    icon: <AiOutlineDashboard />,
    label: "Dashboard",
  },
  {
    id: "inventory",
    icon: <BsBoxSeam />,
    label: "Inventory",
    subMenu: [
      {
        id: "details",
        icon: <BsBoxSeam />,
        label: "Details",
      },
      {
        id: "movehistory",
        icon: <AiOutlineHistory />,
        label: "Move History",
      },
      {
        id: "equipment",
        icon: <SlWrench />,
        label: "Equipment",
      },
      {
        id: "transfer",
        icon: <BiTransfer />,
        label: "Transfer",
      },
      {
        id: "purchase",
        icon: <VscRequestChanges />,
        label: "Purchase",
      },
    ],
  },
  // {
  //   id: "expenses",
  //   icon: <BiWallet />,
  //   label: "Expenses",
  //   subMenu: [
  //     {
  //       id: "detail",
  //       icon: <SlWallet />,
  //       label: "Details",
  //     },
  //     {
  //       id: "Vehical",
  //       icon: <BsTruck />,
  //       label: "Vehical",
  //     },
  //   ],
  // },
  // {
  //   id: "maintenance",
  //   icon: <HiOutlineWrench />,
  //   label: "Maintenance",
  // },
  // {
  //   id: "employee",
  //   icon: <MdPeopleOutline />,
  //   label: "Employee",
  // },
  // {
  //   id: "logBook",
  //   icon: <GoBook />,
  //   label: "Log Book",
  //   subMenu: [
  //     {
  //       id: "log",
  //       icon: <RxActivityLog />,
  //       label: "Log",
  //     },
  //     {
  //       id: "ABTMeter",
  //       icon: <CgFileDocument />,
  //       label: "ABT Meter",
  //     },
  //     {
  //       id: "cleaningLog",
  //       icon: <TbFileStack />,
  //       label: "Cleaning Log",
  //     },
  //   ],
  // },
  // {
  //   id: "plantDetails",
  //   icon: <AiOutlineSetting />,
  //   label: "Plant Details",
  //   subMenu: [
  //     {
  //       id: "details",
  //       icon: <SlSettings />,
  //       label: "Details",
  //     },
  //     {
  //       id: "OMChecklist",
  //       icon: <VscChecklist />,
  //       label: "O&M Checklist",
  //     },
  //     {
  //       id: "setting",
  //       icon: <AiOutlineSetting />,
  //       label: "Setting",
  //     },
  //   ],
  // },
];
export default data;
