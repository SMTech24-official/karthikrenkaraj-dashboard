/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";
import { DialogTitle } from "@radix-ui/react-dialog";
import { MdCancel } from "react-icons/md";
import { useDeleteCauseCategoryMutation } from "@/redux/features/cause/cause.api";

const CategoryDeleteModal = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);
  const [deleteCategory] = useDeleteCauseCategoryMutation();

  const handleDelete = async () => {
    const toastId = toast.loading(`Deleting...`);

    try {
      const res = await deleteCategory(id).unwrap();

      if (res.data) {
        toast.success("Deleted Successfully", { id: toastId });
        setOpen(false);
      } else {
        toast.error(res?.error?.data?.message || "Failed to Delete", {
          id: toastId,
        });
        setOpen(false);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || `Failed to delete`, {
        id: toastId,
      });
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="text-[#FF4B4B] ">
        <MdCancel />
      </DialogTrigger>

      <DialogContent className="max-w-[450px] !rounded-3xl [&>button]:hidden">
        <DialogHeader>
          <DialogTitle>
            <div className="flex flex-col justify-center items-center gap-5 text-center">
              <h3 className="text-xl font-medium">
                Are you sure you want to proceed?
              </h3>
              <div className="flex md:gap-5 gap-3">
                <button
                  onClick={() => setOpen(false)}
                  className="bg-red-500 py-2 px-6 rounded-full"
                >
                  Cancle
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-green-500 py-2 px-6 rounded-full"
                >
                  Confirm
                </button>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryDeleteModal;
