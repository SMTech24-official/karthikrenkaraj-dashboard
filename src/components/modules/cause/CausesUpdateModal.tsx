/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { FieldValues } from "react-hook-form";
import { FaSave } from "react-icons/fa";
import { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import MyFormWrapper from "@/components/form/MyFormWrapper";
import MyFormInput from "@/components/form/MyFormInput";
import { toast } from "sonner";
import {
  useAddProfOfDeliveryMutation,
  useUpdateSuggestCausesMutation,
} from "@/redux/features/cause/cause.api";
import { DialogDescription } from "@radix-ui/react-dialog";

// const statusOptions = [
//   {
//     keyOption: "02",
//     value: "PENDING_FOR_APPROVAL",
//     label: "PENDING_FOR_APPROVAL",
//   },
//   {
//     keyOption: "01",
//     value: "OPEN_FOR_FOUNDING",
//     label: "OPEN_FOR_FOUNDING",
//   },
//   // {
//   //   keyOption: "03",
//   //   value: "IN_PROGRESS",
//   //   label: "IN_PROGRESS",
//   // },
//   {
//     keyOption: "04",
//     value: "COMPLETED",
//     label: "COMPLETED",
//   },
// ];

type TData = {
  id: string;
  status: "OPEN_FOR_FOUNDING" | "COMPLETED";
};

const CausesUpdateModal = ({ data }: { data: TData }) => {
  const [open, setOpen] = useState(false);
  const [UpdateSuggestCauses] = useUpdateSuggestCausesMutation();
  const [addProf] = useAddProfOfDeliveryMutation();

  // form submit handler
  const onSubmit = async (payload: FieldValues) => {
    const toastId = toast.loading("Updating...");

    let otherData;

    if (data.status === "OPEN_FOR_FOUNDING") {
      const price = parseFloat(payload.totalAmount);

      if (isNaN(price) || price <= 0) {
        toast.error("Invalid price. Please enter a valid number.");
        return;
      }

      otherData = {
        price,
        status: data.status,
        Specifications: payload.Specifications,
      };
    } else {
      otherData = {
        descriptions: payload.descriptions,
      };
    }

    const formData = new FormData();

    formData.append("data", JSON.stringify(otherData));

    if (data.status === "OPEN_FOR_FOUNDING") {
      formData.append("image", payload.image);
    } else {
      const files = payload.image;
      if (files && files.length) {
        for (const file of files) {
          formData.append("images", file); 
        }
      }
    }

    const updatableData = {
      id: data.id,
      data: formData,
    };

    try {
      let res: any;

      if (data.status === "OPEN_FOR_FOUNDING") {
        res = await UpdateSuggestCauses(updatableData);
      } else if (data.status === "COMPLETED") {
        res = await addProf(updatableData);
      }

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
      <DialogTrigger className="bg-primary md:px-4 px-2 md:py-2 py-1 rounded-full flex gap-1 items-center justify-center">
        <MdOutlineEdit className="text-lg" /> Confirm
      </DialogTrigger>

      <DialogContent className="max-w-[935px] md:!rounded-[50px] !rounded-3xl [&>button]:hidden">
        <DialogHeader>
          <div>
            <MyFormWrapper onSubmit={onSubmit}>
              <DialogTitle className="md:mb-7 mb-3">
                <div className="flex md:flex-row flex-col justify-between items-center md:gap-1 gap-4">
                  <div className="">
                    <h1 className="md:text-4xl text-xl font-medium md:mb-4 mb-2">
                      Update price and status.
                    </h1>
                    <p className="md:text-2xl font-normal">On 20 Jun, 2024</p>
                  </div>
                  <div className="space-x-3 flex ">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="border border-[#0C0B2133] text-[#0C0B21] py-3 px-6 rounded-full font-normal"
                    >
                      Discard
                    </button>
                    <div>
                      <button
                        type="submit"
                        className="border border-secondary bg-secondary text-white py-3 px-6 rounded-full flex items-center justify-center gap-1 font-normal"
                      >
                        <FaSave /> Save
                      </button>
                    </div>
                  </div>
                </div>
              </DialogTitle>
              <DialogDescription></DialogDescription>

              <div className="">
                {data.status === "OPEN_FOR_FOUNDING" && (
                  <div className="space-y-2">
                    <h3 className="md:text-3xl font-medium">Price</h3>
                    <MyFormInput
                      type="text"
                      name="totalAmount"
                      inputClassName="md:py-5 py-3 md:px-7 px-5 rounded-full"
                      placeholder="Enter Cause Name"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <h3 className="md:text-3xl font-medium">Image</h3>
                  <MyFormInput
                    type="file"
                    isMultiple={
                      data.status === "OPEN_FOR_FOUNDING" ? false : true
                    }
                    name="image"
                    inputClassName="md:py-5 py-3 md:px-7 px-5 rounded-2xl"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="md:text-3xl font-medium">
                  {data.status === "OPEN_FOR_FOUNDING"
                    ? "Specifications"
                    : "Descriptions"}
                </h3>
                <MyFormInput
                  name={`${
                    data.status === "OPEN_FOR_FOUNDING"
                      ? "specifications"
                      : "descriptions"
                  }`}
                  type="textarea"
                  inputClassName="md:py-5 py-3 md:px-7 px-5 rounded-2xl"
                  placeholder="Enter Specifications"
                />
              </div>
            </MyFormWrapper>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CausesUpdateModal;
