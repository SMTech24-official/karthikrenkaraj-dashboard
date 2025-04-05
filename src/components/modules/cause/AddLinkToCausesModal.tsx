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
import { useEffect, useState } from "react";
import { FaLink } from "react-icons/fa6";
import MyFormWrapper from "@/components/form/MyFormWrapper";
import MyFormInput from "@/components/form/MyFormInput";
import { toast } from "sonner";
import { useAddLinksToSgussedCauesMutation } from "@/redux/features/cause/cause.api";
import { MdOutlineCancel } from "react-icons/md";

const AddLinkToCausesModal = ({ data }: { data: any }) => {
  const [open, setOpen] = useState(false);
  const [AddLinks] = useAddLinksToSgussedCauesMutation();
  const [getCmsLinks, setCmsLinks] = useState<string[]>([]);

  useEffect(() => {
    if (data) {
      setCmsLinks(data?.cmsLink || []);
    }
  }, [data, open]);

  // remove links
  const removeLinks = (linkUrl: string) => {
    setCmsLinks((prevLinks) => {
      const updatedLinks = prevLinks.filter((link) => link !== linkUrl);
      return updatedLinks;
    });
  };

  // add links
  const handleAddLinks = (payload: FieldValues) => {
    if (payload.link) {
      setCmsLinks((prevLinks) => [...prevLinks, payload.link]);
    }
  };

  // form submit handler
  const onSubmit = async () => {
    const toastId = toast.loading("Updating...");

    const updatableData = {
      id: data.id,
      data: { cmsLink: getCmsLinks },
    };

    try {
      const res: any = await AddLinks(updatableData);
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
        <FaLink className="text-lg font-bold" /> Links
      </DialogTrigger>

      <DialogContent className="max-w-[935px] md:!rounded-[50px] !rounded-3xl [&>button]:hidden">
        <DialogHeader>
          <DialogTitle className="md:mb-7 mb-3">
            <MyFormWrapper onSubmit={onSubmit} defaultValues={data}>
              <div className="flex md:flex-row flex-col justify-between items-center md:gap-1 gap-4">
                <div className="">
                  <h1 className="md:text-4xl text-xl font-medium md:mb-4 mb-2">
                    Update Links
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
            </MyFormWrapper>
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className="">
          <MyFormWrapper onSubmit={handleAddLinks}>
            <div className="space-y-2">
              <div className="flex gap-2 justify-between flex-wrap">
                <h3 className="md:text-3xl font-medium">Add Links</h3>
                <button className="border-2 border-primary bg-primary px-4 py-2 rounded-full">
                  + Add
                </button>
              </div>
              <MyFormInput
                type="text"
                name="link"
                required={false}
                inputClassName="md:py-5 py-3 md:px-7 px-5 rounded-full"
                placeholder="Enter Cause Name"
              />
            </div>
          </MyFormWrapper>

          <h3 className="md:text-3xl font-medium">All Links</h3>
          <div className="flex flex-col gap-1">
            {getCmsLinks?.map((link, idx) => (
              <div
                key={idx}
                className="flex gap-2 justify-between bg-gray-100 py-1 px-5 rounded-full"
              >
                <p>{link}</p>
                <button onClick={() => removeLinks(link)}>
                  <MdOutlineCancel className="text-2xl text-red-400" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddLinkToCausesModal;
