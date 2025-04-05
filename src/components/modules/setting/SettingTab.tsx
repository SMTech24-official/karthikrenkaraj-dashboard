import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IoCalendarOutline } from "react-icons/io5";
import { TbLockPassword } from "react-icons/tb";
import MyProfile from "./MyProfile";
import ChangePassword from "./ChangePassword";

const SettingTab = () => {
  return (
    <Tabs defaultValue="myProfile" className="w-full">
      <TabsList className="bg-transparent md:mb-8 mb-4 md:gap-5 gap-2">
        <TabsTrigger
          value="myProfile"
          className="md:text-2xl data-[state=active]:bg-transparent  data-[state=active]:border-b-[2px] data-[state=active]:border-black data-[state=active]:shadow-none data-[state=active]:rounded-none"
        >
          <IoCalendarOutline className="mr-2" /> My Profile
        </TabsTrigger>
        <TabsTrigger
          value="password"
          className="md:text-2xl data-[state=active]:bg-transparent data-[state=active]:border-b-[2px] data-[state=active]:border-black data-[state=active]:shadow-none data-[state=active]:rounded-none"
        >
          <TbLockPassword className="mr-2" /> Password
        </TabsTrigger>
      </TabsList>
      <TabsContent value="myProfile">
        <MyProfile />
      </TabsContent>
      <TabsContent value="password">
        <ChangePassword />
      </TabsContent>
    </Tabs>
  );
};

export default SettingTab;
