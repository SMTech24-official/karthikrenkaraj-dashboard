"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";
import { LiaPhoneSquareSolid } from "react-icons/lia";
import ProductDetailsTap from "@/components/modules/productDetails/ProductDetailsTap";
import { useGetSingleTempleQuery } from "@/redux/features/temple/temple.api";
import Link from "next/link";
import Spinner from "@/components/modules/common/Spinner";

const ProductPage = () => {
  const { id } = useParams();
  const { data, isFetching } = useGetSingleTempleQuery(id);
  const templeData = data?.data;

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <div>
      <Link href={"/"}>
        <button className="flex gap-1 items-center mb-3 md:mb-6">
          <BsArrowLeft /> Back
        </button>
      </Link>
      <div className="flex justify-between mb-3 md:mb-6">
        <h1 className="md:text-5xl text-3xl font-medium md:mb-4 mb-2">
          Temple Details
        </h1>
      </div>

      {/* cols 2  */}
      <div className="grid md:grid-cols-5 grid-cols-1 md:gap-16 gap-3 md:p-7 p-3 bg-white rounded-3xl">
        {/* col  */}
        <div className="md:col-span-2 col-span-1 space-y-5">
          <Image
            src={templeData?.image}
            height={1000}
            width={1000}
            alt="new tamplet"
            className="md:rounded-[18px] rounded-xl"
          />
          <div className="flex flex-col gap-1 justify-center items-center">
            <h1 className="md:text-5xl text-3xl font-medium md:mb-3 mb-2 lg:text-start text-center">
              {templeData?.name}
            </h1>
            <div className="flex md:gap-4 gap-2 flex-wrap justify-center items-center text-sm text-[#5D6460]">
              <div className="flex justify-center items-center gap-1 ">
                <SlLocationPin />
                <p> {templeData?.address}</p>
              </div>
              <div className="flex justify-center items-center gap-1">
                <LiaPhoneSquareSolid className="text-lg" />
                <p> {templeData?.phoneNumber}</p>
              </div>
            </div>
          </div>
          <p className="text-center text-[#5D6460]">
            {templeData?.description}
          </p>
        </div>
        {/* col  */}
        <div className="md:col-span-3 col-span-1">
          <ProductDetailsTap id={templeData.id} />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
