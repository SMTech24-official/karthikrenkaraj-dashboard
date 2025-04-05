import LoginForm from "@/components/modules/auth/LoginForm";
import { generateMetadata } from "@/utils/generateMetadata";

export const metadata = generateMetadata("Login", "");



export default function Page() {
  return (
    <div className=" flex flex-col h-screen justify-center items-center md:space-y-14 space-y-10 py-20 px-5">
      <div className="w-full max-w-[728px] bg-gradient-to-b from-[#f2f8f2] to-[#fafafa] md:p-12 p-5 rounded-[48px] border-[3px] border-white text-center">
        <h1 className="md:text-4xl text-3xl font-semibold mb-1">Login Here</h1>
        <p className="mb-5">Start your journey as admin here</p>
        <LoginForm />
      </div>
    </div>
  );
}
