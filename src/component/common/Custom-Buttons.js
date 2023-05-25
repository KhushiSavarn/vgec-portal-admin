import { Button } from "antd";
import { CSVLink } from "react-csv";

const CustomButton = (props) => {
  switch (props.type) {
    case "icon":
      return (
        <Button
          className="btn-dashboard-icon"
          ghost
          icon={props.icon}
          size="large"
          onClick={props.action}
          {...props.ButtonDefault}
        />
      );

    case "linkicon":
      return (
        <CSVLink data={props.data}>
          <Button
            className="btn-dashboard-icon"
            ghost
            icon={props.icon}
            size="large"
            onClick={props.action}
            {...props.ButtonDefault}
          />
        </CSVLink>
      );
    default:
      return (
        <Button
          className="btn-dashboard"
          type="primary"
          size="large"
          onClick={props.action}
          {...props.ButtonDefault}
        >
          {props.name}
        </Button>
      );
  }
};

export default CustomButton;
// export const IconButton = (props) => {
//   return (
//     <Button
//       className="btn-dashboard-icon"
//       ghost
//       icon={props.icon}
//       size="large"
//       onClick={props.action}
//       {...props.ButtonDefault}
//     />
//   );
// };

CustomButton.defaultProps = {
  action: () => {},
  name: "",
};

// IconButton.defaultProps = {
//   action: () => {},
//   icon: "",
// };
