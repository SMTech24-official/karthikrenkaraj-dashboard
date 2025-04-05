
import TampleCard from "@/components/modules/tample/tampleDards/TampleCard";
import AddTampleModal from "@/components/modules/tample/tampleModal/AddTampleModal";

const CommonLayoutHomePage = () => {
  return (
    <div className="">
      {/* hearder  */}
      <div className="flex justify-between">
        <h1 className="md:text-5xl text-2xl font-medium md:mb-4 mb-2">
          All Temple List
        </h1>
        <div className="inline-block">
          <AddTampleModal />
        </div>
      </div>

      <TampleCard/>
    </div>
  );
};

export default CommonLayoutHomePage;
