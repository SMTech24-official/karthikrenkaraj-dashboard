/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useAllCausesForAdminQuery } from "@/redux/features/cause/cause.api";
import Spinner from "../common/Spinner";
import Image from "next/image";
import CausesUpdateModal from "./CausesUpdateModal";

const CausesCard = () => {
  const { data, isFetching } = useAllCausesForAdminQuery(undefined);

  if (isFetching) {
    return <Spinner />;
  }

  if (data?.data.length < 1) {
    return (
      <div className="flex justify-center items-center md:my-12 my-5 md:py-12 py-5 bg-white rounded-3xl">
        <p>No Data Found</p>
      </div>
    );
  }
  console.log(data);
  return (
    <div className="grid md:grid-cols-3 grid-cols-1 md:gap-10 gap-6 ">
      {data?.data?.map((item: any) => (
        <div key={item.id} className="p-4 rounded-xl space-y-6 bg-white">
          <Image
            src={item?.cause?.images[0]}
            alt="image"
            width={1000}
            height={800}
            className="w-full h-52 rounded-xl"
          />
          <div className="space-y-3">
            <p>Cause Name: {item?.cause?.name}</p>
            <p>Temple Name: {item?.temple?.name}</p>
            <p>
              Status:{" "}
              <span className="bg-primary/50 p-1 rounded-lg">
                {item?.status}
              </span>
            </p>
          </div>

          <div className="space-y-4">
            <div
              className={`${
                item.status === "PENDING_FOR_APPROVAL" ? "flex" : "hidden"
              }  gap-2 justify-between items-center`}
            >
              <h2 className="text-xl font-medium">Open for founding</h2>
              <CausesUpdateModal
                data={{ id: item.id, status: "OPEN_FOR_FOUNDING" }}
              />
            </div>

            {item.status !== "PENDING_FOR_APPROVAL" && (
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <p>Price: {item?.price}</p>
                  <p>Specifications: {item?.specifications}</p>
                </div>
                <Image
                  src={item?.specificationImage}
                  alt="image"
                  width={1000}
                  height={800}
                  className="w-full h-28 rounded-xl"
                />
              </div>
            )}
          </div>

          {/* <div
            className={`space-y-4 ${
              item.status === "PENDING_FOR_APPROVAL" && "hidden"
            }`}
          >
            <div className="flex gap-2 justify-between items-center">
              <h2 className="text-xl font-medium">Mark As Completed</h2>
              {item.status !== "COMPLETED" && (
                <button className="bg-primary px-5 py-2 rounded-full">
                  Confirm
                </button>
              )}
            </div>

            {item.status === "COMPLETED" && (
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <p>Price: 123</p>
                  <p>Specifications: higth:2cm\nwight:3cm</p>
                </div>
                <Image
                  src={item?.cause?.images[0]}
                  alt="image"
                  width={1000}
                  height={800}
                  className="w-full h-28 rounded-xl"
                />
              </div>
            )}
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default CausesCard;
