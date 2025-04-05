"use client";
import Image from "next/image";
import userImg from "../../../../public/images/flower.png";
import Spinner from "@/components/modules/common/Spinner";
import { useGetMeQuery } from "@/redux/features/auth/authApi";

const MyProfile = () => {
  const { data, isFetching } = useGetMeQuery(undefined);
  const userData = data?.data;

  if (isFetching) {
    return <Spinner />;
  }
  return (
    <div className="flex justify-center items-center py-5">
      <div className=" max-w-[625px] bg-gradient-to-b from-[#f2f8f2] to-[#fafafa] md:p-12 p-5 md:rounded-3xl rounded-2xl border-[3px] border-white text-center md:space-y-7 space-y-4">
        <div className="rounded-full overflow-hidden flex justify-center">
          <Image
            src={userImg}
            alt="user"
            width={1000}
            height={1000}
            className="w-[125px] h-[125px] rounded-full"
          />
        </div>

        <h2 className="md:text-[32px] text-2xl font-medium text-center">
          Personal Information
        </h2>

        <div className="grid grid-cols-5 md:gap-9 gap-3">
          <div className="text-start col-span-3">
            <h3 className="md:text-[25px] text-xl font-semibold">Email</h3>
            <p className="md:text-2xl text-[#0C0B2199]">{userData?.email}</p>
          </div>
          <div className="text-start col-span-2">
            <h3 className="md:text-[25px] text-xl font-semibold">Mobile No</h3>
            <p className="md:text-2xl text-[#0C0B2199]">
              {userData?.phoneNumber}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
