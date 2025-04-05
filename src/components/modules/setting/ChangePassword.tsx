import Image from "next/image";
import lock from "../../../../public/images/lock.png";
import ChangePasswordForm from "../auth/ChangePasswordForm";

const ChangePassword = () => {
  return (
    <div className="flex justify-center items-center py-5">
      <div className=" max-w-[922px] bg-gradient-to-b from-[#f2f8f2] to-[#fafafa] md:p-12 p-5 md:rounded-3xl rounded-2xl border-[3px] border-white text-center md:space-y-7 space-y-4">
        <div className="text-center">
          <h1 className="md:text-5xl text-2xl font-medium md:mb-4 mb-2">
            Password
          </h1>
          <p className="text-lg text-[#475569]">
            Give me correct password and change password
          </p>
        </div>

        <div className="flex md:flex-row flex-col-reverse items-center justify-center md:gap-3 gap-2">
          <div className="md:w-1/2 w-full">
            <ChangePasswordForm />
          </div>
          <div className="md:w-1/2 w-full">
            <Image src={lock} alt="lock" height={1000} width={1000} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
