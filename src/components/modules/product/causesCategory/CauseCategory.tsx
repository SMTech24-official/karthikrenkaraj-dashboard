/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useCauseCategoryQuery } from "@/redux/features/cause/cause.api";
import CategoryDeleteModal from "../causeModal/CategoryDeleteModal";
import { useAppDispatch } from "@/redux/hooks";
import { setCategory } from "@/redux/features/cause/causeCategorySlice";

const CauseCategory = () => {
  const { data } = useCauseCategoryQuery(undefined);
  const dispatch = useAppDispatch();

  const handleClick = (type: string) => {
    dispatch(setCategory({ type }));
  };

  return (
    <div className="flex gap-3">
      {data?.data.map((item: any, idx: string) => (
        <div key={idx} className="relative">
          <button
            onClick={() => handleClick(item.name)}
            className="flex gap-1 items-center bg-white  md:px-3 px-2 md:py-2 py-2 rounded-full"
          >
            {item.name}
          </button>

          <div className="absolute -top-1 -right-1">
            <CategoryDeleteModal id={item.id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CauseCategory;
