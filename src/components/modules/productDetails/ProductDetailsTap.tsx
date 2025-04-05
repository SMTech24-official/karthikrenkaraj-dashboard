/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TampleCauseCard from "../tample/tampleDards/TampleCauseCard";
import {
  useTempleCompleteCausesQuery,
  useTempleFundingCausesQuery,
} from "@/redux/features/cause/cause.api";
import Spinner from "@/components/modules/common/Spinner";

const ProductDetailsTap = ({ id }: { id: string }) => {
  const { data: fundingCauses, isFetching: fundingIsFetching } =
    useTempleFundingCausesQuery(id);

  const { data: completedCauses, isFetching: completedIsFetching } =
    useTempleCompleteCausesQuery(id);

  if (fundingIsFetching || completedIsFetching) {
    return <Spinner />;
  }
  return (
    <Tabs defaultValue="causes" className="w-full">
      <TabsList className="bg-transparent md:mb-8 mb-4 flex md:gap-5 gap-2">
        <TabsTrigger
          value="causes"
          className="md:text-2xl text-lg  data-[state=active]:border-b-[2px] data-[state=active]:border-black data-[state=active]:shadow-none data-[state=active]:rounded-none"
        >
          Causes
        </TabsTrigger>
        <TabsTrigger
          value="completed-causes"
          className="md:text-2xl text-lg data-[state=active]:border-b-[2px] data-[state=active]:border-black data-[state=active]:shadow-none data-[state=active]:rounded-none"
        >
          Completed Causes
        </TabsTrigger>
      </TabsList>
      <TabsContent value="causes">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 md:gap-5 gap-3">
          {fundingCauses?.data.map((cause: any, idx:number) => (
            <TampleCauseCard key={idx} cause={cause} />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="completed-causes">
        <div className="grid md:grid-cols-4 grid-cols-2 md:gap-5 gap-3">
          {completedCauses?.data.map((cause:any, idx:number) => (
            <TampleCauseCard key={idx}  cause={cause}/>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ProductDetailsTap;
