import CauseCard from "@/components/modules/product/causeCard/CauseCard";
import CauseCategory from "@/components/modules/product/causesCategory/CauseCategory";
import AddCategoryModal from "@/components/modules/product/causeModal/AddCategoryModal";
import AddCauseModal from "@/components/modules/product/causeModal/AddCauseModal";
import { generateMetadata } from "@/utils/generateMetadata";
import React from "react";
import AllCategoryBtn from "@/components/modules/product/causesCategory/AllCategoryBtn";

export const metadata = generateMetadata("Products", "");

const CauseShopPage = () => {
  return (
    <div className="">
      {/* hearder  */}
      <div className="flex justify-between">
        <h1 className="md:text-5xl text-2xl font-medium md:mb-4 mb-3">
          All Cause Shop
        </h1>
        <div className="inline-block">
          <AddCauseModal />
        </div>
      </div>

      <div className="flex gap-3 ">
        <AllCategoryBtn />
        
        <CauseCategory />

        <AddCategoryModal />
      </div>

      {/* cards  */}
      <CauseCard />
    </div>
  );
};

export default CauseShopPage;
