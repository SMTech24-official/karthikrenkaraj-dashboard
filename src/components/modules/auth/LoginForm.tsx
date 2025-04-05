/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import MyFormInput from "@/components/form/MyFormInput";
import MyFormWrapper from "@/components/form/MyFormWrapper";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { setCookie } from "@/utils/setCookies";
import { varifyToken } from "@/utils/varifyToken";
import { useRouter } from "next/navigation";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const router = useRouter();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("login...");

    try {
      const res = await login(data).unwrap();
      const user = varifyToken(res.data.token) as TUser;

      if (user?.role !== "ADMIN") {
        return toast.error("Unauthorize Access", { id: toastId });
      } else {
        setCookie(res.data.token);
        dispatch(setUser({ user, token: res.data.token }));

        toast.success("Login success", { id: toastId });

        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    } catch (err: any) {
      toast.error(err.data?.message || "Faild to login", { id: toastId });
    }
  };
  return (
    <MyFormWrapper onSubmit={onSubmit}>
      <MyFormInput
        type="email"
        name="email"
        inputClassName="md:py-4 py-2 md:px-5 px-5 rounded-3xl"
        placeholder="email"
      />

      <MyFormInput
        type="password"
        name="password"
        inputClassName="md:py-4 py-2 md:px-5 px-5 rounded-3xl"
        placeholder="password"
      />

      <button className="bg-secondary rounded-3xl py-3 md:px-36 px-20 text-xl text-primary">
        Login
      </button>
    </MyFormWrapper>
  );
};

export default LoginForm;
