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
import { useDeleteTempleMutation } from "@/redux/features/temple/temple.api";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useDeleteCauseMutation } from "@/redux/features/cause/cause.api";
import { useDeleteUserMutation } from "@/redux/features/user/user.api";

interface DeleteModalProps {
  id: string;
  type: "temple" | "cause" | "user";
}

const DeleteModal = ({ id, type }: DeleteModalProps) => {
  const [open, setOpen] = useState(false);
  const [deleteTemple] = useDeleteTempleMutation();
  const [deleteCause] = useDeleteCauseMutation();
  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = async () => {
    const toastId = toast.loading(`Deleting...`);
    try {
      let res;
      if (type === "temple") {
        res = await deleteTemple(id).unwrap();
      } else if (type === "cause") {
        res = await deleteCause(id).unwrap();
      } else if (type === "user") {
        res = await deleteUser(id).unwrap();
      }

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
      toast.error(err?.data?.message || `Failed to delete ${type}`, {
        id: toastId,
      });
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="bg-[#FF4B4B] border border-[##FF4B4B] text-[#0C0B21] py-3 px-6 rounded-full font-normal">
        Delete
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

export default DeleteModal;
