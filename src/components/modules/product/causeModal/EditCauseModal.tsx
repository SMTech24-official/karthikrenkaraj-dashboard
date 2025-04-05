/* eslint-disable @typescript-eslint/no-unused-vars */
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
import type { FieldValues } from "react-hook-form";
import { FaSave } from "react-icons/fa";
import { useState, useEffect } from "react";
import { MdOutlineEdit, MdCancel } from "react-icons/md";
import MyFormWrapper from "@/components/form/MyFormWrapper";
import MyFormInput from "@/components/form/MyFormInput";
import MyFormSelect from "@/components/form/MyFormSelect";
import { toast } from "sonner";
import {
  useCauseCategoryQuery,
  useGetSingleCauseQuery,
  useUpdateCauseMutation,
} from "@/redux/features/cause/cause.api";
import DeleteModal from "../../common/DeleteModal";
import Image from "next/image";

const EditCauseModal = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);
  const [updateCause] = useUpdateCauseMutation();
  const { data: causeData } = useGetSingleCauseQuery(id);
  const { data: causeCategory } = useCauseCategoryQuery(undefined);

  const [causeImages, setCauseImages] = useState<string[]>([]);
  const [formState, setFormState] = useState<any>(null);

  // Add a useEffect to update causeImages when causeData changes
  useEffect(() => {
    if (causeData?.data) {
      setCauseImages(causeData.data.images || []);
    }
  }, [causeData, open]);

  // causes category options
  const causeOptions = causeCategory?.data.map(
    (item: { id: string; name: string }) => ({
      keyOption: item.id,
      value: item.name,
      label: item.name,
    })
  );

  // remove images
  const removeImage = (imageUrl: string) => {
    setCauseImages((prevImages) => {
      if (prevImages.length <= 1) {
        toast.error("At least one image is required");
        return prevImages;
      }
      const updatedImages = prevImages.filter((img) => img !== imageUrl);
      return updatedImages;
    });
  };

  // form submit handler
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Updating Cause...");

    const price = Number(data.price);
    const quantity = Number(data.quantity);

    if (isNaN(price) || price <= 0) {
      toast.error("Invalid price. Please enter a valid number.");
      return;
    }
    if (isNaN(quantity) || quantity < 1) {
      toast.error("Invalid quantity. Must be at least 1.");
      return;
    }

    // Create a new FormData instance
    const formData = new FormData();

    // Add the current causeImages to the formData
    const formattedData = {
      ...data,
      price,
      quantity,
      images: causeImages, // Use the current state of causeImages
    };

    // If new images are provided, append them to formData
    if (data.images && data.images.length > 0) {
      const allImages = Array.isArray(data.images)
        ? data.images
        : [data.images];
      allImages.forEach((image: File) => {
        if (image instanceof File) {
          formData.append("images", image);
        }
      });
    }

    // Add the JSON data
    formData.append("data", JSON.stringify(formattedData));

    const causeData = {
      id,
      data: formData,
    };

    try {
      const res: any = await updateCause(causeData);
      if ("data" in res) {
        toast.success("Updated Successfully", { id: toastId });
        setOpen(false);
      } else {
        toast.error(res?.error?.data?.message || "Failed to update Cause", {
          id: toastId,
        });
      }
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to update Cause");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="absolute bg-white rounded-full md:py-2 py-1 md:px-3 px-2 flex items-center justify-center right-5 top-5 gap-1 text-[#636F85] text-sm">
        Edit <MdOutlineEdit />
      </DialogTrigger>

      <DialogContent className="max-w-[935px] md:!rounded-[50px] !rounded-3xl [&>button]:hidden">
        <DialogHeader>
          <div>
            <MyFormWrapper
              onSubmit={onSubmit}
              defaultValues={causeData?.data}
              setFormState={setFormState}
            >
              <DialogTitle className="md:mb-7 mb-3">
                <div className="flex md:flex-row flex-col justify-between items-center md:gap-1 gap-4">
                  <div className="">
                    <h1 className="md:text-4xl text-xl font-medium md:mb-4 mb-2">
                      Edit Cause
                    </h1>
                    <p className="md:text-2xl font-normal">On 20 Jun, 2024</p>
                  </div>
                  <div className="space-x-3 flex ">
                    <div>
                      <DeleteModal id={id} type="cause" />
                    </div>
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
              <DialogDescription ></DialogDescription>

              <div className="space-y-2">
                <h1 className="md:text-3xl font-medium">Remove Images</h1>
                <div className="flex flex-wrap gap-3 pb-3">
                  {causeImages?.map((image, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg h-20 w-24 border-2 border-gray-300 relative"
                    >
                      <button
                        type="button"
                        onClick={() => removeImage(image)}
                        className="absolute -top-2 -right-2 rounded-full text-lg text-red-400"
                      >
                        <MdCancel />
                      </button>
                      <div className="h-full w-full overflow-hidden">
                        <Image
                          src={image || "/placeholder.svg"}
                          width={1000}
                          height={1000}
                          alt="image"
                          className="h-20 w-24"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 grid-cols-1 md:gap-5 gap-3">
                <div className="space-y-2">
                  <h3 className="md:text-3xl font-medium">Cause Name</h3>
                  <MyFormInput
                    type="text"
                    name="name"
                    required={false}
                    inputClassName="md:py-5 py-3 md:px-7 px-5 rounded-full"
                    placeholder="Enter Cause Name"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="md:text-3xl font-medium">
                    Upload Cause Picture
                  </h3>
                  <MyFormInput
                    type="file"
                    name="images"
                    isMultiple
                    required={false}
                    inputClassName="md:py-5 py-3 md:px-7 px-5 rounded-full"
                    placeholder="Upload Image"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="md:text-3xl font-medium">Cause Price</h3>
                  <MyFormInput
                    type="text"
                    name="price"
                    required={false}
                    inputClassName="md:py-5 py-3 md:px-7 px-5 rounded-full"
                    placeholder="Enter Cause Price"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="md:text-3xl font-medium">Cause Quantity</h3>
                  <MyFormInput
                    type="text"
                    name="quantity"
                    required={false}
                    inputClassName="md:py-5 py-3 md:px-7 px-5 rounded-full"
                    placeholder="Enter Cause Quantity"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="md:text-3xl font-medium">Cause Category</h3>
                <MyFormSelect
                  name="type"
                  required={false}
                  options={causeOptions}
                  selectClassName="md:py-5 py-3 md:px-7 px-5 rounded-full"
                />
              </div>

              <div className="space-y-2">
                <h3 className="md:text-3xl font-medium">Category Details</h3>
                <MyFormInput
                  type="textarea"
                  name="description"
                  required={false}
                  inputClassName="md:py-5 py-3 md:px-7 px-5 rounded-3xl"
                  rows={3}
                  placeholder="Enter Cause Details"
                />
              </div>
            </MyFormWrapper>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditCauseModal;
