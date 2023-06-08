import React from "react";
import { Button, Card, Image } from "antd";
import imageSrc from "../../../asset/image/image 2.png";

const UserProfile = () => {
  return (
    <Card className="h-72">
      <div>
        <div className="flex ml-5">
          <Image
            width={80}
            height={80}
            className="rounded-full"
            preview={false}
            src={imageSrc}
            alt="Images is Not Availabel"
          />
          <p className="font-medium mt-7 px-3 text-2xl">John Deo</p>
        </div>
        <div className="mt-3 flex ml-5">
          <p className="font-semibold text-slate-400 text-lg">Followers</p>
          <p className="font-bold text-lg">: 500</p>
        </div>
        <div className="flex ml-5">
          <p className="font-semibold text-slate-400 text-lg">Following</p>
          <p className="font-bold text-lg">: 55</p>
        </div>
        <Button className="ml-5" type="primary">
          Notification
        </Button>
      </div>
    </Card>
  );
};

export default UserProfile;
