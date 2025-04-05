"use client";
import { setCategory } from "@/redux/features/cause/causeCategorySlice";
import { useAppDispatch } from "@/redux/hooks";

const AllCategoryBtn = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setCategory({ undefined }));
  };
  return (
    <div>
      <button
        onClick={handleClick}
        className="flex gap-1 items-center bg-white  md:px-3 px-2 md:py-2 py-2 rounded-full"
      >
        All
      </button>
    </div>
  );
};

export default AllCategoryBtn;
