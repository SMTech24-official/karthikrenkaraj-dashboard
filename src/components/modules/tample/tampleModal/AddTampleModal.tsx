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
import { AiOutlinePlus } from "react-icons/ai";
import { FieldValues } from "react-hook-form";
import { FaSave } from "react-icons/fa";
import { useState } from "react";
import MyFormWrapper from "@/components/form/MyFormWrapper";
import MyFormInput from "@/components/form/MyFormInput";
import { toast } from "sonner";
import { useAddTempleMutation } from "@/redux/features/temple/temple.api";

const AddTampleModal = () => {
  const [open, setOpen] = useState(false);
  const [addTemple] = useAddTempleMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Adding Temple...");

    const formData = new FormData();

    formData.append("image", data.image);

    formData.append("data", JSON.stringify(data));

    try {
      const res:any = await addTemple(formData);
      if (res.data) {
        toast.success("Temepe Added Successfully", { id: toastId });
        setOpen(false);
      } else {
        toast.error(res?.error?.data?.message || "Failed to Add", {
          id: toastId,
        });
        setOpen(false);
      }
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to Add");
      setOpen(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="bg-secondary rounded-full md:py-[10] py-2 md:px-7 px-3 md:text-xl text-primary flex gap-2 items-center">
        <AiOutlinePlus /> Add Temple
      </DialogTrigger>

      <DialogContent className="max-w-[935px]  md:!rounded-[50px] !rounded-3xl [&>button]:hidden">
        <DialogHeader>
          <div>
            <MyFormWrapper onSubmit={onSubmit}>
              <DialogTitle className="md:mb-7 mb-3">
                <div className="flex md:flex-row flex-col justify-between items-center md:gap-1 gap-4">
                  <div className="">
                    <h1 className="md:text-4xl text-xl font-medium md:mb-4 mb-2">
                      Add Tample
                    </h1>
                    <p className="md:text-2xl font-normal">On 20 Jun, 2024</p>
                  </div>
                  <div className="space-x-3 flex ">
                    <div>
                      <button
                        onClick={() => setOpen(false)}
                        className="border border-[#0C0B2133] text-[#0C0B21] py-3 px-6 rounded-full font-normal"
                      >
                        Discard
                      </button>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="border border-[#0C0B21] bg-[#0C0B21] text-white py-3 px-6 rounded-full flex items-center justify-center gap-1  font-normal"
                      >
                        <FaSave /> Save
                      </button>
                    </div>
                  </div>
                </div>
              </DialogTitle>

              <DialogDescription></DialogDescription>

              <div className="grid md:grid-cols-2 grid-cols-1 md:gap-5 gap-1">
                <div className="space-y-2">
                  <h3 className="md:text-3xl font-medium">Temple Name</h3>
                  <MyFormInput
                    type="text"
                    name="name"
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

export default AddTampleModal;
