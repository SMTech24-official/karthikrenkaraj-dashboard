/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FieldValues } from "react-hook-form";
import { FaSave } from "react-icons/fa";
import { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import MyFormWrapper from "@/components/form/MyFormWrapper";
import MyFormInput from "@/components/form/MyFormInput";
import {
  useGetSingleTempleQuery,
  useUpdateTempleMutation,
} from "@/redux/features/temple/temple.api";
import { toast } from "sonner";
import DeleteModal from "../../common/DeleteModal";

const EditTampleModal = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);
  const [updateTemple] = useUpdateTempleMutation();
  const { data: tempeData } = useGetSingleTempleQuery(id);

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Updating Temple...");

    // If image is provided, append it separately
    const formData = new FormData();
    if (data.image) {
      formData.append("image", data.image);
      delete data.image; // Remove image from JSON data
    }

    formData.append("data", JSON.stringify(data));

    const templeData = {
      id,
      data: formData,
    };

    try {
      const res: any = await updateTemple(templeData);
      if (res.data) {
        toast.success("Updated Successfully", { id: toastId });
        setOpen(false);
      } else {
        toast.error(res?.error?.data?.message || "Failed to Update", {
          id: toastId,
        });
        setOpen(false);
      }
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to Update");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="absolute bg-white rounded-full md:py-2 py-1 md:px-3 px-2 flex items-center justify-center right-5 top-5 gap-1 text-[#636F85] text-sm">
        Edit <MdOutlineEdit />
      </DialogTrigger>

      <DialogContent className="max-w-[935px]  md:!rounded-[50px] !rounded-3xl [&>button]:hidden">
        <DialogHeader>
          <div>
            <MyFormWrapper onSubmit={onSubmit} defaultValues={tempeData?.data}>
              <DialogTitle className="md:mb-7 mb-3">
                <div className="flex md:flex-row flex-col justify-between items-center md:gap-1 gap-4">
                  <div className="">
                    <h1 className="md:text-4xl text-xl font-medium md:mb-4 mb-2">
                      Edit Tample
                    </h1>
                    <p className="md:text-2xl font-normal">On 20 Jun, 2024</p>
                  </div>
                  <div className="space-x-3 flex ">
                    <div>
                      <DeleteModal id={id} type="temple" />
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="border border-secondary bg-secondary text-white py-3 px-6 rounded-full flex items-center justify-center gap-1  font-normal"
                      >
                        <FaSave /> Save
                      </button>
                    </div>
                  </div>
                </div>
              </DialogTitle>

              <DialogDescription></DialogDescription>

              <div className="grid md:grid-cols-2 grid-cols-1 md:gap-5 gap-3">
                <div className="space-y-2">
                  <h3 className="md:text-3xl font-medium">Temple Name</h3>
                  <MyFormInput
                    type="text"
                    name="name"
                    required={false}
                    inputClassName="md:py-5 py-3 md:px-7 px-5 rounded-full"
                    placeholder="Enter Temple Name"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="md:text-3xl font-medium">
                    Upload Temple Picture
                  </h3>
                  <MyFormInput
                    type="file"
                    name="image"
                    required={false}
                    inputClassName="md:py-5 py-3 md:px-7 px-5 rounded-full "
                    placeholder="Upload Image"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="md:text-3xl font-medium">
                  Enter Temple Location
                </h3>
                <MyFormInput
                  type="text"
                  name="address"
                  required={false}
                  inputClassName="md:py-5 py-3 md:px-7 px-5 rounded-[50px]"
                  placeholder="Enter Temple Information Here"
                />
              </div>
              <div className="space-y-2">
                <h3 className="md:text-3xl font-medium">
                  Enter Temple Information
                </h3>
                <MyFormInput
                  type="textarea"
                  name="description"
                  required={false}
                  rows={1}
                  inputClassName="md:py-5 py-3 md:px-7 px-5 rounded-[50px]"
                  placeholder="Enter Temple Information Here"
                />
              </div>
            </MyFormWrapper>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditTampleModal;
