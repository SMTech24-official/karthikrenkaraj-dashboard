/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import MyFormInput from "@/components/form/MyFormInput";
import MyFormWrapper from "@/components/form/MyFormWrapper";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import React from "react";
import { CiUnlock } from "react-icons/ci";
import { toast } from "sonner";

interface ChangePasswordFormData {
  oldPassword: string;
  newPassword: string;
}

const ChangePasswordForm = () => {
  const [changePass] = useChangePasswordMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit = async (data: ChangePasswordFormData) => {
    const toastId = toast.loading("Updating password...");

    try {
      await changePass(data).unwrap();

      dispatch(logout());

      toast.success("Password changed successfully", { id: toastId });
      router.push("/login");
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to change password");
    }
  };
  return (
    <MyFormWrapper onSubmit={onSubmit}>
      <h3 className="md:text-2xl text-lg font-medium text-start">
        New Password
      </h3>
      <div className="relative">
        <MyFormInput
          type="password"
          name="oldPassword"
          inputClassName="md:py-5 py-2 md:px-9 px-8 rounded-[50px] bg-white border-0"
          placeholder="***********"
        />
        <CiUnlock className="absolute md:top-[25px] top-3 md:left-3 left-2 text-xl" />
      </div>

      <h3 className="md:text-2xl text-lg font-medium text-start">
        Old Password
      </h3>
      <div className="relative">
        <MyFormInput
          type="password"
          name="newPassword"
          inputClassName="md:py-5 py-2 md:px-9 px-8 rounded-[50px] bg-white border-0"
          placeholder="***********"
        />
        <CiUnlock className="absolute md:top-[25px] top-3 md:left-3 left-2 text-xl" />
      </div>

      <div className="flex md:justify-start justify-center gap-3 mt-1">
        <button
          type="submit"
          className="bg-gradient-to-b from-[#32CD32] to-[#249A24] rounded-full py-3 md:px-7 px-5 text-xl text-white"
        >
          Update
        </button>

        <button className="bg-[#0C0B210A] rounded-full py-3 md:px-7 px-5 text-xl text-black">
          Cancel
        </button>
      </div>
    </MyFormWrapper>
  );
};

export default ChangePasswordForm;
