import NavBar from "@/components/shared/NavBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yargo",
  description: "Transform Voice, Images, and Videos into Text",
};

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#eff5e6] to-[#f6f6f6] max-w-[1372px] mx-auto md:py-5 px-3">
      <div className="md:mb-12 mb-3 mt-3"><NavBar/></div>
      <div>{children}</div>
    </main>
  );
};

export default CommonLayout;
