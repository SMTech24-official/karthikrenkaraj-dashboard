"use client";
import Image from "next/image";
import Link from "next/link";
import { SlLocationPin } from "react-icons/sl";
import EditTampleModal from "../tampleModal/EditTampleModal";
import { useGetAllTempleQuery } from "@/redux/features/temple/temple.api";
import { TTemple } from "@/types/temple.type";
import Spinner from "@/components/modules/common/Spinner";

const TampleCard = () => {
  const { data: tempelData, isFetching } = useGetAllTempleQuery(undefined);

  if (isFetching) {
    return <Spinner />;
  }
  
  return (
    <div className="grid lg:grid-cols-5  md:grid-cols-3 grid-cols-2 gap-3 md:gap-7 md:mt-12 mt-7">
      {tempelData?.data?.data.map((temple: TTemple) => (
        <div key={temple.id} className="relative">
          <div className="z-10">
            <EditTampleModal id={temple.id} />
          </div>
          <Link href={`/single-temple/${temple.id}`}>
            <div className="bg-white md:rounded-3xl rounded-xl md:p-3 p-2">
              <Image
                src={temple.image}
                height={1000}
                width={1000}
                alt="temple"
                className="md:rounded-[18px] rounded-xl md:h-44 h-[120px] w-full"
              />
              <h3 className="md:text-xl text-lg font-semibold text-center md:my-2 my-[5px] truncate overflow-hidden whitespace-nowrap">
                {temple.name}
              </h3>
              <div className="flex gap-1 justify-center md:items-center text-sm ">
              <div className="w-3"><SlLocationPin className="md:mt-0 mt-1" /></div>
                <p className="truncate overflow-hidden whitespace-nowrap">{temple.location}</p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default TampleCard;
