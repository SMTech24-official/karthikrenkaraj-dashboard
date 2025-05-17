import CausesCard from "@/components/modules/cause/CausesCard";
import { generateMetadata } from "@/utils/generateMetadata";

export const metadata = generateMetadata("Causes", "");

const CausePage = () => {
  return (
    <div>
      <h1 className="md:text-5xl text-2xl font-medium md:mb-4 mb-2">
        All Causes
      </h1>

      <div className="md:p-7 p-3 md:rounded-3xl rounded-xl  md:mt-12 mt-4">
        <CausesCard />
      </div>
    </div>
  );
};

export default CausePage;
