import SettingTab from "@/components/modules/setting/SettingTab";
import { generateMetadata } from "@/utils/generateMetadata";
import React from "react";

export const metadata = generateMetadata("Setting", "");


const SettingPage = () => {
  return (
    <div>
      <h1 className="md:text-5xl text-2xl font-medium md:mb-5 mb-3">
        All Temple List
      </h1>

      <SettingTab />

    </div>
  );
};

export default SettingPage;
