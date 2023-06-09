import {
  AiOutlineDashboard,
  AiOutlineUser,
  AiOutlineSetting,
} from "react-icons/ai";
import { BsBoxSeam } from "react-icons/bs";
import { BiTransfer } from "react-icons/bi";
import { AiOutlineHistory } from "react-icons/ai";
import { SlWrench } from "react-icons/sl";
import { VscRequestChanges, VscGraph } from "react-icons/vsc";
import { GrGroup } from "react-icons/gr";
import { GiCarKey, GiMeshBall } from "react-icons/gi";
import { RiCustomerService2Fill, RiCalendarEventFill } from "react-icons/ri";
import { HiOutlineUserGroup } from "react-icons/hi";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
const data = [
  {
    id: "dashboard",
    icon: <VscGraph />,
    label: "Dashboard",
  },
  // {
  //   id: "dashboard",
  //   icon: <AiOutlineDashboard />,
  //   label: "Dashboard",
  // },
  {
    id: "users",
    icon: <AiOutlineUser />,
    label: "Users",
  },
  // {
  //   id: "clubs",
  //   icon: <GiMeshBall />,
  //   label: "Clubs",
  // },
  // {
  //   id: "request",
  //   icon: <HiOutlineUserGroup />,
  //   label: "Request",
  // },
  // {
  //   id: "bouncers",
  //   icon: <RiCustomerService2Fill />,
  //   label: "Bouncers",
  // },
  // {
  //   id: "valets",
  //   icon: <GiCarKey />,
  //   label: "Valets",
  // },
  // {
  //   id: "feed",
  //   icon: <HiOutlineSquares2X2 />,
  //   label: "Feed",
  // },
  // {
  //   id: "events",
  //   icon: <RiCalendarEventFill />,
  //   label: "Events",
  // },
  // {
  //   id: "setting",
  //   icon: <AiOutlineSetting />,
  //   label: "Setting",
  // },
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
