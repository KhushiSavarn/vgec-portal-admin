import { Card } from "antd";
import React from "react";

const AboutInfo = () => {
  return (
    <>
      <div className="mt-3 flex ml-5">
        <p className="font-semibold text-slate-400 text-lg">Username</p>
        <p className="font-bold text-lg">&nbsp;: john_1</p>
      </div>
      <div className="flex ml-5">
        <p className="font-semibold text-slate-400 text-lg">Date of birth</p>
        <p className="font-bold text-lg">&nbsp;: Nov 12, 2003</p>
      </div>
      <div className="flex ml-5">
        <p className="font-semibold text-slate-400 text-lg">Mobile Number</p>
        <p className="font-bold text-lg">&nbsp;: 1234567890</p>
      </div>
    </>
  );
};

export default AboutInfo;
