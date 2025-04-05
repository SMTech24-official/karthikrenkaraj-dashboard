/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";

const TampleCauseCard = (cause: any) => {
  const causeData = cause?.cause?.cause;

  const { totalAmount } = cause?.cause;

  return (
    <div className="space-y-1">
      <Image
        src={causeData?.images[0]}
        height={1000}
        width={1000}
        alt="tamplet"
        className="md:rounded-[18px] rounded-xl md:h-44 h-[120px] w-full"
      />
      <h3 className="md:font-semibold font-medium pt-3 text-center truncate overflow-hidden whitespace-nowrap">
        {causeData?.name}
      </h3>
      <div className="flex justify-center">
        {/* <p>1 Items</p> */}
        <p className="text-[#68A678] md:text-xl font-semibold">{totalAmount}</p>
      </div>
    </div>
  );
};

export default TampleCauseCard;
